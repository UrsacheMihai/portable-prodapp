import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import Scheduler from './pages/Scheduler';
import { ParticleBackground } from './components/ParticleBackground';

// IMPORTANT: For GitHub Pages deployment:
// 1. Update package.json "homepage" field with your GitHub Pages URL
// 2. Use HashRouter (already implemented) for client-side routing
// 3. Set base URL in vite.config.ts (already done)
// 4. Deploy to gh-pages branch

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30 text-white">
        <ParticleBackground />

        {/* Navigation */}
        <nav className="relative bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="text-white font-semibold text-lg flex items-center space-x-2 hover:text-blue-400 transition"
                >
                  <Clock className="h-6 w-6" />
                  <span>Scheduler</span>
                </Link>
                
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-blue-400 transition"
                  >
                    Home
                  </Link>
                  <Link
                    to="/todo"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-blue-400 transition"
                  >
                    TO-DO List
                  </Link>
                  <Link
                    to="/scheduler"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 hover:text-blue-400 transition"
                  >
                    Scheduler
                  </Link>
                </div>
              </div>
              
              <div className="text-sm font-medium bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="relative max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/scheduler" element={<Scheduler />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;