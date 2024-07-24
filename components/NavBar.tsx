import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-3 px-6 py-3 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo2.svg"
          width={36}
          height={36}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[24px] font-bold text-white max-sm:hidden">Convo</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
