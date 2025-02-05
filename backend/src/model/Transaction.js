import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 1000 },
  category: { type: String, required: true, maxlength: 100 },
  image: { type: String, required: true },
  sold: { type: Boolean, default: false },
  dateOfSale: { type: Date, required: true },
});



const Transaction = mongoose.model("Transaction", TransactionSchema, "Transaction");

export default Transaction;
