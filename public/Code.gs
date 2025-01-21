function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Export Data')
      .addItem('To Github', 'exportDataToGithub')
      .addToUi();
}

function showDialog() {
  var html = HtmlService.createHtmlOutputFromFile('index')
      .setTitle('My React Add-on')
      .setWidth(900)
      .setHeight(500);
  SpreadsheetApp.getUi().showSidebar(html);
}

function exportDataToGithub() {
  console.log("executed onEdit");
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var sheets = spreadsheet.getSheets();

  for (var i = 0; i < sheets.length; i++) {

    const dataRange = SpreadsheetApp.getActive().getSheetByName(sheets[i].getName()).getDataRange();
    // Get all the values in the data range as a 2D array
    const data = dataRange.getValues();

    if (data.length > 0) {
      // Extract the first row for the column names (keys)
      const headers = data[0];

      // Create an array of objects, where each row is an object
      const jsonArray = data.slice(1).map(function(row) {
        let obj = {};
        // Iterate over the row and map each column to its respective header
        row.forEach(function(cell, index) {
          obj[headers[index]] = cell;
        });
        return obj;
      });

      // Log the JSON result for inspection
      createFileOnGitHub(spreadsheet, sheets[i], JSON.stringify(jsonArray))
    } else {
      console.log("No data available in the sheet.");
    }
  }
}


function createFileOnGitHub(spreadsheet, sheet, data) {
  var token = '<GITHUB_TOKEN>'; // Replace with your GitHub personal access token
  var owner = 'Hena-123';              // Replace with your GitHub username
  var repo = 'gain-growth';               // Replace with your GitHub repository name
  var filePath = 'sheetdata/' + spreadsheet.getId() + '/' + sheet.getName() +'-' + sheet.getSheetId() + '.json';       // Path of the file you want to create in the repo
  console.log("filePath", filePath);

  // File content (Base64-encoded)
  var fileContent = Utilities.base64Encode(Utilities.newBlob(data).getBytes()); // "Hello world!" encoded in Base64

  // Prepare the payload
  var payload = {
    "message": "[" + spreadsheet.getName() + "][" + sheet.getName() +'-' + sheet.getSheetId() + "]: File update from Google Apps Script",  // Commit message
    "content": fileContent,                                // Base64-encoded content
    "branch": "GG-9-test",                                      // Target branch (default is 'main')
    "path": filePath                                        // File path in the repo
  };

  // If file exists then fetch sha of it
  var sha = getFileSHA(owner, repo, filePath, token);
  payload["sha"] = sha;

  // Convert the payload to JSON
  var payloadJson = JSON.stringify(payload);

  // GitHub API URL for creating or updating a file
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + filePath;

  // Set up the options for the HTTP request
  var options = {
    method: 'put',                                         // HTTP method is 'PUT' to create or update a file
    headers: {
      "Authorization": "token " + token,                    // Authentication header with your token
      "Content-Type": "application/json"                    // Content type for the request body
    },
    payload: payloadJson                                    // Send the JSON payload
  };

  // Make the HTTP request to GitHub API
  var response = UrlFetchApp.fetch(url, options);

  // Log the response (can be useful for debugging)
  Logger.log(response.getContentText());
}


function getFileSHA(owner, repo, filePath, token) {
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + filePath + '?ref=GG-9-test';
  console.log("url", url);
  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: {
        'Authorization': 'token ' + token
      }
    });

    var jsonResponse = JSON.parse(response.getContentText());
    if (jsonResponse.sha) {
      Logger.log('SHA: ' + jsonResponse.sha); // Return the SHA for further use
      return jsonResponse.sha;
    } else {
      Logger.log('File not found. A new file will be created.');
      return null;  // No file exists, so we'll create a new one
    }
  }
  catch (e) {
    if (e.message.indexOf('Not found') !== -1) {
      Logger.log('Error: ' + filePath + ' does not exists.');
      return null;
    } else {
      // For other errors, log the message
      Logger.log('Error: ' + e.message);
      return null;
    }
  }
}











