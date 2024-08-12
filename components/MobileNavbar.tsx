"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className=" w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"icons/hamburger.svg"}
            alt="menu"
            height={30}
            width={30}
            className=" cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className=" border-none bg-white">
          <Link
            href={"/"}
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <Image alt="logo" src={"/icons/logo.svg"} width={34} height={34} />
            <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
              Bank App
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className=" flex h-full flex-col pt-16 gap-6 text-white">
                {sidebarLinks.map((item, index) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobilenav-sheet_close w-full", {
                          " bg-bankGradient": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-16 , font-semibold , text-black-2",
                            {
                              "text-white": isActive,
                            }
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>

                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
