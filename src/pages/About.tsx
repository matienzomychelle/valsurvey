import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-6 px-6 rounded-t-lg shadow-lg flex items-center gap-4 animate-slide-in-right">
          <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-16 h-16" />
          <div>
            <h1 className="text-2xl font-bold">City Government of Valenzuela</h1>
            <p className="text-sm opacity-90">Tuloy-PROGRESO, Valenzuela!</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card shadow-2xl rounded-b-lg p-8 md:p-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">About Survey</h2>

          <div className="space-y-6 text-foreground/90">
            <p className="text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              The <span className="font-semibold text-foreground">ValSurvey+</span> aims to evaluate and understand the 
              overall experience of clients who have recently transacted with government offices. Through this 
              feedback mechanism, the government seeks to gather valuable insights directly from citizens to 
              assess the quality, efficiency, and responsiveness of public service delivery. The information 
              collected will be used to identify strengths, address areas for improvement, and ensure that 
              services are aligned with the needs and expectations of the public.
            </p>

            <p className="text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Your participation in this survey is highly appreciated as it plays a crucial role in enhancing the 
              performance and accountability of government agencies. Rest assured that any personal 
              information you provide will remain strictly confidential and used only for research and 
              improvement purposes. Completing this form is voluntary, and you may choose to skip any 
              question or not answer the form entirely. Your honest feedback will contribute to creating a more 
              transparent, efficient, and citizen-centered public service.
            </p>
          </div>

          {/* Return Home Button */}
          <div className="flex justify-end mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <Button 
              size="lg" 
              variant="default" 
              onClick={() => navigate('/')}
              className="px-12 transition-transform hover:scale-105"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
