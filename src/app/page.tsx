
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MainNav } from '@/components/main-nav';
import { HeartPulse, BotMessageSquare, Stethoscope } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from '@/components/contact-form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';


export default function LandingPage() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );
    const { toast } = useToast();

    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        if (email) {
            toast({
                title: "Subscribed!",
                description: "Thank you for subscribing to our newsletter.",
            });
            e.currentTarget.reset();
        }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Personal AI Health Assistant
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MediGem helps you monitor your vitals, track your symptoms, and get AI-powered health insights, all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
              <Carousel 
                plugins={[plugin.current]}
                className="w-full max-w-lg mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                >
                <CarouselContent>
                  <CarouselItem>
                    <Image
                      src="https://www.mindinventory.com/blog/wp-content/uploads/2020/09/chatbots-in-healthcare.webp"
                      width={600}   // FIXED: width as number
                      height={400}  // FIXED: height as number
                      alt="Hero Image 1"
                      data-ai-hint="health technology"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://t4.ftcdn.net/jpg/12/18/92/81/360_F_1218928168_okyiOqlFkPrjBho39i5ObPYj1l1m3k7i.jpg"
                      width={600}  // FIXED
                      height={400} // FIXED
                      alt="Hero Image 2"
                      data-ai-hint="patient doctor consultation"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://thumbs.dreamstime.com/b/smartphone-remote-medical-care-vector-illustration-people-mobile-phone-healthcare-consultation-doctors-device-96655510.jpg"
                      width={600}  // FIXED
                      height={400} // FIXED
                      alt="Hero Image 3"
                      data-ai-hint="vital signs monitoring"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                   <CarouselItem>
                    <Image
                      src="https://st4.depositphotos.com/1177973/22931/i/450/depositphotos_229313988-stock-photo-female-doctor-consulting-senior-patient.jpg"
                      width={600}  // FIXED
                      height={400} // FIXED
                      alt="Hero Image 4"
                      data-ai-hint="doctor patient"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                   <CarouselItem>
                    <Image
                      src="https://photos.peopleimages.com/picture/202311/2956950-nurse-hands-home-and-blood-pressure-test-for-healthcare-service-support-and-caregiver-for-medical-monitor.-adn-worker-or-doctor-with-patient-arm-for-helping-of-diabetes-or-hypertension-exam-on-sofa-fit_400_400.jpg"
                      width={600}  // FIXED
                      height={400} // FIXED
                      alt="Hero Image 5"
                      data-ai-hint="nurse patient blood pressure"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Three simple steps to take control of your health.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-16 mt-12">
                    <div className="grid gap-1 text-center">
                        <HeartPulse className="h-10 w-10 mx-auto text-primary" />
                        <h3 className="text-lg font-bold">Track Your Vitals</h3>
                        <p className="text-sm text-muted-foreground">
                            Easily log your heart rate, blood pressure, and other vitals. Keep a consistent record of your health metrics over time.
                        </p>
                    </div>
                    <div className="grid gap-1 text-center">
                        <BotMessageSquare className="h-10 w-10 mx-auto text-primary" />
                        <h3 className="text-lg font-bold">Get AI Insights</h3>
                        <p className="text-sm text-muted-foreground">
                           Use our Gemini-powered AI to ask health questions and understand your symptoms better.
                        </p>
                    </div>
                    <div className="grid gap-1 text-center">
                        <Stethoscope className="h-10 w-10 mx-auto text-primary" />
                        <h3 className="text-lg font-bold">Connect with Professionals</h3>
                        <p className="text-sm text-muted-foreground">
                           Your data can be securely shared with your doctors and caregivers for professional medical advice.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About MediGem</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MediGem is revolutionizing personal health management by bringing the power of artificial intelligence directly to your fingertips. Our mission is to empower you to take a proactive role in your health journey. By providing intuitive tools for vitals tracking, instant AI-driven insights, and seamless communication with healthcare professionals, we are making healthcare more accessible, personalized, and preventative.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                      Get Started
                    </Link>
                  </Button>
                </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? We've got answers. Here are some of the most common questions we get.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is MediGem a replacement for my doctor?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. MediGem is a tool to help you monitor your health and provide general information. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How is my data protected?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We take your privacy and data security very seriously. All your data is encrypted both in transit and at rest. We use industry-standard security protocols to ensure your personal health information is kept safe and confidential. You control who can see your data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Who can use MediGem?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    MediGem is designed for everyone. Patients can track their vitals and symptoms, caregivers can monitor their loved ones' health, and doctors can get a holistic view of their patients' well-being between appointments.
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                  <AccordionTrigger>What kind of AI does MediGem use?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our AI Health Assistant is powered by Google's Gemini models. This allows us to provide helpful, conversational answers to your general health questions. The AI does not provide medical advice but can help you understand health topics better.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="space-y-2 mb-8">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Have a question or need support? Fill out the form and we'll get back to you.
                  </p>
                </div>
                <ContactForm />
              </div>
               <div>
                 <div className="space-y-2 mb-8">
                   <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Location</h2>
                   <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                     Find us at our headquarters in the heart of the city.
                   </p>
                 </div>
                 <div className="overflow-hidden rounded-xl">
                   <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.497950343003!2d-122.41941568468153!3d37.77492957975883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c4c1d4f9b%3A0x8f2d1e7df07a3c3e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1626999999999!5m2!1sen!2sus"
                     width="100%"
                     height="450"
                     style={{ border: 0 }}
                     allowFullScreen={true}
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                   ></iframe>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-6 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 MediGem. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false as any}>
            {/* FIXED: prefetch={false} type warning */}
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false as any}>
            Privacy
          </Link>
        </nav>
        <div className="sm:border-l sm:pl-6">
            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                <Input type="email" name="email" placeholder="Enter your email" className="max-w-xs" />
                <Button type="submit">Subscribe</Button>
            </form>
        </div>
      </footer>
    </div>
  );
}
