"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { useState } from "react";

const vitalsSchema = z.object({
  heartRate: z.coerce.number().min(30, "Invalid heart rate").max(220, "Invalid heart rate"),
  systolic: z.coerce.number().min(50, "Invalid pressure").max(300, "Invalid pressure"),
  diastolic: z.coerce.number().min(30, "Invalid pressure").max(200, "Invalid pressure"),
  temperature: z.coerce.number().min(90, "Invalid temperature").max(110, "Invalid temperature"),
  symptoms: z.string().optional(),
});

type VitalsFormValues = z.infer<typeof vitalsSchema>;

export function LogVitalsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<VitalsFormValues>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  function onSubmit(data: VitalsFormValues) {
    console.log({ ...data, timestamp: new Date().toISOString() });
    toast({
      title: "Vitals Logged",
      description: "Your vitals have been successfully recorded.",
      className: "bg-accent text-accent-foreground border-accent",
    });
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Vitals
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log New Vitals</DialogTitle>
          <DialogDescription>
            Enter your latest vital signs and any symptoms you're experiencing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="heartRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Heart Rate (BPM)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 72" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Temperature (°F)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" placeholder="e.g., 98.6" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="systolic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Systolic (mmHg)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 120" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="diastolic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Diastolic (mmHg)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 80" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Symptoms (optional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe your symptoms..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">Save Vitals</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
