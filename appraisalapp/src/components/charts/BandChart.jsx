import React from 'react'
import { Bar } from 'react-chartjs-2';
function BandChart(props) {

const data = props.props

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


  return (
   
    <div >
      <h5>Bands by School</h5>
    <Bar
      data={{
        labels: bands,
        datasets: bandsData,
      
      }}
  
      
      options={{
        responsive: true,
        scales: {
        yAxes: {
          min: 0,
          ticks: {
            stepSize: 1
          },
          grid: {
            display: false
          }
         
        },
       x:{
        grid: {
          display: true
        }
       }
      },
      
      }}  
    />
  </div>

     
  
  );
}

export default BandChart
