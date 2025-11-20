import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Users, MessageSquare, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SurveyResponse {
  id: string;
  client_type: string;
  date_of_transaction: string;
  sex: string | null;
  age: number | null;
  region: string | null;
  service_availed: string;
  cc1: string | null;
  cc2: string | null;
  cc3: string | null;
  sqd0: number | null;
  sqd1: number | null;
  sqd2: number | null;
  sqd3: number | null;
  sqd4: number | null;
  sqd5: number | null;
  sqd6: number | null;
  sqd7: number | null;
  sqd8: number | null;
  suggestions: string | null;
  email: string | null;
  created_at: string;
}

interface AnalyticsProps {
  responses: SurveyResponse[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

const Analytics = ({ responses }: AnalyticsProps) => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  // Calculate basic statistics
  const stats = useMemo(() => {
    const totalResponses = responses.length;
    const averageSatisfaction = responses.length > 0
      ? responses.filter(r => r.sqd0).reduce((sum, r) => sum + (r.sqd0 || 0), 0) / responses.filter(r => r.sqd0).length
      : 0;
    
    const uniqueServices = new Set(responses.map(r => r.service_availed)).size;
    const withFeedback = responses.filter(r => r.suggestions || r.cc1 || r.cc2 || r.cc3).length;

    return {
      totalResponses,
      averageSatisfaction: averageSatisfaction.toFixed(2),
      uniqueServices,
      withFeedback,
      feedbackRate: totalResponses > 0 ? ((withFeedback / totalResponses) * 100).toFixed(1) : "0"
    };
  }, [responses]);

  // Responses over time
  const timeSeriesData = useMemo(() => {
    const now = new Date();
    const data: { date: string; count: number }[] = [];
    
    if (timeRange === 'day') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const count = responses.filter(r => r.created_at.startsWith(dateStr)).length;
        data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), count });
      }
    } else if (timeRange === 'week') {
      // Last 8 weeks
      for (let i = 7; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - (i * 7));
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        const count = responses.filter(r => {
          const responseDate = new Date(r.created_at);
          return responseDate >= weekStart && responseDate <= weekEnd;
        }).length;
        
        data.push({ 
          date: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, 
          count 
        });
      }
    } else {
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const count = responses.filter(r => {
          const responseDate = new Date(r.created_at);
          return responseDate.getMonth() === date.getMonth() && 
                 responseDate.getFullYear() === date.getFullYear();
        }).length;
        data.push({ date: month, count });
      }
    }
    
    return data;
  }, [responses, timeRange]);

  // Satisfaction by question
  const satisfactionByQuestion = useMemo(() => {
    const questions = [
      { key: 'sqd0', label: 'Overall Satisfaction' },
      { key: 'sqd1', label: 'Staff Responsiveness' },
      { key: 'sqd2', label: 'Service Speed' },
      { key: 'sqd3', label: 'Information Clarity' },
      { key: 'sqd4', label: 'Facility Comfort' },
      { key: 'sqd5', label: 'Process Efficiency' },
      { key: 'sqd6', label: 'Communication' },
      { key: 'sqd7', label: 'Problem Resolution' },
      { key: 'sqd8', label: 'Overall Experience' }
    ];

    return questions.map(q => {
      const validResponses = responses.filter(r => r[q.key as keyof SurveyResponse]);
      const average = validResponses.length > 0
        ? validResponses.reduce((sum, r) => sum + (r[q.key as keyof SurveyResponse] as number || 0), 0) / validResponses.length
        : 0;
      
      return {
        question: q.label,
        score: parseFloat(average.toFixed(2)),
        responses: validResponses.length
      };
    }).sort((a, b) => b.score - a.score);
  }, [responses]);

  // Extract common keywords from feedback
  const feedbackKeywords = useMemo(() => {
    const allFeedback = responses
      .flatMap(r => [r.suggestions, r.cc1, r.cc2, r.cc3])
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // Common stopwords to filter out
    const stopwords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'very', 'too', 'much', 'more', 'most', 'some', 'any', 'no', 'not', 'only', 'just', 'about', 'from', 'by', 'as', 'this', 'that', 'these', 'those', 'it', 'its', 'their', 'there', 'they', 'them', 'i', 'my', 'me', 'we', 'our', 'you', 'your']);

    const words = allFeedback.match(/\b[a-z]{4,}\b/g) || [];
    const wordCount: Record<string, number> = {};

    words.forEach(word => {
      if (!stopwords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, count]) => ({ word, count }));
  }, [responses]);

  // Key themes analysis
  const keyThemes = useMemo(() => {
    const themes: Record<string, number> = {
      'Service Quality': 0,
      'Staff Attitude': 0,
      'Waiting Time': 0,
      'Facility Issues': 0,
      'Process Problems': 0,
      'Positive Experience': 0
    };

    const themeKeywords = {
      'Service Quality': ['quality', 'service', 'excellent', 'poor', 'good', 'bad', 'better', 'improve'],
      'Staff Attitude': ['staff', 'employee', 'rude', 'helpful', 'friendly', 'courteous', 'professional'],
      'Waiting Time': ['wait', 'waiting', 'long', 'slow', 'quick', 'fast', 'time', 'delay'],
      'Facility Issues': ['facility', 'clean', 'dirty', 'comfort', 'space', 'room', 'building'],
      'Process Problems': ['process', 'procedure', 'confusing', 'complicated', 'easy', 'difficult', 'system'],
      'Positive Experience': ['thank', 'thanks', 'great', 'amazing', 'wonderful', 'satisfied', 'happy']
    };

    responses.forEach(r => {
      const feedback = [r.suggestions, r.cc1, r.cc2, r.cc3]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      Object.entries(themeKeywords).forEach(([theme, keywords]) => {
        if (keywords.some(keyword => feedback.includes(keyword))) {
          themes[theme]++;
        }
      });
    });

    return Object.entries(themes)
      .filter(([_, count]) => count > 0)
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count);
  }, [responses]);

  // Client type distribution
  const clientTypeData = useMemo(() => {
    const distribution: Record<string, number> = {};
    responses.forEach(r => {
      distribution[r.client_type] = (distribution[r.client_type] || 0) + 1;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }, [responses]);

  // Generate PDF Report
  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('ValSurvey+ Analytics Report', 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Summary Statistics
    doc.setFontSize(14);
    doc.text('Summary Statistics', 14, 42);
    
    const summaryData = [
      ['Total Responses', stats.totalResponses.toString()],
      ['Average Satisfaction', `${stats.averageSatisfaction} / 5.0`],
      ['Unique Services', stats.uniqueServices.toString()],
      ['Responses with Feedback', `${stats.withFeedback} (${stats.feedbackRate}%)`]
    ];
    
    autoTable(doc, {
      startY: 46,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid'
    });
    
    // Satisfaction by Question
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Satisfaction by Question', 14, 22);
    
    const questionData = satisfactionByQuestion.map(q => [
      q.question,
      q.score.toFixed(2),
      q.responses.toString()
    ]);
    
    autoTable(doc, {
      startY: 26,
      head: [['Question', 'Average Score', 'Responses']],
      body: questionData,
      theme: 'striped'
    });
    
    // Key Themes
    if (keyThemes.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Key Feedback Themes', 14, 22);
      
      const themeData = keyThemes.map(t => [t.theme, t.count.toString()]);
      
      autoTable(doc, {
        startY: 26,
        head: [['Theme', 'Mentions']],
        body: themeData,
        theme: 'grid'
      });
    }
    
    // Common Keywords
    if (feedbackKeywords.length > 0) {
      const finalY = (doc as any).lastAutoTable.finalY || 26;
      doc.setFontSize(14);
      doc.text('Common Feedback Keywords', 14, finalY + 14);
      
      const keywordData = feedbackKeywords.slice(0, 10).map(k => [k.word, k.count.toString()]);
      
      autoTable(doc, {
        startY: finalY + 18,
        head: [['Keyword', 'Frequency']],
        body: keywordData,
        theme: 'grid'
      });
    }
    
    // Save the PDF
    doc.save(`valsurvey-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive insights from survey responses</p>
        </div>
        <Button onClick={generatePDFReport} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF Report
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResponses}</div>
            <p className="text-xs text-muted-foreground">Survey submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSatisfaction} / 5.0</div>
            <p className="text-xs text-muted-foreground">Overall rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.withFeedback}</div>
            <p className="text-xs text-muted-foreground">{stats.feedbackRate}% response rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Services</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueServices}</div>
            <p className="text-xs text-muted-foreground">Service categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Response Trends</CardTitle>
              <CardDescription>Survey submissions over time</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={timeRange === 'day' ? 'default' : 'outline'}
                onClick={() => setTimeRange('day')}
              >
                Daily
              </Button>
              <Button 
                size="sm" 
                variant={timeRange === 'week' ? 'default' : 'outline'}
                onClick={() => setTimeRange('week')}
              >
                Weekly
              </Button>
              <Button 
                size="sm" 
                variant={timeRange === 'month' ? 'default' : 'outline'}
                onClick={() => setTimeRange('month')}
              >
                Monthly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Responses"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Satisfaction by Question */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction by Question</CardTitle>
            <CardDescription>Average scores across all survey questions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={satisfactionByQuestion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="question" type="category" width={150} fontSize={12} />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Client Distribution</CardTitle>
            <CardDescription>Breakdown by client type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={clientTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {clientTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Key Themes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Key Feedback Themes
            </CardTitle>
            <CardDescription>Automatically extracted from open-ended responses</CardDescription>
          </CardHeader>
          <CardContent>
            {keyThemes.length > 0 ? (
              <div className="space-y-3">
                {keyThemes.map((theme, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-medium">{theme.theme}</span>
                    <Badge variant="secondary">{theme.count} mentions</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No feedback themes available yet</p>
            )}
          </CardContent>
        </Card>

        {/* Common Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Common Keywords
            </CardTitle>
            <CardDescription>Most frequent words in feedback</CardDescription>
          </CardHeader>
          <CardContent>
            {feedbackKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {feedbackKeywords.map((keyword, idx) => (
                  <Badge key={idx} variant="outline" className="gap-1">
                    {keyword.word}
                    <span className="text-xs text-muted-foreground">({keyword.count})</span>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No keywords available yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
