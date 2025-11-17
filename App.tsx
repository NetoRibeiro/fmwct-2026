import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import type { Tab, User, Match, Prediction, Group, Stadium } from './types';
import { Header } from './components/Header';
import { MatchCard } from './components/MatchCard';
import { Modal } from './components/Modal';
import { groups as groupData, matches as matchData, stadiums as stadiumData, getFlagEmoji } from './data/mockData';
import { CountdownView } from './components/CountdownView';

// --- AUTH CONTEXT ---
interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

// --- HOME VIEW ---
const Home: React.FC<{
    matches: Match[],
    user: User | null,
    predictions: Prediction[],
    onPredictClick: (match: Match) => void
}> = ({ matches, user, predictions, onPredictClick }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

    const todaysMatches = matches.filter(m => isSameDay(new Date(m.date), today) && m.status === 'scheduled');
    const yesterdaysMatches = matches.filter(m => isSameDay(new Date(m.date), yesterday) && m.status === 'finished');
    const upcomingMatches = matches.filter(m => new Date(m.date) >= today && m.status === 'scheduled');

    const MatchList: React.FC<{title: string, matchList: Match[]}> = ({ title, matchList }) => (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-green-400 border-b-2 border-green-400/30 pb-2">{title}</h2>
            {matchList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {matchList.map(match => (
                        <MatchCard
                            key={match.id}
                            match={match}
                            user={user}
                            prediction={predictions.find(p => p.matchId === match.id)}
                            onPredictClick={onPredictClick}
                        />
                    ))}
                </div>
            ) : <p className="text-gray-400">No matches scheduled.</p>}
        </div>
    );
    
    return (
        <>
            { todaysMatches.length > 0 && <MatchList title="Today's Matches" matchList={todaysMatches} /> }
            { yesterdaysMatches.length > 0 && <MatchList title="Yesterday's Highlights" matchList={yesterdaysMatches} /> }
            <MatchList title="Upcoming Fixtures" matchList={upcomingMatches} />
        </>
    );
};

// --- GROUPS VIEW ---
const Groups: React.FC<{ groups: Group[] }> = ({ groups }) => (
    <div>
        <h2 className="text-3xl font-bold mb-6 text-green-400">Tournament Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map(group => (
                <div key={group.name} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                    <h3 className="font-bold text-xl mb-3 text-white">{group.name}</h3>
                    <ul>
                        {group.teams.map((team, index) => (
                            <li key={index} className="flex items-center p-2 border-b border-gray-700 last:border-b-0">
                                <span className="text-lg mr-4">TBD</span>
                                <span className="text-gray-200">{team.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);

// --- STADIUMS VIEW ---
const Stadiums: React.FC<{ stadiums: Stadium[] }> = ({ stadiums }) => (
    <div>
        <h2 className="text-3xl font-bold mb-6 text-green-400">Host Stadiums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stadiums.map(stadium => (
                <div key={stadium.name} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <img src={stadium.image} alt={stadium.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-bold text-xl text-white">{stadium.name}</h3>
                        <p className="text-gray-400 text-sm">{stadium.city}, {getFlagEmoji(stadium.country === 'USA' ? 'US' : stadium.country.substring(0,2).toUpperCase())} {stadium.country}</p>
                        <p className="text-green-400 mt-2 font-semibold">Capacity: {stadium.capacity.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


// --- APP COMPONENT ---
export default function App() {
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [user, setUser] = useState<User | null>(null);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isPredictionModalOpen, setPredictionModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    
    const [username, setUsername] = useState("");
    const [predScoreA, setPredScoreA] = useState(0);
    const [predScoreB, setPredScoreB] = useState(0);

    const drawDate = new Date('2025-12-05T00:00:00Z');
    const now = new Date();

    if (now < drawDate) {
        return <CountdownView drawDate={drawDate} />;
    }

    const login = useCallback((username: string) => {
        if (username.trim()) {
            setUser({ username: username.trim() });
            setLoginModalOpen(false);
            setUsername("");
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setPredictions([]);
    }, []);

    const handlePredictClick = useCallback((match: Match) => {
        setSelectedMatch(match);
        const existingPrediction = predictions.find(p => p.matchId === match.id);
        setPredScoreA(existingPrediction?.scoreA ?? 0);
        setPredScoreB(existingPrediction?.scoreB ?? 0);
        setPredictionModalOpen(true);
    }, [predictions]);

    const handleSavePrediction = () => {
        if (!selectedMatch) return;
        const newPredictions = predictions.filter(p => p.matchId !== selectedMatch.id);
        newPredictions.push({ matchId: selectedMatch.id, scoreA: predScoreA, scoreB: predScoreB });
        setPredictions(newPredictions);
        setPredictionModalOpen(false);
        setSelectedMatch(null);
    };

    const authContextValue = useMemo(() => ({ user, login, logout }), [user, login, logout]);

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <Home matches={matchData} user={user} predictions={predictions} onPredictClick={handlePredictClick} />;
            case 'groups':
                return <Groups groups={groupData} />;
            case 'stadiums':
                return <Stadiums stadiums={stadiumData} />;
            default:
                return <Home matches={matchData} user={user} predictions={predictions} onPredictClick={handlePredictClick} />;
        }
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className="min-h-screen bg-gray-900 font-sans">
                <Header 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    user={user} 
                    onLoginClick={() => setLoginModalOpen(true)}
                    onLogout={logout}
                />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {renderContent()}
                </main>
                
                {/* Login Modal */}
                <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} title="Login">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button onClick={() => login(username)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                            Login
                        </button>
                    </div>
                </Modal>

                {/* Prediction Modal */}
                {selectedMatch && (
                  <Modal isOpen={isPredictionModalOpen} onClose={() => setPredictionModalOpen(false)} title={`Predict: ${selectedMatch.teamA.name} vs ${selectedMatch.teamB.name}`}>
                       <div className="flex items-center justify-around space-x-4">
                           <div className="text-center">
                               <label className="block mb-2 font-semibold">{getFlagEmoji(selectedMatch.teamA.code)} {selectedMatch.teamA.name}</label>
                               <input type="number" min="0" value={predScoreA} onChange={(e) => setPredScoreA(parseInt(e.target.value, 10))} className="w-20 text-center px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" />
                           </div>
                           <div className="text-2xl text-gray-400">-</div>
                           <div className="text-center">
                               <label className="block mb-2 font-semibold">{getFlagEmoji(selectedMatch.teamB.code)} {selectedMatch.teamB.name}</label>
                               <input type="number" min="0" value={predScoreB} onChange={(e) => setPredScoreB(parseInt(e.target.value, 10))} className="w-20 text-center px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500" />
                           </div>
                       </div>
                       <button onClick={handleSavePrediction} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                            Save Prediction
                       </button>
                  </Modal>
                )}
            </div>
        </AuthContext.Provider>
    );
}
