import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { InsertGreeting } from "@shared/schema";
import { Button } from "@/components/ui/button";
import MusicPlayer from "@/components/MusicPlayer";
import { useToast } from "@/hooks/use-toast";
import { Download, Facebook, Share } from "lucide-react";

type FinishedCardProps = {
  greeting: InsertGreeting;
  onCreateNew: () => void;
};

const FinishedCard = ({ greeting, onCreateNew }: FinishedCardProps) => {
  const [isPlaying, setIsPlaying] = useState(greeting.hasMusic);
  const { toast } = useToast();

  // Get card style classes based on selected style
  const getCardStyles = () => {
    switch (greeting.cardStyle) {
      case "style-1":
        return "bg-gradient-to-r from-primary-light to-secondary-light";
      case "style-2":
        return "bg-gradient-to-r from-secondary to-primary";
      case "style-3":
        return "bg-gradient-to-r from-accent to-primary-light";
      default:
        return "bg-gradient-to-r from-primary-light to-secondary-light";
    }
  };

  // Simulate sharing functionality
  const handleShare = (platform: string) => {
    // In a real app, we would implement proper sharing
    toast({
      title: "Compartir",
      description: `Compartiendo por ${platform}... Funcionalidad en desarrollo.`,
    });
  };

  const handleDownload = () => {
    // In a real app, we would implement card download
    toast({
      title: "Descargar",
      description: "Descargando tarjeta... Funcionalidad en desarrollo.",
    });
  };

  return (
    <motion.section 
      id="card-result" 
      className="py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="font-dancing text-3xl md:text-4xl text-dark-text mb-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ¡Tu tarjeta está lista!
        </motion.h2>
        <motion.p 
          className="text-dark-text/80 max-w-2xl mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ahora puedes compartir este hermoso mensaje con mamá
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div 
          id="final-card" 
          className={`p-8 rounded-xl shadow-lg ${getCardStyles()}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
        >
          <div className="relative bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Decoración floral" 
              className="absolute -top-10 -right-10 rounded-full shadow-lg"
              loading="lazy"
            />
            
            <h3 
              id="final-card-title" 
              className="font-dancing text-4xl text-dark-text mb-6 text-center"
            >
              Para {greeting.motherName}
            </h3>
            <p 
              id="final-card-message" 
              className="text-dark-text/90 mb-8 text-center text-lg"
            >
              {greeting.message}
            </p>
            <p className="font-dancing text-2xl text-dark-text/80 mt-6 text-center">Con todo mi amor</p>
            
            {greeting.hasMusic && (
              <div className="flex justify-center mt-8" id="music-player-container">
                <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button 
            onClick={() => handleShare("WhatsApp")} 
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-1"
            >
              <path d="M17.5 2h-11c-2.5 0-4 1.5-4 4v10c0 2.5 1.5 4 4 4h11c2.5 0 4-1.5 4-4V6c0-2.5-1.5-4-4-4Z" />
              <path d="m8 10 4 4 4-4" />
            </svg>
            <span>Compartir por WhatsApp</span>
          </Button>
          
          <Button 
            onClick={() => handleShare("Facebook")} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            <Facebook className="h-5 w-5 mr-1" />
            <span>Compartir en Facebook</span>
          </Button>
          
          <Button 
            onClick={handleDownload} 
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            <Download className="h-5 w-5 mr-1" />
            <span>Descargar tarjeta</span>
          </Button>
        </motion.div>
        
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button 
            onClick={onCreateNew} 
            variant="link"
            className="text-secondary hover:text-secondary-light font-medium"
          >
            Crear una nueva tarjeta
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinishedCard;
