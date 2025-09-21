import React from 'react';
import GradientMarqueeText from '../components/AnimatedGradientText';

const Home = () => {
  return (
    <div className="p-10 bg-white w-full min-h-screen flex flex-col items-center justify-start">
      {/* Header */}
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <GradientMarqueeText
          text="About Me"
          gradientColors={["#1F1C2C", "#928DAB", "#1F1C2C"]}
          className="text-5xl font-extrabold tracking-tight"
        />
        <img
          src={"/SelfPortrait.jpeg"}
          alt="Self Portrait"
          className="rounded-full w-28 h-28 ml-6 shadow-lg object-cover border-4 border-gray-200"
        />
      </div>

      {/* Bio */}
      <div className="max-w-3xl text-center text-gray-800">
        <p className="text-xl leading-relaxed">
          Hi, I'm Junior—an engineer and creative technologist with a passion for building
          innovative, user-focused web applications. I recently graduated with a B.S. in Computer
          Science & Engineering and a minor in Physics from Bucknell University, and have since
          been working on projects at the intersection of AI, full-stack development, and automation.
        </p>

        <p className="text-xl leading-relaxed mt-6">
          I’ve developed AI-powered mobile apps, backend pipelines for real-world data ingestion,
          and interactive dashboards that make complex systems usable. Whether I’m building a
          trading bot using NLP or contributing to open-source tools, I thrive on solving problems
          that blend functionality with great user experience.
        </p>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-left">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Programming Languages</h3>
            <ul className="list-disc list-inside text-lg">
              <li>Python</li>
              <li>JavaScript / TypeScript</li>
              <li>C / C++</li>
              <li>HTML / CSS</li>
              <li>SQL</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Frameworks & Tools</h3>
            <ul className="list-disc list-inside text-lg">
              <li>React, Next.js, Node.js, Express</li>
              <li>MariaDB, PostgreSQL</li>
              <li>TensorFlow, Hugging Face</li>
              <li>Git, Linux, Docker</li>
            </ul>
          </div>
        </div>

        {/* Interests */}
        <div className="mt-10">
          <h3 className="font-semibold text-gray-900 mb-2">What I'm Passionate About</h3>
          <p className="text-lg">
            AI development, intuitive UX design, building scalable web apps, open-source contributions,
            and empowering users with smart, elegant technology.
          </p>
        </div>

        {/* Hobbies */}
        <div className="mt-10">
          <h3 className="font-semibold text-gray-900 mb-2">Outside of Tech</h3>
          <p className="text-lg">
            When I’m not coding, you can find me exploring new bouldering, gaming, reading about
            physics or tech trends, or brainstorming my next side project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
