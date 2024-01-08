import Link from "next/link";

import { Button } from "./ui/button";

import { Download, Send } from "lucide-react";
import {
  RiBriefcase4Fill,
  RiTeamFill,
  RiArrowDownSLine,
  RiTodoFill,
} from "react-icons/ri";

import HeroImage from "./HeroImage";
import Badge from "./Badge";
import Socials from "./Socials";

const Hero = () => {
  return (
    <section className="py-12 xl:py-24 h-[84vh] xl:pt-28 bg-hero bg-no-repeat bg-cover bg-bottom dark:bg-none">
      <div className="container mx-auto">
        <div className="flex justify-between gap-x-8">
          <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
            <div className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">
              Web Developer
            </div>
            <h1 className="h1 mb-4">Hello! I&apos;m Dushmanta</h1>
            <p className="subtitle max-w-[490px] mx-auto xl:mx-0">
              I build things for the web
            </p>
            <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
              <Link href="/contact">
                <Button className="gap-x-2">
                  Contact me
                  <Send size={18} />{" "}
                </Button>
              </Link>
              <Button variant="secondary" className="gap-x-2">
                Download CV
                <Download size={18} />{" "}
              </Button>
            </div>
            <Socials
              containerStyles="flex gap-x-6 mx-auto xl:mx-0"
              iconStyles="text-foreground text-[22px] hover:text-primary transition-all"
            />
          </div>
          <div className="hidden xl:flex relative">
            <Badge
              icon={<RiBriefcase4Fill />}
              containerStyles="absolute top-[24%] -left-[5rem]"
              badgeText="Years of Experience"
              endCountNum={3}
            />
            <Badge
              icon={<RiTodoFill />}
              endCountText="k"
              endCountNum={6}
              containerStyles="absolute top-[55%] -right-[8rem]"
              badgeText="Finished Projects"
            />
            <Badge
              icon={<RiTeamFill />}
              endCountText="k"
              endCountNum={9}
              containerStyles="absolute top-[80%] -left-[1rem]"
              badgeText="Happy Clients"
            />
            <div className="bg-hero_shape_light dark:bg-hero_shape_dark w-[500px] h-[500px] bg-no-repeat absolute -top-1 -right-2">
              <HeroImage
                containerStyles="bg-hero_shape w-[510px] h-[462px] bg-no-repeat relative bg-bottom"
                imgSrc="/images/bg-svg/developer.png"
              />
            </div>
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
