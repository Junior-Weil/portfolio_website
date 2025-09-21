import React from 'react';
import FlipCard from '../components/FlipCard';
import GradientMarqueeText from "../components/AnimatedGradientText";
import TestimonialsGrid from '../components/Grid';


const ProjectGallery = () => {
  const handleCardClick = () => {
    window.open(
      'https://docs.google.com/document/d/1R62fZxs_eFVezG9opYTs5jEd1oRQatV5bLbR9Gc6CI4/preview',
      '_blank'
    );
  };

  return (
    <div className="p-10 bg-white w-full min-h-screen overflow-hidden flex-col items-center justify-center rounded">
      <TestimonialsGrid />
    </div>
  );
};

export default ProjectGallery;
