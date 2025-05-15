const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure data directory exists
if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

// Ensure uploads directory exists
if (!fs.existsSync('public/uploads')) {
    fs.mkdirSync('public/uploads', { recursive: true });
}

// Initialize JSON file if it doesn't exist
const dataFilePath = path.join(__dirname, 'data', 'entries.json');
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]', 'utf8');
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit-form', upload.single('image'), (req, res) => {
    try {
        const { name, age, mobile, address } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        // Read existing data
        const existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Add new entry
        const newEntry = {
            id: Date.now().toString(),
            name,
            age,
            mobile,
            address,
            image: imagePath,
            timestamp: new Date().toISOString()
        };

        existingData.push(newEntry);

        // Write back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8');

        res.json({ success: true, message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ success: false, message: 'Error saving data' });
    }
});

app.get('/get-entries', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        res.json(data);
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ success: false, message: 'Error reading data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});