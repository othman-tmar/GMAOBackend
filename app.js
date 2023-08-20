const express=require('express');
const  mongoose =require("mongoose")
const dotenv =require('dotenv')
const employeeRouter =require("./routes/employee.route")
const departmentRouter =require("./routes/department.route")
const machineRouter =require("./routes/machine.route")
const correctiveMaintenanceRouter =require("./routes/correctiveMaintenance.route")
const preventiveMaintenanceRouter =require("./routes/preventiveMaintenance.route")
const cors=require("cors")
dotenv.config()
const app = express();

mongoose.set('strictQuery', false)
const connect = async () => {
    try {
      await mongoose.connect(process.env.DATABASECLOUD);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

//middlewares
app.use(cors());
//BodyParser Middleware
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("X-back");
});
app.use('/api/departments', departmentRouter);
app.use('/api/machines', machineRouter);
app.use('/api/correctives', correctiveMaintenanceRouter);
app.use('/api/preventives', preventiveMaintenanceRouter);
app.use('/api/employees', employeeRouter);

app.listen(process.env.PORT, () => {
    connect();
 console.log(`Server is listening on port ${process.env.PORT}`); });


module.exports = app;

