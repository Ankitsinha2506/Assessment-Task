const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the "public" directory

//  Add some employees by hard coding.

let employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 60000, age: 30 },
    { id: 2, name: 'Jane Smith', position: 'Project Manager', salary: 75000, age: 35 },
    { id: 3, name: 'Mike Johnson', position: 'Designer', salary: 50000, age: 28 }
];

// fetch all Employee
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Fetch Employee with their id.
app.get('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
});

// Add Employee
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    newEmployee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Delete Employee by using their id.
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.sendStatus(204);
});

// Update Employee
app.put('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedEmployee = req.body;
    employees = employees.map(emp => emp.id === id ? { ...emp, ...updatedEmployee } : emp);
    res.json(employees.find(emp => emp.id === id));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
