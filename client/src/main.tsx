import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set page title for SEO
document.title = "Feliz Día de las Madres - Crea un mensaje especial";

// Add meta description for SEO
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Crea un hermoso mensaje personalizado para celebrar el Día de las Madres. Tarjetas animadas con música, efectos y mensajes desde el corazón.";
document.head.appendChild(metaDescription);

// Add Open Graph tags for better social sharing
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Feliz Día de las Madres - Crea un mensaje especial";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "Crea un hermoso mensaje personalizado para celebrar el Día de las Madres. Tarjetas animadas con música, efectos y mensajes desde el corazón.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.property = "og:type";
ogType.content = "website";
document.head.appendChild(ogType);

// Add Google Fonts
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap";
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
