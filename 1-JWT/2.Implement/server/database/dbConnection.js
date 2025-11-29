import mongoose from "mongoose";
function connection() {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "AuthenticationJWT",
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(`some error occur : ${err}`);
    });
}

export default connection;
