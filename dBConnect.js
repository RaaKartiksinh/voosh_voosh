const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful ✅");
  } catch (error) {
    console.error("Error connecting to database ❌  :", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
