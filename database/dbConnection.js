import mongoose from "mongoose";

export const dbConnection = () => {
  const uri = process.env.MONGODB_COMPASS_CLOUD_URI;
  if (!uri)
    throw new Error(
      "The MONGODB_COMPASS_CLOUD_URI environment variable is not set."
    );

  mongoose
    .connect(uri, {
      dbName: "JobMan", // Specify your database name here
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`An error occurred while connecting to the database: ${err}`);
    });
};
