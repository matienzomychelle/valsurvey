import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import valenzuelaSeal from "@/assets/valenzuela-seal.png";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            ← Back
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-2xl border-2 border-primary/20 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <img src={valenzuelaSeal} alt="City of Valenzuela Seal" className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
              <p className="text-muted-foreground">City Government of Valenzuela ARTA CSS System — Effective Date: January 2025</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to the City Government of Valenzuela's ARTA-Compliant Customer Satisfaction Survey (CSS) System. By accessing or using this platform, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this system. These terms apply to all users, including citizens, businesses, government entities, and administrative personnel.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">2. Purpose of the System</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">This system is designed to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Collect citizen feedback on government services in compliance with the Anti-Red Tape Authority (ARTA) regulations</li>
                <li>Measure customer satisfaction levels for public service delivery</li>
                <li>Identify areas for improvement in government operations</li>
                <li>Promote transparency and accountability in local governance</li>
                <li>Facilitate data-driven decision-making for service enhancement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">3. Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">To use this system, you must:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Have recently availed of a service from the City Government of Valenzuela</li>
                <li>Provide accurate and truthful information in your survey responses</li>
                <li>Have the legal capacity to enter into this agreement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">4. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">As a user of this system, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Provide Accurate Information:</strong> Ensure all information submitted is true, accurate, and complete</li>
                <li><strong>Submit Feedback in Good Faith:</strong> Provide honest and constructive feedback based on your actual experience</li>
                <li><strong>Respect the System:</strong> Do not misuse, attempt to hack, or disrupt the operation of this platform</li>
                <li><strong>Maintain Confidentiality:</strong> If provided with a Reference ID, keep it secure and do not share it with unauthorized parties</li>
                <li><strong>Comply with Laws:</strong> Use the system in compliance with all applicable local, national, and international laws</li>
                <li><strong>Submit Once Per Transaction:</strong> Only submit one survey per service transaction to ensure data integrity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">5. Prohibited Activities</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">The following activities are strictly prohibited:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Submitting false, misleading, or fraudulent information</li>
                <li>Using automated systems, bots, or scripts to submit multiple surveys</li>
                <li>Attempting to manipulate, alter, or tamper with survey results</li>
                <li>Reverse engineering, decompiling, or disassembling the system</li>
                <li>Introducing malware, viruses, or harmful code</li>
                <li>Impersonating another person or entity</li>
                <li>Harassing, defaming, or threatening government personnel through survey comments</li>
                <li>Using the system for commercial solicitation or advertising</li>
                <li>Attempting to gain unauthorized access to administrative functions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <strong>Note:</strong> Violation of these terms may result in the rejection of your survey, legal action, and/or reporting to appropriate authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">6. Data Collection and Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                By using this system, you acknowledge and agree to the collection, processing, and use of your personal information as described in our Privacy Policy. All data is handled in strict compliance with the Data Privacy Act of 2012 (Republic Act No. 10173). We are committed to protecting your privacy and maintaining the confidentiality of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">7. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, design, graphics, logos, and software associated with this system are the property of the City Government of Valenzuela or its licensors and are protected by Philippine and international copyright, trademark, and intellectual property laws. You may not copy, reproduce, distribute, modify, or create derivative works without express written permission from the City Government of Valenzuela.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">8. System Availability and Modifications</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">The City Government of Valenzuela reserves the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify, suspend, or discontinue any aspect of the system at any time without prior notice</li>
                <li>Update survey questions or system features to comply with new regulations</li>
                <li>Perform routine maintenance that may temporarily affect system availability</li>
                <li>Change these Terms of Use at any time, with changes effective upon posting</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                While we strive for 24/7 availability, we do not guarantee uninterrupted access and are not liable for any downtime or technical issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">This system is provided on an "as is" and "as available" basis. The City Government of Valenzuela makes no warranties, express or implied, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the system will be error-free or uninterrupted</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of information</li>
                <li>Warranties that defects will be corrected</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, the City Government of Valenzuela, its officials, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this system, including but not limited to data loss, service interruption, or unauthorized access to your information. Your sole remedy for dissatisfaction with the system is to stop using it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless the City Government of Valenzuela and its officials, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your violation of these Terms of Use, your misuse of the system, or your violation of any laws or rights of third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">12. Governing Law and Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising from or relating to these terms or your use of the system shall be subject to the exclusive jurisdiction of the courts of Valenzuela City, Metro Manila, Philippines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">13. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms of Use is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely reflects the original intent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">14. Entire Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Use, together with the Privacy Policy, constitute the entire agreement between you and the City Government of Valenzuela regarding your use of this system and supersede all prior agreements, understandings, and communications, whether written or oral.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">15. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">For questions, concerns, or feedback regarding these Terms of Use, please contact:</p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-1">
                <p className="font-semibold text-foreground">Information and Communications Technology Office (ICTO)</p>
                <p className="text-muted-foreground">City Government of Valenzuela</p>
                <p className="text-muted-foreground">Valenzuela City Hall, MacArthur Highway, Malinta, Valenzuela City</p>
                <p className="text-muted-foreground mt-2">Email: icto@valenzuela.gov.ph</p>
                <p className="text-muted-foreground">Phone: (02) 8292-1405 local 1234</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">16. Acknowledgment</h2>
              <p className="text-muted-foreground leading-relaxed">
                By clicking "Submit" on the survey form or accessing this system, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and the Privacy Policy. If you do not agree, you must not use this system.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
