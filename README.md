# Gusti di Frontiera 2026 — Guida ai Borghi

Guida non ufficiale, a cura della community, per il festival **Gusti di Frontiera** a Gorizia/Nova Gorica (25–27 settembre). Sito statico (HTML/CSS/JS puro, nessuna build necessaria), pensato per essere tradotto automaticamente dal browser (Google Translate su Chrome) grazie a un'architettura a pagina singola dove tutte le viste sono già presenti nel DOM al caricamento.

## Contenuti

- **Home**: elenco dei 17 borghi con via/piazza reale
- **Mappa**: mappa interattiva con le posizioni verificate dei borghi e i servizi (info point, primo soccorso, WC, parcheggi, numero mobilità, emergenze)
- **Cerca**: ricerca testuale sui borghi
- **Preferiti**: salvataggio locale (localStorage) dei borghi da visitare

## Regola sui dati

Ogni menu o prezzo pubblicato deve avere una fonte reale (foto raccolta sul posto, dato dell'organizzazione, materiale verificato). Finché un borgo non ha dati reali, la sua scheda mostra onestamente **"Menu in arrivo"** — mai prezzi inventati.

## Struttura del progetto

```
index.html        pagina unica con tutte le viste
css/style.css      stile
js/data.js         dati reali dei 17 borghi (posizioni, colori, vie)
js/app.js          logica dell'app (routing tra viste, preferiti, ricerca, mappa)
borghi-mappa.json  dati grezzi di verifica delle posizioni sulla mappa ufficiale
piano-gusti-digitali.md  piano editoriale e note di raccolta dati
```

## Sviluppo locale

Nessuna build richiesta: apri `index.html` in un browser, oppure servi la cartella con un server statico qualsiasi, ad esempio:

```bash
python -m http.server 8000
```

## Pubblicazione su GitHub Pages

1. Crea un repository su GitHub e collega questa cartella come origin.
2. Push su `main`.
3. Nel repository, vai su **Settings → Pages**, imposta *Source* su `main` branch, cartella `/ (root)`.
4. Il sito sarà pubblicato su `https://<utente>.github.io/<repo>/`.

## Aggiornare i dati reali

Aggiungi gli stand raccolti sul posto in `js/data.js`, nel campo `stands` del borgo corrispondente, ad esempio:

```js
stands: [
  { name: "Nome stand", menu: [{ item: "Piatto", price: 8 }] }
]
```
