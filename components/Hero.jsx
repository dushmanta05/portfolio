import Link from "next/link";

import { Button } from "./ui/button";

import { Download, Send } from "lucide-react";
import {
  RiBriefcase4Fill,
  RiTeamFill,
  RiArrowDownSLine,
  RiTodoFill,
} from "react-icons/ri";

import Socials from "./Socials";

const Hero = () => {
  return (
    <section className="py-12 xl:py-24 h-[84vh] xl:pt-28 bg-hero bg-no-repeat bg-cover bg-bottom dark:bg-none">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="flex max-w-[575px] flex-col justify-center  text-center">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
              Software Engineer
            </div>
            <h1 className="h1 mb-4">Hello! I&apos;m Dushmanta</h1>
            <p className="subtitle max-w-[490px] mx-auto">
              I build things for the web
            </p>
            <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto mb-12">
              <Link href="/contact">
                <Button className="gap-x-2">
                  Contact Me
                  <Send size={18} />{" "}
                </Button>
              </Link>
              <Button variant="secondary" className="gap-x-2">
                Download CV
                <Download size={18} />{" "}
              </Button>
            </div>
            <Socials
              containerStyles="flex gap-x-6 mx-auto"
              iconStyles="text-foreground text-[22px] hover:text-primary transition-all"
            />
          </div>
        </div>
        <div className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce">
          <RiArrowDownSLine className="text-3xl text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
