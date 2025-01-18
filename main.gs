/** @OnlyCurrentDoc */
function main() {
  const today = new Date();
  const nextSunday = getNextSundayDate(today);
  const yearSheet = getYearSheet(nextSunday);
  const people = getWeeksIncharges(yearSheet, nextSunday);
  handleError(sendBatchEmailMsg(people));

  people.forEach((person) => {
    handleError(sendWhatsAppMsg, person);
  });
}

function onOpen() {
  showSidebar();
  SpreadsheetApp.getUi()
    .createMenu("Fishers creek")
    .addItem("Show sidebar", "showSidebar")
    .addToUi();
}
