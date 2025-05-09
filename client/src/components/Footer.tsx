import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer 
      className="bg-secondary-light/50 py-6 border-t border-secondary/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-dark-text/70 text-sm mb-2">
          Creado con <HeartIcon className="inline-block h-4 w-4 text-primary" /> para todas las madres maravillosas
        </p>
        <p className="text-dark-text/50 text-xs">
          © {new Date().getFullYear()} Feliz Día de las Madres
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
