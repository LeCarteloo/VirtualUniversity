import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected (${conn.connection.host})`);
  } catch (error) {
    console.log(`UV-Error ${error}`);
    process.exit(1);
  }
};

const closeDB = async () => {
  const conn = await mongoose.connection.close();
}

export  {connectDB, closeDB};
