const generateRandomString = require("./randomStringSenerate");

const FileUpload = (File) => {
  let extantion = File.name.split(".");
  extantion = extantion[extantion.length - 1];
  let fileName = generateRandomString(10);
  console.log("fileName ", fileName);
  let dir = File.mimetype.split("/")[0];
  dir =
    dir === "image" || dir === "video" || dir === "audio" ? dir : "document";
  fileName += `.${extantion}`;
  let fullPath = `./Uploads/${dir}/${fileName}`;
  File.mv(fullPath);
  return {
    name: fileName,
    extantion,
    fullPath: fullPath.substring(1, fullPath.length),
    mimetype: dir,
    fileSize: File.size,
  };
};

module.exports = FileUpload;
