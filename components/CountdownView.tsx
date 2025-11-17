import React, { useState, useEffect } from 'react';

const calculateTimeLeft = (drawDate: Date) => {
  const difference = +drawDate - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const TimeBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-4 md:p-6 w-24 h-24 md:w-32 md:h-32 backdrop-blur-sm">
        <span className="text-4xl md:text-6xl font-bold text-green-400">{String(value).padStart(2, '0')}</span>
        <span className="text-sm md:text-base text-gray-300 uppercase tracking-wider">{label}</span>
    </div>
);

export const CountdownView: React.FC<{ drawDate: Date }> = ({ drawDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(drawDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(drawDate));
        }, 1000);

        return () => clearTimeout(timer);
    });

    const hasTimeLeft = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center font-sans overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/worldcupbg/1920/1080')"}}></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-fade-in-down">FIFA World Cup 2026™</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
                    The Final Draw takes place in Washington DC on December 5, 2025.
                    <br/>
                    The countdown has begun!
                </p>
                <div className="flex justify-center items-center space-x-2 md:space-x-4">
                    {hasTimeLeft ? (
                        <>
                            <TimeBox value={timeLeft.days} label="Days" />
                            <TimeBox value={timeLeft.hours} label="Hours" />
                            <TimeBox value={timeLeft.minutes} label="Minutes" />
                            <TimeBox value={timeLeft.seconds} label="Seconds" />
                        </>
                    ) : (
                        <span className="text-2xl text-green-400 font-bold">The draw is happening!</span>
                    )}
                </div>
            </div>
        </div>
    );
};
