import axios from "axios";
import React, {useState} from "react";
import DatePicker from "react-date-picker";
import URI from '../URIs/URI.json'

function EditTeacher(props) {
  const [data, setTrigger] = props.props;
  const [date, setDate] = useState(new Date(data.cntrct));
  const [teacherData, setteacherData] = useState({
    name: data.name,
    cntrct: data.cntrct,
    school: data.school,
    manager: data.manager,
    type: data.type
    
  });
console.log(teacherData)
  function getTeacherInfo(e) {
    
    const { name, value } = e.target;
    setteacherData((prev) => ({
      ...prev,
      [name]: value,
      
    }));
  }

  async function deleteTeacher() {
 
    try {
      if(window.confirm("Are you sure you want to delete this teacher?")){
        const del = await axios.delete(
          `${URI.del_teacher}${data._id}`
        );
        console.log(del.data);
        alert("Teacher Deleted")
        setTrigger(false)
       
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function updateTeacher(){
const teacher = {
      name: teacherData.name,
      cntrct: date,
      school: teacherData.school.toUpperCase(),
      manager: teacherData.manager,
      type: teacherData.type,
      band: teacherData.band
    };
      try{
        if(window.confirm("Please check the details before pressing OK")){
          const update = await axios.put(`${URI.update_Teacher}${data._id}/${teacher.name}/${teacher.cntrct}/${teacher.school}/${teacher.manager}/${teacher.type}/${teacher.band}`)
          alert(update.data)
          setTrigger(false)
         
          
        }
        
      }
      catch(err){
          console.log(err.message)
      }
  }
  return (
    <div className="popUp">
      <div className="buttons">
      <button className="button" onClick={()=>{
        updateTeacher();
          
      }}>Apply Changes</button>
      <button className="button del"
        onClick={() => {
         
          deleteTeacher();
        }}
      >
        Delete Teacher
      </button>
     
      </div>
      <input className="form__field" type="text" placeholder={data.name} name="name" onChange={getTeacherInfo} />
      <input className="form__field" type="text" placeholder={data.school} name="school" onChange={getTeacherInfo}/>
      <input className="form__field" type="text" placeholder={data.manager} name="manager" onChange={getTeacherInfo}/>
      
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
     
     
     <div >Contract Date:  <DatePicker className="calen" onChange={setDate} value={date}  name="cntrct" /></div>
     <br></br><button className="button"
        onClick={() => {
          setTrigger(false);
        }}
      >
        Close
      </button>
    </div>
  );
}

export default EditTeacher;
