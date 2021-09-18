import React from 'react'
import { Bar } from 'react-chartjs-2';
function TeachersChart(props) {

const data = props.props
   //list of schools
   const getListOfSchools = data.map((e) => {
    return e.school;
  });

  const schools = getListOfSchools
    .filter((item, index) => getListOfSchools.indexOf(item) === index)
    .sort();

  // FTs
  let ftData = [];
  const ftFiler = data.filter((e) => {
    return e.type === "IT";
  });

  for (let i = 0; i < schools.length; i++) {
    let num = 0;
    ftFiler.map((e) => {
      if (e.school === schools[i]) {
        num++;
      }
      return null
    });
    ftData.push(num);
  }
  // end of FT Data

  //LT Data

  let ltData = [];
  const ltFiler = data.filter((e) => {
    return e.type === "LT";
  });
  console.log(ltFiler);

  for (let i = 0; i < schools.length; i++) {
    let num = 0;
    ltFiler.map((e) => {
      if (e.school === schools[i]) {
        num++;
      }
      return null
    });
    ltData.push(num);
  }
  //end of LT Data
  //band Data




  return (
   
      <div >
        <h5>Total Teachers by School</h5>
        <Bar
          data={{
            labels: schools,
            datasets: [
              {
                label: "IT",
                data: ftData,
                backgroundColor: "lightblue",
                     
              },
              {
                label: "LT",
                data: ltData,
                
                backgroundColor: "red",
             
              },
            ],
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

export default TeachersChart
