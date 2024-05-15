const mongoose = require('mongoose');
const Calendar = require('./Calendar');

// Connessione al database MongoDB
mongoose.connect('mongodb+srv://admin:admin@clustermain.n9dwne9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Funzione per popolare il database
async function populateDatabase() {
    try {
        // Elimina tutti i documenti esistenti
        await Calendar.deleteMany();

        // Dati da inserire nel database
        const schedules = {
            'RAVINA - ROMAGNANO': {
                organic: 3, // Tuesday
                plastic: 6, // Friday
                paper: 4, // Wednesday
                residue: 4, // Wednesday
                glass: 4 // Wednesday
            },
            'POVO - VILLAZZANO': {
                organic: 2, // Monday
                plastic: 6, // Friday
                paper: 5, // Thursday
                residue: 2, // Monday
                glass: 2 // Monday
            },
            'ARGENTARIO': {
                organic: 3, // Tuesday
                plastic: 4, // Wednesday
                paper: 6, // Friday
                residue: 4, // Wednesday
                glass: 4 // Wednesday
            },
            'BONDONE E SARDAGNA': {
                organic: 2, // Monday
                plastic: 5, // Thursday
                paper: 4, // Wednesday
                residue: 2, // Monday
                glass: 2 // Monday
            },
            'MATTARELLO': {
                organic: 3, // Tuesday
                plastic: 3, // Tuesday
                paper: 4, // Wednesday
                residue: 7, // Friday
                glass: 7 // Friday
            },
            'S. GIUSEPPE - S. CHIARA': {
                organic: 3, // Tuesday
                plastic: 4, // Wednesday
                paper: 6, // Friday
                residue: 3, // Tuesday
                glass: 3 // Tuesday
            },
            'CRISTO RE - SAN MARTINO': {
                organic: 2, // Monday
                plastic: 3, // Tuesday
                paper: 2, // Monday
                residue: 5, // Thursday
                glass: 5 // Thursday
            },
            'PIEDICASTELLO - SOLTERI - VELA - CAMPOTRENTINO': {
                organic: 2, // Monday
                plastic: 3, // Tuesday
                paper: 2, // Monday
                residue: 5, // Thursday
                glass: 5 // Thursday
            },
            'VIA KOFLER - CASTELLER': {
                organic: 3, // Tuesday
                plastic: 2, // Monday
                paper: 6, // Friday
                residue: 3, // Tuesday
                glass: 3 // Tuesday
            },
            'GARDOLO': {
                organic: 3, // Tuesday
                plastic: 6, // Friday
                paper: 3, // Tuesday
                residue: 4, // Wednesday
                glass: 4 // Wednesday
            },
            'GARDOLO ZONA INDUSTRIALE - MEANO': {
                organic: 2, // Monday
                plastic: 5, // Thursday
                paper: 2, // Monday
                residue: 5, // Thursday
                glass: 4 // Wednesday
            },
            'OLTREFERSINA': {
                organic: 2, // Monday
                plastic: 4, // Wednesday
                paper: 2, // Monday
                residue: 5, // Thursday
                glass: 2 // Monday
            }
        };

        // Inserisci i dati nel database
        for (const zoneName in schedules) {
            if (Object.hasOwnProperty.call(schedules, zoneName)) {
                const schedule = schedules[zoneName];
                await Calendar.create({
                    zone: zoneName,
                    organic: schedule.organic,
                    plastic: schedule.plastic,
                    paper: schedule.paper,
                    residue: schedule.residue,
                    glass: schedule.glass
                });
            }
        }

        console.log('Database popolato con successo!');
    } catch (error) {
        console.error('Errore durante il popolamento del database:', error);
    } finally {
        // Chiudi la connessione al database
        mongoose.connection.close();
    }
}

// Esegui la funzione per popolare il database
populateDatabase();