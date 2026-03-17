"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import OurStorySection from "@/components/home/OurStorySection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import ScrollProgress from "@/components/ScrollProgress";
import type { ProjectRecord } from "@/lib/projects/data";
import type { TestimonialRecord } from "@/lib/testimonials/data";

type IndexProps = {
  featuredProjects: ProjectRecord[];
  testimonials: TestimonialRecord[];
};

const Index = ({ featuredProjects, testimonials }: IndexProps) => (
  <>
    <ScrollProgress />
    <Navbar />
    <main className="grain-overlay">
      <HeroSection />
      <OurStorySection />
      <ServicesSection />
      <FeaturedWork projects={featuredProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
