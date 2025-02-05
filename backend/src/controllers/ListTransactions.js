import Transaction from '../model/Transaction.js';

const ListTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month } = req.query;

    // Validate the 'month' parameter
    if (month && isNaN(parseInt(month))) {
      return res.status(400).json({ message: 'Invalid month parameter' });
    }

    const query = [
      {
        $match: month ? { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } } : {}
      },
      {
        $match: search
          ? {
              $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } },
              ],
            }
          : {},
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: Number(perPage),
      },
    ];

    const transactions = await Transaction.aggregate(query);

    const total = await Transaction.countDocuments({
      $expr: month
        ? { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
        : {},
    });

    res.status(200).json({
      data: transactions,
      total,
      page,
      perPage,
    });
  } catch (error) {
    console.log('Error in Getting List of Transactions', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

export default ListTransactions;
