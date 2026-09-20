import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Search, 
  MoreHorizontal, 
  Plus, 
  Clock, 
  Check, 
  CheckCircle, 
  User, 
  Trash2,
  Menu,
  X
} from 'lucide-react';

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  messages: Message[];
};

const INITIAL_DATA: Conversation[] = [
  {
    id: '1',
    contactName: 'Sarah Jenkins',
    lastMessage: 'Let’s meet at the cafe tomorrow.',
    timestamp: '10:42 AM',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    messages: [
      { id: 'm1', senderId: '1', text: 'Hey, did you see the project brief?', timestamp: '09:00 AM' },
      { id: 'm2', senderId: 'me', text: 'Yes, looking it over now!', timestamp: '09:05 AM' },
      { id: 'm3', senderId: '1', text: 'Let’s meet at the cafe tomorrow.', timestamp: '10:42 AM' }
    ]
  },
  {
    id: '2',
    contactName: 'Marcus Thorne',
    lastMessage: 'The report is ready for review.',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    messages: [
      { id: 'm4', senderId: '2', text: 'The report is ready for review.', timestamp: 'Yesterday' }
    ]
  }
];

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('chat_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch { return INITIAL_DATA; }
  });

  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_DATA[0].id);
  const [messageInput, setMessageInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chat_data', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChatId, conversations]);

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeChatId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          timestamp: 'Just now'
        };
      }
      return conv;
    }));
    setMessageInput('');
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) setActiveChatId(conversations[0]?.id || '');
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="font-bold text-xl text-indigo-600">Messenger</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full"><Plus className="w-5 h-5" /></button>
        </div>
        
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Search conversations..."
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => setActiveChatId(conv.id)}
              className={`w-full p-4 flex items-center gap-3 border-b hover:bg-gray-50 ${activeChatId === conv.id ? 'bg-indigo-50 hover:bg-indigo-50' : ''}`}
            >
              <img src={conv.avatar} alt={conv.contactName} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{conv.contactName}</span>
                  <span className="text-xs text-gray-400">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              <button onClick={(e) => deleteConversation(conv.id, e)} className="text-gray-300 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-white">
        <header className="h-16 border-b flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <img src={activeChat.avatar} className="w-8 h-8 rounded-full" alt="" />
              <h2 className="font-semibold">{activeChat.contactName}</h2>
            </div>
          </div>
          <button className="text-gray-500"><MoreHorizontal /></button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeChat.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${msg.senderId === 'me' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 rounded-tl-none'}`}>
                <p className="text-sm">{msg.text}</p>
                <div className={`text-[10px] mt-1 opacity-70 flex items-center gap-1 ${msg.senderId === 'me' ? 'justify-end' : ''}`}>
                  <Clock className="w-3 h-3" /> {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <input 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Type your message..."
          />
          <button 
            disabled={!messageInput.trim()}
            className="bg-indigo-600 text-white p-3 rounded-xl disabled:bg-gray-300 hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </main>
    </div>
  );
}