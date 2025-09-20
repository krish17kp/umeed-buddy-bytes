import { Heart, Globe, Mail, Phone, MapPin, Shield, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "Features", href: "#features" },
      { name: "Community", href: "#community" },
      { name: "Resources", href: "#resources" },
      { name: "Pricing", href: "#pricing" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Crisis Support", href: "#crisis" },
      { name: "Contact Us", href: "#contact" },
      { name: "Status", href: "#status" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Data Protection", href: "#data" },
      { name: "Disclaimers", href: "#disclaimers" }
    ],
    resources: [
      { name: "Mental Health Resources", href: "#mh-resources" },
      { name: "Indian Helplines", href: "#helplines" },
      { name: "Student Guides", href: "#guides" },
      { name: "Family Support", href: "#family" }
    ]
  };

  const emergencyContacts = [
    { name: "KIRAN", number: "1800-599-0019", description: "National Mental Health Helpline" },
    { name: "iCALL", number: "9152-987-821", description: "Professional Counseling" }
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
                <div className="font-semibold text-sm text-foreground">Need immediate help?</div>
                <div className="text-xs text-muted-foreground">24/7 crisis support available</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {emergencyContacts.map((contact) => (
                <Button
                  key={contact.name}
                  variant="outline"
                  size="sm"
                  className="border-wellness-crisis/30 hover:bg-wellness-crisis/10"
                  asChild
                >
                  <a href={`tel:${contact.number.replace(/[-\s]/g, '')}`}>
                    <Phone className="w-3 h-3 mr-2" />
                    {contact.name}: {contact.number}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Umeed</div>
                <div className="text-sm text-muted-foreground">उम्मीद • Hope</div>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              A privacy-first, AI-powered mental wellness platform designed specifically 
              for Indian students and young adults. Your journey to better mental health 
              starts here.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Community Supported</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Switch to Hindi
              </Button>
            </div>
          </div>

          {/* Links sections */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
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

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <div>© 2024 Umeed. All rights reserved.</div>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-foreground smooth-transition"
                >
                  {link.name}
                </a>
              ))}
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