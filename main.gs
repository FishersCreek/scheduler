/** @OnlyCurrentDoc */
function onOpen() {
  showSidebar();
  SpreadsheetApp.getUi()
    .createMenu("Fishers creek")
    .addItem("Show sidebar", "showSidebar")
    .addToUi();
}

function main() {
  const today = new Date();
  const nextSunday = getNextSundayDate(today);
  const yearSheet = getYearSheet(nextSunday);
  const people = getWeeksIncharges(yearSheet, nextSunday);
  people.forEach((person) => {
    sendEmailMsg(person);
    sendWhatsAppMsg(person);
  });
}
