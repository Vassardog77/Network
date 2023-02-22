import axios from "axios"
import ApiToken from "../models/apiToken.js"

export const postEmails = async (req, res) => { //sending email through gmail
    
    const GToken = await ApiToken.findOne({media: "google"})

    var data = JSON.stringify(req.body) //the email from the client
      var config = {
        method: 'post',
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        headers: {
          'Authorization': 'Bearer '+ GToken.access_token,
          'Content-Type': 'application/json'
        },
        data : data
      };

      await axios(config)
              .then(function(response) {
                //console.log(response.body)
                res.status(200).json(data)
              })
              .catch(function(error) {
              res.status(500).json({ error })
              })
}