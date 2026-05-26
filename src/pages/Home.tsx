import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Categories from '../components/Categories';
import PostsList from '../components/PostsList';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Categories />
      <PostsList />
      <Gallery />
      <Contact />
    </>
  );
}
