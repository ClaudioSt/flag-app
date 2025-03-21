import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeamsPage from './TeamsPage';
import PlaybookPage from './PlaybookPage';
import PlayPage from './PlayPage';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app/teams" element={<TeamsPage />} />
          <Route path="/app/playbook/:id" element={<PlaybookPage />} />
          <Route path="/app/playbook/:id/plays/:playId" element={<PlayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
