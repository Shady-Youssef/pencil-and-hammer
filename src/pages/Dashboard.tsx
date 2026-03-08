import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Users, MessageSquare, Settings, BarChart3,
  TrendingUp, DollarSign, Clock, CheckCircle2, AlertCircle, ChevronRight,
  Menu, X, LogOut, Bell, Home
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const statsData = [
  { icon: FolderOpen, label: "Active Projects", value: "24", change: "+3 this month", color: "text-accent" },
  { icon: DollarSign, label: "Revenue", value: "$847K", change: "+12% vs last quarter", color: "text-accent" },
  { icon: Users, label: "Total Clients", value: "156", change: "+8 new clients", color: "text-accent" },
  { icon: TrendingUp, label: "Satisfaction", value: "98%", change: "Based on 120 reviews", color: "text-accent" },
];

const recentProjects = [
  { name: "Penthouse Renovation", client: "Sarah Mitchell", status: "In Progress", budget: "$125K", progress: 65 },
  { name: "Boutique Hotel Lobby", client: "Luxe Hotels", status: "In Progress", budget: "$340K", progress: 40 },
  { name: "Modern Loft", client: "James Chen", status: "Completed", budget: "$89K", progress: 100 },
  { name: "Corporate Office", client: "Tech Corp", status: "Planning", budget: "$210K", progress: 15 },
  { name: "Restaurant Interior", client: "Olivia Park", status: "In Progress", budget: "$175K", progress: 80 },
];

const recentMessages = [
  { from: "Sarah Mitchell", message: "Love the new mood board! Can we adjust the living room palette?", time: "2h ago", unread: true },
  { from: "James Chen", message: "Final walkthrough scheduled for Friday. Looking forward!", time: "5h ago", unread: true },
  { from: "Luxe Hotels", message: "Budget approval for phase 2 is confirmed.", time: "1d ago", unread: false },
  { from: "Tech Corp", message: "We'd like to schedule the initial consultation.", time: "2d ago", unread: false },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In Progress": "bg-accent/10 text-accent",
    Completed: "bg-green-100 text-green-700",
    Planning: "bg-secondary text-secondary-foreground",
  };
  return (
    <span className={`font-body text-xs px-3 py-1 rounded-full ${styles[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal min-h-screen fixed left-0 top-0">
        <div className="p-6 border-b border-charcoal-light">
          <h1 className="font-display text-xl text-cream">
            MBM<span className="text-gradient-gold"> Designs</span>
          </h1>
          <p className="font-body text-xs text-warm-gray mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 font-body text-sm transition-colors ${
                activeTab === link.id
                  ? "text-gold bg-charcoal-light border-r-2 border-gold"
                  : "text-warm-gray hover:text-cream hover:bg-charcoal-light/50"
              }`}
            >
              <link.icon size={18} strokeWidth={1.5} />
              {link.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-charcoal-light">
          <button className="flex items-center gap-3 text-warm-gray hover:text-cream transition-colors font-body text-sm">
            <LogOut size={18} strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setSidebarOpen(false)} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="relative w-64 bg-charcoal min-h-screen"
          >
            <div className="p-6 border-b border-charcoal-light flex justify-between items-center">
              <h1 className="font-display text-xl text-cream">MBM</h1>
              <button onClick={() => setSidebarOpen(false)} className="text-warm-gray">
                <X size={20} />
              </button>
            </div>
            <nav className="py-4">
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
            </nav>
          </motion.aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
              <Menu size={22} />
            </button>
            <h2 className="font-display text-xl capitalize text-foreground">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
              <span className="font-body text-xs font-semibold text-accent-foreground">MB</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-10">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stats */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {statsData.map((stat) => (
                  <div key={stat.label} className="bg-card border border-border p-6 rounded-sm hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon size={22} strokeWidth={1.5} className={stat.color} />
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                    <p className="font-display text-3xl text-foreground">{stat.value}</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
                    <p className="font-body text-xs text-accent mt-2">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Projects table + Messages */}
              <div className="grid xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-card border border-border rounded-sm overflow-hidden">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-display text-lg text-foreground">Recent Projects</h3>
                    <button className="font-body text-xs text-accent tracking-wider uppercase hover:text-gold-dark transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4">Project</th>
                          <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4 hidden sm:table-cell">Client</th>
                          <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4">Status</th>
                          <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4 hidden md:table-cell">Budget</th>
                          <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4 hidden lg:table-cell">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProjects.map((p) => (
                          <tr key={p.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                            <td className="p-4 font-body text-sm text-foreground">{p.name}</td>
                            <td className="p-4 font-body text-sm text-muted-foreground hidden sm:table-cell">{p.client}</td>
                            <td className="p-4"><StatusBadge status={p.status} /></td>
                            <td className="p-4 font-body text-sm text-foreground hidden md:table-cell">{p.budget}</td>
                            <td className="p-4 hidden lg:table-cell">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                                    style={{ width: `${p.progress}%` }}
                                  />
                                </div>
                                <span className="font-body text-xs text-muted-foreground w-8">{p.progress}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Messages */}
                <div className="bg-card border border-border rounded-sm">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-display text-lg text-foreground">Messages</h3>
                    <span className="bg-accent/10 text-accent font-body text-xs px-2 py-0.5 rounded-full">
                      2 new
                    </span>
                  </div>
                  <div className="divide-y divide-border/50">
                    {recentMessages.map((msg) => (
                      <div key={msg.from + msg.time} className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {msg.unread && <span className="w-2 h-2 bg-accent rounded-full" />}
                            <p className={`font-body text-sm ${msg.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                              {msg.from}
                            </p>
                          </div>
                          <span className="font-body text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="font-body text-xs text-muted-foreground line-clamp-2 ml-4">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-10 grid sm:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle2, label: "Tasks Due Today", value: "5 tasks", desc: "2 high priority" },
                  { icon: Clock, label: "Upcoming Meetings", value: "3 meetings", desc: "Next: 2:00 PM consultation" },
                  { icon: AlertCircle, label: "Pending Approvals", value: "7 items", desc: "3 budget proposals" },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border p-6 rounded-sm hover-lift cursor-pointer">
                    <item.icon size={20} strokeWidth={1.5} className="text-accent mb-3" />
                    <p className="font-display text-lg text-foreground">{item.value}</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">{item.label}</p>
                    <p className="font-body text-xs text-accent mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((p) => (
                  <div key={p.name} className="bg-card border border-border p-6 rounded-sm hover-lift">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-lg text-foreground">{p.name}</h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="font-body text-sm text-muted-foreground mb-1">{p.client}</p>
                    <p className="font-body text-sm text-foreground font-medium mb-4">{p.budget}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="font-body text-xs text-muted-foreground">{p.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "clients" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-card border border-border rounded-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4">Client</th>
                      <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4 hidden sm:table-cell">Projects</th>
                      <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4 hidden md:table-cell">Total Spent</th>
                      <th className="text-left font-body text-xs tracking-wider uppercase text-muted-foreground p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Sarah Mitchell", projects: 3, spent: "$289K", active: true },
                      { name: "James Chen", projects: 2, spent: "$178K", active: true },
                      { name: "Luxe Hotels", projects: 5, spent: "$1.2M", active: true },
                      { name: "Olivia Park", projects: 4, spent: "$560K", active: false },
                      { name: "Tech Corp", projects: 1, spent: "$210K", active: true },
                    ].map((c) => (
                      <tr key={c.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-4 font-body text-sm text-foreground">{c.name}</td>
                        <td className="p-4 font-body text-sm text-muted-foreground hidden sm:table-cell">{c.projects}</td>
                        <td className="p-4 font-body text-sm text-foreground hidden md:table-cell">{c.spent}</td>
                        <td className="p-4">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${c.active ? "bg-green-500" : "bg-muted-foreground"}`} />
                          <span className="font-body text-xs text-muted-foreground">{c.active ? "Active" : "Inactive"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-card border border-border rounded-sm divide-y divide-border/50">
                {recentMessages.map((msg) => (
                  <div key={msg.from + msg.time} className="p-6 hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <span className="font-body text-xs font-medium text-secondary-foreground">
                            {msg.from.split(" ").map(w => w[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className={`font-body text-sm ${msg.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {msg.from}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">{msg.time}</p>
                        </div>
                      </div>
                      {msg.unread && <span className="w-2.5 h-2.5 bg-accent rounded-full" />}
                    </div>
                    <p className="font-body text-sm text-muted-foreground ml-13 pl-[52px]">{msg.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {statsData.map((s) => (
                  <div key={s.label} className="bg-card border border-border p-8 rounded-sm">
                    <s.icon size={24} strokeWidth={1.2} className="text-accent mb-4" />
                    <p className="font-display text-4xl text-foreground">{s.value}</p>
                    <p className="font-body text-sm text-muted-foreground mt-2">{s.label}</p>
                    <p className="font-body text-xs text-accent mt-1">{s.change}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border p-8 rounded-sm">
                <h3 className="font-display text-xl text-foreground mb-6">Monthly Revenue Trend</h3>
                <div className="flex items-end gap-3 h-48">
                  {[45, 62, 78, 55, 89, 95, 72, 88, 93, 67, 85, 92].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-gold rounded-t-sm transition-all duration-500 hover:opacity-80"
                        style={{ height: `${v}%` }}
                      />
                      <span className="font-body text-[10px] text-muted-foreground hidden sm:block">
                        {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="max-w-2xl bg-card border border-border p-8 rounded-sm">
                <h3 className="font-display text-xl text-foreground mb-8">Profile Settings</h3>
                <div className="space-y-6">
                  {[
                    { label: "Studio Name", value: "MBM Designs" },
                    { label: "Email", value: "hello@mbmdesigns.com" },
                    { label: "Phone", value: "+1 (555) 234-5678" },
                    { label: "Address", value: "123 Design Avenue, New York, NY" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="font-body text-xs tracking-wider uppercase text-muted-foreground block mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full bg-background border border-border px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  ))}
                  <button className="bg-gradient-gold font-body text-sm tracking-widest uppercase px-8 py-3 text-charcoal font-medium hover:opacity-90 transition-opacity mt-4">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
