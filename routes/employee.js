const express = require('express')
const router = express.Router();
const upload = require('../middleware/upload');
const EmployeeController = require("../controllers/EmployeeController");
const authenticate = require('../middleware/authenticate');

router.get('/',authenticate, EmployeeController.employeeList)
router.post('/show/:id',EmployeeController.show);
router.post('/store',upload.single('avatar'),EmployeeController.store);
router.post('/update/:id',EmployeeController.update);
router.post('/delete/:id',EmployeeController.kickout);

module.exports = router;