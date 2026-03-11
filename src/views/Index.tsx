"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import ScrollProgress from "@/components/ScrollProgress";
import type { ProjectRecord } from "@/lib/projects/data";

type IndexProps = {
  featuredProjects: ProjectRecord[];
};

const Index = ({ featuredProjects }: IndexProps) => (
  <>
    <ScrollProgress />
    <Navbar />
    <main className="grain-overlay">
      <HeroSection />
      <ServicesSection />
      <FeaturedWork projects={featuredProjects} />
      <TestimonialsSection />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
