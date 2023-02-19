import {
  Command,
  deploy,
  login,
  logout,
  remove,
  signup,
} from "./packages/cli/mod.ts";
import "https://deno.land/std@0.177.0/dotenv/load.ts";

if (import.meta.main) {
  const command = new Command()
    .name("ephemerals")
    .version("0.1.0")
    .description(
      "The CLI for Ephemerals. Serverless functions for the decentralized web.",
    );

  login;
  command
    .command("login", "Login to Ephemerals")
    .option("-e, --email <email:string>", "Email address")
    .option("-p, --password <password:string>", "Password")
    .action(login.action);

  // signup
  command
    .command("signup", "Signup to Ephemerals")
    .option("-e, --email <email:string>", "Email address")
    .option("-p, --password <password:string>", "Password")
    .option("-u, --username <username:string>", "Username")
    .action(signup.action);

  // signout
  command.command("logout", "Logout from Ephemerals").action(logout.action);

  // deploy
  command
    .command("deploy", "Deploy ephemerals")
    .arguments("<dir:string> [stage:string]")
    .action(deploy.action);

  // delete
  command
    .command("delete", "Delete ephemerals")
    .arguments("<stage:string>")
    .action(remove.action);

  await command.parse(Deno.args);
}
