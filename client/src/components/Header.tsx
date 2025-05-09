import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      className="w-full pt-6 pb-4 px-4 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="inline-block px-4 py-2 bg-primary-light rounded-full shadow-sm mb-3"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-dark-text font-medium text-sm md:text-base">
            <Heart className="inline-block text-primary mr-2 h-4 w-4" />
            Celebremos juntos este día especial
            <Heart className="inline-block text-primary ml-2 h-4 w-4" />
          </p>
        </motion.div>
        
        <motion.h1 
          className="font-dancing text-4xl md:text-6xl lg:text-7xl text-dark-text mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Feliz Día de las Madres
        </motion.h1>
        
        <motion.p 
          className="font-sans text-base md:text-lg text-dark-text/80 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Celebra a la persona más especial en tu vida con un mensaje único y desde el corazón
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
