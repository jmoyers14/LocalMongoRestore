import { getRemoteConnectionString } from "../config/database";
import { spawnWithLogs } from "../utils/spawn";
import { DUMP_PATH } from "../config/constants";
import chalk from "chalk";

export const restoreRemote = async (collectionName: string) => {
   try {
       console.log(chalk.blue(`Restoring collection ${collectionName} to remote database...`));
       await spawnWithLogs("mongorestore", [
           `--uri=${getRemoteConnectionString()}`,
           `--nsInclude=maven.${collectionName}`,
           '--drop',
           '--noOptionsRestore',
           `${DUMP_PATH}/maven/${collectionName}.bson`,
       ]);
       console.log(chalk.blue(`${collectionName} restored to remote database.`));
   } catch (error) {
       console.error(chalk.red("Error:"), error);
   }
};
