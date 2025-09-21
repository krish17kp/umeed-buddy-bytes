import { ArrowRight, Shield, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-16 md:py-24 lg:py-32"
    >
      {/* Decorative background – cannot intercept clicks */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient opacity-10"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-hero text-foreground leading-tight">
                Your Journey to
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}
                  Mental Wellness{" "}
                </span>
                Starts Here
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <strong>Umeed</strong> is a privacy-first, culturally-aware
                platform for Indian students and young adults. Build healthy
                habits, connect with your trusted circle, and get guidance that
                understands your journey.
              </p>
            </div>

            {/* Feature chips (simple, non-clickable) */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Privacy First</div>
                  <div className="text-xs text-muted-foreground">
                    Your data, your control
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="font-medium text-sm">Trusted Circle</div>
                  <div className="text-xs text-muted-foreground">
                    Connect safely with family
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-wellness-focus/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Helpful Guidance</div>
                  <div className="text-xs text-muted-foreground">
                    Culturally aware support
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="relative z-20 pointer-events-auto flex flex-col sm:flex-row gap-4">
              <Link to="/auth/signup" className="inline-block">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
                >
                  Create an account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link to="/auth/login" className="inline-block">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20 hover:bg-primary/5"
                >
                  Go to Login
                </Button>
              </Link>
            </div>

            {/* Optional text links (keep or remove); kept minimal + clickable */}
            <div className="relative z-20 pointer-events-auto flex flex-wrap items-center gap-4 text-sm">
              <Link
                to="/auth/login"
                className="underline underline-offset-4 hover:no-underline text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/auth/signup"
                className="underline underline-offset-4 hover:no-underline text-foreground"
              >
                Get started free
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>24/7 Crisis Support</span>
                </div>
                <div>• Privacy-protected</div>
                <div>• Made for India</div>
              </div>
            </div>
          </div>

          {/* Right column (image) */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-warm">
              <img
                src={heroImage}
                alt="Students in a serene garden setting"
                className="w-full h-auto select-none"
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating stats are decorative only */}
            <div className="pointer-events-none absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-soft border border-border/50">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">
                Students supported
              </div>
            </div>

            <div className="pointer-events-none absolute -top-6 -right-6 bg-card rounded-2xl p-4 shadow-soft border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="text-sm font-medium">Active Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
