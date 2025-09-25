const googleSheetService = (googleSheetId) => {
    const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${googleSheetId}`;
    return googleSheetUrl;
}

module.exports = googleSheetService;