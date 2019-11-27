import { GAME_SUBSCRIPTION } from '@/graphql/game';
import { useSubscription } from '@apollo/react-hooks';
import { useState, useEffect } from 'react';

interface History {
  type: string;
  timestamp: number;
}

// setTimeout timer for unsubscribe after 5 second
let timer: number;

type ResultItem = {
  name: string;
  blue: number;
  black: number;
  orange: number;
};

export default function useGame() {
  const [history, setHistory] = useState<History[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [result, setResult] = useState<ResultItem[]>([
    { name: '0', blue: 0, black: 0, orange: 0 },
    { name: '1', blue: 0, black: 0, orange: 0 },
    { name: '2', blue: 0, black: 0, orange: 0 },
    { name: '3', blue: 0, black: 0, orange: 0 },
    { name: '4', blue: 0, black: 0, orange: 0 },
    { name: '5', blue: 0, black: 0, orange: 0 },
  ]);

  function getResult(history: History[]): ResultItem[] {
    const result = [];
    const [first, ...rest] = history;

    const stats = rest
      .filter(item => item.timestamp - first.timestamp <= 5000)
      .map(item => ({
        type: item.type,
        second: Math.ceil((item.timestamp - history[0].timestamp) / 500) * 0.5,
      }));

    for (let second = 0; second <= 5; second += 0.5) {
      const secondStats = stats.filter(item => item.second === second);
      result.push({
        name: `${second}`,
        blue: secondStats.filter(item => item.type === 'BLUE').length,
        orange: secondStats.filter(item => item.type === 'ORANGE').length,
        get black() {
          return this.blue - this.orange;
        },
      });
    }

    return result;
  }

  useEffect(() => {
    if (isEnd) {
      setResult(getResult(history));
    }
  }, [isEnd]);

  useSubscription(GAME_SUBSCRIPTION, {
    skip: isEnd,
    onSubscriptionData: data => {
      if (data.subscriptionData.data.buttonClicked) {
        if (!timer) {
          timer = setTimeout(() => {
            setIsEnd(true);
          }, 5000);
        }

        setHistory([...history, data.subscriptionData.data.buttonClicked]);
      }
    },
  });

  return {
    history,
    orangeCount: history.filter(item => item.type === 'ORANGE').length,
    blueCount: history.filter(item => item.type === 'BLUE').length,
    result,
  };
}
