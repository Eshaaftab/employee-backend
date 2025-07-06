const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ===== In-memory store =====
let employees = [];

// ===== Routes =====

// ✅ GET all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// ✅ POST new employee
app.post('/api/employees', (req, res) => {
  const { name, position, department } = req.body;

  if (!name || !position || !department) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newEmp = {
    id: Date.now().toString(),
    name,
    position,
    department,
  };

  employees.push(newEmp);
  res.status(201).json(newEmp);
});

// ✅ PUT - full update
app.put('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const { name, position, department } = req.body;

  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees[index] = { id, name, position, department };
  res.json(employees[index]);
});

// ✅ PATCH - partial update
app.patch('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  Object.assign(employee, req.body);
  res.json(employee);
});

// ✅ DELETE employee
app.delete('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const exists = employees.some(emp => emp.id === id);

  if (!exists) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees = employees.filter(emp => emp.id !== id);
  res.json({ message: 'Employee deleted successfully.' });
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
