require('dotenv').config()
// CONSTANTS
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bodyParser = require('body-parser')
const port = 3030
// IMPORTS
const http = require("http")
const client = require('twilio')(accountSid, authToken)
const express = require("express");
const MessagingResponse = require('twilio/lib/twiml/MessagingResponse');



// MIDDLEWARE

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTES
app.post("/sms", (req, res) => {
    const twiml = new MessagingResponse();
    const message = twiml.message()
    const user_message = req.body.Body.toUpperCase()
    switch(user_message) {
        case("DOG?"):
            message.media("https://picsum.photos/id/237/200/300")
            break
        case("CREB"):
            message.body(`You are now signed up... buckle up it's gonna get a bit... crusty`);
            break
        default:
            message.body(`dude... what?`);
            break
                        
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})

const server = http.createServer(app)   
server.listen(port, () => console.log(`Listening on port ${port}`));