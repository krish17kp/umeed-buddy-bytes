import { Shield, AlertCircle, Heart } from "lucide-react";
import { Card } from "./card";

export function MentalHealthDisclaimer() {
  return (
    <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50 p-6 rounded-2xl shadow-gentle">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-foreground">Important Notice</h3>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Umeed is a self-help and educational platform designed to support mental wellness.</strong> 
              This platform is NOT a medical device and does not provide medical diagnosis or treatment.
            </p>
            
            <p>
              Our AI-powered tools offer guidance, resources, and coping strategies based on established 
              wellness practices, but they do not replace professional medical or psychological care.
            </p>
            
            <div className="flex items-center gap-2 pt-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-medium">
                If you're experiencing a mental health emergency, please contact emergency services 
                or the crisis helplines above immediately.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}