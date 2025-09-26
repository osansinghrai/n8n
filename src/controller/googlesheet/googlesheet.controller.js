require('dotenv').config();
const path = require("path");
const { google } = require("googleapis");
const googleSheetService = require("../../service/googlesheet.service");

const googleSheetController = async (req, res) => {
    try {
        const data = await req.body;
        console.log("Request Body:", data); 
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, "service-account.json"), // credential file name
            scopes: [
                process.env.GoogleApiCreateManage,
                process.env.GoogleApiReadWrite,
                process.env.GoogleApiPermission 
            ]
        })
        const client = await auth.getClient();
        console.log("Service Account Email:", client.email);

        // authorization check
        client.authorize(function(err) {
            if (err)
            {
                console.error("Error authorizing client:", err);
                return res.status(401).json({ message: "Unauthorized" });
            }
            else
            {
                console.log("Client authorized successfully");
                return res.status(200).json({ message: "Authorized successfully" });
            }
        })
        // const sheets = google.sheets({ version: "v4", auth: client });

        // const googleSheetResponse = await sheets.spreadsheets.create({
        //     resource: {
        //         properties: {
        //             title: "Test sheet"
        //         }
        //     }
        // })
        // const drive = google.drive({ version: "v3", auth: client });
        // await drive.permissions.create({
        //     fileId: googleSheetResponse.data.spreadsheetId,
        //     requestBody: {
        //         role: "writer",
        //         type: "anyone"
        //     }
        // })

        // const googleSheetId = googleSheetResponse.data.spreadsheetId;
        // console.log("Google sheet ID:", googleSheetId);
        // const googleSheetUrl = googleSheetService(googleSheetId);
        // res.status(201).json({ 
        //     status: "Success",
        //     message: "Google Sheet created successfully",
        //     googleSheetUrl: googleSheetUrl
        //  });
    }
    catch (error){
        console.error("Error accessing Google Sheets API:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = googleSheetController;