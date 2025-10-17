import "./index.css";
import Specifications from "./components/Specifications";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
   useEffect(() => {
      // Initialize Lenis with optimized settings for construction company website
      const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smooth feel
         direction: "vertical",
         gestureDirection: "vertical",
         smooth: true,
         mouseMultiplier: 1,
         smoothTouch: false, // Disable on touch for better mobile performance
         touchMultiplier: 2,
         infinite: false,
         normalizeWheel: true, // Better wheel handling
         wheelMultiplier: 1,
         touchInertiaMultiplier: 50,
      });

      // Connect Lenis with GSAP ScrollTrigger for perfect synchronization
      lenis.on("scroll", ScrollTrigger.update);

      // Use GSAP's ticker for optimal performance
      gsap.ticker.add((time) => {
         lenis.raf(time * 1000);
      });

      // Disable lag smoothing for better performance
      gsap.ticker.lagSmoothing(0);

      // Cleanup function
      return () => {
         lenis.destroy();
      };
   }, []);

   return (
      <main>
         <Specifications />
      </main>
   );
};

export default App;
