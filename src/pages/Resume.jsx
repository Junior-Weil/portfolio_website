import React, { Suspense } from 'react';
import GradientMarqueeText from '../components/AnimatedGradientText';
import {OrbitProgress} from 'react-loading-indicators';

const resume = () => {
  return (
    <div className="w-screen justify-center">
      <div className="p-10 w-3/4 min-h-screen bg-white flex flex-col items-center justify-center">
        <GradientMarqueeText
          text="My Resume"
          gradientColors={["#1F1C2C", "#928DAB", "#1F1C2C"]}
          className="text-5xl font-extrabold tracking-tight p-10"
        />
        <Suspense
        fallback={<OrbitProgress variant="disc" color="#a9a9a9" size="medium" />}
        >
          <iframe
            src={"/Resume.pdf"}
            title="Resume PDF"
            className="w-full max-w-5xl h-[90vh] border rounded-lg shadow-lg"
          />
        </Suspense>
        <a
          href={"/Resume.pdf"}
          download
          className="mt-6 text-blue-600 hover:underline text-lg"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default resume;
