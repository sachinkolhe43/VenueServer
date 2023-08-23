const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()


router.get("/", (request, response) => {
  const statement = `SELECT * FROM Users`
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.post("/register", (request, response) => {
  const {User_id,User_name,User_email,User_pass, User_contact,User_address } = request.body
  db.query(
    "INSERT INTO Users(User_id,User_name,User_email,	User_pass,User_contact ,User_address) VALUES(?,?,?,?,?,?)",
    [User_id, User_name, User_email, User_pass,User_contact,User_address],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.post("/login", (request, response) => {
  console.log(request.body);
  const { User_pass, User_email } = request.body
  const statement = "SELECT * FROM Users WHERE User_pass=? and User_email=?"
  db.query(statement, [User_pass, User_email], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get("/:id", (request, response) => {
  const id = request.params.id
  const statement = `SELECT * FROM Users WHERE User_id=?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


router.delete("/:id", (request, response) => {
  const id = request.params.id
  const statement = `DELETE  FROM Users  WHERE User_id =?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})


module.exports = router
