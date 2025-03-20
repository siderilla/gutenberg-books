Gutenberg Books

Questo progetto è un'applicazione web che sfrutta l'API Gutendex per mostrare libri in una griglia, consentendo la navigazione tra le pagine, la visualizzazione dei dettagli di un singolo libro e la gestione di una lista di libri “preferiti”. Il progetto è sviluppato in JavaScript moderno, utilizzando moduli ES6, ed è configurato con Vite per uno sviluppo rapido.
Struttura del Progetto

La struttura del progetto è organizzata in modo modulare. Ecco una panoramica dei file principali:

```
/ (root)
├── index.html           // Homepage: mostra la griglia dei libri con paginazione
├── detail.html          // Pagina dei dettagli: visualizza le informazioni di un singolo libro
├── starred.html         // Pagina dei libri salvati (preferiti)
├── package.json         // Configurazione del progetto (Vite, TypeScript opzionale)
├── package-lock.json    // Lock file delle dipendenze
└── src
    ├── style.css        // Stili comuni per tutte le pagine
    ├── home.js          // Entry point per la homepage
    ├── detail.js        // Entry point per la pagina dei dettagli
    ├── starred.js       // Entry point per la pagina dei preferiti
    ├── components
    │   ├── book-card-component.js      // Componente per visualizzare la "card" di un libro
    │   ├── home-page-component.js        // Componente che gestisce la homepage: fetch, paginazione e rendering
    │   ├── detail-page-component.js      // Componente che gestisce la visualizzazione dei dettagli di un libro
    │   └── starred-page-component.js     // Componente che visualizza i libri salvati
    └── services
        ├── book-service.js               // Servizio per ottenere i dati dei libri dall'API
        └── storage-service.js            // Servizio per gestire il salvataggio dei libri preferiti (localStorage)
```

Descrizione File per File
1. HTML

    index.html
        Definisce la homepage dell’applicazione.
        Include il CSS comune e carica lo script home.js.
        Contiene un header con navigazione, due bottoni per la paginazione e un div con classe book-grid dove verranno inserite le "card" dei libri.

    detail.html
        È la pagina per visualizzare i dettagli di un libro selezionato.
        Contiene un header e un div con classe book-detail dove verranno inserite le informazioni del libro.
        Importa lo script detail.js.

    starred.html
        Mostra i libri che l’utente ha salvato tra i preferiti.
        Contiene un header e un div con classe starred-grid per il rendering delle "card" dei libri preferiti.
        Carica lo script starred.js.

2. Configurazione e Stili

    package.json & package-lock.json
        Questi file configurano il progetto, specificano le dipendenze (Vite, TypeScript, ecc.) e forniscono gli script per lo sviluppo e la build.
    style.css
        Definisce gli stili di base per il body e per la griglia dei libri.
        Le classi come .book-grid, .book-container, .book-image, .book-title e .save-button vengono usate nei componenti per mantenere uno stile coerente.

3. Entry Point JavaScript

    home.js
        Importa BookService, HomePageComponent e StorageService.
        Inizializza il servizio e il componente della homepage, che a sua volta si occupa di richiamare l'API, gestire la paginazione e rendere ogni libro come "card".

    detail.js
        Importa BookService e DetailPageComponent.
        Crea un'istanza del componente dei dettagli che, partendo dall'id presente nella URL, ottiene e visualizza le informazioni del libro.

    starred.js
        Importa StarredPageComponent e StorageService.
        Inizializza il componente per i libri salvati, il quale recupera dal localStorage la lista dei libri preferiti e li visualizza.

4. Componenti

    book-card-component.js
        Definisce il componente che crea una "card" per ciascun libro.
        All'interno del metodo render(), crea un elemento <a> che funge da link alla pagina dei dettagli, includendo l'immagine e il titolo del libro.
        Aggiunge anche un pulsante (in questo caso un elemento <img> che rappresenta il cuore) che permette di salvare o rimuovere il libro dai preferiti, tramite il metodo toggleFavorite().
        Il pulsante mostra un'icona diversa (cuore pieno o vuoto) in base allo stato isFavorite.

    home-page-component.js
        Gestisce la homepage:
            Richiede i dati dei libri chiamando getData() dal BookService.
            Aggiunge listener sui bottoni di paginazione (next/prev).
            Per ogni libro, istanzia il BookCardComponent e lo rende nel contenitore della griglia.

    detail-page-component.js
        Gestisce la pagina dei dettagli:
            Estrae l'id del libro dalla URL.
            Chiama getBookById(id) dal BookService per ottenere i dettagli del libro.
            Visualizza le informazioni nel contenitore specificato (ad esempio, mostrando il titolo).

    starred-page-component.js
        Visualizza i libri salvati (preferiti):
            Recupera la lista dei libri preferiti dal StorageService.
            Per ciascun libro, crea una "card" utilizzando il BookCardComponent e le visualizza nel contenitore dedicato.

5. Servizi

    book-service.js
        Si occupa di interfacciarsi con l’API di Gutendex per recuperare i dati:
            Il metodo getData() richiede la pagina corrente e restituisce un array di libri.
            I metodi nextPage() e prevPage() gestiscono la navigazione tra le pagine.
            getBookById(id) ottiene i dettagli di un singolo libro.

    storage-service.js
        Gestisce il salvataggio dei libri preferiti nel localStorage:
            Il metodo save(book) aggiunge o rimuove un libro dall’elenco dei preferiti (funziona come un toggle).
            getStarredBookData() restituisce la lista dei libri salvati, oppure un array vuoto se non ce ne sono.

Come Funziona il Progetto (Flusso dei Dati)

    Avvio e Rendering della Homepage:
        home.js istanzia HomePageComponent passandogli BookService e StorageService.
        HomePageComponent chiama getData() di BookService per ottenere i dati dei libri.
        Per ogni libro ricevuto, crea una nuova istanza di BookCardComponent che costruisce l’HTML della card (immagine, titolo e pulsante cuore).
        I pulsanti per la paginazione permettono di passare a pagine diverse e aggiornare il rendering.

    Visualizzazione dei Dettagli:
        Quando si clicca su una card (il link), l’utente viene reindirizzato a detail.html con l’id del libro come parametro.
        detail.js avvia DetailPageComponent, il quale estrae l’id dalla URL e richiama getBookById(id) per ottenere i dettagli, visualizzandoli nella pagina.

    Gestione dei Preferiti:
        Il pulsante a forma di cuore in ogni card, gestito in BookCardComponent, permette di salvare o rimuovere il libro dai preferiti.
        Il metodo toggleFavorite() gestisce il toggle dello stato e aggiorna l’immagine del cuore (pieno o vuoto).
        Se il libro viene rimosso nella pagina dei preferiti (starred.html), la card viene rimossa dal DOM.
        starred.js avvia StarredPageComponent, che legge dal StorageService la lista dei libri salvati e li visualizza.

Come Eseguire il Progetto

    Installazione:
        Assicurati di avere Node.js installato.
        Esegui npm install per installare le dipendenze (Vite, ecc.).

    Avvio in Modalità Sviluppo:
        Avvia il server di sviluppo con npm run dev (o il comando configurato in package.json).
        Apri il browser all’indirizzo indicato (di solito http://localhost:3000).

    Build per la Produzione:
        Quando sei pronta, esegui npm run build per creare la build ottimizzata.

Conclusioni

Il progetto è strutturato per separare chiaramente la logica di gestione dei dati (BookService e StorageService) dalla visualizzazione (i vari componenti). Ogni pagina HTML importa il proprio file di avvio (home.js, detail.js, starred.js) che orchestra l'interazione tra servizi e componenti.

Questa organizzazione modulare ti consente di lavorare su ogni parte in modo isolato, facilitando la manutenzione e l'espansione futura del progetto.
