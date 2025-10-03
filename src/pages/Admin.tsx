import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Users, TrendingUp, FileText, Home } from "lucide-react";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication - in production, use proper authentication
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to ValSurvey+ Admin Dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try admin/admin",
        variant: "destructive",
      });
    }
  };

  // Get survey data from localStorage
  const getSurveyData = () => {
    const data = localStorage.getItem('surveyResponses');
    return data ? JSON.parse(data) : [];
  };

  const responses = getSurveyData();
  const totalResponses = responses.length;

  // Calculate average satisfaction
  const calculateAverageSatisfaction = () => {
    if (responses.length === 0) return 0;
    const validResponses = responses.filter((r: any) => r.sqd0 && r.sqd0 !== 'na');
    if (validResponses.length === 0) return 0;
    const sum = validResponses.reduce((acc: number, r: any) => acc + parseInt(r.sqd0), 0);
    return (sum / validResponses.length).toFixed(2);
  };

  // Calculate satisfaction distribution
  const getSatisfactionDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, na: 0 };
    responses.forEach((r: any) => {
      if (r.sqd0) {
        distribution[r.sqd0 as keyof typeof distribution]++;
      }
    });
    return distribution;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-20 h-20" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">ValSurvey+ Admin</CardTitle>
            <CardDescription>Sign in to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Demo credentials: admin / admin
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const distribution = getSatisfactionDistribution();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-primary">ValSurvey+ Admin</h1>
                <p className="text-sm text-muted-foreground">Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalResponses}</div>
              <p className="text-xs text-muted-foreground mt-1">Survey submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Satisfaction</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rating-5">{calculateAverageSatisfaction()}/5</div>
              <p className="text-xs text-muted-foreground mt-1">Overall rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rating-4">
                {totalResponses > 0 
                  ? Math.round(((distribution[4] + distribution[5]) / totalResponses) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Agree + Strongly Agree</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Distribution</CardTitle>
                <CardDescription>Overall satisfaction ratings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Strongly Agree", value: distribution[5], color: "rating-5" },
                    { label: "Agree", value: distribution[4], color: "rating-4" },
                    { label: "Neither", value: distribution[3], color: "rating-3" },
                    { label: "Disagree", value: distribution[2], color: "rating-2" },
                    { label: "Strongly Disagree", value: distribution[1], color: "rating-1" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">{item.value} responses</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={`bg-${item.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${totalResponses > 0 ? (item.value / totalResponses) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Responses</CardTitle>
                <CardDescription>Latest survey submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {responses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No responses yet. Start collecting feedback!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {responses.slice(-10).reverse().map((response: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{response.serviceAvailed}</p>
                            <p className="text-sm text-muted-foreground">
                              {response.clientType} • {new Date(response.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Satisfaction</p>
                            <p className="text-2xl font-bold text-rating-5">{response.sqd0}/5</p>
                          </div>
                        </div>
                        {response.suggestions && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground italic">"{response.suggestions}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Coming soon: Advanced analytics and reporting features</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground mb-4">
                  Advanced analytics features including trend analysis, exportable reports, 
                  and data segmentation will be available soon.
                </p>
                <Button variant="outline" disabled>
                  Export Reports (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
