import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL!);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connection Successfully");
  } catch (err) {
    console.log("Database connection faild", err);
    process.exit();
  }
}

export default dbConnect;
