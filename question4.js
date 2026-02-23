import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/login/:role", (req, res) => {
  const role = req.params.role;

  if (role !== "admin" && role !== "client") {
    return res.status(400).json({ message: "Invalid role" });
  }

  res.cookie("role", role);

  if (role === "admin") {
    res.json({ message: "Admin LoggedIn" });
  } else {
    res.json({ message: "Client LoggedIn" });
  }
});

const auth = (req, res, next) => {
  const role = req.cookies.role;

  if (!role) {
    return res.status(401).json({ message: "Not Logged In" });
  }

  req.role = role; 
  next();
};

app.get("/dashboard", auth, (req, res) => {
  if (req.role === "admin") {
    res.json({ message: "Welcome Admin" });
  } else {
    res.json({ message: "Welcome Client" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("role");

  res.json({ message: "Logged out successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});