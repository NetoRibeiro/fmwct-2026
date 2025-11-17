import React, { useState } from 'react';
import type { Match, Prediction, User } from '../types';
import { getFlagEmoji } from '../data/mockData';
import { generateMatchHighlight, generateMatchPreview, generateVenuePreview } from '../services/geminiService';

interface MatchCardProps {
  match: Match;
  user: User | null;
  prediction?: Prediction;
  onPredictClick: (match: Match) => void;
}

const PlaceholderFootballIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.1C14.793 2.1 17.337 3.321 19.166 5.15M4.834 5.15C6.663 3.321 9.207 2.1 12 2.1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.9C9.207 21.9 6.663 20.679 4.834 18.85M19.166 18.85C17.337 20.679 14.793 21.9 12 21.9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.1 12C2.1 9.207 3.321 6.663 5.15 4.834M5.15 19.166C3.321 17.337 2.1 14.793 2.1 12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.9 12C21.9 14.793 20.679 17.337 18.85 19.166M18.85 4.834C20.679 6.663 21.9 9.207 21.9 12" />
    </svg>
);

const TeamDisplay: React.FC<{ team: { name: string; code: string }, score: number | null }> = ({ team, score }) => (
    <div className="flex flex-col items-center justify-center text-center w-2/5">
        <div className="text-4xl md:text-5xl h-12 md:h-14 flex items-center justify-center">
             {team.code === 'TBD' ? 
                <PlaceholderFootballIcon /> : 
                <span>{getFlagEmoji(team.code)}</span>
            }
        </div>
        <span className="mt-2 font-bold text-sm md:text-base truncate">{team.name}</span>
        {score !== null && <span className="text-2xl font-bold text-green-400">{score}</span>}
    </div>
);

const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

export const MatchCard: React.FC<MatchCardProps> = ({ match, user, prediction, onPredictClick }) => {
  const [aiContent, setAiContent] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const matchDate = new Date(match.date);

  const handleGenerateContent = async () => {
    setIsLoadingAi(true);
    setAiContent('');
    let content;
    if (match.status === 'finished') {
      content = await generateMatchHighlight(match);
    } else if (match.teamA.code === 'TBD') {
      content = await generateVenuePreview(match);
    } else {
      content = await generateMatchPreview(match);
    }
    setAiContent(content);
    setIsLoadingAi(false);
  };

  const getStatusChip = () => {
    switch (match.status) {
      case 'finished':
        return <span className="text-xs font-semibold px-2 py-1 bg-red-600 text-white rounded-full">Finished</span>;
      case 'inprogress':
        return <span className="text-xs font-semibold px-2 py-1 bg-yellow-500 text-black rounded-full animate-pulse">Live</span>;
      case 'scheduled':
        return <span className="text-xs font-semibold px-2 py-1 bg-blue-600 text-white rounded-full">Scheduled</span>;
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="p-4">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
            <span>{match.stadium}</span>
            {getStatusChip()}
        </div>
        <div className="flex items-center justify-around mb-4">
          <TeamDisplay team={match.teamA} score={match.scoreA} />
          <div className="text-gray-400 text-2xl font-light">vs</div>
          <TeamDisplay team={match.teamB} score={match.scoreB} />
        </div>
        <div className="text-center text-xs text-gray-400">
            {matchDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      <div className="bg-gray-700/50 p-4">
        {prediction && user && (
          <div className="text-center text-sm mb-2 text-green-300">
            Your Prediction: {prediction.scoreA} - {prediction.scoreB}
          </div>
        )}
        {aiContent && <p className="text-xs text-gray-300 mb-2 italic text-center">{aiContent}</p>}

        <div className="flex space-x-2">
            <button 
                onClick={handleGenerateContent}
                disabled={isLoadingAi}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors flex items-center justify-center disabled:opacity-50"
            >
                {isLoadingAi ? <LoadingSpinner /> : (match.status === 'finished' ? 'Highlights' : (match.teamA.code === 'TBD' ? 'Venue Info' : 'Preview'))}
            </button>
            {user && match.status === 'scheduled' && match.teamA.code !== 'TBD' && (
                <button 
                    onClick={() => onPredictClick(match)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors"
                >
                    {prediction ? 'Edit Bet' : 'Place Bet'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
