import { Phone, MessageCircle, Heart, AlertTriangle } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export function CrisisBanner() {
  const helplines = [
    {
      name: "KIRAN - National Mental Health Helpline",
      number: "1800-599-0019",
      description: "Free 24/7 support",
      language: "Hindi & English"
    },
    {
      name: "iCALL",
      number: "9152-987-821", 
      description: "Professional counseling",
      language: "Multiple languages"
    },
    {
      name: "Vandrevala Foundation",
      number: "9999-666-555",
      description: "Crisis intervention",
      language: "Hindi & English"
    }
  ];

  return (
    <Card className="bg-wellness-crisis/10 border-wellness-crisis/20 p-6 rounded-2xl shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-wellness-crisis/20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-wellness-crisis" />
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-wellness-crisis" />
              Need immediate support?
            </h3>
            <p className="text-muted-foreground text-sm">
              If you're in crisis or having thoughts of self-harm, please reach out for immediate help. 
              You are not alone, and support is available 24/7.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {helplines.map((helpline) => (
              <div key={helpline.name} className="space-y-2">
                <div className="text-sm font-medium text-foreground">
                  {helpline.name}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3 border-wellness-crisis/30 hover:bg-wellness-crisis/10"
                  asChild
                >
                  <a href={`tel:${helpline.number.replace(/[-\s]/g, '')}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    <div>
                      <div className="font-mono font-semibold">{helpline.number}</div>
                      <div className="text-xs opacity-75">{helpline.description}</div>
                    </div>
                  </a>
                </Button>
                <div className="text-xs text-muted-foreground">
                  {helpline.language}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Support
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Find Local Support
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}