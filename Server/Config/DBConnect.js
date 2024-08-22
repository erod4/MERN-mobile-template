const mongoose = require("mongoose");
const url = process.env.DB_CONNECT_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

dbConnect();
