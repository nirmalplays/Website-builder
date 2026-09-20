import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Check, ArrowRight, Star } from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SLOTS = [
  "09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [selectedSlot, setSelectedSlot] = useState<string | null>("10:00 AM");

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <header className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-indigo-600">Zenith Consultations</h1>
            <p className="text-sm text-slate-500">Book your 60-minute strategy session</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              4.9/5 Rating
            </span>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Calendar Section */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'hover:bg-indigo-50 text-slate-700'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots Section */}
          <div className="p-6 bg-slate-50/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Available Time Slots
            </h3>
            
            {selectedDay ? (
              <div className="grid grid-cols-2 gap-3">
                {SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedSlot === slot
                        ? 'border-indigo-600 bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-400 text-sm italic">
                Please select a date from the calendar
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button 
                disabled={!selectedDay || !selectedSlot}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200"
              >
                Confirm Appointment
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                You can reschedule or cancel up to 24 hours before your session.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="max-w-4xl mx-auto mt-8 text-center text-slate-400 text-sm">
        &copy; 2024 Zenith Consulting Services. All rights reserved.
      </footer>
    </div>
  );
}