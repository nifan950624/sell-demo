export function getDate(time) {
  var date = new Date(time);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = addZero(date.getDate()) + ' ';
      const h = addZero(date.getHours()) + ':';
      const m = addZero(date.getMinutes()) + ':';
      const s = addZero(date.getSeconds());
      let newTime = Y+M+D+h+m+s
      return newTime
}

 function addZero(string) {
  if (+string < 10) {
       
      return '0' + string
  }else {
    return string
  }
}