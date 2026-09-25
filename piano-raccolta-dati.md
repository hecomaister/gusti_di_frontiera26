# Piano di raccolta dati — menu, prezzi, social (Gusti di Frontiera 2026)

Ricerca fatta il 25 settembre 2026 per capire se esiste un modo automatico (API/scraping) di ottenere menu, prezzi e contenuti social reali per i 17 borghi. Risultato sintetico: **non esiste nessuna API pubblica né un elenco pubblico di stand/menu/prezzi**. Per questo, come richiesto, i dati nell'app restano **hardcoded** in [`js/app.js`](js/app.js) e vanno aggiornati a mano man mano che arrivano dati reali (foto, post, conferme dirette).

---

## 1. Cosa esiste online, fonte per fonte

| Fonte | URL | Cosa c'è | API/scraping possibile? |
|---|---|---|---|
| Sito ufficiale | [gustidifrontiera.it](https://gustidifrontiera.it/) | Info generali, date, orari, PDF linee guida espositori, planimetria (JPG) | Sito statico/CMS semplice, nessun endpoint JSON trovato (`/wp-json/` → 404, nessun `robots.txt`). Solo scraping HTML delle pagine info, nessun dato su menu/prezzi da estrarre |
| Portale espositori | [espositori.gustidifrontiera.it](https://espositori.gustidifrontiera.it/) | Area riservata **con login** per gli espositori | Non accessibile senza credenziali; non nostro da forzare. Se il Comune ci desse un account, potenzialmente lì dentro c'è l'elenco espositori con la loro offerta dichiarata |
| Mappa interattiva regionale | [gustidifrontiera.regione.fvg.it](https://gustidifrontiera.regione.fvg.it/) | Mappa ufficiale, regolamento, contatti emergenza | Nessun endpoint dati esposto visibile lato client in una fetch semplice; andrebbe ispezionata con devtools (rete XHR) per vedere se carica un GeoJSON/JSON per i pin — da verificare a mano nel browser, non via fetch testuale |
| Comune di Gorizia | [comune.gorizia.it](https://www.comune.gorizia.it/it/novita-265178/notizie-265179/gusti-di-frontiera-2026-manifestazione-di-interesse-espositori-322349) | Bando espositori, contatti SUAP (`gusti.frontiera@comune.gorizia.it`), regolamenti PDF | Solo contatto diretto: si può chiedere via email se esiste un file Excel/CSV con l'elenco espositori e l'offerta dichiarata in fase di iscrizione (il piano originale lo suggeriva già, sezione 1.4 di `piano-gusti-digitali.md`) |
| Instagram [@gustidifrontiera](https://www.instagram.com/gustidifrontiera/) | — | Foto/video reali di stand e piatti, ~8.700 follower | Instagram blocca lo scraping non autenticato (contenuto reso via JS, richiede login per la maggior parte dei contenuti). La via pulita è la **Instagram Graph API**, ma richiede che l'account sia un Business/Creator collegato a una Pagina Facebook di cui **siamo amministratori** — non è il nostro caso per la pagina ufficiale dell'evento |
| Facebook [facebook.com/gustidifrontiera](https://www.facebook.com/gustidifrontiera/) | — | Post pubblici, foto stand, aggiornamenti | Stesso discorso: la Graph API per leggere post di una Pagina che non amministriamo è fortemente limitata dal 2018 in poi (Cambridge Analytica / App Review): senza essere admin della pagina, l'unica via pubblica è leggere manualmente i post visibili da browser normale (nessuna chiamata API disponibile lato nostro) |
| Hashtag `#gustidifrontiera2026` | Instagram/TikTok | Foto/video di visitatori con piatti e stand specifici | Nessuna API pubblica per cercare hashtag senza account business + review Meta. Consultazione solo manuale |
| Articoli di stampa locale (girofvg.com, ilgoriziano.it, friuli oggi, nordest24, andreatomasella.com) | vari | Elenco dei 17 borghi confermato, categorie di cibo per borgo (es. Austria → salsicce/gulash/strudel, Balcani → ćevapčići/burek, Oriente → sushi/ramen/curry) | Niente da "chiamare": sono articoli editoriali, si leggono e basta. Utili solo come riferimento generico per popolare piatti plausibili per borgo, **mai per prezzi reali** |

**Conclusione tecnica**: non esiste nessuna API — ufficiale o di terze parti — che restituisca stand/menu/prezzi in formato dati per questo evento. Ogni strada "automatica" o si scontra con un login (portale espositori), o con le restrizioni di Meta sulle Graph API (social), o semplicemente non esiste (sito ufficiale è editoriale, non un database pubblico).

---

## 2. Se in futuro un'API dovesse esistere (o ci venisse data)

Nel caso il Comune ci desse accesso al portale espositori, o pubblicasse un export (CSV/Excel/JSON) dell'elenco iscritti, ecco come lo consumeremmo:

1. **Formato atteso**: quasi certamente un export da un gestionale SUAP → CSV o Excel con colonne tipo `borgo, nome_stand, via, referente, tipologia_offerta`. Difficilmente conterrà già prezzi per piatto (quelli si dichiarano sul posto o su richiesta).
2. **Script di importazione** (`scripts/import-espositori.py`, da scrivere quando/se il file arriva):
   - legge il CSV/Excel con `pandas` o il modulo `csv` di Python,
   - normalizza i nomi dei borghi sulla stessa `id` slug già usata in `js/app.js` (es. `slovenia-balcani`, `truckfood`),
   - genera un blocco JS (`stands: [...]`) da incollare/mergiare a mano in `js/app.js`, così ogni riga resta controllabile prima della pubblicazione (nessun prezzo pubblicato senza revisione umana, come da regola in `piano-gusti-digitali.md` §1.6).
3. **Se in futuro Meta concedesse un token** (perché diventiamo admin della pagina, o l'organizzazione crea un'app con Instagram Graph API per un account di cui abbiamo il controllo): endpoint `GET /{ig-user-id}/media` con `fields=caption,media_url,timestamp` per tirare giù foto/didascalie recenti, poi transcrizione manuale di piatti/prezzi visibili nelle foto (mai fidarsi di un OCR automatico su un prezzo scritto a gessetto: va sempre verificato da un umano, come richiesto).
4. **Mappa interattiva regionale**: se aprendo `gustidifrontiera.regione.fvg.it` nei devtools del browser (tab Network) emerge una chiamata XHR a un JSON/GeoJSON con le coordinate dei borghi, quello sì sarebbe riusabile via semplice `fetch()`/`requests.get()` — è l'unico caso in questa lista dove uno scraping tecnico leggero (non un login, non una API privata) potrebbe dare dati strutturati veri. Da verificare manualmente aprendo la pagina in un browser reale, cosa che uno script headless senza rendering JS non vedrebbe.

## 3. Cosa facciamo adesso (dati hardcoded)

Dato che nessuna fonte automatica è disponibile in tempo utile per l'evento (24–27 settembre, già in corso), i dati restano **hardcoded** in `js/app.js` come esempi chiaramente etichettati (banner "Independent festival guide... the menus and prices shown here are examples until confirmed by each vendor"), con questa gerarchia di aggiornamento — stessa logica già definita in `piano-gusti-digitali.md`:

1. **Sostituzione manuale mano a mano**: quando arrivano foto reali di un chalkboard/menu da chi è fisicamente al festival, si trascrivono a mano nell'array `BORGHI` di `js/app.js` (struttura già pronta, vedi `README.md` → "Aggiornare i dati reali").
2. **Verifica incrociata con la stampa locale**: gli articoli elencati in tabella confermano nomi dei 17 borghi e categorie di piatti plausibili per borgo — utile per non inventare piatti "a caso" quando si scrive un placeholder, ma **mai come fonte di un prezzo specifico**.
3. **Nessuno scraping automatico dei social**: dato il blocco di Meta sulle Graph API per pagine di cui non siamo admin, e che lo scraping non autenticato di Instagram/Facebook viola i loro Termini di Servizio, non lo facciamo. L'unica via è consultare manualmente i post pubblici (browser normale) e, se si vuole ripubblicare una foto di un visitatore, chiedere il permesso all'autore prima (come da §1.5 di `piano-gusti-digitali.md`).
4. **Contatto diretto con l'organizzazione** resta la via più veloce per un dataset iniziale completo: scrivere a `gusti.frontiera@comune.gorizia.it` o `gustidifrontiera2026@gmail.com` chiedendo se esiste un export espositori da condividere.

## 4bis. Aggiornamento del 25 settembre 2026 — dati pubblici trovati e applicati

Nuova ricerca mirata su stampa locale (Il Piccolo, Friuli Oggi, Nordest24, girofvg.com) ha confermato **categorie di piatti reali per borgo** (non prezzi — nessuno pubblicato da nessuna fonte), che sono stati usati per rendere più accurati i menu di esempio in `js/app.js`:

- **Borgo Mare**: confermato che è l'unico borgo riservato esclusivamente a piatti di pesce — descrizione aggiornata di conseguenza.
- **Borgo Austria**: aggiunta di pretzel e canederli (dumplings), oltre a salsicce e strudel già presenti.
- **Borgo Africa**: la stampa lo descrive come Maghreb **e** Africa sub-sahariana — aggiunto uno stand "Marrakech Tajine" (tajine, couscous, tè alla menta) accanto a quelli già presenti di cucina dell'Africa occidentale.
- **Borgo Oriente**: la stampa cita esplicitamente sushi, ramen, curry — aggiunto uno stand sushi/curry e trasformato "noodles" in ramen.
- **Borgo Latino Americano**: la stampa cita esplicitamente empanadas **e churrasco** — aggiunto uno stand di grigliata argentina.
- **Borgo Francia**: la stampa cita esplicitamente crêpes, formaggi **e ostriche** — aggiunto uno stand di ostriche.
- **Borgo Slovenia e Penisola Balcanica**: la stampa cita esplicitamente "ćevapčići alla pljeskavica" — aggiunta la pljeskavica come piatto separato dai ćevapi.
- **Borgo Americhe**: la stampa cita esplicitamente "tex-mex" — sostituito il bagel (non menzionato da nessuna fonte) con nachos tex-mex.

**Importante**: i **prezzi restano stime plausibili non verificate**, perché nessuna fonte pubblica (sito ufficiale, Comune, stampa, social) pubblica un prezzo specifico per un piatto specifico di quest'edizione. Il banner "examples until confirmed by each vendor" nell'app resta quindi corretto e necessario.

Un articolo de *Il Piccolo* (["ecco la mappa della kermesse 2026"](https://www.ilpiccolo.it/cronaca/gusti-frontiera-gorizia-ecco-mappa-2026-tx1s1g4o)) e *Nordest24* riportano alcune vie leggermente diverse da quelle tracciate a mano sull'immagine ufficiale in `borghi-mappa.json` (es. Borgo Austria in Piazza Cesare Battisti secondo la stampa, Via Cadorna secondo il tracciamento pixel del PDF ufficiale; Borgo Francia in Corso Verdi secondo la stampa, Via Morelli secondo il tracciamento). **Non ho spostato i pin sulla mappa** per questa discrepanza: il tracciamento pixel resta la fonte più affidabile per la posizione esatta finché non viene confermata sul posto, ma vale la pena una verifica de visu quando qualcuno sarà fisicamente al festival.

## 5. Prossimi passi concreti

- [ ] Aprire `gustidifrontiera.regione.fvg.it` in un browser reale con devtools aperti (tab Network → XHR/Fetch) per verificare se la mappa carica un JSON/GeoJSON pubblico con le coordinate dei borghi — se sì, è l'unico dato "agganciabile" tecnicamente oggi.
- [ ] Inviare una email a `gusti.frontiera@comune.gorizia.it` chiedendo un export dell'elenco espositori (anche solo nome stand + borgo + tipologia offerta, senza prezzi).
- [ ] Continuare la raccolta manuale sul posto (persona con smartphone, vedi `piano-gusti-digitali.md` §1.1) come unica fonte affidabile per prezzi reali.
- [ ] Aggiornare `js/app.js` un borgo/stand alla volta, mantenendo il banner "esempi" finché non tutti i borghi hanno dati verificati.
