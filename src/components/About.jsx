import React from "react";

const About = () => {
  return (
    <div className="bg-linear-to-r from-purple-100 via-pink-50 to-yellow-100 min-h-screen flex flex-col items-center justify-center px-6 py-16">
  
     

      {/* Content container */}
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl w-full gap-10">
        {/* Illustration */}
        <div className="flex justify-center md:flex-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" // Example book illustration
            alt="Books Illustration"
            className="w-64 md:w-80 animate-bounce-slow"
          />
        </div>

        {/* Text content */}
        <div className="md:flex-1 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6">
            Discover Your Next Favorite Book
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            At MyBookStore, we believe every book tells a story that can inspire,
            educate, and entertain. From timeless classics to modern bestsellers,
            our collection is curated for every reader’s taste.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Join our community of book lovers and explore a world of stories
            waiting to be discovered. Every page you turn is a journey into
            imagination and knowledge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
