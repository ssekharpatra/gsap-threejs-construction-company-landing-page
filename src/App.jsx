import "./index.css";
import Specifications from "./components/Specifications";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
   return (
      <main>
         <Specifications />
      </main>
   );
};

export default App;
