const bcrypt = require("bcrypt");
const { User } = require("../entities/User");
const AppDataSource = require("../config/db");
const dotenv = require("dotenv");

dotenv.config();

const userRepository = AppDataSource.getRepository("User");

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = userRepository.create({
      username,
      password: hashedPassword,
      role,
    });

    await userRepository.save(newUser);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { registerUser };
