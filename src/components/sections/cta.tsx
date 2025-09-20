import { ArrowRight, Users, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <Card className="relative overflow-hidden p-8 md:p-12 lg:p-16 bg-hero-gradient shadow-warm">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          
          <div className="relative text-center space-y-8 max-w-4xl mx-auto">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to Start Your 
                <br />
                Wellness Journey?
              </h2>
              
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join hundreds of Indian students who have already taken the first step 
                towards better mental health with Umeed's supportive, privacy-first platform.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Students Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/80 text-sm">Crisis Support</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Feel Better</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-soft"
              >
                <Users className="w-5 h-5 mr-2" />
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>

            {/* Trust message */}
            <div className="pt-6 text-sm text-white/75">
              Free to start • No credit card required • Your privacy protected
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}