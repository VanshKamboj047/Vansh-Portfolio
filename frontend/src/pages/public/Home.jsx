import Navbar from '../../components/public/Navbar';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Skills from '../../components/public/Skills';
import Education from '../../components/public/Education';
import Expierence from '../../components/public/Expierence';
import Service from '../../components/public/Service';
import Achievement from '../../components/public/Achievement';
import FeaturedProjects from '../../components/public/FeaturedProjects';
import SocialProfiles from '../../components/public/SocialProfiles';
import Contact from '../../components/public/Contact';
import Footer from '../../components/public/Footer';
import RevealOnScroll from '../../components/public/RevealOnScroll';
import { useState } from 'react';

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <div>
      <Navbar />
      <Hero onLoaded={() => setHeroReady(true)} />
      {heroReady && (
        <>
          <RevealOnScroll><About /></RevealOnScroll>
          <RevealOnScroll><Skills /></RevealOnScroll>
          <RevealOnScroll><Expierence /></RevealOnScroll>
          <RevealOnScroll><Education /></RevealOnScroll>
          <RevealOnScroll><Service /></RevealOnScroll>
          <RevealOnScroll><FeaturedProjects /></RevealOnScroll>
          <RevealOnScroll><Achievement /></RevealOnScroll>
          <RevealOnScroll><SocialProfiles /></RevealOnScroll>
          <RevealOnScroll><Contact /></RevealOnScroll>
          <Footer />
        </>
      )}
    </div>
  );
}