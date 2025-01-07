/**
 * Shows the sidebar on the Google sheet
 */
function showSidebar() {
  var html =
    HtmlService.createHtmlOutputFromFile("sidebar").setTitle("Fisher's Creek");
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Shows an alert with the given message
 *
 * @param {string} msg - the message to display
 */
function showAlert(msg) {
  SpreadsheetApp.getUi().alert(msg);
}
