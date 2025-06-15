import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Heart, Gift, Star, Music } from "lucide-react";
import useConfetti from "@/hooks/useConfetti";
import pa from "../../assets/Imagen de WhatsApp 2025-06-15 a las 08.24.44_c770baed.jpg";
import Image1 from "../../assets/IMG-20250420-WA0267.jpg";
import Image2 from "../../assets/IMG-20250509-WA0059.jpg";
import Image3 from "../../assets/IMG-20250509-WA0064.jpg";
import Image4 from "../../assets/IMG-20250509-WA0071.jpg";
import Image5 from "../../assets/IMG-20250509-WA0077.jpg";
import Image6 from "../../assets/IMG-20250615-WA0003.jpg";
import Image7 from "../../assets/IMG-20250615-WA0004.jpg";
import Image8 from "../../assets/IMG-20250615-WA0005.jpg";
import Image9 from "../../assets/IMG-20250615-WA0006.jpg";
import Image10 from "../../assets/IMG-20250615-WA0007.jpg";
import Image11 from "../../assets/IMG-20250615-WA0008.jpg";
import Image12 from "../../assets/IMG-20250615-WA0009.jpg";
import Image13 from "../../assets/IMG-20250615-WA0010.jpg";
import Image14 from "../../assets/IMG-20250615-WA0011.jpg";
import Image15 from "../../assets/Imagen de WhatsApp 2025-06-15 a las 08.21.16_dcc20186.jpg";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const { toast } = useToast();
  const { triggerConfetti, ConfettiComponent } = useConfetti();
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showLove, setShowLove] = useState(false);

  // Use this to trigger confetti on load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 1500);

    return () => clearTimeout(timer);
  }, [triggerConfetti]);

  // Show love message after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLove(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Background decoration elements
  const decorations = [
    { top: "0", left: "0", delay: "0s" },
    { top: "25%", right: "0", delay: "0.5s" },
    { bottom: "25%", left: "10px", delay: "1s" },
    { bottom: "0", right: "10px", delay: "1.5s" },
  ];

  const memories = [
    Image1, Image2, Image3, Image4, Image5,
    Image6, Image7, Image8, Image9, Image10,
    Image11, Image12, Image13, Image14,
    Image15,
  ];

  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const handleNextMemory = () => {
    setScrollIndex((prev) => (prev < memories.length - 1 ? prev + 1 : prev));
  };

  const handlePrevMemory = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-cream">
      {/* Confetti component */}
      <ConfettiComponent />

      {/* Background decorative flowers */}
      {decorations.map((dec, index) => (
        <motion.div
          key={index}
          className="bg-flower"
          style={{
            top: dec.top || "auto",
            left: dec.left || "auto",
            right: dec.right || "auto",
            bottom: dec.bottom || "auto",
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay: parseFloat(dec.delay),
          }}
        >
          <img
            src={memories[index]}
            alt="Flor decorativa"
            className="opacity-20"
          />
        </motion.div>
      ))}

      {/* Header */}
      <motion.header
        className="w-full pt-6 px-4 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-dancing text-4xl md:text-6xl lg:text-7xl text-dark-text mt-5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ¡Feliz Día del Padre!
          </motion.h1>
          <motion.div
            className="inline-block px-4 py-2 bg-primary-light rounded-full shadow-sm mt-3"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <p className="text-dark-text font-medium text-sm md:text-base">
              <Heart className="inline-block text-primary mr-2 h-4 w-4" />
              Con todo mi cariño para ti
              <Heart className="inline-block text-primary ml-2 h-4 w-4" />
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4">
        {/* Main greeting card */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h2
                className="font-dancing text-3xl md:text-5xl text-dark-text mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Para el mejor papá del mundo...
              </motion.h2>

              <motion.p
                className="text-dark-text/80 text-base md:text-lg mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p>
                  Hoy celebramos tu ejemplo, tu esfuerzo y todo el amor que nos das cada día.
                </p>
                <p>¡Te amo, papá!</p>
              </motion.p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "-80px",
              }}
            >
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/0TTNTPbFEpFOY2w3gFLjrn?utm_source=generator"
                width="100%"
                height="300"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>

          </div>
            <motion.div
              className="text-dark-text/70 text-base flex items-center justify-center mt-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Pulsa el botón para reproducir<span>👆🏽</span>
            </motion.div>
        </motion.section>

        {/* Special message */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-primary-light px-6 py-3">
              <h2 className="font-dancing text-3xl md:text-4xl text-dark-text">
                Un mensaje especial para ti
              </h2>
            </div>

            <motion.div
              className="md:w-1/2 relative mt-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <img
                src={pa}
                style={{ width: "90%", height: "auto", margin: "0 auto" }}
                className="rounded-2xl shadow-xl object-cover card-hover"
              />

              <motion.div
                className="absolute -bottom-5 -left-0 bg-primary-light rounded-full p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Heart className="text-red-500 h-6 w-6" />
              </motion.div>

              <motion.div
                className="absolute -top-5 -right-0 bg-primary-light rounded-full p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Gift className="text-yellow-500 h-6 w-6" />
              </motion.div>
            </motion.div>

            <div className="p-8 md:p-12 bg-gradient-to-r from-primary-light to-secondary-light">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-inner max-w-3xl mx-auto">
                <motion.p
                  className="text-dark-text text-lg mb-6 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Papá, eres mi héroe y mi mayor inspiración. Gracias por tu apoyo incondicional, por tus enseñanzas y por estar siempre.
                  En este día tan especial, quiero que sepas cuánto te admiro y te quiero. Gracias por tu ejemplo de fortaleza, dedicación y amor.
                  Eres un hombre increíble, lleno de bondad y amor. Gracias por ser mi padre.
                </motion.p>

                <motion.p
                  className="font-dancing text-2xl text-dark-text mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  Con todo el amor, tu hijo💕
                </motion.p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Memories carousel */}
        <motion.section
          className="rounded-2xl shadow-xl mb-10 mt-8 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="text-center mb-5 rounded-t-2xl">
            <h2 className="font-dancing text-3xl md:text-4xl text-dark-text bg-primary-light py-3 rounded-t-2xl">
              Galería de recuerdos
            </h2>
          </div>

          <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2">
            <div className="w-full h-80 overflow-hidden rounded-xl shadow-md">
              <img
                src={memories[current]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-center gap-6 mb-3 mt-2">
              <button
                onClick={prev}
                className="px-2 py-1 text-xl bg-primary-light rounded-full hover:bg-primary transition animate-bounce"
              >
                ⪻
              </button>
              <button
                onClick={next}
                className="px-2 py-1 text-xl bg-primary-light rounded-full hover:bg-primary transition animate-bounce"
              >
                ⪼
              </button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
