"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { AuthformSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {signIn, signUp, } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

interface Props {
  type: string;
}

const AuthForm = ({ type }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [loading, setIsloading] = useState<boolean>(false);

  const formSchema = AuthformSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsloading(true);
    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };


  return (
    <section className=" auth-form">
      <header className="flex flex-col gap-5 md:gap-8 ">
        <Link href={"/"} className="cursor-pointer flex items-center gap-1 ">
          <Image alt="logo" src={"/icons/logo.svg"} width={34} height={34} />
          <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
            Bank App
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className=" text-24 lg:text-36">
            {user ? "Link Account" : type === "sign-in" ? "Sign in" : "Sign Up"}
            <p className=" text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {/* {user ? ( */}
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary"/>
        </div>
      {/* ) : ( */}
        <>
          {/* forms */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className=" flex  gap-4">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      placeholder={"Enter your first name"}
                      label={"FirstName"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      placeholder={" Enter your lastName"}
                      label={"LastName"}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name={"address"}
                    placeholder={"Enter your Address"}
                    label={"Address"}
                  />
                  <CustomInput
                    control={form.control}
                    name={"city"}
                    placeholder={"Enter your City"}
                    label={"City"}
                  />

                  <div className=" flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      placeholder={"Enter your State"}
                      label={"State"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"postalcode"}
                      placeholder={"Enter your PostalCode"}
                      label={"Postal Code"}
                    />
                  </div>
                  <div className=" flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dob"}
                      placeholder={"Enter your Date of birth"}
                      label={"DOB"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      placeholder={"Enter your SSN Number"}
                      label={"SSN"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name={"email"}
                placeholder={"Enter your Email"}
                label={"Email"}
              />
              <CustomInput
                control={form.control}
                name={"password"}
                placeholder={"Enter your Password"}
                label={"Password"}
              />
              <div className=" flex flex-col gap-4">
                <Button disabled={loading} className="form-btn" type="submit">
                  {loading ? (
                    <>
                      <Loader2 size={20} className=" animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign-in"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
            <footer className=" flex justify-center gap-1 ">
              <p className=" text-14 font-normal text-gray-600">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link href={`/${type === "sign-in" ? "sign-up" : "sign-in"}`}>
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </footer>
          </Form>
        </>
      {/* )} */}
    </section>
  );
};

export default AuthForm;
