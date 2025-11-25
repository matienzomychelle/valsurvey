import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";
import { z } from "zod";

// Input validation schema
const surveySchema = z.object({
  clientType: z.string().min(1, "Client type is required").max(50),
  date: z.string().min(1, "Date is required"),
  sex: z.enum(["Male", "Female", "Prefer not to say"]),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be at most 120").optional(),
  region: z.string().max(100).optional(),
  serviceAvailed: z.string().min(1, "Service availed is required").max(200),
  cc1: z.enum(["Yes", "No"]).optional(),
  cc2: z.enum(["Easy to see", "Somewhat easy", "Difficult", "N/A"]).optional(),
  cc3: z.enum(["Yes", "No", "N/A"]).optional(),
  sqd0: z.number().min(1).max(5),
  sqd1: z.number().min(1).max(5),
  sqd2: z.number().min(1).max(5),
  sqd3: z.number().min(1).max(5),
  sqd4: z.number().min(1).max(5),
  sqd5: z.number().min(1).max(5),
  sqd6: z.number().min(1).max(5),
  sqd7: z.number().min(1).max(5),
  sqd8: z.number().min(1).max(5),
  suggestions: z.string().max(2000, "Suggestions must be at most 2000 characters").optional(),
  email: z.string().email("Invalid email format").max(255).optional().or(z.literal("")),
});

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientType: "",
    date: new Date().toISOString().split('T')[0],
    sex: "",
    age: "",
    region: "",
    serviceAvailed: "",
    cc1: "",
    cc2: "",
    cc3: "",
    sqd0: "",
    sqd1: "",
    sqd2: "",
    sqd3: "",
    sqd4: "",
    sqd5: "",
    sqd6: "",
    sqd7: "",
    sqd8: "",
    suggestions: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      const validatedData = surveySchema.parse({
        clientType: formData.clientType,
        date: formData.date,
        sex: formData.sex === "male" ? "Male" : formData.sex === "female" ? "Female" : "Prefer not to say",
        age: formData.age ? parseInt(formData.age) : undefined,
        region: formData.region || undefined,
        serviceAvailed: formData.serviceAvailed,
        cc1: formData.cc1 === "1" ? "Yes" : formData.cc1 === "4" ? "No" : undefined,
        cc2: formData.cc2 === "1" ? "Easy to see" : formData.cc2 === "2" ? "Somewhat easy" : formData.cc2 === "3" ? "Difficult" : formData.cc2 === "5" ? "N/A" : undefined,
        cc3: formData.cc3 === "1" || formData.cc3 === "2" ? "Yes" : formData.cc3 === "3" ? "No" : formData.cc3 === "4" ? "N/A" : undefined,
        sqd0: formData.sqd0 && formData.sqd0 !== "na" ? parseInt(formData.sqd0) : undefined,
        sqd1: formData.sqd1 && formData.sqd1 !== "na" ? parseInt(formData.sqd1) : undefined,
        sqd2: formData.sqd2 && formData.sqd2 !== "na" ? parseInt(formData.sqd2) : undefined,
        sqd3: formData.sqd3 && formData.sqd3 !== "na" ? parseInt(formData.sqd3) : undefined,
        sqd4: formData.sqd4 && formData.sqd4 !== "na" ? parseInt(formData.sqd4) : undefined,
        sqd5: formData.sqd5 && formData.sqd5 !== "na" ? parseInt(formData.sqd5) : undefined,
        sqd6: formData.sqd6 && formData.sqd6 !== "na" ? parseInt(formData.sqd6) : undefined,
        sqd7: formData.sqd7 && formData.sqd7 !== "na" ? parseInt(formData.sqd7) : undefined,
        sqd8: formData.sqd8 && formData.sqd8 !== "na" ? parseInt(formData.sqd8) : undefined,
        suggestions: formData.suggestions || undefined,
        email: formData.email || undefined,
      });

      // Insert to database
      const { error } = await supabase.from('survey_responses').insert({
        client_type: validatedData.clientType,
        date_of_transaction: validatedData.date,
        sex: validatedData.sex,
        age: validatedData.age,
        region: validatedData.region,
        service_availed: validatedData.serviceAvailed,
        cc1: validatedData.cc1,
        cc2: validatedData.cc2,
        cc3: validatedData.cc3,
        sqd0: validatedData.sqd0,
        sqd1: validatedData.sqd1,
        sqd2: validatedData.sqd2,
        sqd3: validatedData.sqd3,
        sqd4: validatedData.sqd4,
        sqd5: validatedData.sqd5,
        sqd6: validatedData.sqd6,
        sqd7: validatedData.sqd7,
        sqd8: validatedData.sqd8,
        suggestions: validatedData.suggestions,
        email: validatedData.email,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your survey response has been submitted.",
      });

      navigate('/thank-you');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit survey. Please try again.",
        });
      }
    }
  };

  const getColorClasses = (colorKey: string, isSelected: boolean) => {
    if (!isSelected) return 'bg-muted/50 border-border hover:border-muted-foreground';
    
    switch (colorKey) {
      case "1":
        return 'bg-rating-1 border-rating-1 shadow-lg';
      case "2":
        return 'bg-rating-2 border-rating-2 shadow-lg';
      case "3":
        return 'bg-rating-3 border-rating-3 shadow-lg';
      case "4":
        return 'bg-rating-4 border-rating-4 shadow-lg';
      case "5":
        return 'bg-rating-5 border-rating-5 shadow-lg';
      default:
        return 'bg-muted border-muted shadow-lg';
    }
  };

  const RatingScale = ({ name, value, onChange }: { name: string; value: string; onChange: (value: string) => void }) => (
    <RadioGroup value={value} onValueChange={onChange} className="flex flex-wrap gap-3 justify-start">
      {[
        { value: "1", label: "Strongly Disagree", emoji: "😞" },
        { value: "2", label: "Disagree", emoji: "🙁" },
        { value: "3", label: "Neither Agree nor Disagree", emoji: "😐" },
        { value: "4", label: "Agree", emoji: "🙂" },
        { value: "5", label: "Strongly Agree", emoji: "😊" },
        { value: "na", label: "N/A", emoji: "😶" },
      ].map((option) => {
        const isSelected = value === option.value;
        return (
          <div key={option.value} className="flex flex-col items-center gap-2">
            <Label 
              htmlFor={`${name}-${option.value}`} 
              className={`cursor-pointer transition-all duration-200 ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 transition-all duration-200 ${getColorClasses(option.value, isSelected)}`}>
                {option.emoji}
              </div>
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
                className="sr-only"
              />
            </Label>
            <span className={`text-xs text-center max-w-[85px] leading-tight ${isSelected ? 'font-semibold' : 'text-muted-foreground'}`}>
              {option.label}
            </span>
          </div>
        );
      })}
    </RadioGroup>
  );

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Sidebar Navigation */}
      <div className="hidden lg:block w-64 bg-card/95 backdrop-blur-sm border-r border-border sticky top-0 h-screen overflow-hidden animate-slide-in-right">
        <div className="p-6">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="w-full justify-start mb-6"
          >
            ← Back to Home
          </Button>
          
          <h3 className="font-bold text-sm text-muted-foreground mb-4">Survey Sections</h3>
          
          <div className="space-y-2">
            {[
              { id: "client-info", label: "Client Information", icon: "👤" },
              { id: "citizens-charter", label: "Citizen's Charter", icon: "📋" },
              { id: "service-quality", label: "Service Quality", icon: "⭐" },
              { id: "additional-feedback", label: "Additional Feedback", icon: "💬" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-3 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{section.icon}</span>
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Progress</h4>
            <div className="text-xs text-muted-foreground">
              {Object.values(formData).filter(v => v !== "").length} / {Object.keys(formData).length} fields completed
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-8 px-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto relative z-10">
        <Card className="shadow-2xl backdrop-blur-sm bg-card/95 border-2 border-primary/20 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
            <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-16 h-16" />
              <div>
                <CardTitle className="text-2xl font-bold">CITY GOVERNMENT OF VALENZUELA</CardTitle>
                <CardDescription className="text-primary-foreground/90">HELP US SERVE YOU BETTER!</CardDescription>
              </div>
            </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 bg-gradient-to-b from-background to-muted/20">
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground">
                This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback
                on your <strong>recently concluded transaction</strong> will help this office provide a better service. Personal information shared will
                be kept confidential and you always have the option to not answer this form.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Demographics Section */}
              <Card id="client-info" className="scroll-mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Client Type *</Label>
                    <RadioGroup value={formData.clientType} onValueChange={(value) => setFormData({...formData, clientType: value})}>
                      <div className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="citizen" id="citizen" />
                          <Label htmlFor="citizen">Citizen</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business">Business</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="government" id="government" />
                          <Label htmlFor="government">Government</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full max-w-[180px]"
                      />
                    </div>
                    <div>
                      <Label>Sex *</Label>
                      <RadioGroup value={formData.sex} onValueChange={(value) => setFormData({...formData, sex: value})}>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Age"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="region">Region of Residence</Label>
                      <Input
                        id="region"
                        placeholder="Region"
                        maxLength={100}
                        value={formData.region}
                        onChange={(e) => setFormData({...formData, region: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service Availed *</Label>
                      <Input
                        id="service"
                        placeholder="Service Availed"
                        maxLength={200}
                        value={formData.serviceAvailed}
                        onChange={(e) => setFormData({...formData, serviceAvailed: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Citizen's Charter Section */}
              <Card id="citizens-charter" className="scroll-mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Citizen's Charter (CC) Awareness</CardTitle>
                  <CardDescription className="mt-2">
                    The Citizen's Charter is an official document that describes the services provided by this office, 
                    including requirements, fees, processing times, and procedures. It serves as a guide to help you 
                    understand what to expect from our services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-semibold">CC1: Which of the following best describes your awareness of a CC? *</Label>
                    <RadioGroup value={formData.cc1} onValueChange={(value) => setFormData({...formData, cc1: value})} className="mt-2 space-y-2">
                      {[
                        { value: "1", label: "I know what a CC is and I saw this office's CC" },
                        { value: "2", label: "I know what a CC is but I did NOT see this office's CC" },
                        { value: "3", label: "I learned of the CC only when I saw this office's CC" },
                        { value: "4", label: "I do not know what a CC is and I did not see one in this office" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-start space-x-2">
                          <RadioGroupItem value={option.value} id={`cc1-${option.value}`} />
                          <Label htmlFor={`cc1-${option.value}`} className="cursor-pointer">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {formData.cc1 !== "4" && (
                    <>
                      <div>
                        <Label className="font-semibold">CC2: If aware of CC, would you say that the CC of this office was...?</Label>
                        <RadioGroup value={formData.cc2} onValueChange={(value) => setFormData({...formData, cc2: value})} className="mt-2 space-y-2">
                          {[
                            { value: "1", label: "Easy to see" },
                            { value: "2", label: "Somewhat easy to see" },
                            { value: "3", label: "Difficult to see" },
                            { value: "4", label: "Not visible at all" },
                            { value: "5", label: "Not Applicable" },
                          ].map((option) => (
                            <div key={option.value} className="flex items-start space-x-2">
                              <RadioGroupItem value={option.value} id={`cc2-${option.value}`} />
                              <Label htmlFor={`cc2-${option.value}`} className="cursor-pointer">{option.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="font-semibold">CC3: How much did the CC help you in your transaction?</Label>
                        <RadioGroup value={formData.cc3} onValueChange={(value) => setFormData({...formData, cc3: value})} className="mt-2 space-y-2">
                          {[
                            { value: "1", label: "Helped very much" },
                            { value: "2", label: "Somewhat helped" },
                            { value: "3", label: "Did not help" },
                            { value: "4", label: "Not Applicable" },
                          ].map((option) => (
                            <div key={option.value} className="flex items-start space-x-2">
                              <RadioGroupItem value={option.value} id={`cc3-${option.value}`} className="cursor-pointer" />
                              <Label htmlFor={`cc3-${option.value}`} className="cursor-pointer">{option.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Service Quality Dimensions */}
              <Card id="service-quality" className="scroll-mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Service Quality Assessment</CardTitle>
                  <CardDescription>Please rate your agreement with each statement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: "sqd0", label: "I am satisfied with the service that I availed" },
                    { key: "sqd1", label: "I spent a reasonable amount of time for my transaction" },
                    { key: "sqd2", label: "The office followed the transaction's requirements and steps based on the information provided" },
                    { key: "sqd3", label: "The steps (including payment) I needed to do for my transaction were easy and simple" },
                    { key: "sqd4", label: "I easily found information about my transaction from the office or its website" },
                    { key: "sqd5", label: "I paid a reasonable amount of fees for my transaction" },
                    { key: "sqd6", label: "I feel the office was fair to everyone, or 'walang palakasan', during my transaction" },
                    { key: "sqd7", label: "I was treated courteously by the staff, and (if asked for help) the staff was helpful" },
                    { key: "sqd8", label: "I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me" },
                  ].map((question, index) => (
                    <div key={question.key} className="space-y-3 pb-4 border-b border-border last:border-0">
                      <Label className="font-semibold">SQD{index}: {question.label} *</Label>
                      <RatingScale
                        name={question.key}
                        value={formData[question.key as keyof typeof formData] as string}
                        onChange={(value) => setFormData({...formData, [question.key]: value})}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggestions & Email */}
              <Card id="additional-feedback" className="scroll-mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Additional Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="suggestions">Suggestions on how we can further improve our services (optional)</Label>
                    <Textarea
                      id="suggestions"
                      placeholder="Your suggestions..."
                      maxLength={2000}
                      value={formData.suggestions}
                      onChange={(e) => setFormData({...formData, suggestions: e.target.value})}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.suggestions.length}/2000 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="email">Email address (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      maxLength={255}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4 pt-4">
                <Button type="button" variant="outline" size="lg" onClick={() => navigate('/')} className="lg:hidden">
                  Back to Home
                </Button>
                <Button type="submit" size="lg" className="px-12">
                  Submit Survey
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Survey;
