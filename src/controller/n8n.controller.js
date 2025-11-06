require('dotenv').config();
const n8nService = require('../service/n8n.service');

const n8nController = async (req, res) => {
    try {
        const data = req.body;
        const { topic, name, email } = data;

        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }

        if (!name || !email) {
            return res.status(400).json({ message: "Either Name or Email is required to send Mail" });
        }

        const n8nUrl = process.env.n8nUrl;
        const response = await fetch(n8nUrl, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ topic, name, email })
        })
        return res.status(201).json({
            status: "Success",
            message: "Workflow triggered successfully, You will receive an notification shortly",
        })
    }
    catch (error) {
        console.error("Error in n8nController:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
module.exports = n8nController;