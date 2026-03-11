"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Users, MessageSquare, Settings, BarChart3,
  TrendingUp, Clock, CheckCircle2, AlertCircle, ChevronRight, Eye,
  Menu, X, LogOut, Bell, Home, Quote, Star, Sparkles, MapPin,
  CalendarDays, ArrowUpRight, Circle, ImageIcon, Layers
} from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, AreaChart, Area, CartesianGrid, Legend
} from "recharts";

import ProjectManager from "@/components/admin/ProjectManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import BrandLockup from "@/components/BrandLockup";
import { useSiteSettings } from "@/components/site/site-settings-context";
import type { ProjectRecord } from "@/lib/projects/data";
import type { SiteSettings } from "@/lib/site";
import type { TestimonialRecord } from "@/lib/testimonials/data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type DashboardProps = {
  userEmail: string;
  userName: string;
  projects: ProjectRecord[];
  projectsError: string | null;
  siteSettings: SiteSettings;
  siteSettingsError: string | null;
  testimonials: TestimonialRecord[];
  testimonialsError: string | null;
};

/* ------------------------------------------------------------------ */
/*  Sidebar config                                                     */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Quote, label: "Testimonials", id: "testimonials" },
  { icon: Settings, label: "Settings", id: "settings" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getFirstName(fullName: string) {
  return fullName.split(" ").filter(Boolean)[0] || fullName;
}

const CHART_COLORS = {
  gold: "hsl(38, 60%, 46%)",
  goldLight: "hsl(38, 45%, 62%)",
  goldDark: "hsl(38, 65%, 34%)",
  green: "#22c55e",
  blue: "#3b82f6",
  amber: "#f59e0b",
  rose: "#f43f5e",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
};

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  Completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  Planning: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`font-body text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card component                                                */
/* ------------------------------------------------------------------ */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
  delay = 0,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
  accent?: boolean;
  delay?: number;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg border bg-card p-5 sm:p-6 transition-all duration-500 ${onClick ? "cursor-pointer" : ""} hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/[0.04] transition-transform duration-700 group-hover:scale-150" />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent ? "bg-accent/10" : "bg-secondary"} transition-colors duration-300 group-hover:bg-accent/15`}>
            <Icon size={20} strokeWidth={1.5} className={accent ? "text-accent" : "text-muted-foreground"} />
          </div>
          {onClick && <ChevronRight size={14} className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" />}
        </div>
        <p className="font-display text-3xl tracking-tight text-foreground">{value}</p>
        <p className="mt-1 font-body text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
        <p className="mt-2 font-body text-xs text-accent">{sub}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recharts custom tooltip                                            */
/* ------------------------------------------------------------------ */

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card/95 px-3 py-2 shadow-xl backdrop-blur-sm">
      {label && <p className="mb-1 font-body text-[11px] font-medium text-muted-foreground">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="font-body text-xs text-foreground">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard                                                     */
/* ------------------------------------------------------------------ */

export default function Dashboard({
  userEmail,
  userName,
  projects,
  projectsError,
  siteSettings,
  siteSettingsError,
  testimonials,
  testimonialsError,
}: DashboardProps) {
  const { settings } = useSiteSettings();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ----- Derived real data --------------------------------------------------

  const metrics = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.status === "In Progress").length;
    const completedProjects = projects.filter((p) => p.status === "Completed").length;
    const planningProjects = projects.filter((p) => p.status === "Planning").length;
    const publishedProjects = projects.filter((p) => p.published).length;
    const featuredProjects = projects.filter((p) => p.featured).length;
    const totalTestimonials = testimonials.length;
    const publishedTestimonials = testimonials.filter((t) => t.published).length;
    const avgRating =
      testimonials.length > 0
        ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
        : "—";

    const categories = [...new Set(projects.map((p) => p.category))];
    const categoryBreakdown = categories.map((cat) => ({
      name: cat,
      count: projects.filter((p) => p.category === cat).length,
    }));
    const statusBreakdown = [
      { name: "Completed", value: completedProjects, color: CHART_COLORS.green },
      { name: "In Progress", value: activeProjects, color: CHART_COLORS.amber },
      { name: "Planning", value: planningProjects, color: CHART_COLORS.blue },
    ].filter((s) => s.value > 0);

    const locations = [...new Set(projects.map((p) => p.location).filter(Boolean))];
    const totalImages = projects.reduce((sum, p) => sum + p.images.length, 0);

    // unique clients from projects
    const clientMap = new Map<string, { name: string; projects: number; categories: Set<string>; locations: Set<string>; hasActive: boolean }>();
    projects.forEach((p) => {
      const key = p.clientName.toLowerCase().trim();
      if (!key) return;
      const existing = clientMap.get(key);
      if (existing) {
        existing.projects += 1;
        existing.categories.add(p.category);
        if (p.location) existing.locations.add(p.location);
        if (p.status === "In Progress" || p.status === "Planning") existing.hasActive = true;
      } else {
        clientMap.set(key, {
          name: p.clientName,
          projects: 1,
          categories: new Set([p.category]),
          locations: new Set(p.location ? [p.location] : []),
          hasActive: p.status === "In Progress" || p.status === "Planning",
        });
      }
    });
    const clients = [...clientMap.values()].sort((a, b) => b.projects - a.projects);

    // Year breakdown for area chart
    const yearMap = new Map<number, number>();
    projects.forEach((p) => {
      const y = p.completionYear;
      yearMap.set(y, (yearMap.get(y) || 0) + 1);
    });
    const yearBreakdown = [...yearMap.entries()]
      .sort(([a], [b]) => a - b)
      .map(([year, count]) => ({ year: String(year), projects: count }));

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      planningProjects,
      publishedProjects,
      featuredProjects,
      totalTestimonials,
      publishedTestimonials,
      avgRating,
      categoryBreakdown,
      statusBreakdown,
      locations,
      totalImages,
      clients,
      yearBreakdown,
    };
  }, [projects, testimonials]);

  const recentProjects = useMemo(
    () => [...projects].sort((a, b) => b.completionYear - a.completionYear).slice(0, 6),
    [projects],
  );

  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "MB";

  // ----- Category chart data with colors (for bar chart) --------------------
  const categoryChartData = useMemo(
    () =>
      metrics.categoryBreakdown.map((item, i) => ({
        ...item,
        fill: [CHART_COLORS.gold, CHART_COLORS.violet, CHART_COLORS.cyan, CHART_COLORS.rose, CHART_COLORS.blue][i % 5],
      })),
    [metrics.categoryBreakdown],
  );

  // ----- Render -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background flex">
      {/* ================================================================ */}
      {/*  Sidebar – Desktop                                                */}
      {/* ================================================================ */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal min-h-screen fixed left-0 top-0 z-50">
        <div className="p-6 border-b border-charcoal-light">
          <BrandLockup
            name={settings.siteName}
            logoUrl={settings.logoUrl}
            textClassName="text-xl text-cream"
            logoClassName="object-contain p-1.5"
          />
          <p className="font-body text-[11px] tracking-[0.2em] uppercase text-warm-gray mt-1.5">CMS Dashboard</p>
        </div>

        <nav className="flex-1 py-4 space-y-0.5">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 font-body text-sm transition-all duration-300 ${
                activeTab === link.id
                  ? "text-gold bg-charcoal-light border-r-2 border-gold"
                  : "text-warm-gray hover:text-cream hover:bg-charcoal-light/50"
              }`}
            >
              <link.icon size={18} strokeWidth={1.5} />
              {link.label}
              {/* Notification dot for overview */}
              {link.id === "overview" && metrics.activeProjects > 0 && (
                <span className="ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent/20 px-1.5 font-body text-[10px] font-medium text-accent">
                  {metrics.activeProjects}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-charcoal-light space-y-3">
          <Link href="/" className="flex items-center gap-3 text-warm-gray hover:text-gold transition-colors font-body text-sm">
            <Home size={18} strokeWidth={1.5} />
            Back to Home
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 text-warm-gray hover:text-cream transition-colors font-body text-sm">
              <LogOut size={18} strokeWidth={1.5} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ================================================================ */}
      {/*  Sidebar – Mobile overlay                                         */}
      {/* ================================================================ */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative min-h-screen w-[85vw] max-w-xs bg-charcoal shadow-2xl"
            >
              <div className="p-6 border-b border-charcoal-light flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-charcoal-light bg-background/20">
                    <Image
                      src={settings.logoUrl}
                      alt={`${settings.siteName} logo`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <h1 className="line-clamp-1 font-display text-lg text-cream">{settings.siteName}</h1>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-warm-gray hover:text-cream transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="py-4">
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-6 py-3 font-body text-sm text-warm-gray hover:text-gold transition-colors"
                >
                  <Home size={18} strokeWidth={1.5} />
                  Home
                </Link>
                {sidebarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => { setActiveTab(link.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-6 py-3 font-body text-sm transition-colors ${
                      activeTab === link.id
                        ? "text-gold bg-charcoal-light"
                        : "text-warm-gray hover:text-cream"
                    }`}
                  >
                    <link.icon size={18} strokeWidth={1.5} />
                    {link.label}
                  </button>
                ))}
                <form action="/auth/signout" method="post" className="px-6 pt-4">
                  <button
                    type="submit"
                    className="w-full text-left font-body text-sm text-warm-gray transition-colors hover:text-cream"
                  >
                    Sign Out
                  </button>
                </form>
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================ */}
      {/*  Main content area                                                */}
      {/* ================================================================ */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
              <Menu size={22} />
            </button>
            <h2 className="font-display text-lg capitalize text-foreground sm:text-xl">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              {metrics.activeProjects > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                  {metrics.activeProjects}
                </span>
              )}
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-gold-dark flex items-center justify-center shadow-md">
                <span className="font-body text-[11px] font-semibold text-accent-foreground">{initials}</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-body text-sm font-medium text-foreground leading-tight">{getFirstName(userName)}</p>
                <p className="font-body text-[11px] text-muted-foreground leading-tight">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-10">

          {/* ============================================================ */}
          {/*  OVERVIEW TAB                                                  */}
          {/* ============================================================ */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

              {/* Greeting banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8 overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.04]" />
                <div className="absolute -right-4 -bottom-12 h-32 w-32 rounded-full bg-accent/[0.03]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-accent" />
                    <p className="font-body text-xs uppercase tracking-[0.25em] text-accent">{settings.siteName} Studio</p>
                  </div>
                  <h3 className="font-display text-2xl text-foreground sm:text-3xl lg:text-4xl">
                    {getGreeting()}, <span className="text-gradient-gold">{getFirstName(userName)}</span>
                  </h3>
                  <p className="mt-2 max-w-lg font-body text-sm text-muted-foreground leading-relaxed">
                    {metrics.activeProjects > 0
                      ? `You have ${metrics.activeProjects} active project${metrics.activeProjects > 1 ? "s" : ""} in progress and ${metrics.totalProjects} total project${metrics.totalProjects > 1 ? "s" : ""} in the system.`
                      : `Your portfolio contains ${metrics.totalProjects} project${metrics.totalProjects > 1 ? "s" : ""}. Start tracking active projects to see live updates here.`}
                  </p>
                </div>
              </motion.div>

              {/* Stats grid */}
              <div className="mb-10 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                <StatCard
                  icon={FolderOpen}
                  label="Total Projects"
                  value={metrics.totalProjects}
                  sub={`${metrics.activeProjects} in progress`}
                  accent
                  delay={0.05}
                  onClick={() => setActiveTab("projects")}
                />
                <StatCard
                  icon={Eye}
                  label="Published"
                  value={metrics.publishedProjects}
                  sub={`${metrics.featuredProjects} featured`}
                  delay={0.1}
                  onClick={() => setActiveTab("projects")}
                />
                <StatCard
                  icon={Users}
                  label="Clients"
                  value={metrics.clients.length}
                  sub={`Across ${metrics.locations.length} location${metrics.locations.length !== 1 ? "s" : ""}`}
                  delay={0.15}
                  onClick={() => setActiveTab("clients")}
                />
                <StatCard
                  icon={Star}
                  label="Avg. Rating"
                  value={metrics.avgRating}
                  sub={`From ${metrics.totalTestimonials} testimonial${metrics.totalTestimonials !== 1 ? "s" : ""}`}
                  accent
                  delay={0.2}
                  onClick={() => setActiveTab("testimonials")}
                />
              </div>

              {/* Charts row */}
              <div className="mb-10 grid gap-5 lg:grid-cols-2">
                {/* Project status donut */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="rounded-xl border border-border bg-card p-5 sm:p-6"
                >
                  <h4 className="font-display text-base text-foreground mb-1">Project Status</h4>
                  <p className="font-body text-xs text-muted-foreground mb-5">Distribution by current status</p>
                  {metrics.statusBreakdown.length > 0 ? (
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
                      <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                          <Pie
                            data={metrics.statusBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={80}
                            paddingAngle={4}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {metrics.statusBreakdown.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-3">
                        {metrics.statusBreakdown.map((s) => (
                          <div key={s.name} className="flex items-center gap-2.5">
                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
                            <span className="font-body text-sm text-foreground">{s.name}</span>
                            <span className="ml-auto font-display text-sm text-foreground">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center font-body text-sm text-muted-foreground py-12">No project data available</p>
                  )}
                </motion.div>

                {/* Category bar chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl border border-border bg-card p-5 sm:p-6"
                >
                  <h4 className="font-display text-base text-foreground mb-1">By Category</h4>
                  <p className="font-body text-xs text-muted-foreground mb-5">Projects grouped by design category</p>
                  {categoryChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={categoryChartData} barSize={36}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Poppins", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fontFamily: "Poppins", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--accent) / 0.06)" }} />
                        <Bar dataKey="count" name="Projects" radius={[6, 6, 0, 0]}>
                          {categoryChartData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center font-body text-sm text-muted-foreground py-12">No project data available</p>
                  )}
                </motion.div>
              </div>

              {/* Recent projects + Quick insights row */}
              <div className="grid xl:grid-cols-3 gap-5">
                {/* Recent projects table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-border p-5 sm:p-6">
                    <div>
                      <h4 className="font-display text-base text-foreground">Recent Projects</h4>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">Latest projects by completion year</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="flex items-center gap-1 font-body text-xs text-accent tracking-wider uppercase hover:text-gold-dark transition-colors"
                    >
                      View All
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4">Project</th>
                          <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4 hidden sm:table-cell">Category</th>
                          <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4">Status</th>
                          <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4 hidden md:table-cell">Location</th>
                          <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4 hidden lg:table-cell">Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProjects.map((p) => (
                          <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {p.featured && <Star size={12} className="text-accent flex-shrink-0" fill="currentColor" />}
                                <span className="font-body text-sm text-foreground group-hover:text-accent transition-colors">{p.title}</span>
                              </div>
                            </td>
                            <td className="p-4 font-body text-sm text-muted-foreground hidden sm:table-cell">{p.category}</td>
                            <td className="p-4"><StatusBadge status={p.status} /></td>
                            <td className="p-4 hidden md:table-cell">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <MapPin size={12} />
                                <span className="font-body text-sm">{p.location || "—"}</span>
                              </div>
                            </td>
                            <td className="p-4 font-body text-sm text-muted-foreground hidden lg:table-cell">{p.completionYear}</td>
                          </tr>
                        ))}
                        {recentProjects.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center font-body text-sm text-muted-foreground">
                              No projects yet. Create your first project to see it here.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Quick insights sidebar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-5"
                >
                  {/* Portfolio health */}
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <h4 className="font-display text-base text-foreground mb-4">Portfolio Health</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-body text-xs text-muted-foreground">Published</span>
                          <span className="font-body text-xs font-medium text-foreground">
                            {metrics.publishedProjects}/{metrics.totalProjects}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-gold-light transition-all duration-1000"
                            style={{ width: `${metrics.totalProjects > 0 ? (metrics.publishedProjects / metrics.totalProjects) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-body text-xs text-muted-foreground">Featured</span>
                          <span className="font-body text-xs font-medium text-foreground">
                            {metrics.featuredProjects}/{metrics.totalProjects}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all duration-1000"
                            style={{ width: `${metrics.totalProjects > 0 ? (metrics.featuredProjects / metrics.totalProjects) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-body text-xs text-muted-foreground">Testimonials Published</span>
                          <span className="font-body text-xs font-medium text-foreground">
                            {metrics.publishedTestimonials}/{metrics.totalTestimonials}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000"
                            style={{ width: `${metrics.totalTestimonials > 0 ? (metrics.publishedTestimonials / metrics.totalTestimonials) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <h4 className="font-display text-base text-foreground mb-4">Quick Actions</h4>
                    <div className="space-y-2">
                      {[
                        { icon: FolderOpen, label: "Manage Projects", tab: "projects" },
                        { icon: Quote, label: "Manage Testimonials", tab: "testimonials" },
                        { icon: Settings, label: "Site Settings", tab: "settings" },
                        { icon: BarChart3, label: "View Analytics", tab: "analytics" },
                      ].map((action) => (
                        <button
                          key={action.tab}
                          onClick={() => setActiveTab(action.tab)}
                          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-body text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-all duration-300 group"
                        >
                          <action.icon size={16} strokeWidth={1.5} className="text-muted-foreground group-hover:text-accent transition-colors" />
                          {action.label}
                          <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Asset summary */}
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <h4 className="font-display text-base text-foreground mb-4">Asset Summary</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: ImageIcon, label: "Images", value: metrics.totalImages },
                        { icon: Layers, label: "Categories", value: metrics.categoryBreakdown.length },
                        { icon: MapPin, label: "Locations", value: metrics.locations.length },
                        { icon: Star, label: "Featured", value: metrics.featuredProjects },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center rounded-lg bg-secondary/40 px-3 py-3">
                          <item.icon size={16} strokeWidth={1.5} className="text-accent mb-1.5" />
                          <span className="font-display text-lg text-foreground">{item.value}</span>
                          <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/*  PROJECTS TAB                                                  */}
          {/* ============================================================ */}
          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <ProjectManager initialProjects={projects} initialError={projectsError} />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/*  CLIENTS TAB                                                   */}
          {/* ============================================================ */}
          {activeTab === "clients" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              {/* Hero stat row */}
              <div className="mb-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
                <StatCard icon={Users} label="Total Clients" value={metrics.clients.length} sub="Unique clients across projects" accent delay={0.05} />
                <StatCard
                  icon={CheckCircle2}
                  label="Active Clients"
                  value={metrics.clients.filter((c) => c.hasActive).length}
                  sub="With in-progress or planning projects"
                  delay={0.1}
                />
                <StatCard
                  icon={MapPin}
                  label="Locations Served"
                  value={metrics.locations.length}
                  sub={metrics.locations.slice(0, 3).join(", ") || "—"}
                  delay={0.15}
                />
              </div>

              {/* Clients table */}
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full min-w-[36rem]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4">Client</th>
                      <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4 hidden sm:table-cell">Projects</th>
                      <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4 hidden md:table-cell">Categories</th>
                      <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4 hidden lg:table-cell">Locations</th>
                      <th className="text-left font-body text-[11px] font-medium tracking-wider uppercase text-muted-foreground p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.clients.map((c) => (
                      <tr key={c.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                              <span className="font-body text-xs font-medium text-secondary-foreground">
                                {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-body text-sm font-medium text-foreground">{c.name}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <span className="font-display text-sm text-foreground">{c.projects}</span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {[...c.categories].map((cat) => (
                              <span key={cat} className="rounded-full bg-secondary px-2 py-0.5 font-body text-[10px] text-secondary-foreground">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="font-body text-sm text-muted-foreground">
                            {[...c.locations].join(", ") || "—"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-block h-2 w-2 rounded-full ${c.hasActive ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                            <span className="font-body text-xs text-muted-foreground">{c.hasActive ? "Active" : "Completed"}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {metrics.clients.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center font-body text-sm text-muted-foreground">
                          No clients yet. Add projects with client names to populate this view.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/*  MESSAGES TAB                                                  */}
          {/* ============================================================ */}
          {activeTab === "messages" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="border-b border-border p-5 sm:p-6">
                  <h4 className="font-display text-base text-foreground">Messages</h4>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">Client communications and inquiries</p>
                </div>
                <div className="flex items-center justify-center py-20 px-6">
                  <div className="text-center max-w-sm">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                      <MessageSquare size={24} strokeWidth={1.5} className="text-muted-foreground" />
                    </div>
                    <h5 className="font-display text-lg text-foreground mb-2">Messages Coming Soon</h5>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      The messaging system is being developed. You&apos;ll be able to communicate directly with clients and manage inquiries from this panel.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/*  ANALYTICS TAB                                                 */}
          {/* ============================================================ */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              {/* Top-level analytics stats */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
                <StatCard icon={FolderOpen} label="Total Projects" value={metrics.totalProjects} sub={`${metrics.completedProjects} completed`} accent delay={0.05} />
                <StatCard icon={Eye} label="Published Rate" value={metrics.totalProjects > 0 ? `${Math.round((metrics.publishedProjects / metrics.totalProjects) * 100)}%` : "0%"} sub={`${metrics.publishedProjects} of ${metrics.totalProjects} published`} delay={0.1} />
                <StatCard icon={Star} label="Featured Rate" value={metrics.totalProjects > 0 ? `${Math.round((metrics.featuredProjects / metrics.totalProjects) * 100)}%` : "0%"} sub={`${metrics.featuredProjects} showcase projects`} delay={0.15} />
                <StatCard icon={ImageIcon} label="Total Gallery" value={metrics.totalImages} sub={`Across ${metrics.totalProjects} projects`} delay={0.2} />
              </div>

              {/* Charts row */}
              <div className="grid gap-5 lg:grid-cols-2 mb-8">
                {/* Status donut - larger */}
                <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
                  <h4 className="font-display text-lg text-foreground mb-1">Status Distribution</h4>
                  <p className="font-body text-xs text-muted-foreground mb-6">Current status of all projects</p>
                  {metrics.statusBreakdown.length > 0 ? (
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                      <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                          <Pie
                            data={metrics.statusBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={58}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {metrics.statusBreakdown.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-4">
                        {metrics.statusBreakdown.map((s) => (
                          <div key={s.name} className="flex items-center gap-3">
                            <span className="h-4 w-4 rounded-sm" style={{ backgroundColor: s.color }} />
                            <div>
                              <p className="font-body text-sm font-medium text-foreground">{s.name}</p>
                              <p className="font-body text-xs text-muted-foreground">{s.value} project{s.value !== 1 ? "s" : ""}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center font-body text-sm text-muted-foreground py-12">No data</p>
                  )}
                </div>

                {/* Category breakdown */}
                <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
                  <h4 className="font-display text-lg text-foreground mb-1">Category Breakdown</h4>
                  <p className="font-body text-xs text-muted-foreground mb-6">Projects by design discipline</p>
                  {categoryChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryChartData} barSize={44}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "Poppins", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fontFamily: "Poppins", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--accent) / 0.06)" }} />
                        <Bar dataKey="count" name="Projects" radius={[6, 6, 0, 0]}>
                          {categoryChartData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center font-body text-sm text-muted-foreground py-12">No data</p>
                  )}
                </div>
              </div>

              {/* Year timeline area chart */}
              {metrics.yearBreakdown.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
                  <h4 className="font-display text-lg text-foreground mb-1">Projects Timeline</h4>
                  <p className="font-body text-xs text-muted-foreground mb-6">Projects by completion year</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={metrics.yearBreakdown}>
                      <defs>
                        <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: "Poppins", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fontFamily: "Poppins", fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="projects"
                        name="Projects"
                        stroke={CHART_COLORS.gold}
                        strokeWidth={2}
                        fill="url(#goldGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Locations overview */}
              {metrics.locations.length > 0 && (
                <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-8">
                  <h4 className="font-display text-lg text-foreground mb-4">Locations Served</h4>
                  <div className="flex flex-wrap gap-2">
                    {metrics.locations.map((loc) => (
                      <span key={loc} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-body text-xs text-foreground">
                        <MapPin size={11} className="text-accent" />
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ============================================================ */}
          {/*  TESTIMONIALS TAB                                              */}
          {/* ============================================================ */}
          {activeTab === "testimonials" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <TestimonialsManager initialTestimonials={testimonials} initialError={testimonialsError} />
            </motion.div>
          )}

          {/* ============================================================ */}
          {/*  SETTINGS TAB                                                  */}
          {/* ============================================================ */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <SiteSettingsManager initialSettings={siteSettings} initialError={siteSettingsError} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
