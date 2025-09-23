const n8nService = require('../service/n8n.service');

const n8nController = (req, res) => {
    const data = req.body;
    const {topic} = data;

    if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
    }
    const n8nData = n8nService(topic);
    res.status(200).json({Topic: n8nData});
};

module.exports = n8nController;