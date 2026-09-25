# Gusti Digitali — Guida a Gusti di Frontiera 2026

Guida non ufficiale, mobile-first, per il festival **Gusti di Frontiera** a Gorizia (24–27 settembre). Sito statico (HTML/CSS/JS puro, nessuna build necessaria), pensato per essere tradotto automaticamente dal browser (Google Translate su Chrome) grazie a un'architettura a pagina singola dove tutte le viste sono già presenti nel DOM al caricamento.

## Contenuti

- **Home**: statistiche del festival, contatore visite ed elenco dei 17 borghi ufficiali
- **Borgo → Stand → Menu**: dettaglio di ogni borgo, i suoi stand, orari, posizione e menu con prezzi. Ogni piatto con una foto disponibile mostra un&rsquo;icona cliccabile (invece dell&rsquo;emoji generica) che apre la foto a schermo intero con licenza e link alla fonte
- **Mappa**: mappa ufficiale del festival (`assets/festival-map.jpg`) con una griglia di pulsanti numerati per ciascun borgo (niente pin sovrapposti che si accavallano)
- **Cerca**: ricerca testuale sui piatti/stand/borghi, con filtri per prezzo, dieta (vegetariano, vegano, senza glutine) e borgo
- **Preferiti**: salvataggio locale (localStorage) degli stand da non perdere
- **Foto**: galleria di foto scattate sul posto, più link a Google Maps e Instagram per le foto dei visitatori (mai copiate o ripubblicate senza permesso)

## Nota sui dati

Il banner in alto nell'app dichiara onestamente che si tratta di una guida indipendente, non ufficiale, e che menu/prezzi mostrati sono **esempi** finché non vengono confermati da ogni singolo espositore. Borghi, vie e posizioni sulla mappa sono invece reali.

## Struttura del progetto

```
index.html               pagina unica con tutte le viste (head con meta SEO multilingua)
js/app.js                dati dei 17 borghi/stand/menu + logica dell'app (routing, preferiti, ricerca, mappa)
assets/festival-map.jpg  mappa ufficiale del festival
assets/photos/           foto scattate sul posto per la pagina "Foto"
assets/dishes/           una foto illustrativa per piatto (vedi sotto)
borghi-mappa.json        dati grezzi di verifica delle posizioni sulla mappa ufficiale
piano-gusti-digitali.md  piano editoriale e note di raccolta dati
```

## Foto dei piatti

Ogni foto in `assets/dishes/` viene da [Openverse](https://openverse.org) (un motore di ricerca per immagini con licenza Creative Commons), **mai da una ricerca Google Immagini generica**: quei risultati sono quasi sempre foto protette da copyright pieno, senza alcuna licenza che ne permetta la ripubblicazione. Ogni foto usata mantiene l'attribuzione richiesta dalla sua licenza CC, visibile toccando l'icona del piatto (oggetto `DISH_PHOTOS` in `js/app.js`, con licenza e link alla fonte).

Non tutti i piatti hanno una foto: quando la ricerca non restituiva un risultato chiaramente pertinente (es. "Pljeskavica"), il piatto resta senza foto — mai con un'immagine sbagliata o fuorviante solo per riempire lo spazio.

## Sviluppo locale

Nessuna build richiesta: serve un server statico qualsiasi (l'apertura diretta del file può bloccare il caricamento di `js/app.js` per via del protocollo `file://`), ad esempio:

```bash
python -m http.server 8000
```

poi apri `http://localhost:8000`.

## Pubblicazione su GitHub Pages

1. Crea un repository su GitHub e collega questa cartella come origin.
2. Push su `main`.
3. Nel repository, vai su **Settings → Pages**, imposta *Source* su `main` branch, cartella `/ (root)`.
4. Il sito sarà pubblicato su `https://<utente>.github.io/<repo>/`.

## Aggiornare i dati reali

Aggiungi gli stand raccolti sul posto nell'array `BORGHI` in `js/app.js`, dentro il campo `stands` del borgo corrispondente:

```js
{ id:'nome-stand', name:'Nome Stand', hours:'11:00 &ndash; 00:00', loc:'Via Esempio', open:true,
  items:[
    {name:'Nome piatto', desc:'Descrizione breve', price:7, tags:[], icon:'grill'}
  ]}
```

Icone disponibili: `grill`, `soup`, `sweet`, `drink`, `bread`, `wrap`, `rice`, `skewer`. Tag dieta: `veg`, `vegan`, `gluten-free`.
