import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Users, Shield, Calendar, Clock, Heart, 
  Menu, X, Star, ChevronDown, ChevronRight, Zap, BookOpen 
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('infants');
  const [formState, setFormState] = useState({ name: '', email: '', childAge: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const programs = {
    infants: { title: 'Infants (6-18 months)', desc: 'Gentle, nurturing environment focused on sensory play and developmental milestones.', schedule: ['8:00 AM Arrival', '9:30 AM Sensory Play', '11:00 AM Nap Time', '12:30 PM Lunch', '2:00 PM Outdoor Time'] },
    toddlers: { title: 'Toddlers (18-36 months)', desc: 'Active exploration, social interaction, and early language development.', schedule: ['8:30 AM Circle Time', '10:00 AM Art Projects', '11:30 AM Lunch', '1:00 PM Nap Time', '3:00 PM Gross Motor Play'] },
    preschool: { title: 'Preschool (3-5 years)', desc: 'School readiness through structured play, literacy, and STEM fundamentals.', schedule: ['9:00 AM Morning Meeting', '10:30 AM Phonics/Math', '12:00 PM Lunch', '1:30 PM Science Discovery', '3:00 PM Creative Projects'] }
  };

  const teachers = [
    { name: 'Sarah Miller', role: 'Lead Educator', cert: 'MA in Early Childhood Education' },
    { name: 'David Chen', role: 'Preschool Teacher', cert: 'BSc in Child Development' },
    { name: 'Elena Rodriguez', role: 'Infant Specialist', cert: 'Certified Infant Care Provider' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormState({ name: '', email: '', childAge: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-stone-800">
      {/* Nav */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xl">
            <Heart className="fill-orange-600" /> LittleSprouts Academy
          </div>
          <div className="hidden md:flex gap-8 font-medium text-stone-600">
            {['Programs', 'Teachers', 'Tuition', 'Enrol'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-600 transition">{item}</a>
            ))}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-20 px-4 text-center bg-orange-100">
        <h1 className="text-5xl md:text-6xl font-extrabold text-stone-900 mb-6">Where Little Minds <span className="text-orange-600">Blossom</span></h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10">Providing a safe, loving, and educational environment for your child's first milestones.</p>
        <a href="#enrol" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition shadow-lg">Schedule a Visit</a>
      </header>

      {/* Programs */}
      <section id="programs" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Age-Group Programs</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(programs).map(key => (
            <button 
              key={key} 
              onClick={() => setActiveTab(key)}
              className={`px-6 py-2 rounded-full font-semibold ${activeTab === key ? 'bg-orange-600 text-white' : 'bg-white border text-stone-600'}`}
            >
              {programs[key as keyof typeof programs].title.split(' (')[0]}
            </button>
          ))}
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h3 className="text-2xl font-bold mb-4">{programs[activeTab as keyof typeof programs].title}</h3>
          <p className="text-stone-600 mb-8">{programs[activeTab as keyof typeof programs].desc}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-4 text-orange-600"><Clock size={20} /> Daily Schedule</h4>
              <ul className="space-y-2">
                {programs[activeTab as keyof typeof programs].schedule.map((item, i) => (
                  <li key={i} className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers & Safety */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Meet Our Educators</h2>
            <div className="space-y-6">
              {teachers.map(t => (
                <div key={t.name} className="flex items-center gap-4 border-b pb-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Users /></div>
                  <div>
                    <p className="font-bold text-lg">{t.name}</p>
                    <p className="text-sm text-stone-500">{t.role} • {t.cert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Safety First</h2>
            <div className="space-y-6">
              {[
                { title: 'Licensed Facility', desc: 'Fully accredited by state childcare standards.' },
                { title: 'Secured Entry', desc: 'Biometric access control for all authorized guardians.' },
                { title: 'CPR Certified', desc: 'All staff undergo monthly safety and first-aid training.' }
              ].map(s => (
                <div key={s.title} className="flex gap-4">
                  <div className="text-orange-600"><Shield size={32} /></div>
                  <div>
                    <h4 className="font-bold">{s.title}</h4>
                    <p className="text-stone-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enrolment Form */}
      <section id="enrol" className="py-20 px-4 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Enrolment Enquiry</h2>
          {success ? (
            <div className="text-center py-12 text-green-600 font-bold text-xl"><CheckCircle className="mx-auto mb-4" /> Application Received! We'll be in touch soon.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Parent Name" className="w-full p-3 border rounded-lg" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
              <select className="w-full p-3 border rounded-lg" value={formState.childAge} onChange={e => setFormState({...formState, childAge: e.target.value})}>
                <option value="">Select Child Age</option>
                <option value="infant">6-18 Months</option>
                <option value="toddler">18-36 Months</option>
                <option value="preschool">3-5 Years</option>
              </select>
              <textarea placeholder="Any questions?" className="w-full p-3 border rounded-lg h-32" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
              <button disabled={isSubmitting} className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 bg-stone-900 text-stone-400 text-center px-4">
        <p>&copy; 2024 LittleSprouts Academy. All rights reserved.</p>
        <p className="mt-2 text-sm">123 Learning Lane, Sunshine City, CA 90210</p>
      </footer>
    </div>
  );
}