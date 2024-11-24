const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
let currentSessionID = "-1";

app.post('/spatial-convai', async (req, res) => {
    const userInput = req.body.input;

    if (!userInput) {
        return res.status(400).json({ error: "Input mancante" });
    }

    try {
        const convaiResponse = await axios.post('https://api.convai.com/character/getResponse', {
            userText: userInput,
            charID: '1e9fbd10-a2d1-11ef-a8fc-42010a7be016',
            sessionID: currentSessionID,
            voiceResponse: "False"
        }, {
            headers: {
                'CONVAI-API-KEY': process.env.CONVAI_API_KEY
            }
        });

        // Aggiorna il sessionID per richieste future
        if (convaiResponse.data.sessionID) {
            currentSessionID = convaiResponse.data.sessionID;
        }

        res.json({ response: convaiResponse.data });
    } catch (error) {
        console.error('Errore durante la comunicazione con Convai:', error.message);
        res.status(500).json({ error: 'Errore nella comunicazione con Convai' });
    }
});

app.get('/', (req, res) => {
    res.send('Il server è in esecuzione correttamente!');
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su porta ${PORT}`);
});


