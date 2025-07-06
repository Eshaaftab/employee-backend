const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let employees = []; // In-memory store

// GET all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// POST new employee
app.post('/api/employees', (req, res) => {
  const newEmp = { id: Date.now().toString(), ...req.body };
  employees.push(newEmp);
  res.status(201).json(newEmp);
});

// PUT - full update
app.put('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index] = { id, ...req.body };
    return res.json(employees[index]);
  }
  res.status(404).json({ message: 'Employee not found' });
});

// PATCH - partial update
app.patch('/api/employees/:id', (req, res) => {
  const id = req.params.id;
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    Object.assign(employee, req.body);
    return res.json(employee);
  }
  res.status(404).json({ message: 'Employee not found' });
});

// DELETE
app.delete('/api/employees/:id', (req, res) => {
  employees = employees.filter(emp => emp.id !== req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
