const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

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
        const convaiResponse = await axios.post('https://api.convai.com/character/chat', {
            character_id: '1e9fbd10-a2d1-11ef-a8fc-42010a7be016',
            input: userInput,
        }, {
            headers: {
                'CONVAI-API-KEY': process.env.CONVAI_API_KEY
            }
        });

        console.log("Risposta da Convai:", convaiResponse.data.response);
        res.json({ response: convaiResponse.data.response });
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

