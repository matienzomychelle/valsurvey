import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";
import { Frown, Meh, Smile } from "lucide-react";

const Survey = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['clientType', 'sex', 'serviceAvailed', 'cc1', 'sqd0', 'sqd1', 'sqd2', 'sqd3', 'sqd4', 'sqd5', 'sqd6', 'sqd7', 'sqd8'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Please complete all required fields",
        description: "Some questions are still unanswered.",
        variant: "destructive",
      });
      return;
    }

    // Store data in localStorage (in production, this would go to a database)
    const existingData = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    existingData.push({ ...formData, submittedAt: new Date().toISOString() });
    localStorage.setItem('surveyResponses', JSON.stringify(existingData));

    toast({
      title: "Survey submitted successfully!",
      description: "Thank you for your valuable feedback.",
    });

    navigate('/thank-you');
  };

  const RatingScale = ({ name, value, onChange }: { name: string; value: string; onChange: (value: string) => void }) => (
    <RadioGroup value={value} onValueChange={onChange} className="flex flex-wrap gap-2 justify-start">
      {[
        { value: "1", label: "Strongly Disagree", color: "rating-1", icon: Frown },
        { value: "2", label: "Disagree", color: "rating-2", icon: Frown },
        { value: "3", label: "Neither Agree nor Disagree", color: "rating-3", icon: Meh },
        { value: "4", label: "Agree", color: "rating-4", icon: Smile },
        { value: "5", label: "Strongly Agree", color: "rating-5", icon: Smile },
        { value: "na", label: "N/A", color: "muted", icon: Meh },
      ].map((option) => {
        const Icon = option.icon;
        return (
          <div key={option.value} className="flex flex-col items-center gap-1">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className={`w-12 h-12 border-2 ${value === option.value ? `bg-${option.color} border-${option.color}` : 'border-border'}`}
            />
            <Label htmlFor={`${name}-${option.value}`} className="text-xs text-center max-w-[80px] cursor-pointer">
              <Icon className={`w-6 h-6 mx-auto mb-1 ${value === option.value ? `text-${option.color}` : 'text-muted-foreground'}`} />
              {option.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-16 h-16" />
              <div>
                <CardTitle className="text-2xl font-bold">CITY GOVERNMENT OF VALENZUELA</CardTitle>
                <CardDescription className="text-primary-foreground/90">HELP US SERVE YOU BETTER!</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground">
                This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback
                on your <strong>recently concluded transaction</strong> will help this office provide a better service. Personal information shared will
                be kept confidential and you always have the option to not answer this form.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Demographics Section */}
              <Card>
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
                        value={formData.region}
                        onChange={(e) => setFormData({...formData, region: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service Availed *</Label>
                      <Input
                        id="service"
                        placeholder="Service Availed"
                        value={formData.serviceAvailed}
                        onChange={(e) => setFormData({...formData, serviceAvailed: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Citizen's Charter Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Citizen's Charter (CC) Awareness</CardTitle>
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
                              <RadioGroupItem value={option.value} id={`cc3-${option.value}`} />
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
              <Card>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="suggestions">Suggestions on how we can further improve our services (optional)</Label>
                    <Textarea
                      id="suggestions"
                      placeholder="Your suggestions..."
                      value={formData.suggestions}
                      onChange={(e) => setFormData({...formData, suggestions: e.target.value})}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email address (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center pt-4">
                <Button type="submit" size="lg" className="px-12">
                  Submit Survey
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
