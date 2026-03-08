import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ServicesSection />
      <FeaturedWork />
      <TestimonialsSection />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
