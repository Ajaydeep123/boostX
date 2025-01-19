'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { Menu } from '../components/landingpage/Menu';
import HeroSection from '../components/landingpage/HeroSection';
import Partners from '../components/landingpage/Partners';
import Banner from '../components/landingpage/Banner';
import FeatureCards from '../components/landingpage/FeatureCards';
import Features from '../components/landingpage/SecondFeatures';
import FAQ from '../components/landingpage/FAQ';
import Testimonials from '../components/landingpage/Testimonials';
import Contact from '../components/landingpage/Contact';
import Footer from '../components/landingpage/Footer';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });

  return (
    <div className="mb-40 mt-0 h-auto">
      <Menu />
      <HeroSection />
      <Partners />
      <Banner />
      <FeatureCards />
      <Features />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
