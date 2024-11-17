"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

import Highlight from "../Highlight";

import { useTheme } from "next-themes";
import { ChevronDown } from "react-bootstrap-icons";

interface HeaderProps {
  logoSrc: {
    white: StaticImageData;
    dark: StaticImageData;
  };
  logoAlt: string;
  contentRef: React.RefObject<HTMLDivElement>;
}

const Hero: FunctionComponent<HeaderProps> = ({
  logoSrc,
  logoAlt,
  contentRef,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // If we don't wait for the theme to be loaded, the image will be broken -> always being false until the theme is changed
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex size-full min-h-screen flex-col items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          marginTop: 200,
        }}
        whileInView={{
          opacity: 1,
          marginTop: 0,
        }}
        viewport={{
          once: true,
        }}
        className="flex w-full flex-col items-center justify-center gap-28 md:px-14"
      >
        <Image
          className="mt-12 max-h-[300px] w-1/3 object-contain drop-shadow-md md:mt-0 lg:max-h-[500px] lg:w-72"
          src={mounted && theme === "light" ? logoSrc.dark : logoSrc.white}
          alt={logoAlt}
        />
        <motion.div
          initial={{
            opacity: 0,
            marginTop: 50,
          }}
          whileInView={{
            opacity: 1,
            marginTop: 0,
          }}
          viewport={{
            once: true,
          }}
          className="flex w-full flex-col items-center justify-center gap-10 md:px-5 pb-10"
        >
          <p className="text-4xl text-center">O teu futuro <br/><span className="font-bold">começa aqui.</span></p>

          <a href="/signup" className="bg-[#606C38] py-3 px-5 rounded-md font-bold uppercase">Inscreve-te no Fallstack</a>
        </motion.div>
      </motion.div>
      <a
        className="absolute bottom-6 flex animate-bounce cursor-pointer items-center justify-center text-center transition-all duration-200 hover:scale-105"
        onClick={() => contentRef.current?.scrollIntoView()}
      >
        <ChevronDown className="size-6" />
      </a>
    </section>
  );
};

export default Hero;
