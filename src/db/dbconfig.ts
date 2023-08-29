import mongoose from "mongoose";

// Connecting with MongoDB Atlas using mongoose
// You can also use local MongoDB server just change the MONGO_URL in .env file
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Conected With MongoDB successfully");
    });

    connection.on("error", (err) => {
      console.log("Error in connecting with MongoDB", err);
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connect;
