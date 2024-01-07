import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logoipsum.svg"
        width={150}
        height={150}
        priority
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
