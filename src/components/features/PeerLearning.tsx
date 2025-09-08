import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, MessageCircle, ThumbsUp, Video, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  title: string;
  subject: string;
  description: string;
  author: string;
  answers: number;
  likes: number;
  hasVideo: boolean;
  timestamp: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "How to solve quadratic equations?",
    subject: "Mathematics",
    description: "I'm struggling with understanding the quadratic formula. Can someone explain it step by step?",
    author: "Student A",
    answers: 3,
    likes: 5,
    hasVideo: true,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "What is photosynthesis?",
    subject: "Biology",
    description: "Need help understanding the process of photosynthesis and its importance.",
    author: "Student B",
    answers: 2,
    likes: 8,
    hasVideo: false,
    timestamp: "5 hours ago"
  }
];

export const PeerLearning = () => {
  const navigate = useNavigate();
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    subject: "",
    description: ""
  });

  const submitQuestion = () => {
    // Question submission logic would be implemented here
    alert("Question submitted successfully!");
    setShowNewQuestion(false);
    setNewQuestion({ title: "", subject: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4 hover-scale"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Users className="w-10 h-10 text-primary" />
            Peer Learning Network
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help each other learn through collaborative problem-solving
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Questions</h2>
          <Button 
            onClick={() => setShowNewQuestion(!showNewQuestion)}
            variant="accent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
        </div>

        {showNewQuestion && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ask a New Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Question title..."
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
              <select
                value={newQuestion.subject}
                onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select subject...</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
              <Textarea
                placeholder="Describe your question in detail..."
                value={newQuestion.description}
                onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
              />
              <div className="flex gap-2">
                <Button onClick={submitQuestion} variant="accent">Submit</Button>
                <Button 
                  onClick={() => setShowNewQuestion(false)} 
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{question.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{question.subject}</Badge>
                      {question.hasVideo && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video Answer
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{question.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {question.author}</span>
                    <span>{question.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{question.answers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{question.likes}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Answer
                    </Button>
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