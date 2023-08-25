const express = require("express")
const db = require("../db")
const router = express.Router()
const utils = require("../utils")



router.post("/bookVenue", (request, response) => {
     const { User_id, Venue_id, Total_amount, Start_date, End_date } = request.body
     console.log(request.body)
     db.query(
          "INSERT INTO VenueBookings (User_id ,Venue_id,Total_amount,Start_date,End_date) VALUES(?,?,?,?,?)",
          [User_id, Venue_id, Total_amount, Start_date, End_date],
          (error, result) => {
               response.send(utils.createResult(error, result))
          }
     )
})



router.get("/:id", (request, response) => {
     const id = request.params.id
     const statement = `SELECT V.* FROM Venues V INNER JOIN VenueBookings VB ON V.Venue_id = VB.Venue_id WHERE VB.User_id=?`
     db.query(statement, [id], (error, result) => {
          response.send(utils.createResult(error, result))
     })
})

router.get("/venuebookings/All", (request, response) => {
     const statement = `
    SELECT
      VB.VenueBooking_id,
      U.User_name,
      V.Venue_name,
      VB.Total_amount,
      VB.Start_date,
      VB.End_date
    FROM
      VenueBookings VB
      INNER JOIN Users U ON VB.User_id = U.User_id
      INNER JOIN Venues V ON VB.Venue_id = V.Venue_id`;

     db.query(statement, (error, result) => {
          response.send(utils.createResult(error, result));
     });
});



// router.get("/:id", (request, response) => {
//      const id = request.params.id
//      const statement = `SELECT m.* FROM mobiles m INNER JOIN orders o on m.id=o.mid WHERE o.uid=?`
//      db.query(statement, [id], (error, result) => {
//           response.send(utils.createResult(error, result))
//      })
// })

module.exports = router