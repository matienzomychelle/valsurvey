import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, TrendingUp, BarChart3 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import SurveyManagement from "@/components/admin/SurveyManagement";
import ResponseMonitoring from "@/components/admin/ResponseMonitoring";
import Analytics from "@/components/admin/Analytics";

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

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and admin role
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setSession(session);

      // Check if user has admin role
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error || !roleData) {
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchSurveyData();
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSurveyData = async () => {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setResponses(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const calculateAverageSatisfaction = () => {
    if (responses.length === 0) return 0;

    const validRatings = responses.filter(r => r.sqd0).map(r => r.sqd0!);
    if (validRatings.length === 0) return 0;

    const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
    return (sum / validRatings.length).toFixed(2);
  };

  const getSatisfactionDistribution = () => {
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    responses.forEach(response => {
      if (response.sqd0) {
        distribution[response.sqd0]++;
      }
    });

    return distribution;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const satisfactionDist = getSatisfactionDistribution();
  const totalResponses = responses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">ValSurvey+ Admin</h1>
              <p className="text-sm text-muted-foreground">{session?.user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResponses}</div>
              <p className="text-xs text-muted-foreground">Survey submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateAverageSatisfaction()}</div>
              <p className="text-xs text-muted-foreground">Out of 5.00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalResponses > 0 
                  ? ((satisfactionDist[4] + satisfactionDist[5]) / totalResponses * 100).toFixed(0)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Rated 4-5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Distribution</CardTitle>
                <CardDescription>Breakdown of satisfaction ratings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(satisfactionDist).reverse().map(([rating, count]) => (
                  <div key={rating} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{rating} Stars</span>
                      <span>{count} responses ({totalResponses > 0 ? ((count / totalResponses) * 100).toFixed(1) : 0}%)</span>
                    </div>
                    <Progress value={totalResponses > 0 ? (count / totalResponses) * 100 : 0} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <ResponseMonitoring />
          </TabsContent>

          <TabsContent value="surveys" className="space-y-4">
            <SurveyManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Analytics responses={responses} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
