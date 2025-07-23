
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { VitalsHistoryChart } from "./vitals-history-chart";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface PatientDetailsDialogProps {
    patient: {
        id: string;
        name: string;
    };
    doctorId: string | undefined;
}

interface Note {
    id: string;
    note: string;
    doctorId: string;
    timestamp: Timestamp;
}

export function PatientDetailsDialog({ patient, doctorId }: PatientDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");
  const [previousNotes, setPreviousNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen || !patient) return;

    const notesQuery = query(collection(db, `users/${patient.id}/notes`), orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
        const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note));
        setPreviousNotes(notesData);
    });

    return () => unsubscribe();
  }, [isOpen, patient]);

  const handleSaveNote = async () => {
    if (!note.trim() || !doctorId) return;

    setIsLoading(true);
    try {
        await addDoc(collection(db, `users/${patient.id}/notes`), {
            note,
            doctorId,
            timestamp: new Date(),
        });
        toast({
            title: "Note Saved",
            description: `A new note for ${patient.name} has been saved.`,
            className: "bg-accent text-accent-foreground border-accent",
        });
        setNote("");
    } catch (error) {
        console.error("Error saving note:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not save the note. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Patient Details: {patient.name}</DialogTitle>
          <DialogDescription>
            Review vitals history and add clinical notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Vitals Chart */}
            <div className="col-span-1 md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Vitals History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VitalsHistoryChart />
                    </CardContent>
                </Card>
            </div>

            {/* Notes Section */}
            <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Add Doctor's Note</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Enter your clinical notes here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={4}
                            disabled={isLoading}
                        />
                         <Button onClick={handleSaveNote} disabled={isLoading || !note.trim()}>
                            {isLoading ? "Saving..." : "Save Note"}
                        </Button>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Previous Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-48">
                            <div className="space-y-4">
                            {previousNotes.length > 0 ? (
                                previousNotes.map((n) => (
                                <div key={n.id} className="text-sm p-3 border rounded-md bg-muted/50">
                                    <p className="mb-1">{n.note}</p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Dr. (ID: ...{n.doctorId.slice(-4)})</span>
                                        <span>{n.timestamp.toDate().toLocaleDateString()}</span>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center">No notes for this patient yet.</p>
                            )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
