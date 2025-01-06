/**
 * Shows the sidebar on the Google sheet
 */
function showSidebar() {
  var html =
    HtmlService.createHtmlOutputFromFile("sidebar").setTitle("Fisher's Creek");
  SpreadsheetApp.getUi().showSidebar(html);
}
