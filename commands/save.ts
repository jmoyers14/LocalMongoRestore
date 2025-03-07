import { getLocalConnectionString } from "../config/database";
import { spawnWithLogs } from "../utils/spawn";
import { DUMP_PATH } from "../config/constants";
import chalk from "chalk";
import path from "path";

export const save = async (saveName: string) => {
    try {
        const saveDir = path.join(DUMP_PATH, `save_${saveName}`);
        console.log(
            chalk.blue(`Saving current database state as '${saveName}'...`)
        );

        await spawnWithLogs("mongodump", [
            `--uri=${getLocalConnectionString()}`,
            `--out=${saveDir}`,
            "--excludeCollection=auditlogs",
            "--excludeCollection=emailevents",
        ]);

        console.log(chalk.green(`Database state saved as '${saveName}'`));
    } catch (error) {
        console.error(chalk.red("Error saving database state:"), error);
    }
};
