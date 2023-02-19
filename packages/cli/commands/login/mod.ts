import { PocketBase, wait } from "../../deps.ts";
import {
  getEmail,
  getPassword,
  getPocketBaseClient,
  validateEmail,
} from "../utils.ts";

export const action = async (options: {
  email?: string;
  password?: string;
}) => {
  const pocketBase = getPocketBaseClient();

  const valid = pocketBase.authStore.isValid;
  if (valid) {
    console.log("✅ Already logged in");
    Deno.exit(0);
  }

  await login(options, pocketBase);

  Deno.exit(0);
};

export const login = async (
  options: {
    email?: string;
    password?: string;
  },
  pb: PocketBase,
) => {
  console.log("🔒 Login to RoboArkiver");

  let { email, password } = options;

  if (!email) {
    email = await getEmail();
  }
  validateEmail(email);

  if (!password) {
    password = await getPassword();
  }

  const spinner = wait("Logging in...").start();
  try {
    await pb.collection("users").authWithPassword(
      email,
      password,
    );
  } catch (error) {
    spinner.fail("Login failed");
    throw error;
  }

  spinner.succeed("Logged in successfully!");
};
