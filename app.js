   const express = require("express")
   const bodyParser = require("body-parser")
   const request = require("request")
   const https = require("https")
   
   
   const app = express()

   app.use(bodyParser.urlencoded({extended: true}))

   app.use(express.static("public"))


   app.get("/", function(req, res) {
      res.sendFile(__dirname + "/signup.html")
   })

   app.post("/", function(req, res) {
      const Fname = req.body.Fname 
      const Lname = req.body.Lname
      const email = req.body.Email

      const data = {
         members: [
            {
               email_address: email,
               status: "subscribed", 
               merge_fields: {
                  FNAME: Fname,
                  LNAME: Lname 
               }
            }
         ]
      }
      const jsonData = JSON.stringify(data)

      const url = "https://us5.api.mailchimp.com/3.0/lists/130f008343"
      const options = {
         method: "POST",
         auth: "Michael:a7a7515c85f92036a9373aa7da5095b6-us5"
      }
      
      const request = https.request(url, options, function(response) {

           if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
           } else {
            res.sendFile(__dirname + "/failure.html")
           }
           

           response.on("data", function(data) {
            console.log(JSON.parse(data)) 
           })
      })
      
      request.write(jsonData)
      request.end()
   })

   app.post("/failure", function(req, res) {
      res.redirect("/")
   })



   app.listen(process.env.PORT || 3000, function() {
    console.log("Server is live on port 3000")
   }) 


   // Api Keys 
   // a7a7515c85f92036a9373aa7da5095b6-us5
   
   //List ID
   // 130f008343