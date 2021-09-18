import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import URI from "../URIs/URI.json";

function AddTeacher(props) {
  const setTrigger = props.props;
  const [date, setDate] = useState(new Date());
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    school: "",
    manager: "",
    type: "",
    band: "",
  });

  function getTeacherInfo(e) {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  console.log(newTeacher);
  //adding Teacher to DB
  const addTeacher = async (e) => {
    e.preventDefault();
    const teacher = {
      name: newTeacher.name,
      cntrct: date,
      school: newTeacher.school.toUpperCase(),
      compApps: [],
      manager: newTeacher.manager,
      type: newTeacher.type,
      band: newTeacher.band,
    };
    try {
      if (window.confirm("Please confirm the details are correct")) {
        await axios.post(URI.add_Teacher, teacher);
        alert("Teacher has been added");
        setTrigger(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  function close(e) {
    setTrigger(false);
  }
  return (
    <div className="popUp">
      <h4>Add Teacher</h4>
      <input
        className="form__field"
        placeholder="Name"
        type="text"
        name="name"
        onChange={getTeacherInfo}
      />

      <input
        className="form__field"
        placeholder="School - (ex. CS1) "
        type="text"
        name="school"
        onChange={getTeacherInfo}
      />

      <input
        className="form__field"
        placeholder="Line Manager"
        type="email"
        name="manager"
        onChange={getTeacherInfo}
      />
      <select className="form__field" onChange={getTeacherInfo} name="type">
      <option disabled selected >Select Type</option>
        <option>IT</option>
        <option>LT</option>
        
      </select>

      <select className="form__field" onChange={getTeacherInfo} name="band">
      <option disabled selected >Select band</option>
        <option>T1</option>
        <option>T2</option>
        <option>T3</option>
        <option>T4</option>
        <option>ST1</option>
        <option>ST2</option>
        <option>ST3</option>
        <option>ST4</option>
        <option>ADoS</option>
        <option>DoS</option>
        <option>SDoS</option>
      </select>
      <div>
        Contract Start Date:{" "}
        <DatePicker
          className="calen"
          onChange={setDate}
          value={date}
          name="cntrct"
        />
      </div>

      <div className="buttons">
        <button className="addT" onClick={addTeacher}>
          Confirm
        </button>
        <button className="button" onClick={close}>
          Close
        </button>{" "}
      </div>
    </div>
  );
}

export default AddTeacher;
