import Transaction from '../model/Transaction.js';

const GetStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (month && isNaN(parseInt(month))) {
      return res.status(400).json({ message: 'Invalid month parameter' });
    }

    const monthNumber = month ? parseInt(month) : null;

 
    const pipeline = [
      {
        $match: monthNumber
          ? { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } }
          : {},
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
        },
      },
    ];

    const statistics = await Transaction.aggregate(pipeline);

    if (statistics.length === 0) {
      return res.status(404).json({ message: 'No transactions found for the selected month' });
    }

 
    res.status(200).json({
      totalSaleAmount: statistics[0].totalSaleAmount,
      totalSoldItems: statistics[0].totalSoldItems,
      totalNotSoldItems: statistics[0].totalNotSoldItems,
    });
  } catch (error) {
    console.log('Error in Getting Statistics', error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};

export default GetStatistics;
