import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import TeamsPage from './TeamsPage';
import PlaybookPage from './PlaybookPage';
import PlayPage from './PlayPage';
import HomePage from './HomePage';
import Sidebar from "./Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">

      {/* Header */}
      <header className="flex justify-between items-center bg-green-600 text-white p-4">
        <Sidebar />

      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-gray-800 text-white w-64 p-4 space-y-4 
          ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="font-bold text-lg mb-4">Menu</div>
          <nav className="space-y-2">
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Dashboard</a>
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Settings</a>
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Profile</a>
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">Logout</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-4">Welcome to the Web App</h1>
          <p>This is your main content area. Resize the window to see responsiveness!</p>
        </main>
      </div>
    </div>
  );
}

export default App;
