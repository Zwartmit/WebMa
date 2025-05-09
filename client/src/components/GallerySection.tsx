import { motion } from "framer-motion";
import { useRef } from "react";

const GallerySection = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
      title: "Amor incondicional",
      description: "El vínculo que se forma desde el primer momento, es el amor más puro que existe."
    },
    {
      image: "https://images.unsplash.com/photo-1560087637-bf797bc7796a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
      title: "Risas compartidas",
      description: "Las sonrisas y momentos de alegría son tesoros que guardamos en el corazón."
    },
    {
      image: "https://images.unsplash.com/photo-1518553552028-b921fae6f886?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
      title: "Celebración especial",
      description: "Un día para honrar toda una vida de cariño, cuidados y enseñanzas."
    }
  ];

  return (
    <motion.section 
      className="py-8 mb-16"
      ref={galleryRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-center mb-10">
        <motion.h2 
          className="font-dancing text-3xl md:text-4xl text-dark-text"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          Los momentos más especiales
        </motion.h2>
        
        <motion.p 
          className="text-dark-text/70 mt-2"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { delay: 0.2 }
            }
          }}
        >
          Celebrando la belleza del amor de madre
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md card-hover"
            custom={index}
            variants={cardVariants}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="font-dancing text-xl text-dark-text mb-2">{item.title}</h3>
              <p className="text-dark-text/70 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default GallerySection;
