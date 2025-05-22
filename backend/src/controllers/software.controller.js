const { getRepository } = require("typeorm");
const { Software } = require("../entities/Software");
const AppDataSource = require("../config/db");

const softwareRepository = AppDataSource.getRepository(Software); // or: getRepository(Software);

exports.createSoftware = async (req, res) => {
  const { name, description, accessLevels } = req.body;
  console.log(name, description, accessLevels);

  if (
    !name ||
    !description ||
    !Array.isArray(accessLevels) ||
    accessLevels.length === 0
  ) {
    return res.status(400).json({
      message:
        "Name, description and accessLevels (non-empty array) are required",
    });
  }

  try {
    const software = softwareRepository.create({
      name,
      description,
      accessLevels,
    });
    await softwareRepository.save(software);
    return res
      .status(201)
      .json({ message: "Software created successfully", software });
  } catch (error) {
    console.error("Error creating software:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllSoftwares = async (req, res) => {
  try {
    const softwares = await softwareRepository.find({ order: { id: "DESC" } });

    return res.json(softwares);
  } catch (error) {
    console.error("Error fetching softwares:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
