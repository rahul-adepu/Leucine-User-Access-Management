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

exports.updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== "Manager") {
      return res
        .status(403)
        .json({ message: "Only Managers can update requests" });
    }

    const { requestId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await requestRepo.findOneBy({ id: parseInt(requestId) });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await requestRepo.save(request);

    return res.json({ message: `Request ${status.toLowerCase()}` });
  } catch (error) {
    console.error("Error updating request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
