import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HarmonyNav from './components/NavBar';
import ProjectGallery from './pages/ProjectGallery';
import './App.css';
import Kaggle from './pages/KaggleResults';
import NotFound from './pages/404';
import Todo from './pages/Todo';
import ContactMe from './pages/ContactMe'

function App() {

  return (
    <Router >
      <HarmonyNav />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectGallery />} />
          <Route path="/kaggle" element={<Kaggle />} />
          <Route path="/todo" element={<Todo />} />
          <Route path='/contact' element={<ContactMe />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
