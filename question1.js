import express from "express";
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "A", age: 20, course: "Math" },
  { id: 2, name: "B", age: 21, course: "Physics" }
];

app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, course } = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = name;
  student.age = age;
  student.course = course;

  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.json({ message: "Student deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});