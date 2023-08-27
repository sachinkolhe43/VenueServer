const express = require("express")
const db = require("../db")
const router = express.Router()
const utils = require("../utils")


router.get("/", (request, response) => {
  const statement = `SELECT * FROM Venues`
  db.query(statement, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.get("/:id", (request, response) => {
  const id = request.params.id
  const statement = `SELECT * FROM Venues WHERE Venue_id=?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

router.post("/addVenue", (request, response) => {
  console.log("venu add called...")
  const { Venue_name, Venue_description, Venue_contact, Venue_address, Venue_amountPerDay, Venue_image } = request.body
  db.query(
    "INSERT INTO Venues (Venue_name , Venue_description , Venue_contact , Venue_address , Venue_amountPerDay , Venue_image) VALUES(?,?,?,?,?,?)",
    [Venue_name, Venue_description, Venue_contact, Venue_address, Venue_amountPerDay, Venue_image],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.delete("/:id", (request, response) => {
  console.log("venu delete called")
  const id = request.params.id
  const statement = `DELETE  FROM Venues  WHERE Venue_id =?`
  db.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

//Update API

router.put("/:id", (req, res) => {
  const venueId = parseInt(req.params.id);
  const updatedVenueData = req.body;

  db.query(
    "UPDATE Venues SET ? WHERE Venue_id = ?", // Use the connection from the db module
    [updatedVenueData, venueId],
    (error, results) => {
      if (error) {
        console.error("Error updating venue:", error);
        return res.status(500).json({ message: "Error updating venue" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Venue not found" });
      }

      return res.status(200).json({ message: "Venue updated successfully", data: updatedVenueData });
    }
  );
});

module.exports = router
