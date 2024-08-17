 export function timeAgo(date) {
    //convert the date in to seconds by dividing the  df in milisecond to seconds;
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    return showTimeAgo(seconds);
  }
  
  //now show the time ago lable
  function showTimeAgo(seconds) {
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 }
    ];
    //loop through the time and diplay the time stamp
    for(let i  = 0; intervals.length;  i++){
      const interval = intervals[i];
       const count = Math.floor(seconds / interval.seconds);
       if(count >=1){
        return `${count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`}`;
  
       }
       
    }
  }