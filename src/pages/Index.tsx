import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart3, Shield, Smartphone, TrendingUp, QrCode, Lock } from "lucide-react";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-primary via-primary-dark to-primary bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(29, 78, 216, 0.95) 100%), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="flex justify-center mb-8">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-32 h-32 md:w-40 md:h-40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ValSurvey+
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-95">
              Digital ARTA-Compliant Customer Feedback System
            </p>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              City Government of Valenzuela's modern solution for collecting, analyzing, 
              and acting on citizen feedback to improve public services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => navigate('/survey')} className="text-lg px-8">
                Take Survey Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/admin')} className="text-lg px-8 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why ValSurvey+?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive, secure, and user-friendly platform designed to meet ARTA compliance 
              standards while delivering actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>ARTA Compliant</CardTitle>
                <CardDescription>
                  Fully compliant with Anti-Red Tape Authority standards and Data Privacy Law
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Multi-Platform</CardTitle>
                <CardDescription>
                  Works seamlessly on desktop, mobile, tablet, and kiosk mode for maximum accessibility
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <QrCode className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Easy Access</CardTitle>
                <CardDescription>
                  QR code support and simple links make surveys accessible anytime, anywhere
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Instant insights with visual dashboards, charts, and exportable reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Data-Driven Decisions</CardTitle>
                <CardDescription>
                  Transform feedback into actionable insights to improve government services
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Encrypted data storage with role-based access control and privacy protection
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Help Us Serve You Better
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Your feedback matters. Take a few minutes to share your experience 
              and help improve public services in Valenzuela.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/survey')} className="text-lg px-12">
              Start Survey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-12 h-12" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">City Government of Valenzuela</p>
                <p className="text-muted-foreground">Customer Satisfaction Survey System</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© 2025 ValSurvey+. All rights reserved.</p>
              <p>ARTA-Compliant | Data Privacy Protected</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
