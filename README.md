# MongoDB Local Debug Utility

A utility tool for managing MongoDB database dumps between remote and local environments for application debugging.

## Overview

This tool provides simple commands to:
- Download dumps from your remote MongoDB database
- Restore collections locally from dumps
- Save local database states with custom names
- Restore collections to remote database (for advanced use cases)

## Configuration

Create a `.env` file in the root directory with your MongoDB connection information:

```
# Example .env configuration
REMOTE_MONGO_URI=mongodb+srv://username:password@your-cluster.mongodb.net/
LOCAL_MONGO_URI=mongodb://localhost:27017/your-database
DUMP_LOCATION=./dumps
```

## Usage

### Download Database Dump from Remote

Downloads a dump of your remote database to local storage.

```bash
npm run start -- dump
```

### Restore Collections Locally

Restore specific collections from a dump to your local MongoDB.

```bash
# Restore specific collections
npm run start -- restore -c collection1 collection2

# Restore from a named saved state
npm run start -- restore -s my-saved-state
```

### Save Current Database State

Create a named snapshot of your current local database state.

```bash
npm run start -- save -n my-feature-testing
```

### Restore Collection to Remote Database

Push a local collection back to the remote database (use with caution).

```bash
npm run start -- restore-remote -c collection-name
```

## Command Reference

| Command | Description | Options |
|---------|-------------|---------|
| `dump` | Download dump from remote DB | None |
| `restore` | Restore collection(s) from dump | `-c, --collection`: Collection names<br>`-s, --save`: Saved state name |
| `save` | Save current database state | `-n, --name`: Name for saved state (required) |
| `restore-remote` | Restore collection to remote database | `-c, --collection`: Collection name (required) |

## Development

This tool is built with:
- Node.js
- yargs for command-line argument parsing
- MongoDB tools

## License

[Your license information here]
