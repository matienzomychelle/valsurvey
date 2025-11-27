import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { BarChart3, Shield, Smartphone, TrendingUp, QrCode, Lock } from "lucide-react";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const handleConsentAndNavigate = () => {
    setShowPrivacyDialog(false);
    navigate('/survey');
  };

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="fixed top-0 right-0 z-50 p-4 animate-slide-in-right">
        <Button size="lg" variant="outline" onClick={() => navigate('/admin')} className="text-lg px-8 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 transition-transform hover:scale-105">
          Admin Dashboard
        </Button>
      </div>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary via-primary-dark to-primary bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(135deg, rgba(220, 38, 38, 0.65) 0%, rgba(185, 28, 28, 0.65) 100%), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="flex justify-center mb-8 animate-fade-in">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-32 h-32 md:w-40 md:h-40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              ValSurvey+
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-95 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Digital ARTA-Compliant Customer Feedback System
            </p>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              City Government of Valenzuela's modern solution for collecting, analyzing, 
              and acting on citizen feedback to improve public services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <Button size="lg" variant="secondary" onClick={() => setShowPrivacyDialog(true)} className="text-lg px-8 transition-transform hover:scale-105">
                Take Survey Now
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/about')} className="text-lg px-8 transition-transform hover:scale-105">
                About Survey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why ValSurvey+?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive, secure, and user-friendly platform designed to meet ARTA compliance 
              standards while delivering actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>ARTA Compliant</CardTitle>
                <CardDescription>
                  Fully compliant with Anti-Red Tape Authority standards and Data Privacy Law
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <Smartphone className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Multi-Platform</CardTitle>
                <CardDescription>
                  Works seamlessly on desktop, mobile, tablet, and kiosk mode for maximum accessibility
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <QrCode className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Easy Access</CardTitle>
                <CardDescription>
                  QR code support and simple links make surveys accessible anytime, anywhere
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-[400ms] border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Instant insights with visual dashboards, charts, and exportable reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-500 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Data-Driven Decisions</CardTitle>
                <CardDescription>
                  Transform feedback into actionable insights to improve government services
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-[600ms] border-primary/20 hover:shadow-lg hover:-translate-y-1">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
              Help Us Serve You Better
            </h2>
            <p className="text-lg mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Your feedback matters. Take a few minutes to share your experience 
              and help improve public services in Valenzuela.
            </p>
            <Button size="lg" variant="secondary" onClick={() => setShowPrivacyDialog(true)} className="text-lg px-12 transition-transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Start Survey
            </Button>
          </div>
        </div>
      </section>

      {/* Why Your Feedback Matters Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Your Feedback Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your voice drives meaningful change in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Transparency</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Ensures fair and accountable service delivery. Your feedback creates a culture of openness in government operations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-4">
                  <Smartphone className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Efficiency</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Helps reduce waiting times and streamline processes. Your input identifies bottlenecks and improves workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 border-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Improvement</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Empowers the city to identify and resolve service issues quickly. Your feedback drives continuous enhancement.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Privacy & Compliance Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-2 rounded-full mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Secured & Compliant</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Data Privacy & Compliance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your trust is our priority. Every response is protected with enterprise-grade security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100 border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all group">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Lock className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Data Privacy Act of 2012</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Full compliance with Republic Act No. 10173. All personal information is collected, processed, and stored following strict privacy standards and regulations.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all group">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">ARTA Guidelines</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Fully aligned with Anti-Red Tape Authority standards. Your feedback directly contributes to transparent and efficient government service delivery.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-10 border border-primary/20 scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">Your Rights Are Protected</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Access, correct, or request deletion of your data anytime. Learn more about how we protect your information and your privacy rights.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <Button onClick={() => navigate('/privacy-policy')} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    <Lock className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/terms-of-use')} className="border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                    Terms of Use
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-primary via-primary-dark to-primary text-primary-foreground overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            {/* Brand Section - Larger */}
            <div className="lg:col-span-5">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary-foreground/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <img 
                    src={valenzuelaSeal} 
                    alt="City of Valenzuela Seal" 
                    className="w-20 h-20 relative z-10 transform group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-1">ValSurvey+</h3>
                  <p className="text-sm opacity-90">City of Valenzuela</p>
                  <p className="text-xs opacity-75 mt-1">ARTA CSS System</p>
                </div>
              </div>
              <p className="text-sm opacity-90 leading-relaxed mb-6 max-w-md">
                Digitizing citizen feedback for better public services. Your voice helps us build a more efficient and transparent local government.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">ARTA Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full backdrop-blur-sm border border-primary-foreground/20">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-medium">DPA 2012</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-foreground/50 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', action: () => navigate('/') },
                  { label: 'About the Platform', action: () => navigate('/about') },
                  { label: 'Take the Survey', action: () => setShowPrivacyDialog(true) },
                  { label: 'Privacy Policy', action: () => navigate('/privacy-policy') },
                  { label: 'Terms of Use', action: () => navigate('/terms-of-use') }
                ].map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-sm opacity-90 hover:opacity-100 hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full group-hover:w-3 transition-all"></div>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-4">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-foreground/50 rounded-full"></div>
              </h3>
              <div className="space-y-4">
                <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all">
                  <p className="font-semibold mb-2">City Government of Valenzuela</p>
                  <p className="text-sm opacity-90 mb-3">Information and Communications Technology Office (ICTO)</p>
                  <a 
                    href="mailto:icto@valenzuela.gov.ph"
                    className="text-sm opacity-90 hover:opacity-100 flex items-center gap-2 group transition-all"
                  >
                    <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-all">
                      <span className="text-xs">✉</span>
                    </div>
                    icto@valenzuela.gov.ph
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-75">© 2025 ValSurvey+. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs opacity-75">
              <button onClick={() => navigate('/privacy-policy')} className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => navigate('/terms-of-use')} className="hover:opacity-100 transition-opacity">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:opacity-100 transition-opacity">
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Data Privacy Consent Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              Data Privacy Notice (R.A. 10173)
            </DialogTitle>
            <DialogDescription className="sr-only">
              Data Privacy Notice for ValSurvey+ Customer Feedback System
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-foreground">
            <p className="leading-relaxed">
              By filling out this form, you agree to provide your personal information voluntarily. In compliance with{" "}
              <span className="font-semibold">R.A. 10173 or the Data Privacy Act of 2012</span>, we assure you that:
            </p>

            <ol className="space-y-3 list-none">
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">1.</span>
                <span>
                  <span className="font-semibold">Your information will be collected and processed only for official and legitimate purposes related to this system.</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">2.</span>
                <span>
                  <span className="font-semibold">Your data will be kept secure and confidential, and will not be shared with third parties without your consent, unless required by law.</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">3.</span>
                <span>
                  <span className="font-semibold">You have the right to access, correct, or request deletion of your personal information at any time.</span>
                </span>
              </li>
            </ol>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowPrivacyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConsentAndNavigate} className="bg-primary hover:bg-primary/90">
              I Consent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
