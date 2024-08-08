const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/pages', express.static(path.join(__dirname, 'public/pages')));



app.use(bodyParser.urlencoded({ extended: true }));

const dataStore = {
    contacts: [],
    feedbacks: []
};

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit-contact', (req, res) => {
    const { name, email, message, phone } = req.body;

    if (name.length < 2) {
        return res.send('Name must be at least 2 characters long.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.send('Please enter a valid email address.');
    }

    if (message.length < 10) {
        return res.send('Message must be at least 10 characters long.');
    }

    if (phone && !/^\d{10}$/.test(phone)) {
        return res.send('Phone number must be 10 digits.');
    }

   
    dataStore.contacts.push({ name, email, message, phone });

   
    res.render('result', {
        type: 'Contact',
        data: { name, email, message, phone }
    });
});

app.post('/submit-feedback', (req, res) => {
    const { feedback } = req.body;

   
    if (feedback.length < 5) {
        return res.send('Feedback must be at least 5 characters long.');
    }

  
    dataStore.feedbacks.push({ feedback });


    res.render('result', {
        type: 'Feedback',
        data: { feedback }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
