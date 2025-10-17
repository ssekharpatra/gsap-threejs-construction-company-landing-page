import { useRef, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Html } from "@react-three/drei";
import { MathUtils } from "three";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import StudioLights from "./three/StudioLights";
import HighRiseBuilding from "./models/HighRiseBuilding";
import { latestProjectSpecifications } from "../constants";

const ModelScroll = () => {
   const groupRef = useRef(null);

   useGSAP(() => {
      // 3D MODEL MOVING / ROTATION ANIMATION
      const modelTimeline = gsap.timeline({
         scrollTrigger: {
            trigger: "#latest-project",
            start: "top top",
            end: "bottom  top",
            scrub: 2,
            pin: true,
         },
      });

      // 3D MOVING / ROTATION ANIMATION WITH SYNCED CONTENT
      if (groupRef.current) {
         modelTimeline
            .to(groupRef.current.position, {
               x: 2,
               y: 0.1,
               ease: "power1.inOut",
            })
            .to(
               groupRef.current.rotation,
               {
                  y: MathUtils.degToRad(35),
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(".box1", { opacity: 1 }, "-=0.3")

            .to(groupRef.current.position, {
               x: -2,
               ease: "power1.inOut",
            })
            .to(
               groupRef.current.rotation,
               {
                  y: MathUtils.degToRad(-35),
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(".box1", { opacity: 0 }, "-=0.5")
            .to(".box2", { opacity: 1 }, "-=0.3")

            .to(groupRef.current.position, {
               x: 2,
               ease: "power1.inOut",
            })
            .to(
               groupRef.current.rotation,
               {
                  x: MathUtils.degToRad(35),
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(".box2", { opacity: 0 }, "-=0.5")
            .to(".box3", { opacity: 1 }, "-=0.3")

            .to(groupRef.current.position, {
               x: -2,
               ease: "power1.inOut",
            })
            .to(
               groupRef.current.rotation,
               {
                  x: MathUtils.degToRad(0),
                  y: MathUtils.degToRad(0),
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(".box3", { opacity: 0 }, "-=0.5")
            .to(".box4", { opacity: 1 }, "-=0.3")

            .to(groupRef.current.position, {
               x: 2,
               ease: "power1.inOut",
            })
            .to(
               groupRef.current.rotation,
               {
                  y: MathUtils.degToRad(360),
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(".box4", { opacity: 0 }, "-=0.5")
            .to(".box5", { opacity: 1 }, "-=0.3");
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
            <HighRiseBuilding scale={0.02} position={[0, -1.7, 0]} />
         </Suspense>
      </group>
   );
};

const LatestProject = () => {
   return (
      <section id="latest-project" className="relative text-white">
         <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
            <span className="text-sm text-[#cfcfcf] uppercase font-bold tracking-widest">
               Our Latest Project
            </span>
            <h2 className="text-5xl font-bold mt-2">Twinspire Nexus</h2>
         </div>

         <Canvas
            id="latest-project-canvas"
            className="!w-full !h-dvh relative z-40"
            camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
         >
            <StudioLights />
            <ambientLight intensity={0.5} />
            <ModelScroll />
         </Canvas>

         <div className="absolute inset-0">
            {latestProjectSpecifications.map((feature, index) => (
               <div
                  key={feature.id}
                  className={clsx(
                     "max-w-md absolute top-1/2 -translate-y-1/2 opacity-0",
                     `box${index + 1}`,
                     feature.styles
                  )}
               >
                  {/* <img src={feature.icon} alt={feature.highlight} /> */}
                  <h6 className="text-white text-3xl font-bold">
                     {feature.highlight}
                  </h6>
                  <p className="mt-3 text-white text-lg">{feature.text}</p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default LatestProject;
