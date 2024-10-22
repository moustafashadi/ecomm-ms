import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: "Invalid id" });
  }
  next();
}

export default checkId;