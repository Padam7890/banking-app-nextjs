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

interface Props {
  type: string;
}
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const AuthForm = ({ type }: Props) => {
  const [user, setUser] = useState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
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
      {user ? (
        <div className="flex flex-col gap-4">{}</div>
      ) : (
        <>
          {/* forms */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label" htmlFor="email">
                      Email address
                    </FormLabel>
                    <div className=" flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          className=" input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Password</FormLabel>
                    <div className=" flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="Enter Password"
                          className=" input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2"></FormMessage>
                    </div>
                  </div>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
