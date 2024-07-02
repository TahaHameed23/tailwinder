import fs from "fs";
import * as readline from "readline";
import { exec } from "child_process";
export const installTailwind = async () => {
    return new Promise((resolve, reject) => {
        exec(
            "npm install -D tailwindcss && npx tailwindcss init ",
            (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
    });
};
export const initTailwind = async () => {
    try {
        let data = fs.readFileSync("tailwind.config.js", "utf8");
        data = data.replace(/content: \[\]/g, "content: ['./**/*.html,.jsx']");
        fs.writeFileSync("tailwind.config.js", data);

        if (!fs.existsSync("./dist")) {
            fs.mkdirSync("./dist");
        }

        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log("tailwind config initialized!");
        // Create input.css file inside 'dist' directory if it doesn't exist
        const inputCSSPath = "./dist/input.css";
        if (!fs.existsSync(inputCSSPath)) {
            fs.writeFileSync(
                inputCSSPath,
                "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
            );
        }

        console.log(
            "Executing: ` npx tailwindcss -i ./dist/input.css -o ./dist/output.css --watch `"
        );
        exec(
            "npx tailwindcss -i ./dist/input.css -o ./dist/output.css --watch"
        );

        //v1.1: Watch for changes in index.html file

        console.log(
            "TailwindCSS is now watching for changes. Press 'CTRL+C' to stop."
        );
    } catch (error) {
        console.error(error);
    } finally {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
    }
};
