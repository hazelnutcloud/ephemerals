import { POCKETBASE_URL } from "../constants.ts";
import { Input, PocketBase, Secret, z } from "../deps.ts";

export const getEmail = async () => {
  const email = await Input.prompt("✉️  Email:");
  if (!email) {
    throw new Error("Email is required");
  }
  return email;
};

export const getUsername = async () => {
  const username = await Input.prompt("👤  Username:");
  if (!username) {
    throw new Error("Username is required");
  }
  return username;
};

export const validateEmail = (email: string) => {
  const validateEmail = z.string().email();
  const emailValidation = validateEmail.safeParse(email);
  if (!emailValidation.success) {
    const errorMsg = `Error parsing email: ${
      emailValidation.error.issues.map(
        (issue) => issue.message,
      )
    }`;
    throw new Error(errorMsg);
  }
};

export const getPassword = async (confirm = false) => {
  const password = await Secret.prompt(
    `🔑 ${confirm ? "Confirm password" : "Password"}:`,
  );
  if (!password) {
    throw new Error("Password is required");
  }
  return password;
};

export const validatePassword = (
  password: string,
  passwordConfirmation: string,
) => {
  const validatePassword = z.string().min(8);
  const passwordValidation = validatePassword.safeParse(password);
  if (!passwordValidation.success) {
    const errorMsg = `Error parsing password: ${
      passwordValidation.error.issues.map(
        (issue) => issue.message,
      )
    }`;
    throw new Error(errorMsg);
  }
  if (password !== passwordConfirmation) {
    throw new Error("Passwords do not match");
  }
};

export const getPocketBaseClient = () => {
  const client = new PocketBase(POCKETBASE_URL);
  return client;
};
