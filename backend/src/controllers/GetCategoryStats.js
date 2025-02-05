import Transaction from '../model/Transaction.js';

const GetCategoryStats = async (req, res) => {
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
          _id: "$category",  
          count: { $sum: 1 }, 
        }
      },
      {
        $sort: { count: -1 } 
      }
    ];

    const statistics = await Transaction.aggregate(pipeline);

    if (statistics.length === 0) {
      return res.status(404).json({ message: 'No transactions found for the selected month' });
    }

    
    const formattedStats = statistics.map((stat) => ({
      category: stat._id,
      items: stat.count,
    }));

    res.status(200).json({
      data: formattedStats,
    });
  } catch (error) {
    console.log('Error in Getting Category Stats', error);
    res.status(500).json({ message: 'Failed to fetch category statistics' });
  }
};

export default GetCategoryStats;
