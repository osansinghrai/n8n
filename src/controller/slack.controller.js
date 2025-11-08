require('dotenv').config();
const slackNotification = require("../slackNotification");

const slackController = async (req, res) => {
    try {
        const data = await req.body;
        const { topic , result } = data;
        if (!result) {
            console.log("Something went wrong while searching. Try again later")
            return res.status(400).json({ 
                status: "Failed",
                message: "Something went wrong while searching. Try again later" });
        }
        
        const slackNotificationResponse = await slackNotification(data);
        return res.status(200).json({
            status: "Success",
            message: "Data fetched successfully",
            slackNotification: slackNotificationResponse
        });
    }
    catch (error){
        console.error("Error sending slack notification:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = slackController;