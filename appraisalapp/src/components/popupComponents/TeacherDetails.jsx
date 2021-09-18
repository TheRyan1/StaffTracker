import React from "react";
import dayjs from "dayjs";
import axios from "axios";
import URI from '../URIs/URI.json'
function TeacherDetails(props) {
  const [data, setTrigger] = props.props;
    const currentDate = dayjs(new Date(), "YYYY-MM-DD");
  var cntrDate = dayjs(data.cntrct, "YYYY-MM-DD").add(
    Math.floor(dayjs(currentDate).diff(data.cntrct, "year")),
    "years"
  );
  const service = dayjs(currentDate).diff(data.cntrct, "months");

  var appraisals = {};
  if (service < 13) {
    appraisals = {
      "Probation Appraisal": dayjs(cntrDate, "YYYY-MM-DD").add(2, "M"),
      "Career Development Appraisal + Contract Renewal Discussion": dayjs(
        cntrDate,
        "YYYY-MM-DD"
      ).add(6, "M"),
      "Contract Renewal Appraisal": dayjs(cntrDate, "YYYY-MM-DD").add(9, "M"),
      "Annual Appraisal": dayjs(cntrDate, "YYYY-MM-DD").add(12, "M"),
    };
  } else {
    appraisals = {
      "Career Development Appraisal": dayjs(cntrDate, "YYYY-MM-DD").add(3, "M"),
      "Career Development Appraisal + Contract Renewal Discussion": dayjs(
        cntrDate,
        "YYYY-MM-DD"
      ).add(6, "M"),
      "Contract Renewal Appraisal": dayjs(cntrDate, "YYYY-MM-DD").add(9, "M"),
    };
  }
  function upcoming(date, app) {
    const resilt = Object(
      data.compApps.find(({ type }) => {
        return type === app;
      })
    );
    if (date.diff(currentDate, "days") <= -1) {
      if (!resilt.hasOwnProperty("status")) {
        return (
          <button
            
            onClick={(e) => {
              e.preventDefault()
              updateTask(data._id, app, currentDate);
              e.target.disabled = true;

            }}
          >
            Mark Completed
          </button>
        );
      } else {
        return resilt.status;
      }
    } else if (
      date.diff(currentDate, "days") >= 0 &&
      date.diff(currentDate, "days") < 30
    ) {
      return `${date.diff(currentDate, "days")} Day(s) `;
    } else {
      return `${date.diff(currentDate, "months")} Month(s) `;
    }
  }
  async function updateTask(id, type, date) {
    try {
      const resp = await axios.put(
        `${URI.update_History}${id}/${type}/${date}`
      );
      console.log(resp.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="popUp">
      <h3>
        {data.name} - {data.school} <br></br> {data.type} - {data.band}
      </h3>

      <p>Contract Start: {dayjs(data.cntrct).format("DD MMM YYYY")}</p>
      <table>
        <tbody>
          <tr>
            <td>Appraisal Type</td>
            <td>Date</td>
            <td>Months Remaining</td>
          </tr>
          {Object.keys(appraisals).map((name, i) => {
            return (
              <tr key={i}>
                <td>{name}:</td>
                <td>{appraisals[name].format("DD MMM YYYY").toString()}</td>
                <td>{upcoming(appraisals[name], name)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        className="dbutton"
        onClick={() => {
          setTrigger(false);
        }}
      >
        Close
      </button>
    </div>
  );
}

export default TeacherDetails;
