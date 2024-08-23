 
 const now = Date.now();
 const past = now - (1 * 24 * 60 * 60 * 1000);
const timeDf = now - past;
 
 const intervals = [
    { label: 'year', seconds: 31536000 },   // 1 year
    { label: 'month', seconds: 2592000 },    // 1 month
    { label: 'day', seconds: 86400 },        // 1 day
    { label: 'hour', seconds: 3600 },        // 1 hour
    { label: 'minute', seconds: 60 },        // 1 minute
    { label: 'second', seconds: 1 }          // 1 second
  ];
  

intervals.forEach(interval=>{
    const count = Math.floor(timeDf / (interval.seconds *1000))
    console.log(count, interval.seconds);
})