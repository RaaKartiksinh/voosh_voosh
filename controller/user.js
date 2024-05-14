const { query } = require("express");
const FileUpload = require("../common/fileController");
const userModel = require("../model/userModel");

const editUser = async (req, res) => {
  try {
    const { id } = req.user;

    if (!req.body) {
      return res.status(400).send({ message: "Missing dependency" });
    }

    // File upload
    let fileDetails = null;

    if (req.files && req.files.profileUrl) {
      let File = req.files.profileUrl;

      if (File?.length) {
        fileDetails = [];
        for (let i = 0; i < File.length; i++) {
          const result = FileUpload(File[i]);
          console.log("File Result Multi", result);
          fileDetails.push(result);
        }
      } else {
        const result = FileUpload(File);
        console.log("File Result Single", result);
        fileDetails = result;
      }
    }

    let result;

    if (!fileDetails?.length) {
      result = await userModel.userModel.findByIdAndUpdate(
        { _id: id },
        { ...req.body, profileUrl: fileDetails?.fullPath },
        {
          new: true,
        }
      );
    } else {
      return res.status(500).send({ message: "Something went wrong" });
    }

    if (result) {
      result = !fileDetails?.length ? result._doc : result;
      return res.status(200).send({ message: "Success", fileDetails: result });
    }

    return res.status(500).send({ message: "Something went wrong" });
  } catch (error) {
    console.error("Error during userEdit:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getUserList = async (req, res) => {
  try {
    // console.log("user =====================>", user.role);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let result = await userModel.userModel
      .find({ accountType: "public" })
      .skip(skip)
      .limit(limit)
      .lean();
    if (result) {
      return res.status(200).send({ message: "success", userList: result });
      // return res.render("userProfileLIst", { userList: result });
    }
    return res.status(500).send({ message: "Something went wrong" });
  } catch (error) {
    console.error("Error during getUserList:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await userModel.userModel.findOne({ _id: id }).select('email  role firstName lastName profileUrl accountType bio');
    if (result) {

      return res.status(200).send({ message: "success", userProfile: result });
      // return res.render("profile");
    }
    return res.status(500).send({ message: "Something went wrong" });
  } catch (error) {
    console.error("Error during getUserList:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { editUser, getUserList, getUserProfile };
