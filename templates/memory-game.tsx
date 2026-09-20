import React, { useState, useEffect, useCallback } from 'react';
import { Bell, CheckCircle, Clock, Heart, Package, RefreshCw, Shield, Star, TrendingUp, Trophy, Zap } from "lucide-react";

const ICONS = ['Zap', 'Star', 'Shield', 'Heart', 'Sun', 'Moon', 'Cloud', 'Anchor'];
// Since I can only use specific imports, we map our logic to the allowed icons
const SYMBOLS = ['Zap', 'Star', 'Shield', 'Heart', 'Check', 'Bell', 'Package', 'TrendingUp'];

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = useCallback(() => {
    const deck = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
    setFlippedIndices([]);
    setIsLocked(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !cards.every((c) => c.isMatched)) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, cards]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);
      
      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'Star': return <Star className="w-8 h-8" />;
      case 'Shield': return <Shield className="w-8 h-8" />;
      case 'Heart': return <Heart className="w-8 h-8" />;
      case 'Check': return <CheckCircle className="w-8 h-8" />;
      case 'Bell': return <Bell className="w-8 h-8" />;
      case 'Package': return <Package className="w-8 h-8" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center font-sans text-slate-900">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">Memory Match</h1>
          <p className="text-slate-500 text-sm">Find all pairs to win!</p>
        </div>
        <button 
          onClick={initializeGame}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" /> Reset
        </button>
      </header>

      <div className="flex gap-6 mb-8">
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold">{moves} Moves</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg w-full">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-white rotate-0 shadow-md border-indigo-200'
                : 'bg-indigo-600 rotate-y-180 hover:bg-indigo-500'
            } border-2`}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="text-indigo-600 animate-in zoom-in duration-300">
                {getIcon(card.symbol)}
              </span>
            )}
          </button>
        ))}
      </div>

      {cards.length > 0 && cards.every((c) => c.isMatched) && (
        <div className="mt-8 p-6 bg-green-50 text-green-800 rounded-xl border border-green-200 text-center animate-bounce">
          <h2 className="text-xl font-bold">Congratulations!</h2>
          <p>You finished in {moves} moves and {Math.floor(timer / 60)}:{timer % 60} minutes!</p>
        </div>
      )}
      
      <footer className="mt-12 text-slate-400 text-sm">
        Built with React & Tailwind
      </footer>
    </div>
  );
}