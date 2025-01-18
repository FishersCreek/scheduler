const WHATSAPP_KEY_PROP = "WHATSAPP_API_KEY";
const WHATSAPP_PHONE_ID_PROP = "WHATSAPP_PHONE_ID";

/**
 * Returns this week's incharges as Person instances
 * @param {SpreadsheetApp.Sheet} sheet - the sheet to retrieve the information from
 * @param {Date} sunday - the Sunday for which to retrieve the data for
 *
 * @returns {Person[]}
 */
function getWeeksIncharges(sheet, sunday) {
  // Some important variables
  const header = new Header(sheet);
  const numOfRows = sheet.getLastRow();
  const numOfCols = sheet.getLastColumn();

  // get the rows that correspond to the Sunday's date
  const sundayStr = toISODateString(sunday);
  const dataRange = sheet.getRange(2, 1, numOfRows - 1, numOfCols);
  const sundayStrCells = dataRange
    .createTextFinder(sundayStr)
    .findAll()
    .filter((r) => r.getColumn() == header.dateCol);
  const sundayStrRows = sundayStrCells.map((r) => r.getRowIndex());

  // extract Person instances from each row.
  // Take note that In-charge column can have multiple values
  const personsPerRow = sundayStrRows.map((row) => {
    const rowValues = sheet.getRange(row, 1, 1, numOfCols).getValues()[0];
    return Person.fromRow(header, rowValues);
  });
  const inchargePersons = personsPerRow.reduce(
    (prev, curr) => [...prev, ...curr],
    []
  );

  return inchargePersons;
}

/**
 * Sends WhatsApp message to the person
 * @param {Person} person - the person to send the message to
 */
function sendWhatsAppMsg(person) {
  if (!person.phone) {
    throw new Error(`person ${person.name} has an empty telephone`);
  }

  const phoneNumberId = getWhatsAppPhoneId();
  if (!phoneNumberId) {
    throw new Error(`no phone number id is set for WhatsApp API call`);
  }

  const apiKey = getWhatsAppKey();
  if (!apiKey) {
    throw new Error(`no API key is set for WhatsApp API call`);
  }

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };
  const method = "post";
  const contentType = "application/json";
  const payload = JSON.stringify({
    messaging_product: "whatsapp",
    to: person.phone,
    type: "template",
    template: {
      name: "ministry_reminder",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              parameter_name: "role",
              text: person.role,
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              parameter_name: "name",
              text: person.name,
            },
            {
              type: "text",
              parameter_name: "role",
              text: person.role,
            },
            {
              type: "text",
              parameter_name: "date",
              text: person.date,
            },
            {
              type: "text",
              parameter_name: "topic",
              text: person.topic,
            },
          ],
        },
      ],
    },
  });

  const response = UrlFetchApp.fetch(url, {
    method,
    contentType,
    headers,
    payload,
  });
  if (response.getResponseCode() != 200) {
    throw new Error(`Fetch failed with ${response.getContentText()}`);
  }
}

/**
 * Sends email message to the person
 * @param {Person} person - the person to send the email to
 */
function sendEmailMsg(person) {
  if (!person.email) {
    throw new Error(`person ${person.name} has an empty email address`);
  }

  const subject = `[Reminder] You will be leading the ${person.role} at Fishers Creek on ${person.date}`;
  const body = `
  Hi ${person.name},

  This an automated reminder.

  You signed up for ${person.role} on ${person.date}.
  The Topic of the Sunday is '${person.topic}'.
  May the LORD guide you.
  Thank you 🙏.

  Best wishes,
  Fishers Creek
  `;

  MailApp.sendEmail({
    to: person.email,
    subject,
    body,
  });
}

/**
 * Sends a batch email message to the people
 * @param {Person[]} persons - the persons to send the email to
 */
function sendBatchEmailMsg(persons) {
  const emails = persons
    .map((v) => v.email)
    .filter((v) => !!v)
    .join(",");
  const date = persons[0]?.date;
  const topic = persons[0]?.topic;
  const namesAndRoles = persons.map((v) => `${v.name} - ${v.role}`).join("\n");

  const subject = `Sunday service ${date} team`;
  const body = `
  Hellos,

  Here is the team for ${date} Sunday service:

  ${namesAndRoles}

  Topic: '${topic}'.
  May the LORD guide you.
  Thank you 🙏.

  Best wishes,
  Fishers Creek
  `;

  MailApp.sendEmail({
    to: emails,
    subject,
    body,
  });
}

/**
 * Get the current user's WhatsApp phone ID from user properties
 *
 * @returns {string | undefined}
 */
function getWhatsAppPhoneId() {
  return getUserProp(WHATSAPP_PHONE_ID_PROP);
}

/**
 * Save the current user's WhatsApp phone ID in user properties
 * @param {string} value - the phone id to save
 */
function saveWhatsAppPhoneId(value) {
  setUserProp(WHATSAPP_PHONE_ID_PROP, value);
}

/**
 * Get the current user's WhatsApp API key from user properties
 *
 * @returns {string | undefined}
 */
function getWhatsAppKey() {
  return getUserProp(WHATSAPP_KEY_PROP);
}

/**
 * Save the current user's WhatsApp API key in user properties
 * @param {string} value - the API key to save
 */
function saveWhatsAppKey(value) {
  setUserProp(WHATSAPP_KEY_PROP, value);
}

/**
 * Get the current user's value from user properties
 * @param {string} prop - the name of the property
 * @returns {Object}
 */
function getUserProp(prop) {
  const userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty(prop);
}

/**
 * Save the current user's value in user properties
 * @param {string} prop - the name of the property
 * @param {string} value - the new value of the property
 */
function setUserProp(prop, value) {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(prop, value);
}

/**
 * Gets the sheet relevant for the year of the given date
 * @param {Date} date - the date
 *
 * @returns {SpreadsheetApp.Sheet}
 */
function getYearSheet(date) {
  const currentYear = date.getUTCFullYear();
  return SpreadsheetApp.getActive().getSheetByName(currentYear);
}

/**
 * Gets next Sunday's date
 * @param {Date} today - the date for the current day
 *
 * @returns {Date}
 */
function getNextSundayDate(today) {
  const numOfDaysToSunday = 7 - today.getDay();
  const sundayDate = today.getDate() + numOfDaysToSunday;

  const sunday = new Date();
  sunday.setDate(sundayDate);
  return sunday;
}

/**
 * Returns the ISO Date string of the given date
 * @param {Date} date - the date whos ISO Date string is to be returned
 * @returns {string}
 */
function toISODateString(date) {
  return date.toISOString().split("T")[0];
}

/**
 * Extracts the text from the cell value
 * @param {Object} cellValue - the value in the cell
 *
 * @returns {string}
 */
function extraText(cellValue) {
  return cellValue != undefined ? `${cellValue}`.trim() : "";
}

/**
 * Extracts the texts from the cell value given the separator
 *
 * @param {Object} cellValue - the value in the cell
 * @param {string} separator - the separator between the strings
 *
 * @returns {string[]}
 */
function extraMultiText(cellValue, separator) {
  return cellValue != undefined
    ? `${cellValue}`.split(separator).map((v) => v.trim())
    : [];
}

/**
 * Extracts the date text from the cell value
 * @param {Date} cellValue - the value in the cell
 *
 * @returns {string}
 */
function extraDateText(cellValue) {
  return cellValue instanceof Date
    ? toISODateString(cellValue)
    : extraText(cellValue);
}

/**
 * Run the callback with an error handler
 * @param {Function} cb - the function to enclose in the error handler
 * @param {...*} args - arguments to be passed to the callback
 *
 * @return {any}
 */
function handleError(cb, ...args) {
  try {
    return cb(...args);
  } catch (err) {
    Logger.log(err);
  }
}

/**
 * The details of a person who is to be contacted
 */
class Person {
  constructor({ name, email, phone, date, topic, role }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.topic = topic;
    this.role = role;
  }

  /**
   * Creates Person instances given a row and a header map
   * @param {Header} header - the header that identifies which column is which
   * @param {Object[]} row - the row range
   *
   * @returns {Person[]}
   */
  static fromRow(header, row) {
    // Note that we substract 1 since spreadsheet ranges
    // are 1-indexed, while arrays are 0-indexed
    const names = extraMultiText(row[header.inchargeCol - 1], ",");
    const emails = extraMultiText(row[header.emailCol - 1], ",");
    const phones = extraMultiText(row[header.phoneCol - 1], ",");
    const date = extraDateText(row[header.dateCol - 1]);
    const topic = extraText(row[header.topicCol - 1]);
    const role = extraText(row[header.roleCol - 1]);

    return names.map(
      (name, i) =>
        new Person({
          name,
          email: emails[i],
          phone: phones[i],
          date,
          topic,
          role,
        })
    );
  }
}

/**
 * The details of a header row
 */
class Header {
  /**
   * Constructs the header for the given sheet
   * @param {SpreadsheetApp.Sheet} sheet - the sheet whose header is being constructed
   */
  constructor(sheet) {
    this.dateCol = undefined;
    this.roleCol = undefined;
    this.topicCol = undefined;
    this.inchargeCol = undefined;
    this.emailCol = undefined;
    this.phoneCol = undefined;
    this.alertCol = undefined;
    this.notesCol = undefined;

    const colMap = {
      "Meeting date": "dateCol",
      Role: "roleCol",
      Topic: "topicCol",
      Incharge: "inchargeCol",
      Email: "emailCol",
      Telephone: "phoneCol",
      Alert: "alertCol",
      Notes: "notesCol",
    };

    const self = this;
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    const headerValues = headerRow.getValues()[0];
    headerValues.forEach((v, i) => (self[colMap[v]] = i + 1));
  }
}
