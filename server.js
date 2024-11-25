const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const FormData = require('form-data');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/spatial-convai', async (req, res) => {
    const userInput = req.body.input;

    if (!userInput) {
        console.log("Richiesta senza input ricevuta");
        return res.status(400).json({ error: "Input mancante" });
    }

    try {
        console.log(`Input ricevuto: ${userInput}`);

        // Creazione di form-data per la richiesta
        const formData = new FormData();
        formData.append('charID', '1e9fbd10-a2d1-11ef-a8fc-42010a7be016'); // Character ID
        formData.append('sessionID', '-1');
        formData.append('userText', userInput);
        formData.append('voiceResponse', 'false');

        const convaiResponse = await axios.post('https://api.convai.com/character/getResponse/', formData, {
            headers: {
                ...formData.getHeaders(),
                'CONVAI-API-KEY': '28878bea5c7697dde29c8bd7b8099ca4' // API Key
            }
        });

        console.log("Risposta da Convai:", convaiResponse.data);
        res.json(convaiResponse.data);
    } catch (error) {
        console.error('Errore durante la comunicazione con Convai:', error.message);
        res.status(500).json({
            error: 'Errore nella comunicazione con Convai',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Il server è in esecuzione correttamente!');
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su porta ${PORT}`);
});




