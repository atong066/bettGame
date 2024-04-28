
export function getdatYesturday(){
    var date = new Date();
    date.setDate(date.getDate() - 1)
       return [date.toLocaleDateString('sv-SE')+" 00:00:00",date.toLocaleDateString('sv-SE')+" 23:59:59"]
 }

 export function getDatetoday(){
    var date = new Date();
    return [date.toLocaleDateString('sv-SE')+" 00:00:00",date.toLocaleDateString('sv-SE')+" 23:59:59"]
 }
 export function datebeforeyesturday(){
    var date = new Date();
    date.setDate(date.getDate() - 2)
       return [date.toLocaleDateString('sv-SE')+" 00:00:00",date.toLocaleDateString('sv-SE')+" 23:59:59"]
 }
 
 export function lastWeek(){
    var date = new Date();
    var to = date.setTime(date.getTime() - (date.getDay() ? date.getDay() : 7) * 24 * 60 * 60 * 1000);
 
    var from = date.setTime(date.getTime() - 6 * 24 * 60 * 60 * 1000);
    
    var date2 = new Date(from);
    date2.setDate(date2.getDate() - 1)
    const fromDate =date2.toLocaleDateString('sv-SE')+" 00:00:00"
 
 
    var date3 = new Date(to);
    date3.setDate(date3.getDate() - 1)
    var toDate = date3.toLocaleDateString('sv-SE')+" 23:59:59"
    return [fromDate,toDate]
 }
 function thisWeek(){
    var date = new Date();
    var from = date.setTime(date.getTime() );
  
    var date2 = new Date(from);
    var day=  date2.getDay();
    const diff = date2.getDate() - day + (day == 0 ? -7 : 0);
    date2.setDate(diff )
   const fromDate =date2.toLocaleDateString('sv-SE')+" 00:00:00"
 
    var to = date.setTime(date2.getTime() + 2 * 24 * 60 * 60 * 1000);
    var date3 = new Date(to);
    date3.setDate(date2.getDate() + 6)
    console.log(date3);
   var toDate = date3.toLocaleDateString('sv-SE')+" 23:59:59"
   
    return [fromDate,toDate]
    }
export function lastMonth(){
       var moonLanding = new Date()
       var firstDayMonth = new Date(moonLanding.getFullYear(),moonLanding.getMonth()-1,moonLanding.getMonth()+1)
       var lastDayMonth = new Date(moonLanding.getFullYear(),moonLanding.getMonth(),0,1)
       return [firstDayMonth.toLocaleDateString('sv-SE')+" 00:00:00",lastDayMonth.toLocaleDateString('sv-SE')+" 23:59:59"]
       // return [firstDayMonth.toLocaleDateString('sv-SE')+" 00:00:00",lastDayMonth.toLocaleDateString('sv-SE')+" 23:59:59"]
    }
    function thisMonth(){
       var moonLanding = new Date()
       var firstDayMonth = new Date(moonLanding.getFullYear(),moonLanding.getMonth(),1)
       var lastDayMonth = new Date(moonLanding.getFullYear(),moonLanding.getMonth()+1,0)
       return [firstDayMonth.toLocaleDateString('sv-SE')+" 00:00:00",lastDayMonth.toLocaleDateString('sv-SE')+" 23:59:59"]
       // return [firstDayMonth.toLocaleDateString('sv-SE')+" 00:00:00",lastDayMonth.toLocaleDateString('sv-SE')+" 23:59:59"]
    }
       