const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Teacher = require("./mongo/Schema");

const PORT = process.env.PORT ||3001;
app.use(express.json());
app.use(cors());

const dbConnect = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(
      "Monguri",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

dbConnect();

// Get API
app.get("/api/getstaff", (req, res) => {
  const getStaff = async () => {
    try {
      const teachers = await Teacher.find();
      const result = await teachers;
      return res.send(await result);
    } catch (err) {
      console.log(err);
    }
  };
  getStaff();
});

//POST API
app.post("/api/newstaff", (req, res) => {
  const newteacher = new Teacher({
    name: req.body.name,
    cntrct: req.body.cntrct,
    school: req.body.school,
    compApps: [],
    type: req.body.type,
    manager: req.body.manager,
    band: req.body.band
  });

  newteacher.save();
  res.send("created");
});
// UPDATE HISTORY
app.put("/api/history/:id/:type/:date", (req, res) => {
  var app = {
     date: req.params.date, type: req.params.type
  }
  
  const upHistory = async () => {
    console.log(app)
    try {
      await Teacher.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push : {
            "compApps": {
              date: app.date, type: app.type, status: "Completed"
            }
          }
        },
        { useFindAndModify: false }
      );

      return await res.send("succesfully added to array")
    } catch (err) {
      console.log(err.message);
    }
  };
  upHistory();
});

//EDIT API
app.put("/api/edit/:id/:name/:date/:school/:manager/:type/:band", (req, res) => {
  console.log(req.params.name);
  const edit = async () => {
    try {
      await Teacher.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: req.params.name,
          cntrct: req.params.date,
          school: req.params.school,
          manager: req.params.manager,
          type: req.params.type,
          band: req.params.band
        },
        { useFindAndModify: false }
      );

      return await res.send("updated");
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  };
  edit();
});

//Delete API

app.delete("/api/delete/:id", (req, res) => {
  const delTeacher = async () => {
    try {
      await Teacher.findOneAndDelete({ _id: req.params.id });
      return res.send("Teacher deleted");
    } catch (err) {
      console.log(err.message);
    }
  };
  delTeacher();
});


if(process.env.NODE_ENV === 'production'){
  app.use(express.static('appraisalapp/build'));
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'appraisalapp', 'build', 'index.html'))
  })
}

app.listen(PORT, (req, res) => {
  console.log("listning on port" + PORT);
});


