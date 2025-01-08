import { getLocalConnectionString } from "../config/database";
import { spawnWithLogs } from "../utils/spawn";
import { DUMP_PATH } from "../config/constants";
import chalk from "chalk";

export const restore = async (collectionNames?: string[]) => {
    try {
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
                    `${DUMP_PATH}/maven/${collectionName}.bson`,
                ]);
                console.log(chalk.blue(`${collectionName} restored.`));
            }
        } else {
            console.log(chalk.blue("Restoring full database..."));
            await spawnWithLogs("mongorestore", [
                `--uri=${getLocalConnectionString()}`,
                "--drop",
                "--noOptionsRestore",
                `${DUMP_PATH}/maven`,
            ]);
            console.log(chalk.blue("Database restored."));
        }
    } catch (error) {
        console.error(chalk.red("Error:"), error);
    }
};
