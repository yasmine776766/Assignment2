const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let contacts = [{
    "contact_name": "Yasmine",
    "contact_profession": "Teacher",
    "contact_tel_number": "70689417",
    "contact_mobile_number": "07000000",

},
{
    "contact_name": "Yasmine1",
    "contact_profession": "Teacher",
    "contact_tel_number": " 70689417",
    "contact_mobile_number": "07000000",

},
{
    "contact_name": "Yasmine2",
    "contact_profession": "Teacher",
    "contact_tel_number": " 70689417",
    "contact_mobile_number": "07000000",

}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const contact = req.body;

    // output the contact to the console for debugging
    console.log(contact);
    contacts.push(contact);

    res.send('contact is added to the database');
});

app.get('/contact', (req, res) => {
    res.json(contacts);
});

app.get('/contact/:name', (req, res) => {
    // reading name from the URL
    const name = req.params.name;
    console.log("hi");
    console.log(name);
    // searching contacts for the name
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].contact_name === name) {
            res.json(contacts[i]);
            console.log(contacts[i]);
            return;
        }
      }
    // for ( contact of contacts) {
    //     if (contact.name === name) {
    //         res.json(contact);
    //         console.log(contact);
    //         return;
    //     }
    // }

    // sending 404 when not found something is a good practice
    res.status(404).send('contact not found');
});

app.delete('/contact/:name', (req, res) => {
    // reading name from the URL
    console.log("hi");
    const name = req.params.name;
    console.log(name);


    // remove item from the contacts array
    contacts = contacts.filter(i => i.contact_name !== name);

    // sending 404 when not found something is a good practice
    console.log(contacts);
    res.send('contact is deleted');

});

app.post('/contact/:name', (req, res) => {
    // reading name from the URL
    const name = req.params.name;
    const newcontact = req.body;

    // remove item from the contacts array
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i]

        if (contact.name === name) {
            contacts[i] = newcontact;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('contact is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));