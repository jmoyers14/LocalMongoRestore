export const getLocalConnectionString = () => {
    return "mongodb://localhost:27017/maven";
};

export const getRemoteConnectionString = () => {
    const { DATABASE_PASSWORD, DATABASE_URI, DATABASE_USERNAME } = process.env;
    return `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URI}/maven`;
};


