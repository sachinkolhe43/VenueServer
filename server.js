const express = require("express")
const cors = require("cors")
const routerUser = require("./router/user")
const routerVenue = require("./router/venue")
const routerAdmin = require("./router/admin")
const routerServices = require("./router/services")
const app = express()


app.use(express.json())
app.use(cors("*"))
app.use(express.static("uploads"))


app.use("/user", routerUser)
app.use("/admin",routerAdmin)
app.use("/venue", routerVenue)
app.use("/service",routerServices)






app.listen(4000, "0.0.0.0", () => {
  console.log("Server started at port 4000")
})
