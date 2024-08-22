"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    console.log(response);
    
    // Debugging: Log the session secret to ensure it's being retrieved
    console.log("Session Secret Retrieved:", response.secret);

    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false, // Ensure this is false in local development
    });

    // Debugging: Confirm the cookie setting process
    console.log("Cookie 'appwrite-session' has been set.");

    return parseStringify(response);
  } catch (error) {
    console.error("Sign-in failed with error:", error);
    throw new Error("Failed to sign in");
  }
};


export const signUp = async (userdata: SignUpParams) => {
  try {
    const { email, password, firstName, lastName } = userdata;

    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    throw new Error("Failed to create account");
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    // Optionally log error for debugging
    console.error(error);
    // throw new Error("Failed to retrieve user data");
  }
}
