import { getRemoteConnectionString } from "../config/database";
import { spawnWithLogs } from "../utils/spawn";
import { DUMP_PATH } from "../config/constants";
import chalk from "chalk";

export const dump = async () => {
    try {
        console.log(chalk.blue(`Dumping database from ${process.env.DATABASE_URI}...`))
        await spawnWithLogs("mongodump", [
            `--uri=${getRemoteConnectionString()}`,
            `--out=${DUMP_PATH}`,
            "--excludeCollection=auditlogs",
            "--excludeCollection=emailevents",
        ]);
        console.log(chalk.blue("Database dumped successfully."));
    } catch (error) {
        console.error(chalk.red("Error downloading dump:"), error);
    }
};
