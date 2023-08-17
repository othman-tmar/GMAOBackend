const express = require('express');
const router = express.Router();
const CorrectiveMain=require("../models/CorrectiveMaintenance")
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');

// Get corrective maintenance.

router.get("/", async (req, res) => {
    try {
      const Correctives = await CorrectiveMain.find({}, null, { sort: { _id: -1 } })
        .populate({path: "departmentID",
        model: "Department"})
        .populate({path: "machineID",
        model: "Machine"})
        .populate({path: "employeeID",
        model: "Employee"})
        .exec();
  
      res.status(200).json(Correctives);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
// Add new corrective maintenance

router.post("/", async (req, res) => {
    const newCorrectiveMain = new CorrectiveMain(req.body);
    try {
      const response = await newCorrectiveMain.save();
      const correctiveMains = await CorrectiveMain.findById(response._id)
        .populate(CorrectiveMain.departmentID)
        .populate(CorrectiveMain.machineID)
        .populate(CorrectiveMain.employeeID)
        .exec();
      res.status(200).json(correctiveMains);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

// Search corrective maintenance
router.get('/:correMainId',async(req, res)=>{
    try {
        const CM = await CorrectiveMain.findById(req.params.correMainId);
        
        res.status(200).json(CM);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Update corrective maintenance

router.put("/:correMainId", async (req, res) => {
    try {
      const CM = await CorrectiveMain.findByIdAndUpdate(
        req.params.correMainId,
        { $set: req.body },
        { new: true }
      );
      const correctiveMains = await CorrectiveMain.findById(CM._id)
      .populate(CorrectiveMain.departmentID)
      .populate(CorrectiveMain.machineID)
      .populate(CorrectiveMain.employeeID)
        .exec();
      res.status(200).json(correctiveMains);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
// Delete corrective maintenance
router.delete('/:correMainId', async (req, res)=> {
    const  id  = req.params.correMainId;
    await CorrectiveMain.findByIdAndDelete(id);

    res.json({ message: "Corrective maintenance deleted successfully." });

});
module.exports = router;