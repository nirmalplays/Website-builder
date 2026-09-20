import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Clock, Phone, MapPin, Star, CheckCircle, 
  Dog, Cat, Zap, Shield, ChevronDown, Plus, Minus, X, AlertCircle 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dogs');
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    petType: 'dog',
    email: '',
    date: ''
  });

  const vets = [
    { name: "Dr. Sarah Jenkins", specialty: "Small Animal Surgery", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" },
    { name: "Dr. Marcus Thorne", specialty: "Exotic Pet Specialist", img: "https://images.unsplash.com/photo-1622253692010-333f2da604a4?auto=format&fit=crop&q=80&w=200" },
    { name: "Dr. Elena Rodriguez", specialty: "Dermatology & Allergy", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" }
  ];

  const plans = [
    { name: "Basic Wellness", price: 29, features: ["Annual Exam", "Core Vaccines", "Parasite Screen"] },
    { name: "Essential Plus", price: 49, features: ["Everything in Basic", "Dental Cleaning", "Bloodwork"] },
    { name: "Comprehensive Care", price: 89, features: ["Everything in Essential", "Unlimited Visits", "X-Ray Coverage"] }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
      setFormData({ ownerName: '', petName: '', petType: 'dog', email: '', date: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-2">
        <AlertCircle size={16} /> EMERGENCY? CALL US IMMEDIATELY: (555) 123-4567
      </div>

      {/* Nav */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-teal-700 flex items-center gap-2">
            <Heart className="fill-teal-700" /> Pawsitive Care
          </div>
          <div className="hidden md:flex gap-6 font-medium">
            <a href="#services" className="hover:text-teal-600">Services</a>
            <a href="#vets" className="hover:text-teal-600">Our Team</a>
            <a href="#plans" className="hover:text-teal-600">Plans</a>
            <a href="#booking" className="bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-teal-800">Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-teal-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">Expert Care for Your Furry Family</h1>
          <p className="text-xl text-slate-600 mb-8">Comprehensive veterinary services in a warm, compassionate environment.</p>
          <img src="https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1000" alt="Happy pets" className="rounded-2xl shadow-xl mx-auto" />
        </div>
      </header>

      {/* Services */}
      <section id="services" className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Specialized Care</h2>
        <div className="flex justify-center gap-4 mb-8">
          {['dogs', 'cats', 'exotics'].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-2 rounded-full capitalize ${activeTab === t ? 'bg-teal-700 text-white' : 'bg-white border'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold mb-4 capitalize">{activeTab} Wellness Program</h3>
          <p className="text-slate-600 mb-6">We provide tailored medical protocols for your {activeTab}, ensuring they live their healthiest life from kitten/puppyhood to their golden years.</p>
          <ul className="grid md:grid-cols-2 gap-4">
            {['Vaccinations', 'Dental Hygiene', 'Nutrition Counseling', 'Preventative Parasite Control'].map(item => (
              <li key={item} className="flex items-center gap-2"><CheckCircle className="text-teal-600" size={20} /> {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vets */}
      <section id="vets" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Veterinarians</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {vets.map(v => (
              <div key={v.name} className="text-center">
                <img src={v.img} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" alt={v.name} />
                <h4 className="font-bold text-lg">{v.name}</h4>
                <p className="text-teal-700 font-medium">{v.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-16 max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
          {formStatus === 'success' ? (
            <div className="text-center p-8 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle className="mx-auto mb-2" /> Booking Request Received! We'll call to confirm.
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <input required placeholder="Your Name" className="w-full p-3 border rounded-lg" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
              <input required placeholder="Pet's Name" className="w-full p-3 border rounded-lg" value={formData.petName} onChange={e => setFormData({...formData, petName: e.target.value})} />
              <select className="w-full p-3 border rounded-lg" value={formData.petType} onChange={e => setFormData({...formData, petType: e.target.value})}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="exotic">Exotic</option>
              </select>
              <input type="email" required placeholder="Email" className="w-full p-3 border rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <button disabled={formStatus === 'submitting'} className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition">
                {formStatus === 'submitting' ? 'Sending...' : 'Request Appointment'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Pawsitive Care</h4>
            <p>123 Veterinary Way<br />Pet Town, PT 90210</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Hours</h4>
            <p>Mon-Fri: 8am - 7pm<br />Sat: 9am - 2pm</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p>(555) 123-4567<br />hello@pawsitivecare.vet</p>
          </div>
        </div>
      </footer>
    </div>
  );
}