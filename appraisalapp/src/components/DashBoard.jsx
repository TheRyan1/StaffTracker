import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PopWindow from "./PopWindow";
import { PopUpContext } from "../PopUpContext";
import dayjs from "dayjs";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import URI from "./URIs/URI.json";

function DashBoard() {
  //User profile
  const { user } = useAuth0();
  // filter for the dashboard
  const [filter, setFilter] = useState("all");
  // Global view for handling which data to show on the popUp Window
  const { setView } = useContext(PopUpContext);
  // State for the fetched data
  const [data, setData] = useState([]);
  //Trigger for setting the state of the popup window
  const [triggerEnabled, setTriggerEnabled] = useState(false);
  //Tempory data for staff member that is slected
  const [tempData, settempData] = useState({});

// Function for displaying whether or not there is a task due on the staff cards
  function tasks(date) {
    const currentDate = dayjs(new Date(), "YYYY-MM-DD");
    var cntrDate = dayjs(date, "YYYY-MM-DD").add(
      Math.floor(dayjs(currentDate).diff(date, "year")),
      "years"
    );
    let task = "";
    const service = dayjs(currentDate).diff(date, "months");

    const appraisals = {
      probApp: dayjs(cntrDate, "YYYY-MM-DD").add(2, "M"),
      firstApp: dayjs(cntrDate, "YYYY-MM-DD").add(3, "M"),
      secondApp: dayjs(cntrDate, "YYYY-MM-DD").add(6, "M"),
      renewalApp: dayjs(cntrDate, "YYYY-MM-DD").add(9, "M"),
      finalApp: dayjs(cntrDate, "YYYY-MM-DD").add(12, "M"),
    };

    if (service > 12) {
      delete appraisals.probApp;
      for (let prop in appraisals) {
        dayjs(appraisals[prop]).get("month") === currentDate.get("month")
          ? (task = "Appraisal Due this month ")
          : (task = "Nothing due");

        return task;
      }
    } else {
      for (let prop in appraisals) {
        dayjs(appraisals[prop]).get("month") === currentDate.get("month")
          ? (task = "Appraisal Due this month ")
          : (task = "Nothing due");

        return task;
      }
    }
  }
//Original fetch of database data
  async function getStaff() {
    try {
      const staffList = await axios.get(URI.get_Staff);
      setData(staffList.data);

      //
    } catch (err) {
      console.log(err.message);
    }
  }
// Load data when changes are made
  useEffect(() => {
    getStaff();
  }, [triggerEnabled]);
//function for creating the drop down menu for filtering
  function filteredDash() {
    const getListOfSchoolss = data.map((e) => {
      return e.school;
    });
    const schools = getListOfSchoolss
      .filter((item, index) => getListOfSchoolss.indexOf(item) === index)
      .sort();

    return schools.map((i, index) => {
      return (
        <option key={index} value={i}>
          {i}
        </option>
      );
    });
  }
// staff Card
  const staffCards = data
    .filter((e) => {
      if (user.name === "kieran.mckeecs@ef.cn") {
        return e;
      } else {
        return e.manager === user.name;
      }
    })
    .filter((j) => {
      if (filter === "all") {
        return j;
      } else {
        return j.school === filter;
      }
    })
    .map((e) => {
      return (
        <div className="staffCard" key={e._id}>
          <h2>{e.name}</h2>
          <p>School: {e.school}</p>
          <p>Manager: {e.manager}</p>
          <p>{tasks(e.cntrct)} </p>
          <div>
            <button
              onClick={() => {
                settempData(e);
                setTriggerEnabled(true);
                setView("details");
              }}
            >
              Details
            </button>
            <button
              onClick={() => {
                setView("editTeacher");
                setTriggerEnabled(true);
                settempData(e);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      );
    });

  return (
    <div className="dashboard">
      <div className="header">
        <p>
          Welcome back,
          {` ${user.nickname
            .split(".")[0]
            .charAt(0)
            .toUpperCase()}${user.nickname.split(".")[0].slice(1)}`}
          .
        </p>
        <Logout />
      </div>
      <h3>Dashboard</h3>
      <select
        onChange={(e) => {
          setFilter(e.target.value);
         
       }}
      >
        {" "}
        <option value="all">All Schools</option>
        {filteredDash()}
      </select> <br></br><br></br>
      <button
        className="addT"
        onClick={() => {
          setView("addTeacher");
          setTriggerEnabled(true);
        }}
      >
        AddTeacher
      </button>

      <button
        className="addT"
        onClick={() => {
          setView("graph");
          setTriggerEnabled(true);
        }}
      >
        Data
      </button>
      <div className="staffcardhodler">{staffCards}</div>
      <PopWindow props={[tempData, triggerEnabled, setTriggerEnabled, data]} />
    </div>
  );
}

export default DashBoard;
