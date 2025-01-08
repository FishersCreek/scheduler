# FisherCreek Scheduler

This is the Google App Script code for the schedule manager for Fisher's Creek Church, Gothenburg Sweden.

## Prerequisites

| Prerequisite                                  | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google account                                | The script runs on the Google docs platform. <br/> You therefore need a [Gmail account](https://mail.google.com/) to use it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ['Year Planner'](./Year%20Planner.xlsx) sheet | The example sheet itself is [Year Planner](./Year%20Planner.xlsx).<br/> You however have to upload it to [Google Sheets](https://docs.google.com/spreadsheets) <br/> first in order for it to work.<br/><br/> **Be sure to have both your spreadsheet and appscript using <br/> the UTC (GMT no daylightsaving) timezone. See the [docs](https://developers.google.com/apps-script/reference/base/session#getscripttimezone).**                                                                                                                                                                                                                                                                                         |
| WhatsApp API access                           | Access to the [WhatsApp Business Platform API](https://business.whatsapp.com/developers/developer-hub/), <br/> as you will need an API key and a phone number ID. <br/><br/> **You will need to also create the "ministry_reminder" <br/> template message in the WhatsApp API dashboard. <br/> See [these instructions](https://www.facebook.com/business/help/2055875911147364?id=2129163877102343)** <br/><br/> **Your API key (access token) needs to be permanent. <br/> The default one supplied is for short sessions. <br/> [Here](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#1--acquire-an-access-token-using-a-system-user-or-facebook-login) are the instructions.**. |

## Quick Start

- Download and extract this repository.

    <!-- ![Download repository](./docs/img/download-repo.png) -->

- Create a [Gmail account](https://mail.google.com/) if you have not yet already.
- Create a new blank [Google sheet](https://docs.google.com/spreadsheets)

  ![Create new Google sheet](./docs/img/create-new-sheet.png)

- Click the **File** > **Open** menu links in that order.

  ![Click file > open links](./docs/img/click-open.png)

- Click the **Browse** button in the **Upload** tab

  ![Click browse link in the upload tab](./docs/img/upload-year-planner-xlsx.png)

- Select the 'Year Planner.xlsx' that is on the root of this folder.

- Click **Extensions** > **Apps Script** menu links.

  **The Apps scripts editor might fail to open if you are signed into multiple Gmail accounts.**

  **Try to copy and paste the sheet's URL into an incognito window.**

  **You will be prompted to sign into one Gmail account.**

  ![Click the extensions > apps scripts menu links](./docs/img/open-apps-scripts-editor.png)

- Create the following files by clicking the `+` on in the `Files` section:

  - `main.gs`
  - `sidebar.html`
  - `ui.gs`
  - `utils.gs`

    ![Add files in the apps scripts editor](./docs/img/add-files-in-apps-script-editor.png)

- Copy and paste the contents of the following files from this repository to the corresponding file in the 'Apps Scripts' editor.

  - `main.gs`
  - `sidebar.html`
  - `ui.gs`
  - `utils.gs`

    **Make sure you save (i.e Ctrl-S) after every paste**

    ![Copy-paste repository contents to apps scripts editor](./docs/img/copy-paste-file-contents.png)

- Open the triggers screen in the 'Apps Scripts' editor.

  ![Open triggers section in the apps scripts editor](./docs/img/open-triggers-screen.png)

- Click 'Add Trigger'

  ![Click 'add trigger'](./docs/img/click-add-trigger.png)

- Select 'onOpen' function and click 'Save'. Click through any authorizations that follow.

  ![select onOpen function and save](./docs/img/add-on-open-trigger.png)

- Click 'Add Trigger' again

  ![Click 'add trigger'](./docs/img/click-add-trigger.png)

- Select 'main' function.

  - Select the 'Time-driven' event source
  - Select the 'Week timer' trigger type
  - Select 'Every Monday' in the day of week
  - Click 'Save'
  - Click through any authorizations that follow.

    ![Add the weekly trigger for the main function](./docs/img/add-the-main-trigger.png)

- Reload your Google sheet. A new menu section 'Fishers creek' must be visible.

  ![Fishers creek menu](./docs/img/fishers-creek-menu.png)

- A sidebar should also be showing.

  ![Fishers creek sidebar](./docs/img/fishers-creek-sidebar.png)

- Email alerts can now work as long as the email column in the sheet table has a valid email or lists of comma-separated emails.

- In order to send WhatsApp messages, you will need both an **API key (Access token)** and a **Phone ID**. Find more details at the Meta developer docs:

  - [WhatsApp cloud API getting started](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).
  - [Access tokens / API keys](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#system-users)
  - [Message templates](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines)

<!-- ## License

Licensed under the [MIT License](LICENSE)-->

## Acknowledgements

All glory belongs to God.

> I am the vine, you are the branches.  
> He who abides in Me, and I in him,  
> bears much fruit;  
> for without Me you can do nothing.
>
> -- John 15: 5
