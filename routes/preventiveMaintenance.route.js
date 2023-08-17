const express = require('express');
const router = express.Router();
const PreventiveMain=require("../models/PreventiveMaintenance")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');

// Get preventive maintenance.

router.get("/", async (req, res) => {
    try {
      const Preventives = await PreventiveMain.find({}, null, { sort: { _id: -1 } })
      .populate({path: "departmentID",
      model: "Department"})
      .populate({path: "machineID",
      model: "Machine"})
      .populate({path: "employeeID",
      model: "Employee"})
      .exec();
  
      res.status(200).json(Preventives);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });


// Add new preventive maintenance

router.post("/", async (req, res) => {
    const newPreventiveMain = new PreventiveMain(req.body);
    try {
      const response = await newCorrectiveMain.save();
      const Preventives = await PreventiveMain.findById(response._id)
        .populate(PreventiveMain.departmentID)
        .populate(PreventiveMain.machineID)
        .populate(PreventiveMain.employeeID)
        .exec();
      res.status(200).json(Preventives);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });


// Search preventive maintenance
router.get('/:prevMainId',async(req, res)=>{
    try {
        const PM = await PreventiveMain.findById(req.params.prevMainId);
        
        res.status(200).json(PM);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Update preventive maintenance

router.put("/:prevMainId", async (req, res) => {
    try {
      const PM = await PreventiveMain.findByIdAndUpdate(
        req.params.prevMainId,
        { $set: req.body },
        { new: true }
      );
      const preventiveMains = await PreventiveMain.findById(PM._id)
      .populate(PreventiveMain.departmentID)
      .populate(PreventiveMain.machineID)
      .populate(PreventiveMain.employeeID)
        .exec();
      res.status(200).json(preventiveMains);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

// Delete preventive maintenance

router.delete('/:prevMainId', async (req, res)=> {
    const  id  = req.params.prevMainId;
    await PreventiveMain.findByIdAndDelete(id);

    res.json({ message: "Preventive maintenance deleted successfully." });

});
module.exports = router;