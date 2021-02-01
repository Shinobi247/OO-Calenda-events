const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "E:/Project Repo/admin-ui-ex/src/secrets//token.json";

// Load client secrets from a local file.
// function loadClient() {
fs.readFile(
  "E:/Project Repo/admin-ui-ex/src/secrets/credentials.json",
  (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
  }
);
// }

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

var userCalendarData = [];
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here:", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });

  const userEmails = [
    { name: "Rahul Behera", email: "rahul@oneorigin.us" },
    { name: "Vidhyaa Gopal", email: "vidhyaa.gopal@oneorigin.us" },
    { name: "Mohith", email: "mohith@oneorigin.us" },
    { name: "Chetan", email: "chetan@oneorigin.us" },
    { name: "Deepak S", email: "deepak@oneorigin.us" },
    { name: "Azhar", email: "azhar@oneorigin.us" },
    { name: "Skandashree Ganesh", email: "skandashree@oneorigin.us" },
    { name: "Dhanush K", email: "dhanush@oneorigin.us" },
    { name: "Aneesa Khanam", email: "aneesa@oneorigin.us" },
    { name: "Eshwar Reddy", email: "eshwar@oneorigin.us" },
    { name: "Shashank", email: "shashank@oneorigin.us" },
    { name: "Amit", email: "amit@oneorigin.us" },
    { name: "Pranav Rao", email: "pranav@oneorigin.us" },
    { name: "Shubhangi Mote", email: "shubhangi@oneorigin.us" },
    { name: "Harshitha C", email: "harshitha@oneorigin.us" },
    { name: "Vineeth", email: "vineeth@oneorigin.us" },
    { name: "ShreeHari N", email: "sreehari@oneorigin.us" },
    { name: "Kartik Kulkarni", email: "kartik@oneorigin.us" },
    { name: "Jaydeep", email: "jaydeep@oneorigin.us" },
    { name: "Aditya", email: "aditya@oneorigin.us" },
    { name: "Nithin Kamath", email: "nithin@oneorigin.us" },
    { name: "Yamini Reddy", email: "yamini@oneorigin.us" },
    { name: "Karthick Nagraj", email: "karthick@oneorigin.us" },
    { name: "Saumya", email: "saumya@oneorigin.us" },
    { name: "Shruti Kadam", email: "shruti.k@oneorigin.us" },
    { name: "Tushar S Joshi", email: "tushar@oneorigin.us" },
    { name: "George", email: "george@oneorigin.us" },
    { name: "Haygreev", email: "haygreev@oneorigin.us" },
    { name: "Ahmed Sarfaraz J", email: "ahmed@oneorigin.us" },
    { name: "Raj Solanki", email: "raj.solanki@oneorigin.us" },
    { name: "Santosh.v", email: "santosh.v@oneorigin.us" },
    { name: "Pavan B K", email: "pavan@oneorigin.us" },
    { name: "Charvi", email: "charvi@oneorigin.us" },
    { name: "Ketan Ishaan", email: "ketan@oneorigin.us" },
    { name: "Dinesh Reddy", email: "dinesh@oneorigin.us" },
    { name: "Niveditha K S", email: "niveditha@oneorigin.us" },
    { name: "Abhinav Nayak", email: "abhinav@oneorigin.us" },
    { name: "Pruthvi Sainath Reddy Jalla", email: "pruthvi@oneorigin.us" },
    { name: "Prajval", email: "prajval@oneorigin.us" },
    { name: "Chaitra J", email: "chaitra@oneorigin.us" },
    { name: "Jeevan", email: "jeevan@oneorigin.us" },
    { name: "Sowjanya", email: "sowjanya@oneorigin.us" },
    { name: "Himanshu", email: "himanshu@oneorigin.us" },
    { name: "Vivekananda Hangarge", email: "vivekananda@oneorigin.us" },
    { name: "Nandini S", email: "nandini.s@oneorigin.us" },
    { name: "Aditi AN", email: "aditi.an@oneorigin.us" },
  ];

  //   var undefCalEvents = new Set();

  userEmails.forEach((element) => {
    calendar.events.list(
      {
        calendarId: element.email,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      async (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const events = res.data.items;
        if (events.length) {
          userCalendarData.push(element);
          console.log(element.name + "'s 10 Upcoming events:\n");
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            const end = event.end.dateTime || event.end.date;
            // console.log(`\t${start} - ${end} - ${event.summary}`);
          });
          console.log("\n");
        } else {
          console.log("No upcoming events found.");
        }
      }
    );
    console.log("userCalendarData:: " + userCalendarData);
  });
}
