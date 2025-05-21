const { User } = require("../entities/User");

const AppDataSource = require("../config/db");

const userRepository = AppDataSource.getRepository("User");

const registerUser = async (req, res) => {
  try {
    const { username, role, password } = req.body;

    const newUser = userRepository.create({ username, password, role });
    await userRepository.save(newUser);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error while registering user", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
