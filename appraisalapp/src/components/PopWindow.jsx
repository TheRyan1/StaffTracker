import React, { useContext} from "react";
import { PopUpContext } from "../PopUpContext";
import TeacherDetails from "./popupComponents/TeacherDetails";
import Graph from "./popupComponents/Graph";
import AddTeacher from "./popupComponents/AddTeacher";
import EditTeacher from "./popupComponents/EditTeacher";

function PopWindow(props) {
  const { view } = useContext(PopUpContext);
  const [data, trigger, setTrigger,fullData] = props.props;

  //Details view
  if (view === "details" && trigger === true) {
    return <div class="popmain"><TeacherDetails props={[data, setTrigger]} /></div>;
  }

  //Add teacher view
  else if (view === "addTeacher" && trigger === true) {
    return <div class="popmain"><AddTeacher props={setTrigger} /></div>;
  } 
  //Edit Teacher
  else if (view === "editTeacher" && trigger === true) {
    return <div class="popmain"><EditTeacher  props={[data, setTrigger]}/></div>;
  }
// graphs 
else if (view === "graph" && trigger === true) {
  return <div class="popmain"><Graph props={[fullData, setTrigger]}/></div>;
}
  else {
    return "";
  }
}

export default PopWindow;
