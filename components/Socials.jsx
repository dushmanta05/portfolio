"use client";

import { RiGithubFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";

import Link from "next/link";

const icons = [
  {
    path: "https://github.com/dushmanta05",
    name: <RiGithubFill />,
  },
  {
    path: "https://linkedin.com/in/dushmanta05",
    name: <RiLinkedinFill />,
  },
  {
    path: "https://twitter.com/dushmanta05",
    name: <RiTwitterFill />,
  },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link key={index} href={icon.path} target="_blank">
            <div className={`${iconStyles}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
