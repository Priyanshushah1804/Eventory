import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    { name: "Akshat Bhansali", role: "Lead Developer" },
    { name: "Raj Rakshit", role: "Blockchain Developer " },
    { name: "Rohan Prakash", role: "Web Developer" }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-10 text-white">
    
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold text-white">About Us</h1>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          We are a team of passionate individuals dedicated to crafting high-quality digital experiences.
        </p>
      </motion.div>
      
      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
        <p className="text-gray-400 mt-4">
          To build innovative and user-friendly applications that make a difference in people’s lives.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-semibold text-white">Meet Our Team</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg w-64"
            >
              <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto"></div>
              <h3 className="text-xl font-medium text-white mt-4">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
