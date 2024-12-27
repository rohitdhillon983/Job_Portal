const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const { getAdminJobs, getAllJobs, postJob, getJobbyId, deleteCompanyWithJobs, deletJob, updateJob } = require("../controllers/job.controller.js");

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobbyId);
router.route("/update/:id").put(isAuthenticated, updateJob);
router.route("/deleteCompanyWithJob/:id").get(deleteCompanyWithJobs);
router.route("/delete/:id").delete(isAuthenticated, deletJob);
module.exports =  router;

