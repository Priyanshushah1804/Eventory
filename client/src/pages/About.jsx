import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    { 
      name: "Akshat Bhansali", 
      role: "Lead Developer", 
      image: "akshat.jpeg",
      link: "https://github.com/akshat-bhansali" 
    },
    { 
      name: "Raj Rakshit", 
      role: "Web3 Developer", 
      image: "raj.jpg",
      link: "https://github.com/datmedevil17"  
    },
    { 
      name: "Rohan Prakash", 
      role: "Web Developer", 
      image: "rohan.jpg",
      link: "https://github.com/prakashrohan"  
    },
    {
      name: "Priyanshu Shah", 
      role: "Web Developer", 
      image: "priyanshu.jpg",
      link: "https://github.com/Priyanshushah1804"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black p-10 text-white">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-extrabold mb-4">About Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We are a team of passionate individuals dedicated to crafting high-quality digital experiences.
        </p>
      </motion.div>
      
      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center"
      >
        <h2 className="text-4xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300 text-lg">
          To build innovative and user-friendly applications that make a difference in people’s lives.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-20 text-center"
      >
        <h2 className="text-4xl font-semibold mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="relative cursor-pointer" 
              onClick={() => window.location.href = member.link}
            >
             
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-50"></div>
              </div>
              {/* Card Content scales on hover */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-72 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl text-center relative z-10"
              >
                {/* Profile Image */}
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-gray-700">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name & Role */}
                <h3 className="mt-6 text-2xl font-medium">{member.name}</h3>
                <p className="text-gray-400 mt-2">{member.role}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
