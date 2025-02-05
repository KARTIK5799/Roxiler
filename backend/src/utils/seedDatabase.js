import axios from "axios";
import Transaction from "../model/Transaction.js";


const seedDatabase= async() => {
try {
    const existingTransactions = await Transaction.countDocuments();

   
    if (existingTransactions > 0) {
      console.log('Database already has data. Skipping seeding.');
      return;
    }
    const response = await axios.get(process.env.API_URI);
    if (!response.data) {
        console.log('API returned no data');
        return;
      }

const transactions =response.data;

// await Transaction.deleteMany({});


for(let transaction of transactions){
    const newTransaction= new Transaction({
        title: transaction.title || "Untitled Product",
        price: transaction.price || 0,
        description: transaction.description || "No description available",
        category: transaction.category || "Uncategorized",
        image: transaction.image || "https://via.placeholder.com/150",
        sold: transaction.sold || false,
        dateOfSale: new Date(transaction.dateOfSale) || new Date(),


      });
      await newTransaction.save();
}

} catch (error) {
    console.error('Error seeding database:', error);
}
}

export default seedDatabase;