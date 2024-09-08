import Image from "next/image";
import Link from "next/link";

const DevfolioButton = () => {
  return (
    <Link target="_blank" href={'https://techtrek.devfolio.co/'} className="flex bg-[#3770FF] flex-row text-white py-2 rounded-lg hover:bg-opacity-60 cursor-pointer items-center gap-2 justify-center">
      <Image src="/devfolio.png" alt="Devfolio" width={30} height={30} />
      <h1>Apply With Devfolio</h1>
    </Link>
  );
};

export default DevfolioButton;
