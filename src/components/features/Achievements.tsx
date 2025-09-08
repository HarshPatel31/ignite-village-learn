import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Calendar, Award, Gift, Clock, ArrowLeft } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  type: 'streak' | 'study' | 'community' | 'special';
}

interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
  available: boolean;
  icon: any;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Study Streak Master",
    description: "Complete 30 consecutive days of study",
    icon: Flame,
    progress: 15,
    maxProgress: 30,
    unlocked: false,
    type: 'streak'
  },
  {
    id: 2,
    title: "STEM Explorer",
    description: "Complete 10 different STEM games",
    icon: Trophy,
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    type: 'study'
  },
  {
    id: 3,
    title: "Helper",
    description: "Answer 5 peer questions",
    icon: Award,
    progress: 5,
    maxProgress: 5,
    unlocked: true,
    type: 'community'
  }
];

const rewards: Reward[] = [
  {
    id: 1,
    title: "Premium Access",
    description: "1 month of premium features",
    cost: 30,
    available: true,
    icon: Gift
  },
  {
    id: 2,
    title: "Study Badge",
    description: "Special profile badge",
    cost: 15,
    available: true,
    icon: Award
  }
];

export const Achievements = ({ onBack }: { onBack?: () => void }) => {
  const navigate = useNavigate();
  const [studyTime, setStudyTime] = useState(0); // minutes studied today
  const [streak, setStreak] = useState(15); // current streak
  const [streakPoints, setStreakPoints] = useState(45); // 3 points per day * 15 days
  const [isStudying, setIsStudying] = useState(false);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudying && sessionStart) {
      interval = setInterval(() => {
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - sessionStart.getTime()) / (1000 * 60));
        setStudyTime(prev => prev + 1);
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [isStudying, sessionStart]);

  const startStudySession = () => {
    setIsStudying(true);
    setSessionStart(new Date());
  };

  const endStudySession = () => {
    if (sessionStart) {
      const now = new Date();
      const sessionMinutes = Math.floor((now.getTime() - sessionStart.getTime()) / (1000 * 60));
      
      // Award attendance if studied for at least 60 minutes
      if (studyTime + sessionMinutes >= 60) {
        setStreak(prev => prev + 1);
        setStreakPoints(prev => prev + 3); // 3 points per day
      }
    }
    setIsStudying(false);
    setSessionStart(null);
  };

  const claimReward = (rewardId: number, cost: number) => {
    if (streakPoints >= cost) {
      setStreakPoints(prev => prev - cost);
      alert(`Reward claimed! You now have ${streakPoints - cost} streak points remaining.`);
    } else {
      alert("Not enough streak points!");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onBack || (() => navigate('/'))}
            className="mb-4 hover-scale"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-accent" />
            Achievement System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your progress and earn rewards for consistent learning
          </p>
        </div>

        {/* Study Tracker */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{streak} Days</div>
              <p className="text-white/80">Current streak</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Study
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{studyTime} Min</div>
              <p className="text-white/80">Goal: 60 minutes</p>
              <Progress value={(studyTime / 60) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Streak Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{streakPoints}</div>
              <p className="text-white/80">Available to spend</p>
            </CardContent>
          </Card>
        </div>

        {/* Study Session Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Study Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {!isStudying ? (
                <Button onClick={startStudySession} variant="accent" size="lg">
                  <Clock className="w-5 h-5 mr-2" />
                  Start Study Session
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                    <span>Studying...</span>
                  </div>
                  <Button onClick={endStudySession} variant="outline">
                    End Session
                  </Button>
                </div>
              )}
              <p className="text-muted-foreground">
                Study for 1 hour to maintain your streak!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.unlocked ? 'bg-green-50 border-green-200' : ''}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                        {achievement.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rewards Store */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Rewards Store</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <reward.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{reward.title}</CardTitle>
                      <Badge variant="outline">{reward.cost} points</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{reward.description}</p>
                  <Button 
                    onClick={() => claimReward(reward.id, reward.cost)}
                    disabled={streakPoints < reward.cost || !reward.available}
                    variant="accent"
                    className="w-full"
                  >
                    {streakPoints >= reward.cost ? 'Claim Reward' : 'Not Enough Points'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};