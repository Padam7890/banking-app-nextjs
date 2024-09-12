"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, parseStringify } from "../utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    console.log(response);

    cookies().set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

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
    console.error(error);
  }
}

export const loggOutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.name,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({
      linkToken: response.data.link_token,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create link token");
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const { access_token, item_id } = response.data;

    const accountResponse = await plaidClient.accountsGet({
      access_token: access_token,
    });
    const accountData = accountResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      account_id: accountData.account_id,
      access_token: access_token,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const { processor_token } = processorTokenResponse.data;
    const fundingSourceUrl= await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processor_token,
      bankName : accountData.name
    })
    if (!fundingSourceUrl) throw new Error;
    await createBankAccount({
      userId: user.$id,
      bankId:item_id,
      accountId: accountData.account_id,
      accessToken: access_token,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),

    })
    revalidatePath("/");
    return parseStringify({
      publicTokenExchange: "complete"
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to exchange public token");
  }
};
