import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { dump } from "./commands/dump";
import { restore } from "./commands/restore";
import { restoreRemote } from "./commands/restoreRemote";
import "dotenv/config";

yargs(hideBin(process.argv))
    .command("dump", "Download dump from remote DB", {}, async () => {
        await dump();
    })
    .command(
        "restore",
        "Restore a collection from dump",
        {
            collection: {
                alias: "c",
                type: "array",
                description: "Collection names to restore",
            },
        },
        async (argv) => {
            await restore(argv.collection);
        }
    )
    .command(
        "restore-remote",
        "Restore collection to remote database",
        {
            collection: {
                alias: "c",
                type: "string",
                description: "Collection name to restore",
                demandOption: true,
            },
        },
        async (argv) => {
            await restoreRemote(argv.collection);
        }
    )
    .demandCommand(1)
    .help().argv;
