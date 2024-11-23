const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Porta su cui il server sarà in ascolto (fornita da Render o 3000 come fallback)
const PORT = process.env.PORT || 3000;

// Endpoint POST per la comunicazione con Convai
app.post('/spatial-convai', async (req, res) => {
    const userInput = req.body.input;

    // Controllo che ci sia un input
    if (!userInput) {
        return res.status(400).json({ error: "Input mancante" });
    }

    try {
        // Richiesta API a Convai
        const convaiResponse = await axios.post('https://api.convai.com/character/chat', {
            character_id: '1e9fbd10-a2d1-11ef-a8fc-42010a7be016', // Sostituisci con il tuo character ID
            input: userInput,
        }, {
            headers: {
                'CONVAI-API-KEY': '28878bea5c7697dde29c8bd7b8099ca4' // Sostituisci con la tua API key
            }
        });

        // Risposta da Convai
        res.json({ response: convaiResponse.data.response });
    } catch (error) {
        console.error('Errore durante la comunicazione con Convai:', error.message);
        res.status(500).json({ error: 'Errore nella comunicazione con Convai' });
    }
});

// Endpoint GET per testare il funzionamento del server
app.get('/', (req, res) => {
    res.send('Il server è in esecuzione correttamente!');
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su porta ${PORT}`);
});

