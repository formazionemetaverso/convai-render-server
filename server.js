const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/spatial-convai', async (req, res) => {
    const userInput = req.body.input;

    // Validazione input
    if (!userInput || typeof userInput !== 'string') {
        console.log('Input non valido ricevuto:', userInput);
        return res.status(400).json({ error: "Input non valido" });
    }

    try {
        console.log(`Input ricevuto: ${userInput}`);

        // Chiamata all'API di Convai
        const convaiResponse = await axios.post('https://api.convai.com/character/chat', {
            character_id: '1e9fbd10-a2d1-11ef-a8fc-42010a7be016', // ID del tuo personaggio
            input: userInput, // Input dell'utente
        }, {
            headers: {
                'CONVAI-API-KEY': process.env.CONVAI_API_KEY // Chiave API di Convai
            },
            timeout: 5000 // Timeout di 5 secondi per evitare blocchi
        });

        console.log("Risposta ricevuta da Convai:", convaiResponse.data.response);
        res.json({ response: convaiResponse.data.response });
    } catch (error) {
        console.error('Errore durante la comunicazione con Convai:', {
            message: error.message,
            response: error.response?.data, // Dettagli dell'errore restituiti da Convai
            status: error.response?.status // Codice di stato HTTP
        });
        res.status(500).json({ error: 'Errore nella comunicazione con Convai' });
    }
});

app.get('/', (req, res) => {
    res.send('Il server è in esecuzione correttamente!');
});

app.listen(PORT, () => {
    console.log(`Server in esecuzione su porta ${PORT}`);
});

