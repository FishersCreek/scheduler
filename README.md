# Fisher's Creek Schedule

This is the Google App Script code for the schedule manager for Fisher's Creek Church, Gothenburg Sweden.

## Prerequisites:

### Google Account

The script runs on the Google docs platform. You therefore need a [Gmail account](https://mail.google.com/) to use it.

### Year Planner sheet

The example sheet itself is [Year Planner](./Year%20Planner.xlsx).
You however have to upload it to [Google Sheets](https://docs.google.com/spreadsheets) first in order for it to work.

**NOTE: Be sure to have both your spreadsheet and appscript using the UTC (GMT no daylightsaving) timezone. See [docs](https://developers.google.com/apps-script/reference/base/session#getscripttimezone).**

### WhatsApp API access

Access to the [WhatsApp Business Platform API](https://business.whatsapp.com/developers/developer-hub/), as you will need an API key and a phone number ID.

**NOTE: You will need to also create the "ministry_reminder" template message in the WhatsApp API dashboard. See [these instructions](https://www.facebook.com/business/help/2055875911147364?id=2129163877102343)**  
**NOTE: Your API key needs to be permanent. The default one supplied is for short sessions. [Here](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#1--acquire-an-access-token-using-a-system-user-or-facebook-login) are the instructions.**.
