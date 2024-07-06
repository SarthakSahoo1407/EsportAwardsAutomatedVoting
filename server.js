const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    
    const command = `python3 run_playwright.py "${name}" "${email}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ message: 'An error occurred', error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ message: 'An error occurred', error: stderr });
        }
        console.log(`Stdout: ${stdout}`);
        res.json({ message: 'Voting completed successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
