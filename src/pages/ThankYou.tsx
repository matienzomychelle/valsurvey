import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-24 h-24" />
          </div>
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-rating-5" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your feedback has been successfully submitted
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">City Government of Valenzuela</h3>
            <p className="text-muted-foreground">
              Your valuable feedback helps us improve our services and serve you better. 
              We appreciate the time you took to complete this survey.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your responses are confidential and will be used solely for improving our services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={() => navigate('/')} variant="default" size="lg">
              Return to Home
            </Button>
            <Button onClick={() => navigate('/survey')} variant="outline" size="lg">
              Submit Another Response
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
