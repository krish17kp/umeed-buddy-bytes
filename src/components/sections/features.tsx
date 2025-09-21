import {
  Brain,
  Heart,
  Users,
  Shield,
  BookOpen,
  MessageCircle,
  Target,
  Zap,
  Gamepad2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type Feature = {
  icon: any;
  title: string;
  description: string;
  badge: string;
  color: string; // tailwind color token you already use
  to: string; // NEW: route path
};

export function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Get personalized wellness recommendations based on your mood patterns, sleep, and activities. Our AI understands cultural context and provides culturally-sensitive guidance.",
      badge: "Smart",
      color: "wellness-focus",
      to: "/insights",
    },
    {
      icon: Heart,
      title: "Mood & Wellness Tracking",
      description:
        "Simple daily check-ins to track your emotional wellbeing. Visualize patterns and celebrate progress with beautiful, encouraging charts.",
      badge: "Daily",
      color: "destructive",
      to: "/tracking",
    },
    {
      icon: Users,
      title: "Trusted Circle",
      description:
        "Safely connect with mentors, faculty, and family. Control exactly what gets shared and when, building a supportive network around you.",
      badge: "Safe",
      color: "primary",
      to: "/circle",
    },
    {
      icon: Shield,
      title: "Privacy by Design",
      description:
        "Your data stays yours. End-to-end encryption, granular privacy controls, and transparent consent management put you in complete control.",
      badge: "Secure",
      color: "accent",
      to: "/privacy",
    },
    {
      icon: BookOpen,
      title: "Cultural Resources",
      description:
        "Access to mental health resources specifically curated for Indian students, including bilingual content and culturally-relevant coping strategies.",
      badge: "Local",
      color: "wellness-energy",
      to: "/resources",
    },
    {
      icon: MessageCircle,
      title: "Peer Community",
      description:
        "Connect with other students in a safe, moderated environment. Share experiences, support each other, and know you're not alone in your journey.",
      badge: "Together",
      color: "wellness-calm",
      to: "/community",
    },
    {
      icon: Target,
      title: "Wellness Goals",
      description:
        "Set personalized wellness goals around sleep, study habits, mindfulness, and more. Track progress and celebrate achievements along the way.",
      badge: "Growth",
      color: "primary",
      to: "/goals",
    },
    {
      icon: Zap,
      title: "Quick Reset Tools",
      description:
        "Access 2-minute breathing exercises, grounding techniques, and mindfulness practices whenever you need a moment to reset and recharge.",
      badge: "Instant",
      color: "wellness-energy",
      to: "/resets",
    },
    {
      icon: Gamepad2,
      title: "Wellness Quests",
      description:
        "Gamified mental health activities inspired by research. Complete missions, earn badges, and make wellness engaging and rewarding.",
      badge: "Fun",
      color: "accent",
      to: "/quests",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Features
          </Badge>

          <h2 className="text-section text-foreground">
            Everything You Need for
            <span className="text-primary"> Mental Wellness</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Umeed combines AI-powered insights with human connection, creating a
            comprehensive platform designed specifically for the mental wellness
            needs of Indian students.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.to}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl"
            >
              <Card
                className="p-6 h-full card-gradient border-border/50 hover:shadow-warm smooth-transition animate-fade-in group-hover:translate-y-[-2px] group-active:translate-y-[0px]"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="link"
                aria-label={`${feature.title} — ${feature.description}`}
              >
                <div className="space-y-4">
                  {/* Icon and badge */}
                  <div className="flex items-start justify-between">
                    {/* NOTE: to avoid Tailwind purge on dynamic classes, also safelist these tokens in tailwind.config.ts */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center`}
                    >
                      <feature.icon
                        className={`w-6 h-6 text-${feature.color}`}
                      />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary smooth-transition">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="text-sm text-primary/80 pt-1">Open →</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 pt-16 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-foreground">95%</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Report feeling better
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-accent-foreground" />
                <div className="text-2xl font-bold text-foreground">24/7</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Crisis support
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-foreground">100%</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Privacy protected
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <div className="text-2xl font-bold text-foreground">500+</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Students helped
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
