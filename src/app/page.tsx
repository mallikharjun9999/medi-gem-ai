
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

export default function LandingPage() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

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
                      width="600"
                      height="400"
                      alt="Hero Image 1"
                      data-ai-hint="health technology"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://t4.ftcdn.net/jpg/02/18/92/81/360_F_218928168_okyiOqlFkPrjBho39i5ObPYj1l1m3k7i.jpg"
                      width="600"
                      height="400"
                      alt="Hero Image 2"
                      data-ai-hint="patient doctor consultation"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src="https://thumbs.dreamstime.com/b/smartphone-remote-medical-care-vector-illustration-people-mobile-phone-healthcare-consultation-doctors-device-96655510.jpg"
                      width="600"
                      height="400"
                      alt="Hero Image 3"
                      data-ai-hint="vital signs monitoring"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                   <CarouselItem>
                    <Image
                      src="https://st4.depositphotos.com/1177973/22931/i/450/depositphotos_229313988-stock-photo-female-doctor-consulting-senior-patient.jpg"
                      width="600"
                      height="400"
                      alt="Hero Image 4"
                      data-ai-hint="doctor patient"
                      className="aspect-[3/2] overflow-hidden rounded-xl object-cover w-full"
                    />
                  </CarouselItem>
                   <CarouselItem>
                    <Image
                      src="https://photos.peopleimages.com/picture/202311/2956950-nurse-hands-home-and-blood-pressure-test-for-healthcare-service-support-and-caregiver-for-medical-monitor.-adn-worker-or-doctor-with-patient-arm-for-helping-of-diabetes-or-hypertension-exam-on-sofa-fit_400_400.jpg"
                      width="600"
                      height="400"
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 MediGem. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
