import { useRef, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import StudioLights from "./three/StudioLights";
import HighRiseBuilding from "./models/HighRiseBuilding";
import { specifications } from "../constants";

const ModelScroll = () => {
   const groupRef = useRef(null);

   useGSAP(() => {
      // 3D MODEL MOVING / ROTATION ANIMATION
      const modelTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: "#specifications",
            start: "top top",
            end: "bottom  top",
            scrub: 1,
            pin: true,
         },
      });

      // 3D MOVING / ROTATION ANIMATION WITH SYNCED CONTENT
      if (groupRef.current) {
         modelTimeline
            .to(groupRef.current.position, {
               x: 2,
               ease: "power1.inOut",
            })
            .to(".box1", { opacity: 1 })

            .to(groupRef.current.position, {
               x: -2,
               ease: "power1.inOut",
            })
            .to(".box1", { opacity: 0 })
            .to(".box2", { opacity: 1 })

            .to(groupRef.current.position, {
               x: 2,
               ease: "power1.inOut",
            })
            .to(".box2", { opacity: 0 })
            .to(".box3", { opacity: 1 })

            .to(groupRef.current.position, {
               x: -2,
               ease: "power1.inOut",
            })
            .to(".box3", { opacity: 0 })
            .to(".box4", { opacity: 1 })

            .to(groupRef.current.position, {
               x: 2,
               ease: "power1.inOut",
            })
            .to(".box4", { opacity: 0 })
            .to(".box5", { opacity: 1 });
      }
   }, []);

   return (
      <group ref={groupRef}>
         <Suspense
            fallback={
               <Html>
                  <h1 className="text-white text-3xl uppercase">Loading...</h1>
               </Html>
            }
         >
            <HighRiseBuilding scale={0.02} position={[0, -1, 0]} />
            {/* <OrbitControls /> */}
         </Suspense>
      </group>
   );
};

const Specifications = () => {
   return (
      <section
         id="specifications"
         //  style={{ width: "100vw", height: "100vh" }}
         className="relative"
      >
         <Canvas
            id="specifications-canvas"
            className="!w-full !h-dvh relative z-40"
            camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
         >
            <StudioLights />
            <ambientLight intensity={0.5} />
            <ModelScroll />
         </Canvas>

         <div className="absolute inset-0">
            {specifications.map((feature, index) => (
               <div
                  key={feature.id}
                  className={clsx(
                     "box max-w-xs absolute",
                     `box${index + 1}`,
                     feature.styles
                  )}
               >
                  {/* <img src={feature.icon} alt={feature.highlight} /> */}
                  <p className="text-white text-sm">
                     <span>{feature.highlight}</span> <br />
                     {feature.text}
                  </p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Specifications;
