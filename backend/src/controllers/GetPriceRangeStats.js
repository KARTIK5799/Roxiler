import Transaction from '../model/Transaction.js';

const GetPriceRangeStats = async (req, res) => {
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
        $bucket: {
          groupBy: "$price", 
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity], 
          default: "Other",  
          output: {
            count: { $sum: 1 }  
          }
        }
      },
    ];

    const statistics = await Transaction.aggregate(pipeline);

    if (statistics.length === 0) {
      return res.status(404).json({ message: 'No transactions found for the selected month' });
    }

  
    const formattedStats = [
      { priceRange: "0-100", count: 0 },
      { priceRange: "101-200", count: 0 },
      { priceRange: "201-300", count: 0 },
      { priceRange: "301-400", count: 0 },
      { priceRange: "401-500", count: 0 },
      { priceRange: "501-600", count: 0 },
      { priceRange: "601-700", count: 0 },
      { priceRange: "701-800", count: 0 },
      { priceRange: "801-900", count: 0 },
      { priceRange: "901-above", count: 0 },
    ];

    statistics.forEach((stat) => {
      if (stat._id === 0) {
        formattedStats[0].count = stat.count;
      } else if (stat._id === 100) {
        formattedStats[1].count = stat.count;
      } else if (stat._id === 200) {
        formattedStats[2].count = stat.count;
      } else if (stat._id === 300) {
        formattedStats[3].count = stat.count;
      } else if (stat._id === 400) {
        formattedStats[4].count = stat.count;
      } else if (stat._id === 500) {
        formattedStats[5].count = stat.count;
      } else if (stat._id === 600) {
        formattedStats[6].count = stat.count;
      } else if (stat._id === 700) {
        formattedStats[7].count = stat.count;
      } else if (stat._id === 800) {
        formattedStats[8].count = stat.count;
      } else if (stat._id > 900) {
        formattedStats[9].count = stat.count;
      }
    });

    res.status(200).json({
      data: formattedStats,
    });
  } catch (error) {
    console.log('Error in Getting Price Range Stats', error);
    res.status(500).json({ message: 'Failed to fetch price range statistics' });
  }
};

export default GetPriceRangeStats;
