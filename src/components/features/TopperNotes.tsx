import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Eye, Plus } from "lucide-react";

interface Note {
  id: number;
  title: string;
  subject: string;
  topic: string;
  author: string;
  grade: string;
  downloads: number;
  rating: number;
  size: string;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Calculus Fundamentals",
    subject: "Mathematics",
    topic: "Differentiation",
    author: "Top Student A",
    grade: "Grade 12",
    downloads: 340,
    rating: 4.9,
    size: "2.1 MB"
  },
  {
    id: 2,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    topic: "Chemical Reactions",
    author: "Top Student B",
    grade: "Grade 11",
    downloads: 256,
    rating: 4.8,
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Electromagnetic Waves",
    subject: "Physics",
    topic: "Waves and Optics",
    author: "Top Student C",
    grade: "Grade 12",
    downloads: 189,
    rating: 4.7,
    size: "3.2 MB"
  }
];

export const TopperNotes = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All");

  const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology"];

  const filteredNotes = selectedSubject === "All" 
    ? notes 
    : notes.filter(note => note.subject === selectedSubject);

  const downloadNote = (noteId: number) => {
    const note = notes.find(n => n.id === noteId);
    alert(`Downloading ${note?.title}...`);
  };

  const uploadNote = () => {
    alert("Note upload functionality would be implemented here!");
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-secondary" />
            Topper Notes Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access high-quality study materials from top performers
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Subject Filter */}
          <div className="flex flex-wrap gap-2">
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

          {/* Upload Button */}
          <Button 
            onClick={() => setShowUpload(!showUpload)}
            variant="accent"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Notes
          </Button>
        </div>

        {/* Upload Form */}
        {showUpload && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Your Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Note title..."
                  className="w-full p-2 border rounded-md"
                />
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select subject...</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Topic..."
                  className="w-full p-2 border rounded-md"
                />
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select grade...</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Drag and drop your file here or click to browse</p>
                <p className="text-sm text-gray-400 mt-2">PDF, DOC, DOCX files up to 10MB</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={uploadNote} variant="accent">Upload</Button>
                <Button 
                  onClick={() => setShowUpload(false)} 
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="group hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                  <Badge variant="secondary">{note.rating}⭐</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{note.subject}</Badge>
                  <Badge variant="outline">{note.grade}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Topic: {note.topic}</p>
                    <p className="text-sm text-muted-foreground">By: {note.author}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {note.downloads} downloads
                    </div>
                    <span>{note.size}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="accent" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => downloadNote(note.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
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