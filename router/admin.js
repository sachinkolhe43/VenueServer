const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
  // console.log("admin getall")
  const statement = `SELECT * FROM Admin`
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.post("/login", (request, response) => {
  console.log("login");
  const { Admin_email, Admin_pass } = request.body
  console.log(request.body);
  const statement = "SELECT * FROM Admin WHERE Admin_email=? and Admin_pass=?"
  db.query(statement, [Admin_email, Admin_pass], (error, result) => {
    response.send(utils.createResult(error, result))
    console.log(result);
  })
})


router.post("/register", (request, response) => {
  console.log("register");
  const { Admin_id, Admin_name, Admin_email, Admin_pass } = request.body
  db.query(
    "INSERT INTO Admin(Admin_id,Admin_name,Admin_email,Admin_pass) VALUES(?,?,?,?)",
    [Admin_id, Admin_name, Admin_email, Admin_pass],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})


router.get("/:id", (request, response) => {
  const id = request.params.id
  const statement = `SELECT * FROM Admin WHERE Admin_id=?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


router.delete("/:id", (request, response) => {
  const id = request.params.id
  const statement = `DELETE  FROM Admin  WHERE Admin_id =?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})
module.exports = router
