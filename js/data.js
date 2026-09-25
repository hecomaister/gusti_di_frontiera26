/* Gusti di Frontiera 2026 — dati reali borghi (da borghi-mappa.json).
   Le informazioni su stand/menu/prezzi vengono aggiunte SOLO quando sono verificate
   sul posto o fornite dall'organizzazione. Finché non arrivano, ogni borgo mostra
   onestamente "Menu in arrivo" — mai prezzi inventati. */

const BORGHI = [
  { num: 1,  name: "Borgo Italia",                       street: "Via Garibaldi / Corso Italia",          color: "#95c997", x: 60.5, y: 78.5, confidence: "high",   stands: [] },
  { num: 2,  name: "Mercatino di Gusti",                 street: "Piazza Battisti",                        color: "#f7b99d", x: 54.1, y: 61.6, confidence: "medium", stands: [] },
  { num: 3,  name: "Borgo Austria",                      street: "Via Cadorna",                             color: "#a19fc5", x: 57.4, y: 36.5, confidence: "high",   stands: [] },
  { num: 4,  name: "Borgo Americhe",                     street: "Via Cadorna (presso Giardini Pubblici)",  color: "#da090a", x: 57.3, y: 45.4, confidence: "high",   stands: [] },
  { num: 5,  name: "Borgo Mare",                         street: "Via Boccaccio",                           color: "#0aa051", x: 66.5, y: 38.5, confidence: "high",   stands: [] },
  { num: 6,  name: "Borgo Australia",                    street: "Via Santa Chiara (angolo Via Brass)",     color: "#bc5455", x: 66.0, y: 26.7, confidence: "medium", stands: [] },
  { num: 7,  name: "Borgo Africa",                       street: "Via Brass (angolo Via Santa Chiara)",     color: "#74b3e1", x: 67.9, y: 26.3, confidence: "medium", stands: [] },
  { num: 8,  name: "Borgo Oriente",                      street: "Via Santa Chiara / Via Boccaccio",        color: "#ee9610", x: 71.4, y: 37.4, confidence: "high",   stands: [] },
  { num: 9,  name: "Borgo Latino Americano",              street: "Via Cadorna",                             color: "#99639c", x: 61.3, y: 31.5, confidence: "medium", stands: [] },
  { num: 10, name: "Borgo Francia",                       street: "Via Morelli",                             color: "#b98741", x: 69.2, y: 50.2, confidence: "medium", stands: [] },
  { num: 11, name: "Borgo TruckFood",                     street: "Corso Verdi / Via Oberdan",               color: "#e24552", x: 72.4, y: 44.6, confidence: "high",   stands: [] },
  { num: 12, name: "Borgo Nord Europa",                   street: "Via Roma",                                color: "#9ab70c", x: 81.5, y: 54.2, confidence: "medium", stands: [] },
  { num: 13, name: "Borgo Europa Centrale",               street: "Via Roma (presso Via Morelli)",           color: "#b3b8a4", x: 76.3, y: 48.6, confidence: "medium", stands: [] },
  { num: 14, name: "Borgo Associazioni",                  street: "Via Crispi",                              color: "#90d2e4", x: 72.5, y: 65.1, confidence: "medium", stands: [] },
  { num: 15, name: "Borgo FVG",                           street: "Piazza Municipio",                        color: "#c2804a", x: 66.8, y: 91.4, confidence: "high",   stands: [] },
  { num: 16, name: "Borgo Slovenia e Penisola Balcanica",  street: "Via De Gasperi (presso Piazza Municipio)", color: "#db548b", x: 68.1, y: 82.3, confidence: "medium", stands: [] },
  { num: 17, name: "Borgo Borderless",                     street: "Piazza Transalpina",                     color: "#07a7a3", x: 91.6, y: 19.8, confidence: "high",   stands: [] },
];

const SERVIZI = [
  { type: "infopoint",      label: "Info point",                              icon: "ℹ️" },
  { type: "primo_soccorso", label: "Primo soccorso",  x: 72.3, y: 62.5,       icon: "➕" },
  { type: "wc",             label: "Servizi igienici",                        icon: "🚻" },
  { type: "parcheggio",     label: "Parcheggi",                               icon: "🅿️" },
  { type: "area_camper",    label: "Area camper",                             icon: "🚐" },
  { type: "trenino",        label: "Trenino turistico Gorizia-Nova Gorica",   x: 79.8, y: 34.8, icon: "🚂" },
  { type: "mobility",       label: "Servizio mobilità gratuito · 348 662 3013", icon: "☎️" },
  { type: "emergenza",      label: "Numero unico emergenze · 112",            icon: "🚨" },
];
