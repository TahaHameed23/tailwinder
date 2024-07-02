import * as readline from "readline";
import yargsInteractive from "yargs-interactive";
import { hideBin } from "yargs/helpers";
import cliSpinners from "cli-spinners";
import { installTailwind, initTailwind } from "./func.js";

yargsInteractive(hideBin(process.argv))
    .scriptName("tlw")
    .usage("$0 <cmd>")
    .command(
        ["install", "i"],
        "\tInstall & initialize tailwindcss in current directory",
        () => {},
        async () => {
            const spinner = cliSpinners.dots12;
            let i = 0;

            // Start spinner
            const interval = setInterval(() => {
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(
                    "Installing tailwindcss... " +
                        spinner.frames[i % spinner.frames.length]
                );
                i++;
            }, spinner.interval);

            try {
                // if (STATUS) {
                //     console.log("TailwindCSS is already initialized!");
                //     return;
                // }
                await installTailwind();
                clearInterval(interval); // Stop the spinner before logging
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                console.log("TailwindCSS installed!");

                console.log("Initializing tailwindcss...");
                await initTailwind();
            } catch (error) {
                clearInterval(interval);
                readline.clearLine(process.stdout, 0);
                readline.cursorTo(process.stdout, 0);
                console.error("An error occurred:", error);
            }
        }
    )
    .alias("install", "i")
    .demandCommand(1)
    .help().argv;
