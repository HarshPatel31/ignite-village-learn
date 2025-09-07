import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LoginModal } from "@/components/auth/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Brain, 
  Trophy, 
  Video, 
  FileText, 
  Gamepad2,
  Globe,
  Wifi,
  Monitor
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import { STEMGames } from "@/components/features/STEMGames";
import { AITutor } from "@/components/features/AITutor";
import { LearningVideos } from "@/components/features/LearningVideos";
import { PeerLearning } from "@/components/features/PeerLearning";
import { TopperNotes } from "@/components/features/TopperNotes";
import { Achievements } from "@/components/features/Achievements";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const features = [
    {
      icon: Gamepad2,
      title: "Interactive STEM Games",
      description: "Engaging mini-games that make learning math, science, and technology fun",
      color: "text-primary",
      action: () => setCurrentView("games")
    },
    {
      icon: Video,
      title: "Animated Learning Videos",
      description: "High-quality educational content with multilingual support",
      color: "text-secondary",
      action: () => setCurrentView("videos")
    },
    {
      icon: Brain,
      title: "AI Learning Assistant",
      description: "24/7 AI tutor to help students with doubts and explanations",
      color: "text-accent",
      action: () => setCurrentView("ai-tutor")
    },
    {
      icon: Users,
      title: "Peer Learning Network",
      description: "Students helping students with collaborative problem-solving",
      color: "text-primary",
      action: () => setCurrentView("peer-learning")
    },
    {
      icon: FileText,
      title: "Topper Notes Library",
      description: "Access to high-quality study materials from top performers",
      color: "text-secondary",
      action: () => setCurrentView("notes")
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Gamified progress tracking with rewards and badges",
      color: "text-accent",
      action: () => setCurrentView("achievements")
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Content available in local languages for better understanding"
    },
    {
      icon: Wifi,
      title: "Offline Access",
      description: "Download content for learning without internet connectivity"
    },
    {
      icon: Monitor,
      title: "Low-Device Optimization",
      description: "Designed to work smoothly on budget smartphones and tablets"
    }
  ];

  // Render different views based on current selection
  if (currentView === "games") return <STEMGames />;
  if (currentView === "ai-tutor") return <AITutor />;
  if (currentView === "videos") return <LearningVideos />;
  if (currentView === "peer-learning") return <PeerLearning />;
  if (currentView === "notes") return <TopperNotes />;
  if (currentView === "achievements") return <Achievements />;

  return (
    <div className="min-h-screen bg-background">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-float">
                Learn. Play. Grow.
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                A gamified learning platform designed for rural students to excel in STEM subjects 
                through interactive games, AI tutoring, and peer collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="accent" 
                  size="xl" 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="animate-bounce-gentle"
                >
                  Start Learning Now
                </Button>
                <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students learning with technology" 
                className="rounded-2xl shadow-glow animate-float"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-glow animate-pulse-soft">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="games" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines the best of gaming, AI, and community learning 
              to create an engaging educational experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={feature.action}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" className="w-full">
                    Explore Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Rural Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specifically designed to overcome the challenges of limited connectivity 
              and device constraints in rural areas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already improving their STEM skills 
            through our innovative platform.
          </p>
          <Button 
            variant="accent" 
            size="xl" 
            onClick={() => setIsLoginModalOpen(true)}
            className="animate-bounce-gentle"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EduQuest
            </span>
          </div>
          <p className="text-muted-foreground">
            Empowering rural students through gamified STEM education
          </p>
        </div>
      </footer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
