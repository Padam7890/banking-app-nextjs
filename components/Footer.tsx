import { loggOutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type }: FooterProps) => {
  const router = useRouter();
  const handlelogoutfunc = async () => {
    const loggedOut:any = await loggOutAccount();
    if (loggedOut)  router.push('/sign-in');
    
  }
  return (
    <footer className=" footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className=" text-xl font-bold text-gray-700">
          {user?.name[0] || "P"}
        </p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className=" text-14 truncate  text-gray-600 font-semibold">
          {user?.name}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={handlelogoutfunc}>
        <Image src={"icons/logout.svg"} fill alt="pdt" />
      </div>
    </footer>
  );
};

export default Footer;
