"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BotMessageSquare, Sparkles } from 'lucide-react';
import { askHealthQuestion } from '@/ai/flows/health-query';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from './ui/skeleton';

export function HealthQueryCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('');
    
    try {
      const result = await askHealthQuestion({ question });
      setAnswer(result.answer);
    } catch (error) {
      console.error('Error fetching health query answer:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an answer. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <BotMessageSquare className="size-6 text-primary" />
            <CardTitle>AI Health Assistant</CardTitle>
        </div>
        <CardDescription>
          Ask a general health question. This is not a substitute for professional medical advice.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="health-question">Your Question</Label>
            <Textarea
              id="health-question"
              placeholder="e.g., What are the benefits of a balanced diet?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
          {answer && !isLoading && (
            <div className="rounded-lg border bg-secondary/50 p-4 text-sm">
                <p className="text-secondary-foreground">{answer}</p>
            </div>
          )}
          {isLoading && (
             <div className="space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[70%]" />
             </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Thinking...' : 'Ask MediGem'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
