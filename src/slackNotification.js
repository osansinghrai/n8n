require('dotenv').config();

const slackNotification = async (data) => {
    try {
        const { topic, result } = data;
        const slackUrl = process.env.SLACK_WEBHOOK_URL;

        if (!slackUrl) {
            console.error("Slack hook url is invalid");
            return null;
        }

        const formattedResult =
        result == null
          ? `No data found for topic: ${topic}` 
          : typeof result === "string"
          ?  "```" + result + "```" 
          : "```" + JSON.stringify(result, null, 2) + "```";

        const slackMessage = {
            username: "n8n notification",
            icon_url: "https://upload.wikimedia.org/wikipedia/en/9/92/Chitti_%28character%29.jpg",
            text: result == null ? `No data found for topic: ${topic}` : `Searched result for topic: ${topic}`,
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "plain_text",
                        text: `Searched result for topic - ${String(topic).toUpperCase()}`,
                        emoji: true
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: formattedResult
                    }
                }
            ],
        }

        await fetch(slackUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slackMessage)
        })
        console.log("Slack notification sent successfully");
    }
    catch (error) {
        console.error("Error in sending slack notification:", error);
        return { message: "Internal Server Error", error: error.message };
    }
}

module.exports = slackNotification