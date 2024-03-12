import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import BitcoinModel from "./model.js";

let url =
  "mongodb+srv://aspetrosyan07:aram030303@cluster0.ehjeeqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url)
  .then(() => console.log("DB ok"))
  .catch(() => console.log("DB error"));

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

async function getBitcoinValue() {
  try {
    const response = await axios.get("https://blockchain.info/ticker");
    // console.log(response.data);
    return response.data; // Return the data instead of logging it
  } catch (error) {
    throw new Error("Error fetching Bitcoin value: " + error.message);
  }
}

const addDB = async () => {
  const bitcoinValue = await getBitcoinValue();
  let doc = new BitcoinModel({ value: bitcoinValue.USD.buy });
  const user = await doc.save();
  return user;
};

async function myFunction() {
  let idk = await addDB();
  console.log(idk);
}
setInterval(myFunction, 10000);

app.get("/bitcoin-value", async (req, res) => {
  try {
    // let idk = await addDB();
    const bitcoinObjects = await BitcoinModel.find({});
    console.log(bitcoinObjects);
    // console.log(idk);
    res.json(bitcoinObjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching Bitcoin value",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
