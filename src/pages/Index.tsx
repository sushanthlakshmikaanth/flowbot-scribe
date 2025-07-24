import { ChatBot } from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Phone, Globe, Users, Trophy, Dumbbell } from 'lucide-react';
import heroImage from '@/assets/flowternity-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="mb-8 relative overflow-hidden rounded-2xl shadow-elegant">
          <img 
            src={heroImage} 
            alt="FlowTernity Sports Facility" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">FlowTernity Sports</h1>
              <p className="text-xl md:text-2xl">Your Premier Multi-Sport Destination</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Facility Info */}
          <div className="space-y-6">
            {/* Main Title Card */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-elegant border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    🏀 FlowTernity Sports
                  </h1>
                  <p className="text-lg text-muted-foreground">Multi-Sport Facility in Horamavu, Bengaluru</p>
                </div>
                <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                  ⭐ 5.0 Rating
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Kalkere, Horamavu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>6 AM - 11 PM Daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+91 98866 96155</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>flowternity.com</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground italic">
                  "Where Skills Meet Strength, and Passion Fuels Progress"
                </p>
              </div>
            </Card>

            {/* Sports Available */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-elegant">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Sports Available
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Badge variant="accent">🏀 Basketball</Badge>
                <Badge variant="accent">🏓 Pickleball</Badge>
                <Badge variant="accent">🛼 Skating</Badge>
                <Badge variant="accent">🥋 Karate</Badge>
              </div>
            </Card>

            {/* Amenities */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-elegant">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                Premium Amenities
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Changing Room</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Shower</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Cafe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Workout Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Ice Bath</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-elegant">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Get Started
              </h2>
              <div className="grid gap-3">
                <Button variant="sport" className="justify-start">
                  📅 Book on Playo
                </Button>
                <Button variant="secondary" className="justify-start">
                  📞 Call Directly
                </Button>
                <Button variant="accent" className="justify-start">
                  🌐 Visit Website
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Chatbot */}
          <div className="lg:sticky lg:top-8">
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
