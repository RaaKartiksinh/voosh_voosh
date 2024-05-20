const userModel = require("../model/userModel");

const getAdminList = async (req, res) => {
  try {
    const getAccountType = req.query.accountType || "private";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let result = await userModel.userModel
      .find({ accountType: getAccountType })
      .skip(skip)
      .limit(limit)
      .lean();
    if (result) {
      return res.status(200).send({ message: "success", userList: result });
    }
    return res.status(400).send({ message: "Something went wrong" });
  } catch (error) {
    console.error("Error during getUserList:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getAdminList };
