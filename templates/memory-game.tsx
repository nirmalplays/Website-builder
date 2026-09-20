import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Clock, Trophy, Zap, Star } from 'lucide-react';

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const SYMBOLS = ['🚀', '🌟', '💎', '🎨', '🎯', '🌈', '🧩', '⚡'];

const shuffle = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createInitialCards = (): Card[] => {
  const deck = [...SYMBOLS, ...SYMBOLS];
  return shuffle(deck).map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
};

export default function App() {
  const [cards, setCards] = useState<Card[]>(createInitialCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    try {
      return parseInt(localStorage.getItem('memory-best-score') || '0') || null;
    } catch { return null; }
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCardClick = (id: number) => {
    if (isLocked || cards[id].isFlipped || cards[id].isMatched) return;

    if (!isPlaying) setIsPlaying(true);

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    if (newFlippedIds.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);
      checkMatch(newFlippedIds, newCards);
    }
  };

  const checkMatch = (ids: number[], currentCards: Card[]) => {
    const [firstId, secondId] = ids;
    const isMatch = currentCards[firstId].symbol === currentCards[secondId].symbol;

    setTimeout(() => {
      const updatedCards = [...currentCards];
      if (isMatch) {
        updatedCards[firstId].isMatched = true;
        updatedCards[secondId].isMatched = true;
      } else {
        updatedCards[firstId].isFlipped = false;
        updatedCards[secondId].isFlipped = false;
      }
      setCards(updatedCards);
      setFlippedIds([]);
      setIsLocked(false);

      if (updatedCards.every((c) => c.isMatched)) {
        setIsPlaying(false);
        if (!bestScore || moves + 1 < bestScore) {
          setBestScore(moves + 1);
          localStorage.setItem('memory-best-score', (moves + 1).toString());
        }
      }
    }, 1000);
  };

  const resetGame = () => {
    setCards(createInitialCards());
    setFlippedIds([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-md w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 flex items-center justify-center gap-2">
            <Zap className="text-amber-500" /> Memory Match
          </h1>
          <p className="text-slate-500">Flip the cards to find matching pairs!</p>
        </header>

        <div className="grid grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Moves</div>
            <div className="text-2xl font-bold text-slate-800">{moves}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Time</div>
            <div className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-1">
              <Clock size={16} /> {formatTime(timer)}
            </div>
          </div>
          <div className="text-center col-span-2">
            <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Best Score</div>
            <div className="text-2xl font-bold text-amber-600 flex items-center justify-center gap-1">
              <Trophy size={16} /> {bestScore ? `${bestScore} moves` : '-'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isLocked || card.isMatched}
              className={`aspect-square rounded-xl text-3xl transition-all duration-300 transform preserve-3d shadow-sm flex items-center justify-center
                ${card.isFlipped || card.isMatched 
                  ? 'bg-white rotate-y-180 border-2 border-amber-400' 
                  : 'bg-slate-800 hover:bg-slate-700 border-2 border-slate-900'}`}
            >
              <span className={card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}>
                {card.symbol}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors active:scale-95"
        >
          <RefreshCw size={20} />
          {cards.every((c) => c.isMatched) ? 'Play Again' : 'Reset Game'}
        </button>
      </div>

      <footer className="mt-12 text-slate-400 text-sm flex gap-4">
        <div className="flex items-center gap-1"><Star size={14} className="text-amber-400"/> Concentration Mode</div>
      </footer>
    </div>
  );
}