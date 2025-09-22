import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HarmonyNav from './components/NavBar';
import ProjectGallery from './pages/ProjectGallery';
import './App.css';
import Resume from './pages/Resume';
import Kaggle from './pages/KaggleResults';
import NotFound from './pages/404';
import Todo from './pages/Todo';

function App() {

  return (
    <Router >
      <HarmonyNav />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectGallery />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/kaggle" element={<Kaggle />} />
          <Route path="/todo" element={<Todo />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
