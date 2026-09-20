import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from 'lucide-react';

type Slot = { id: string; time: string; available: boolean };

const INITIAL_SLOTS: Slot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '01:00 PM', available: true },
  { id: '5', time: '02:00 PM', available: true },
  { id: '6', time: '03:00 PM', available: true },
  { id: '7', time: '04:00 PM', available: false },
];

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bookings, setBookings] = useState<{ date: string; time: string }[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bookings');
      if (saved) setBookings(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load bookings');
    }
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setStatus('loading');
    setTimeout(() => {
      const newBooking = {
        date: selectedDate.toDateString(),
        time: INITIAL_SLOTS.find(s => s.id === selectedSlot)?.time || '',
      };
      const updated = [...bookings, newBooking];
      setBookings(updated);
      localStorage.setItem('bookings', JSON.stringify(updated));
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-indigo-900">Schedule Your Session</h1>
          <p className="text-gray-500 mt-1">Select a date and an available time slot below.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Calendar Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={20}/></button>
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight size={20}/></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-gray-500">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isSelected = selectedDate.toDateString() === dateObj.toDateString();
                return (
                  <button
                    key={day}
                    onClick={() => { setSelectedDate(dateObj); setSelectedSlot(null); }}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600"/> 
              Available Slots for {selectedDate.toLocaleDateString()}
            </h3>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {INITIAL_SLOTS.map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                      !slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                      selectedSlot === slot.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 
                      'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {status === 'success' ? (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-4 rounded-lg">
                  <CheckCircle size={20} />
                  <span>Booking confirmed!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!selectedSlot || status === 'loading'}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
                >
                  {status === 'loading' ? 'Processing...' : 'Confirm Appointment'}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <h3 className="font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-2">
              {bookings.map((b, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <span className="font-medium text-gray-700">{b.date}</span>
                  <span className="text-indigo-600 font-bold">{b.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}