import { ArrowLeft, BookOpen, Phone, Video, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CrisisBanner } from "@/components/ui/crisis-banner";

export default function Resources() {
  const resourceCategories = [
    {
      title: "Emergency Support",
      icon: Phone,
      color: "wellness-crisis",
      resources: [
        { name: "KIRAN National Helpline", contact: "1800-599-0019", description: "24/7 mental health support" },
        { name: "iCALL", contact: "9152-987-821", description: "Professional counseling" },
        { name: "Vandrevala Foundation", contact: "9999-666-555", description: "Crisis intervention" }
      ]
    },
    {
      title: "Student Guides",
      icon: BookOpen,
      color: "primary",
      resources: [
        { name: "Exam Stress Management", description: "Coping strategies for academic pressure" },
        { name: "First Year Transition", description: "Adapting to college life" },
        { name: "Career Anxiety Guide", description: "Managing placement pressure" }
      ]
    },
    {
      title: "Video Resources",
      icon: Video,
      color: "accent",
      resources: [
        { name: "5-Minute Meditation", description: "Quick mindfulness practices" },
        { name: "Breathing Exercises", description: "Anxiety relief techniques" },
        { name: "Sleep Hygiene", description: "Better sleep habits" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-calm-gradient">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container flex items-center gap-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mental Health Resources</h1>
            <p className="text-muted-foreground">Curated support materials for Indian students</p>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Crisis banner */}
        <CrisisBanner />

        {/* Resources grid */}
        {resourceCategories.map((category) => (
          <Card key={category.title} className="p-6 card-gradient shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 bg-${category.color}/10 rounded-xl flex items-center justify-center`}>
                <category.icon className={`w-5 h-5 text-${category.color}`} />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
              <Badge variant="secondary">{category.resources.length} resources</Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.resources.map((resource) => (
                <Card key={resource.name} className="p-4 bg-background/50 hover:bg-background/80 smooth-transition">
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    {resource.contact && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={`tel:${resource.contact.replace(/[-\s]/g, '')}`}>
                          <Phone className="w-3 h-3 mr-2" />
                          Call {resource.contact}
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ))}

        {/* Additional resources */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="text-center space-y-4">
            <Users className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-foreground">Need More Support?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with our community or reach out to professional counselors who understand 
              the unique challenges faced by Indian students.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Join Community</Button>
              <Button variant="outline">Find Counselor</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}