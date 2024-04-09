"use client";

import {
  AreaChart,
  FilePen,
  FileText,
  Gauge,
  HandIcon,
  Home,
  Landmark,
  LineChart,
  Package,
  Package2,
  PiggyBank,
  Scale,
  Settings,
  ShoppingCart,
  UserCheck,
  UserCircle,
  UserMinus,
  Users2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const SideNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = useMemo(
    () => [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Gauge,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Borrowers",
        href: "/borrowers",
        icon: UserMinus,
        isActive: pathname === "/borrowers",
      },
      {
        title: "Loans",
        href: "/loans",
        icon: HandIcon,
        isActive: pathname === "/loans",
      },
      {
        title: "Repayments",
        href: "/abc",
        icon: UserCheck,
        isActive: pathname === "/abc",
      },
      {
        title: "Loan Params",
        href: "/abc",
        icon: Scale,
        isActive: pathname === "/abc",
      },
      {
        title: "Accounting",
        href: "/abc",
        icon: Wallet,
        isActive: pathname === "/abc",
      },
      {
        title: "Reports",
        href: "/abc",
        icon: AreaChart,
        isActive: pathname === "/abc",
      },
      {
        title: "Collateral",
        href: "/abc",
        icon: FileText,
        isActive: pathname === "/abc",
      },
      {
        title: "Savings",
        href: "/abc",
        icon: PiggyBank,
        isActive: pathname === "/abc",
      },
      {
        title: "Other Incomes",
        href: "/abc",
        icon: Landmark,
        isActive: pathname === "/abc",
      },
      {
        title: "Signature",
        href: "/abc",
        icon: FilePen,
        isActive: pathname === "/abc",
      },
      {
        title: "Settings",
        href: "/abc",
        icon: Settings,
        isActive: pathname === "/abc",
      },
    ],
    [pathname]
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-[#132E1A] sm:flex mt-[7vh]">
      <div className="flex items-center gap-2 px-2 text-[#ADCF1A] border-b-2 my-4 pb-4 shadow-lg">
        <UserCircle />
        <p>Jhon Doe</p>
      </div>
      <nav className="flex flex-col items-center text-white mb-10 w-44">
        {links.map((link, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={`flex hover:bg-[#0A512F] hover:text-white  items-center transition-colors hover:text-foreground h-full p-3 md:w-full gap-2 border-b-2 border-black/20 ${
                  link.isActive ? "bg-[#0A512F]" : ""
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{link.title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
