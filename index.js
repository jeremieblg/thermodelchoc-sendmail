const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

app.get('/isalive', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Thermodelchoc-sendmail is alive');
    res.status(200).send('isalive');
});
app.post('/send', (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const description = req.body.description;
    const mailjet = require ('node-mailjet')
    .connect(`${process.env.KEY1}`, `${process.env.KEY2}`)
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": `${process.env.SENDER}`,
            "Name": "Thermodelchoc"
          },
          "To": [
            {
              "Email": `${process.env.RECEVER}`,
              "Name": "Jacques"
            }
          ],
          "Subject": "Contact",
          "TextPart": "Contact",
          "HTMLPart": `Nom: ${name} <br> Email: ${mail} <br> Description: ${description}`,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result) => {
        res.status(200)
        res.send('mail send');
      })
      .catch((err) => {
        res.status(err.statusCode)
      })
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
