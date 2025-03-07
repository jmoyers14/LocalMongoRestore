import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { dump } from "./commands/dump";
import { restore } from "./commands/restore";
import { restoreRemote } from "./commands/restoreRemote";
import { save } from "./commands/save";
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
            save: {
                alias: "s",
                type: "string",
                description: "Name of the saved state to restore from",
            },
        },
        async (argv) => {
            await restore({
                collectionNames: argv.collection,
                saveName: argv.save,
            });
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
    .command(
        "save",
        "Save current database state",
        {
            name: {
                alias: "n",
                type: "string",
                description: "Name for this saved state",
                demandOption: true,
            },
        },
        async (argv) => {
            await save(argv.name);
        }
    )
    .demandCommand(1)
    .help().argv;
