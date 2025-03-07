import { getLocalConnectionString } from "../config/database";
import { spawnWithLogs } from "../utils/spawn";
import { DUMP_PATH } from "../config/constants";
import chalk from "chalk";
import path from "node:path";

export type RestoreOptions = {
    collectionNames?: string[];
    saveName?: string;
};

export const restore = async (opts: RestoreOptions) => {
    const { collectionNames, saveName } = opts;
    try {
        const restoreDir = saveName
            ? path.join(DUMP_PATH, `save_${saveName}`, "maven")
            : path.join(DUMP_PATH, "maven");

        if (collectionNames && collectionNames.length > 0) {
            for (const collectionName of collectionNames) {
                console.log(
                    chalk.blue(`Restoring collection ${collectionName}...`)
                );
                await spawnWithLogs("mongorestore", [
                    `--uri=${getLocalConnectionString()}`,
                    `--nsInclude=maven.${collectionName}`,
                    "--drop",
                    "--noOptionsRestore",
                    `${restoreDir}/${collectionName}.bson`,
                ]);
                console.log(chalk.blue(`${collectionName} restored.`));
            }
        } else {
            console.log(chalk.blue("Restoring full database..."));
            await spawnWithLogs("mongorestore", [
                `--uri=${getLocalConnectionString()}`,
                "--drop",
                "--noOptionsRestore",
                restoreDir,
            ]);
            console.log(chalk.blue("Database restored."));
        }
    } catch (error) {
        console.error(chalk.red("Error:"), error);
    }
};
