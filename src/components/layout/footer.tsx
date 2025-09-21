import { Link } from "react-router-dom";
import {
  Heart,
  Globe,
  Phone,
  MapPin,
  Shield,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function FooterImpl() {
  const footerLinks = {
    platform: [
      { name: "Insights", to: "/insights" },
      { name: "Tracking", to: "/tracking" },
      { name: "Community", to: "/community" },
      { name: "Resources", to: "/resources" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Crisis Support", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Status", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", to: "/privacy" },
      { name: "Terms of Service", href: "#" },
      { name: "Data Protection", href: "#" },
      { name: "Disclaimers", href: "#" },
    ],
    resources: [
      { name: "Mental Health Resources", href: "#" },
      { name: "Indian Helplines", href: "#" },
      { name: "Student Guides", href: "#" },
      { name: "Family Support", href: "#" },
    ],
  };

  const emergency = [
    {
      name: "KIRAN",
      number: "1800-599-0019",
      description: "National Mental Health Helpline",
    },
    {
      name: "iCALL",
      number: "9152-987-821",
      description: "Professional Counseling",
    },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      {/* Emergency banner */}
      <div className="bg-wellness-crisis/10 border-b border-wellness-crisis/20 py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-wellness-crisis/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-wellness-crisis" />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">
                  Need immediate help?
                </div>
                <div className="text-xs text-muted-foreground">
                  24/7 crisis support available
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {emergency.map((c) => (
                <Button
                  key={c.name}
                  variant="outline"
                  size="sm"
                  className="border-wellness-crisis/30 hover:bg-wellness-crisis/10"
                  asChild
                >
                  <a
                    href={`tel:${c.number.replace(/[-\s]/g, "")}`}
                    aria-label={`${c.name} helpline`}
                  >
                    <Phone className="w-3 h-3 mr-2" />
                    {c.name}: {c.number}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Umeed</div>
                <div className="text-sm text-muted-foreground">
                  उम्मीद • Hope
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              A privacy-first, AI-powered mental wellness platform designed for
              Indian students and young adults. Your journey to better mental
              health starts here.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Privacy Protected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Community Supported
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Switch to Hindi
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} Umeed. All rights reserved.</div>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) =>
                link.to ? (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="hover:text-foreground smooth-transition"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-foreground smooth-transition"
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Made in India</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>For Students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterImpl;
export const Footer = FooterImpl;
