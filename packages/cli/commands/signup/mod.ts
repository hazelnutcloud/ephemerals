import { wait } from "../../deps.ts";
import {
  getEmail,
  getPassword,
  getPocketBaseClient,
  getUsername,
  validateEmail,
  validatePassword,
} from "../utils.ts";

export const action = async (options: {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  username?: string;
}) => {
  console.log("Signup to RoboArkiver 🔒");

  let { email, password, username, passwordConfirm } = options;

  if (!email) {
    email = await getEmail();
  }
  validateEmail(email);

  if (!username) {
    username = await getUsername();
  }

  if (!password) {
    password = await getPassword();
  }

  if (!passwordConfirm) {
    passwordConfirm = await getPassword(true);
  }

  validatePassword(password, passwordConfirm);

  const pb = getPocketBaseClient();

  const spinner = wait("Signing up...").start();
  const signUpRes = await pb.collection("users").create({
    email,
    password,
    username,
    passwordConfirm,
  });
  if (signUpRes.error) {
    spinner.fail("Signup failed");
    throw signUpRes.error;
  }

  await pb.collection("users").requestVerification(email);

  spinner.succeed(
    "Signed up successfully! Please check your email for a confirmation link.",
  );
};
