const AppDataSource = require("../config/db");
const { Request } = require("../entities/Request");
const { Software } = require("../entities/Software");

const requestRepo = AppDataSource.getRepository(Request);
const softwareRepo = AppDataSource.getRepository(Software);

exports.createRequest = async (req, res) => {
  try {
    const { softwareId, reason } = req.body;
    console.log(softwareId, reason);
    const userId = req.user.userId;
    console.log(userId);

    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    const newRequest = requestRepo.create({
      reason,
      software,
      user: { id: userId },
    });

    await requestRepo.save(newRequest);
    return res.status(201).json({ message: "Request submitted" });
  } catch (error) {
    console.error("Request creation failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await requestRepo.find({ order: { id: "DESC" } });
    return res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
