import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import sequelize from "./config/db.js";
import Quser from "./models/Quser.js";
import jwt from "jsonwebtoken";
import Result from "./models/Result.js";

const app = express();
const JWT_SECRET = "Testing and Learn vue3";

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT"]
}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Create the node+Express first project🚀");
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, phno, password } = req.body;

    if (!username || !email || !phno || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Quser.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Quser.create({
      username,
      email,
      phno,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phno: newUser.phno
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await Quser.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phno: user.phno
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired JWTtoken" });
  }
};

 app.post("/api/result", verifyToken, async (req, res) => {

    console.log("BODY:", req.body)
  try {
    const {
      username,
      answeredQuestionCount,
      totalQuestions,
      correctAnswerCount,
      percentage
    } = req.body

    if (
      !username ||
      answeredQuestionCount === undefined ||
      totalQuestions === undefined ||
      correctAnswerCount === undefined ||
      percentage === undefined

    ) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await Result.create({
      username,
      
      answerCount: answeredQuestionCount,
      totalQ: totalQuestions,
      correctAns: correctAnswerCount,
      percentage
    })

    return res.status(201).json({
      message: 'Result saved successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to save result'
    })
  }
})


app.get("/api/result", verifyToken, (req, res) => {
  res.status(200).json({
    message: "JWT verified successfully",
    user: req.user
  });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    

    app.listen(5005, () => {
      console.log("🚀 Server running on port 5005");
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

startServer();