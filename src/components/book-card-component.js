import emptyHeart from '../../assets/heart pixel art 48x48_empty.png';
import fullHeart from '../../assets/heart pixel art 48x48.png';

export default class BookCardComponent {

    constructor(book, storageService) {
        this.book = book;
        this.storageService = storageService;
        this.isFavorite = this.storageService.isFavorite(this.book);
    }

	render() {
		// Crea un elemento <a> che fungerà da contenitore cliccabile per il libro
		const bookContainer = document.createElement('a');
		// Imposta l'URL del link per la pagina dei dettagli, aggiungendo l'ID del libro come parametro
		bookContainer.href = './detail.html?id=' + this.book.id;
		// Aggiunge una classe CSS per lo styling del container del libro
		bookContainer.classList.add('book-container');
	
		// Inizializza una variabile per contenere il markup HTML che verrà inserito nel container
		let html = '';
		// Verifica se l'immagine JPEG del libro è disponibile
		if (!!this.book.formats["image/jpeg"]) {
			// Se disponibile, imposta il markup con l'immagine del libro e il titolo
			html = `
				<img src="${this.book.formats["image/jpeg"]}" class="book-image">
				<h3 class="book-title">${this.book.title}</h3>
				`;
		} else {
			// Se non disponibile, usa un'immagine di default e mostra comunque il titolo del libro
			html = `
				<img src="https://cdn.bakerpublishinggroup.com/covers/listing/missing.png" class="book-image">
				<h3 class="book-title">${this.book.title}</h3>
				`;
		}
		// Inserisce il markup HTML nel container del libro
		bookContainer.innerHTML = html;
	
		// Crea un elemento <img> che funge da pulsante per salvare o rimuovere il libro dai preferiti
		const saveButton = document.createElement('img');
		// Imposta la sorgente dell'immagine in base allo stato del libro (favorito o meno)
		if (this.isFavorite) {
			saveButton.src = fullHeart;  // Mostra l'immagine del cuore pieno
		} else {
			saveButton.src = emptyHeart; // Mostra l'immagine del cuore vuoto
		}
		// Aggiunge una classe CSS al pulsante per eventuali stili aggiuntivi
		saveButton.classList.add('save-button');
		// Aggiunge un event listener per il click sul pulsante, richiamando la funzione toggleFavorite
		saveButton.addEventListener('click', (event) => this.toggleFavorite(event, saveButton, bookContainer));
	
		// Aggiunge il pulsante di salvataggio al container del libro
		bookContainer.appendChild(saveButton);
	
		// Restituisce il container completo, pronto per essere inserito nel DOM
		return bookContainer;
	}
	
	toggleFavorite(event, saveButton, bookContainer) {
		// Impedisce il comportamento predefinito del click (evita che il link venga seguito)
		event.preventDefault();
		// Salva (o rimuove) il libro dai preferiti tramite il servizio di storage
		this.storageService.save(this.book);
		// Inverte lo stato del flag isFavorite: se era true diventa false, e viceversa
		this.isFavorite = !this.isFavorite;
		// Aggiorna la sorgente dell'immagine del pulsante in base al nuovo stato
		if (this.isFavorite) {
			saveButton.src = fullHeart;
		} else {
			saveButton.src = emptyHeart;
			// Se siamo nella pagina dei preferiti (starred.html) e il libro è stato rimosso,
			// rimuove il container del libro dalla visualizzazione
			if (window.location.pathname.includes('starred.html')) {
				bookContainer.remove();
			}
		}
	}
}	