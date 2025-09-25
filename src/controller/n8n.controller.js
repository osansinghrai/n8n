require('dotenv').config();
const n8nService = require('../service/n8n.service');

const n8nController = async (req, res) => {
    try {
        const data = req.body;
        const { topic } = data;

        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }

        const n8nUrl = process.env.n8nUrl;
        const response = await fetch(n8nUrl, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ topic })
        })
        const n8nData = await response.json()
        const finalN8nData = n8nService(n8nData);
        console.log("Final Data:", finalN8nData);
    }
    catch (error) {
        console.error("Error in n8nController:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
    module.exports = n8nController;