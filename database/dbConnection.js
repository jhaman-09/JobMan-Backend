import mongoose from "mongoose";

export const dbConnection = () => {
  const uri = process.env.MONGODB_URL;
  if (!uri) throw new Error("The MONGODB_URI environment variable is not set.");

  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "JobMan",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to data: ${err}`);
    });
};
