import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Leaves from './components/Leaves';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/Post';
import CategoryPage from './pages/Category';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { toggle } = useTheme();

  return (
    <BrowserRouter>
      <CustomCursor />
      <ParticleBackground />
      <Leaves />
      <Nav onThemeToggle={toggle} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:cat/:id" element={<PostPage />} />
        <Route path="/category/:cat" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
