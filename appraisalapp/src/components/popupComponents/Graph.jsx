import React from "react";
import TeachersChart from "../charts/TeachersChart";
import BandChart from "../charts/BandChart";


function Graph(props) {
  const [data, setTrigger] = props.props;



  return (
    <div className="popUpGraph">
      <div className="charts">
      <div className="chartt"><TeachersChart  props={data} /></div>


<div className="chartt"><BandChart  props = {data} /></div>
      </div>
      <div>
      <button
        className="button"
        onClick={() => {
          setTrigger(false);
        }}
      >
        Close
      </button>
      </div>
    </div>
  );
}

export default Graph;
