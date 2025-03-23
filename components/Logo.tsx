import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-bold">
      Ca<span className="text-orange-500">Rent</span>
    </Link>
  );
};

export default Logo;
