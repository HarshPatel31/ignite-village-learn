import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Play, Star } from "lucide-react";

const games = [
  {
    id: 1,
    title: "Math Quest",
    subject: "Mathematics",
    level: "Grade 6-8",
    description: "Solve puzzles and equations in this adventure game",
    rating: 4.8,
    plays: 1250
  },
  {
    id: 2,
    title: "Chemistry Lab",
    subject: "Chemistry",
    level: "Grade 9-12",
    description: "Mix compounds and learn reactions safely",
    rating: 4.9,
    plays: 890
  },
  {
    id: 3,
    title: "Physics Simulator",
    subject: "Physics",
    level: "Grade 10-12",
    description: "Experiment with forces and motion",
    rating: 4.7,
    plays: 750
  }
];

export const STEMGames = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const playGame = (gameId: number) => {
    setSelectedGame(gameId);
    // Game logic would be implemented here
    alert(`Starting ${games.find(g => g.id === gameId)?.title}...`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Gamepad2 className="w-10 h-10 text-primary" />
            Interactive STEM Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn through play with our collection of educational games
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="group hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{game.subject} • {game.level}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{game.plays} plays</span>
                  <Button 
                    variant="game" 
                    size="sm" 
                    onClick={() => playGame(game.id)}
                    className="group-hover:scale-105"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};