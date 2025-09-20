import { ArrowRight, Sparkles, Shield, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <Badge
              variant="secondary" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-gentle"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Mental Wellness
              <span className="text-xs opacity-75">• उम्मीद</span>
            </Badge>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-hero text-foreground leading-tight">
                Your Journey to 
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> 
                  {" "}Mental Wellness{" "}
                </span>
                Starts Here
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <strong>Umeed</strong> is a privacy-first, culturally-aware platform designed specifically 
                for Indian students and young adults. Get personalized support, connect with your trusted 
                circle, and build healthy habits with AI-powered guidance that understands your journey.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Privacy First</div>
                  <div className="text-xs text-muted-foreground">Your data, your control</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="font-medium text-sm">Trusted Circle</div>
                  <div className="text-xs text-muted-foreground">Connect safely with family</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-wellness-focus/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">AI Guidance</div>
                  <div className="text-xs text-muted-foreground">Culturally-aware support</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm animate-gentle-bounce"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>24/7 Crisis Support</span>
                </div>
                <div>• HIPAA Compliant</div>
                <div>• Made for India</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-3xl overflow-hidden shadow-warm">
              <img
                src={heroImage}
                alt="Peaceful scene of diverse Indian students in a serene garden setting representing hope and mental wellness"
                className="w-full h-auto"
              />
              
              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            </div>

            {/* Floating wellness stats */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-soft border border-border/50 animate-gentle-bounce [animation-delay:0.2s]">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Students supported</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl p-4 shadow-soft border border-border/50 animate-gentle-bounce [animation-delay:0.4s]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="text-sm font-medium">Active Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}