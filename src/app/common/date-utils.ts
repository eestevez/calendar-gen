
interface Date {
  addDays(days): Date
  getMonthName(lang): string
  getMonthNameShort(lang): string
  getWeekOfYear(): number
  getWeekOfMonth(): number
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    var numD = date.getDate();
    date.setDate( numD + days);
    return date;
};

Date.prototype.getWeekOfMonth = function() {
  var firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  var offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
}
