//get the dark facts from database
const Fact = require("../../models/fact");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const getFact = async (req, res) => {
  const type = req.query.type;
  const index = req.query.index;

  const fact = await Fact.findOne({ type: type }).skip(index);

  res.json({
    fact: fact,
  });
};


module.exports  = getFact;