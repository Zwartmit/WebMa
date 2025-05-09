import { motion } from "framer-motion";
import { Heart, Gift } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <motion.section
      className="relative py-8 mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h2
            className="font-dancing text-3xl md:text-5xl text-dark-text mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Para la mejor mamá del mundo
          </motion.h2>
          
          <motion.p
            className="text-dark-text/80 mb-8 text-base md:text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Este día está dedicado a celebrar todo el amor, dedicación y sacrificio que has brindado. ¡Felicidades en tu día, mamá!
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="#crear-mensaje">
              <Button 
                className="bg-secondary hover:bg-secondary-light text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg"
                onClick={() => {
                  document.getElementById("crear-mensaje")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/>
                </svg>
                Crear mensaje especial
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="md:w-1/2 relative"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
            alt="Madre e hijo abrazándose" 
            className="rounded-2xl shadow-xl w-full h-auto object-cover card-hover"
          />
          
          <motion.div 
            className="absolute -bottom-5 -left-5 bg-white rounded-full p-3 shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Heart className="text-primary h-6 w-6" />
          </motion.div>
          
          <motion.div 
            className="absolute -top-5 -right-5 bg-white rounded-full p-3 shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Gift className="text-accent h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
