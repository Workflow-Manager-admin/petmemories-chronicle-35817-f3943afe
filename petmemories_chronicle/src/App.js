import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import major components
import Navbar from './components/Navbar';
import PetProfile from './components/PetProfile';
import Timeline from './components/Timeline';
import Photos from './components/Photos';
import Milestones from './components/Milestones';
import Scrapbook from './components/Scrapbook';
import ShareModal from './components/ShareModal';

import { PetProvider } from './context/PetContext';

function App() {
  // Share modal state (present throughout the app)
  const [shareOpen, setShareOpen] = React.useState(false);

  return (
    <PetProvider>
      <Router>
        <div className="app light-theme">
          <Navbar onShare={() => setShareOpen(true)} />
          <main className="main-content">
            <div className="container" style={{paddingTop: 80, paddingBottom: 36}}>
              <Routes>
                <Route path="/" element={<PetProfile />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/milestones" element={<Milestones />} />
                <Route path="/scrapbook" element={<Scrapbook />} />
              </Routes>
            </div>
            {shareOpen && (
              <ShareModal onClose={() => setShareOpen(false)} />
            )}
          </main>
        </div>
      </Router>
    </PetProvider>
  );
}

export default App;
