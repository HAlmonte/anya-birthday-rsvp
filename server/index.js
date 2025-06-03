const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

const corsOptions = {
	origin: ['http://localhost:8000'], 
	optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    guestCount: {
        type: Number,
        required: [true, 'Guest Count is Required']
    }
});

const Guest = mongoose.model('Guest', guestSchema);

app.post("/guest-rsvp", (req, res) => {

    let newGuest = new Guest({
        name : req.body.name,
        guestCount : req.body.guestCount
    });

    return newGuest.save()
    .then((result) => res.status(201).send({
        message: 'Guest added successfully'
    }))
});

app.listen(process.env.PORT, () => console.log(`API is now online on port ${process.env.PORT}`));