
export function getdatYesturday() {
   var date = new Date();
   date.setDate(date.getDate() - 1)
   return [date.toLocaleDateString('sv-SE') + " 00:00:00", date.toLocaleDateString('sv-SE') + " 23:59:59"]
}

export function getDatetoday() {
   var date = new Date();
   return [date.toLocaleDateString('sv-SE') + " 00:00:00", date.toLocaleDateString('sv-SE') + " 23:59:59"]
}
export function datebeforeyesturday() {
   var date = new Date();
   date.setDate(date.getDate() - 2)
   return [date.toLocaleDateString('sv-SE') + " 00:00:00", date.toLocaleDateString('sv-SE') + " 23:59:59"]
}

export function lastWeek() {
   var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
   var beforeOneWeek2 = new Date(beforeOneWeek);
   var day = beforeOneWeek.getDay()
   var diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
   var lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
   var lastSunday = new Date(beforeOneWeek2.setDate(diffToMonday + 6));

   const mon = new Date(lastMonday);
   const sun = new Date(lastSunday);
   if (mon.getMonth() < sun.getMonth()) {
      var moonLanding = new Date()
      var date3 = new Date(lastSunday);
      date3.setDate(date3.getDate())
      var toDate = date3.toLocaleDateString('sv-SE') + " 23:59:59"
      var firstDayMonth = new Date(moonLanding.getFullYear(), moonLanding.getMonth(), 1)
      return [firstDayMonth.toLocaleDateString('sv-SE') + " 00:00:00", toDate]
   }
   else {
      var mondate = new Date(lastMonday);
      mondate.setDate(mondate.getDate())
      var fromDate = mondate.toLocaleDateString('sv-SE') + " 23:59:59"
      var date3 = new Date(lastSunday);
      date3.setDate(date3.getDate())
      var toDate = date3.toLocaleDateString('sv-SE') + " 23:59:59"
      return [fromDate, toDate]
   }

   
}
export function thisWeek() {
   var curDate = new Date()
   var curr = new Date;
   var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() +7));
   var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));

   function dateToYMD(curr: any) {
      var d = curr.getDate() + 1;
      var m = curr.getMonth() + 1;
      var y = curr.getFullYear();
      return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
   }

   return [dateToYMD(firstday) + " 00:00:00", dateToYMD(lastday) + " 23:59:59"]
}
export function lastMonth() {
   var moonLanding = new Date()
   var firstDayMonth = new Date(moonLanding.getFullYear(), moonLanding.getMonth() - 1, moonLanding.getMonth() + 1)
   var lastDayMonth = new Date(moonLanding.getFullYear(), moonLanding.getMonth(), 0, 1)
   return [firstDayMonth.toLocaleDateString('sv-SE') + " 00:00:00", lastDayMonth.toLocaleDateString('sv-SE') + " 23:59:59"]
   // return [firstDayMonth.toLocaleDateString('sv-SE')+" 00:00:00",lastDayMonth.toLocaleDateString('sv-SE')+" 23:59:59"]
}
export function thisMonth() {
   var moonLanding = new Date()
   var firstDayMonth = new Date(moonLanding.getFullYear(), moonLanding.getMonth(), 1)
   var lastDayMonth = new Date(moonLanding.getFullYear(), moonLanding.getMonth() + 1, 0)
   return [firstDayMonth.toLocaleDateString('sv-SE') + " 00:00:00", lastDayMonth.toLocaleDateString('sv-SE') + " 23:59:59"]
   // return [firstDayMonth.toLocaleDateString('sv-SE')+" 00:00:00",lastDayMonth.toLocaleDateString('sv-SE')+" 23:59:59"]
}
