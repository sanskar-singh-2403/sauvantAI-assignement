import {
  Bell,
  CircleUser,
  Menu,
  MessageCircleMore,
  Package2,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";

export const Header = async () => {
  const user = await getServerSession();
  const userRole = await  prisma.user.findUnique({
    where: { email: user?.user?.email },
    select: { role: true },
  });

  return (
    <header className="sticky top-0 flex h-[7vh] items-center gap-4 border-b bg-background px-4 md:px-6 shadow-lg ">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <h2 className="text-green-700 text-nowrap font-bold">CREDIT APP</h2>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <h2 className="text-green-700 text-nowrap font-bold">
                CREDIT APP
              </h2>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link href="#" className="hover:text-foreground">
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial flex gap-2">
          <Button variant={"outline"} size={"sm"}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant={"outline"} size={"sm"}>
            <MessageCircleMore className="h-5 w-5" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="text-sm ml-2 text-green-700">{userRole?.role}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem  >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
