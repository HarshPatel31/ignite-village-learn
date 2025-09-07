import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Clock, Eye } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: "15:30",
    views: 1250,
    level: "Grade 8",
    thumbnail: "/placeholder.svg",
    description: "Learn the basics of algebraic expressions and equations"
  },
  {
    id: 2,
    title: "Photosynthesis Explained",
    subject: "Biology",
    duration: "12:45",
    views: 890,
    level: "Grade 9",
    thumbnail: "/placeholder.svg",
    description: "Understand how plants convert sunlight into energy"
  },
  {
    id: 3,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    duration: "18:20",
    views: 750,
    level: "Grade 10",
    thumbnail: "/placeholder.svg",
    description: "Explore the fundamental laws that govern motion"
  }
];

const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology"];

export const LearningVideos = () => {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredVideos = selectedSubject === "All" 
    ? videos 
    : videos.filter(video => video.subject === selectedSubject);

  const playVideo = (videoId: number) => {
    setSelectedVideo(videoId);
    // Video player logic would be implemented here
    alert(`Playing ${videos.find(v => v.id === videoId)?.title}...`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Video className="w-10 h-10 text-secondary" />
            Animated Learning Videos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            High-quality educational content with visual explanations
          </p>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              onClick={() => setSelectedSubject(subject)}
              size="sm"
            >
              {subject}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-medium transition-all duration-300">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="accent" 
                    size="lg"
                    onClick={() => playVideo(video.id)}
                    className="transform scale-90 group-hover:scale-100 transition-transform"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Play Video
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  {video.duration}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{video.subject}</Badge>
                  <Badge variant="outline">{video.level}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {video.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {video.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};