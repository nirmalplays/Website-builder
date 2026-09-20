import React from 'react';
import { 
  Mail, 
  ArrowRight, 
  Zap, 
  Shield, 
  Code, 
  Database, 
  Layout, 
  Smartphone, 
  Globe,
  Calendar,
  ChevronRight,
  User,
  Star
} from 'lucide-react';

export default function App() {
  const projects = [
    { title: "Quantum Task Manager", desc: "A real-time collaborative productivity suite built for enterprise teams.", tags: ["React", "Node.js", "WebSockets"] },
    { title: "EcoTrack Analytics", desc: "Carbon footprint monitoring dashboard for manufacturing supply chains.", tags: ["TypeScript", "D3.js", "PostgreSQL"] },
    { title: "Velocity Framework", desc: "Lightweight CSS animation library used by over 500+ active repositories.", tags: ["CSS", "JavaScript", "Webpack"] },
    { title: "CyberGuard API", desc: "Automated security scanning tool for RESTful API endpoints.", tags: ["Python", "Docker", "AWS"] },
    { title: "Nomad Travel Planner", desc: "AI-driven itinerary builder for long-term digital nomads.", tags: ["Next.js", "OpenAI API", "Tailwind"] }
  ];

  const experience = [
    { role: "Senior Frontend Engineer", company: "Nebula Systems", period: "2021 - Present" },
    { role: "Full Stack Developer", company: "Vertex Digital", period: "2018 - 2021" },
    { role: "Junior Web Developer", company: "Pixel Craft Studio", period: "2016 - 2018" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tight text-indigo-600">alex.dev</span>
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-20 md:py-32">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
            Building digital <br />
            <span className="text-indigo-600">experiences</span> that matter.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
            I'm Alex Rivera, a software architect specializing in scalable web applications and intuitive user interfaces. Passionate about clean code and performance.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all">
            Start a project <ArrowRight size={18} />
          </a>
        </section>

        {/* About */}
        <section id="about" className="py-20 border-t border-slate-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-200 rounded-2xl aspect-square w-full flex items-center justify-center text-slate-400">
              <User size={64} strokeWidth={1} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Beyond the keyboard.</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                With over 8 years of experience, I’ve navigated the evolution of the web from jQuery to modern meta-frameworks. I believe in the power of simplicity and data-driven design. When I'm not coding, you'll find me hiking local trails or contributing to open-source climate tech projects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, label: "Frontend Architecture" },
                  { icon: Database, label: "Systems Design" },
                  { icon: Zap, label: "Performance Tuning" },
                  { icon: Shield, label: "Security Auditing" }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                    <s.icon size={20} className="text-indigo-600" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 border-t border-slate-200">
          <h2 className="text-3xl font-bold mb-12">Selected Work</h2>
          <div className="grid gap-6">
            {projects.map((p, i) => (
              <div key={i} className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600">{p.title}</h3>
                    <p className="text-slate-600 mb-4">{p.desc}</p>
                    <div className="flex gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 border-t border-slate-200">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experience.map((ex, i) => (
              <div key={i} className="flex items-center gap-6 border-l-2 border-indigo-100 pl-6 py-2">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-lg">{ex.role}</h4>
                    <span className="text-sm text-slate-500 font-mono flex items-center gap-2">
                      <Calendar size={14} /> {ex.period}
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium">{ex.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-slate-200 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's connect</h2>
          <p className="text-slate-600 mb-10 max-w-md mx-auto">
            Currently accepting new projects and consulting opportunities. Let's discuss your vision.
          </p>
          <a 
            href="mailto:alex@example.com" 
            className="inline-flex items-center gap-3 text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <Mail /> alex.rivera@example.com
          </a>
        </section>
      </main>

      <footer className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Alex Rivera. All rights reserved.
        </div>
      </footer>
    </div>
  );
}