const db = require('../config/db');

exports.getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Student not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createStudent = async (req, res) => {
    const { firstName, lastName, age, course } = req.body;
    try {
        await db.query('INSERT INTO students (firstName, lastName, age, course) VALUES (?, ?, ?, ?)', 
        [firstName, lastName, age, course]);
        res.status(201).json({ message: "Student added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    const { firstName, lastName, age, course } = req.body;
    try {
        await db.query('UPDATE students SET firstName=?, lastName=?, age=?, course=? WHERE id=?', 
        [firstName, lastName, age, course, req.params.id]);
        res.json({ message: "Student updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.patchStudent = async (req, res) => {
    const { course } = req.body;
    try {
        await db.query('UPDATE students SET course=? WHERE id=?', [course, req.params.id]);
        res.json({ message: "Course updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await db.query('DELETE FROM students WHERE id = ?', [req.params.id]);
        res.json({ message: "Student deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

console.log("Request received!");
