// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 4000;
const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to the data file
const DATA_FILE = 'userData.json';

// Helper function to read data from JSON file
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        }
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data file:', err);
        return [];
    }
};

// Helper function to write data to JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data file:', err);
    }
};

// API endpoint to receive user data
app.post('/api/response', (req, res) => {
    const incomingData = req.body;

    if (!incomingData.userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    let existingData = readData();

    // Check if user already exists
    const userIndex = existingData.findIndex(user => user.userId === incomingData.userId);

    if (userIndex !== -1) {
        // Update existing user data
        existingData[userIndex] = {
            ...existingData[userIndex],
            ...incomingData,
            // Merge arrays to accumulate data
            viewSearchResultsTimes: [
                ...existingData[userIndex].viewSearchResultsTimes,
                ...incomingData.viewSearchResultsTimes
            ],
            openScrollTimes: [
                ...existingData[userIndex].openScrollTimes,
                ...incomingData.openScrollTimes
            ],
            aiOverviewHoverTimes: [
                ...existingData[userIndex].aiOverviewHoverTimes,
                ...incomingData.aiOverviewHoverTimes
            ],
            searchResultsHoverTimes: [
                ...existingData[userIndex].searchResultsHoverTimes,
                ...incomingData.searchResultsHoverTimes
            ],
            aiOverviewPageView: [
                ...existingData[userIndex].aiOverviewPageView,
                ...incomingData.aiOverviewPageView
            ],
            searchResultsPageView: [
                ...existingData[userIndex].searchResultsPageView,
                ...incomingData.searchResultsPageView
            ],
            responses: [
                ...existingData[userIndex].responses,
                ...incomingData.responses
            ],
            referencePageClicks: existingData[userIndex].referencePageClicks + incomingData.referencePageClicks
        };
    } else {
        // Add new user data
        existingData.push(incomingData);
    }

    // Write back to the file
    writeData(existingData);

    res.status(200).json({ message: 'Data received successfully.' });
});

// Serve static files (前端)
app.use(express.static(path.join(__dirname, '../frontend')));

// 处理单页面应用的路由（返回index.html）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
