# Staff Tracker
This app serves as management system for the appraisals of teachers within a school. 
## Overview
In my previous work place, teachers had 3 performance appraisals per year contract. They were being tracked in Excel which isn't that reliable. In this staffTracker, managers are able to add/edit/view their teachers according to which location they work and the city manager is able to view all staff listed in the system. 
Each employee has details as to which dates the aprraisals should take place based on their contract start date and their managers can mark them as complete.  
There's an added view where the city manager is able to see which schools have the most or least experience staff to help with moving employees around the city to different schools to support less experienced teachers. 
## Technologies used

- Auth0
- ReactJS
- NodeJS
- ExpressJS
- ChartJS
- DayJS
- MongoDB

## Featured Code
This one racked the brain. I needed to get the promotion band of each teacher in the DB then map it to a chart which shows how many bands for each school. 
```JavaScript
const bands = ["T1","T2","T3", "T4", "ST1", "ST2", "ST3", "ST4", "ADoS", "DoS", "SDoS"]
var bandsData = []
   //list of schools
   const getListOfSchools = data.map((e) => {
    return e.school;
  });

  const schools = getListOfSchools
    .filter((item, index) => getListOfSchools.indexOf(item) === index)
    .sort();

schools.map((e)=>{
  
  let sdata = []
  
  for(let i=0; i<bands.length; i++){
    let num =0
    data.map((j)=>{
   
      if(j.school === e && bands[i] === j.band){
        num +=1
      }
      
    })
    sdata.push(num)
  }


console.log(sdata)

  bandsData.push({ label: e,
  data: sdata,
  backgroundColor: "lightgreen"})
})
console.log(bandsData)

```
