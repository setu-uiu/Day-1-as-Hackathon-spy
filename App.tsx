
import React, { useState } from 'react';
import { AppView, UserSession } from './types';
import LandingPage from './components/LandingPage';
import AccessSelection from './components/AccessSelection';
import AgentLogin from './components/AgentLogin';
import ChiefLogin from './components/ChiefLogin';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [session, setSession] = useState<UserSession | null>(null);

  const handleStart = () => setCurrentView(AppView.ACCESS_TYPE);
  const handleSelectRole = (role: 'AGENT' | 'CHIEF') => {
    setCurrentView(role === 'AGENT' ? AppView.AGENT_LOGIN : AppView.CHIEF_LOGIN);
  };

  const handleLogin = (userSession: UserSession) => {
    setSession(userSession);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setSession(null);
    setCurrentView(AppView.LANDING);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onStart={handleStart} />;
      case AppView.ACCESS_TYPE:
        return <AccessSelection onBack={() => setCurrentView(AppView.LANDING)} onSelect={handleSelectRole} />;
      case AppView.AGENT_LOGIN:
        return <AgentLogin onBack={() => setCurrentView(AppView.ACCESS_TYPE)} onLogin={handleLogin} />;
      case AppView.CHIEF_LOGIN:
        return <ChiefLogin onBack={() => setCurrentView(AppView.ACCESS_TYPE)} onLogin={handleLogin} />;
      case AppView.DASHBOARD:
        return session ? <Dashboard session={session} onLogout={handleLogout} /> : null;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="scanline" />
      {renderView()}
    </div>
  );
};

export default App;
