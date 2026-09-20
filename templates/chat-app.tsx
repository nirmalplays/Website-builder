import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  MoreHorizontal, 
  Send, 
  Paperclip, 
  Smile, 
  Clock, 
  CheckCircle,
  Zap,
  User,
  Settings,
  Bell
} from 'lucide-react';

const CONVERSATIONS = [
  { id: 1, name: "Sarah Jenkins", role: "Product Designer", lastMessage: "Let's review the wireframes at 3pm?", time: "10:42 AM", unread: 2, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { id: 2, name: "Marcus Thorne", role: "Engineering Lead", lastMessage: "The API deployment went smooth.", time: "9:15 AM", unread: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: 3, name: "Elena Rodriguez", role: "Marketing Specialist", lastMessage: "Did we approve the ad budget?", time: "Yesterday", unread: 0, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" },
  { id: 4, name: "David Chen", role: "Frontend Developer", lastMessage: "Found a bug in the navigation component.", time: "Tuesday", unread: 0, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" },
];

const MESSAGES = [
  { id: 1, sender: "other", text: "Hey Sarah, are you available for a quick sync?", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Hi Marcus! Yes, I have some time in about 15 minutes. Does that work for you?", time: "10:32 AM" },
  { id: 3, sender: "other", text: "Perfect. I'll send over the meeting link shortly. I also wanted to discuss the new feature request from the client.", time: "10:35 AM" },
  { id: 4, sender: "me", text: "Sounds good. Should I invite the rest of the design team?", time: "10:38 AM" },
  { id: 5, sender: "other", text: "No, let's keep it small for now. Just us two is enough to align on the scope.", time: "10:40 AM" },
];

export default function App() {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-200 bg-white flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-indigo-600 text-xl">
            <Zap size={24} />
            <span>FluxChat</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><Menu size={20} /></button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((chat) => (
            <button 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full p-4 flex items-center gap-4 hover:bg-indigo-50 transition-colors ${activeChat.id === chat.id ? 'bg-indigo-50' : ''}`}
            >
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 truncate">{chat.name}</span>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
              <p className="text-[10px] text-green-500 flex items-center gap-1"><CheckCircle size={10} /> Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button><Bell size={20} /></button>
            <button><Settings size={20} /></button>
            <button><MoreHorizontal size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`text-[10px] mt-1 flex items-center gap-1 ${msg.sender === 'me' ? 'text-indigo-200 justify-end' : 'text-gray-400'}`}>
                  <Clock size={10} /> {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <footer className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2">
            <button className="p-2 text-gray-500 hover:text-indigo-600"><Paperclip size={20} /></button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
            />
            <button className="p-2 text-gray-500 hover:text-indigo-600"><Smile size={20} /></button>
            <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}