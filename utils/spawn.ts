import { spawn } from "child_process";

export const spawnWithLogs = async (command: string, args: string[]) => {
    const process = spawn(command, args);

    process.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    return new Promise<void>((resolve, reject) => {
        process.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
};
