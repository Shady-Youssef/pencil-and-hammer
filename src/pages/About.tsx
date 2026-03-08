import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import aboutTeam from "@/assets/about-team.jpg";
import { Award, Users, Clock, Globe } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Projects Completed" },
  { icon: Users, value: "12", label: "Team Members" },
  { icon: Clock, value: "15", label: "Years Experience" },
  { icon: Globe, value: "8", label: "Countries Served" },
];

const team = [
  { name: "Maria Bello", role: "Principal Designer", initials: "MB" },
  { name: "David Moore", role: "Senior Architect", initials: "DM" },
  { name: "Anya Volkov", role: "Color Specialist", initials: "AV" },
  { name: "Liam Foster", role: "Project Manager", initials: "LF" },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] overflow-hidden">
          <img src={aboutTeam} alt="MBM Design Studio" className="w-full h-full object-cover" />
          <div className="overlay-dark absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedSection className="text-center">
              <div className="line-accent mx-auto mb-6" />
              <h1 className="font-display text-5xl md:text-7xl font-light text-cream">About Us</h1>
            </AnimatedSection>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="line-accent mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
                Our Story
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Founded in 2010, MBM Designs has grown from a boutique studio into one of New York's most sought-after interior design firms. We believe that exceptional design is born from the intersection of artistry, innovation, and deep understanding of how people live.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Every project we undertake is a collaborative journey. We listen, we dream, and we create spaces that are not only visually stunning but deeply personal — environments that enhance your daily life and stand the test of time.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card p-6 rounded-sm border border-border text-center">
                    <stat.icon size={24} strokeWidth={1.2} className="text-accent mx-auto mb-3" />
                    <p className="font-display text-3xl text-foreground">{stat.value}</p>
                    <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-padding bg-charcoal">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="line-accent mx-auto mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-8">
                Our Philosophy
              </h2>
              <p className="font-display text-2xl md:text-3xl font-light text-warm-gray italic leading-relaxed">
                "Great design is not about following trends — it's about creating timeless spaces that resonate with the soul of those who inhabit them."
              </p>
              <p className="font-body text-sm text-gold tracking-widest uppercase mt-8">
                — Maria Bello, Founder
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <div className="line-accent mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">Our Team</h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <AnimatedSection key={member.name} delay={i * 0.1}>
                  <div className="text-center group">
                    <div className="w-32 h-32 mx-auto mb-5 rounded-full bg-secondary flex items-center justify-center border border-border group-hover:border-accent transition-colors duration-300">
                      <span className="font-display text-2xl text-muted-foreground group-hover:text-accent transition-colors">
                        {member.initials}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-foreground">{member.name}</h3>
                    <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mt-1">
                      {member.role}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
