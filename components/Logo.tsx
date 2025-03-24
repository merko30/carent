import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-xl font-semibold tracking-wider uppercase">
      Ca<span className="text-orange-500">Rent</span>
    </Link>
  );
};

export default Logo;
