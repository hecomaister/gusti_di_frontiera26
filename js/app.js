(function(){
  "use strict";

  var ICONS = {
    grill:'&#127831;', soup:'&#127860;', sweet:'&#127843;', drink:'&#127866;',
    bread:'&#129360;', wrap:'&#127837;', rice:'&#127834;', skewer:'&#129381;'
  };

  function gmaps(query){
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  // Real, publicly confirmed festival-wide opening hours (Comune di Gorizia press
  // materials): Thu 24 Sep 12:00-01:00, Fri 25 & Sat 26 Sep 10:30-03:00,
  // Sun 27 Sep 10:30-24:00. No individual stand ever publishes its own separate
  // hours, so every stand follows this same schedule — a hardcoded true/false
  // per stand would just be a guess dressed up as data. "Open now" below is
  // computed live against these real windows instead.
  var FESTIVAL_HOURS_LABEL = 'Gio 12:00&ndash;01:00 &middot; Ven&ndash;Sab 10:30&ndash;03:00 &middot; Dom 10:30&ndash;24:00';
  var FESTIVAL_WINDOWS = [
    ['2026-09-24T12:00:00+02:00', '2026-09-25T01:00:00+02:00'],
    ['2026-09-25T10:30:00+02:00', '2026-09-26T03:00:00+02:00'],
    ['2026-09-26T10:30:00+02:00', '2026-09-27T03:00:00+02:00'],
    ['2026-09-27T10:30:00+02:00', '2026-09-28T00:00:00+02:00']
  ];
  function isFestivalOpenNow(){
    var now = Date.now();
    return FESTIVAL_WINDOWS.some(function(w){
      return now >= new Date(w[0]).getTime() && now < new Date(w[1]).getTime();
    });
  }

  // Numbers, colors and street locations below match the OFFICIAL festival map exactly (borghi 1–17).
  // Official borgo names are kept in Italian (as printed on the real map) for on-site wayfinding; everything else is in English.
  var BORGHI = [
    { num:1, id:'italia', name:'Borgo Italia', country:'Italy', flag:'&#127470;&#127481;', color:'#95c997',
      desc:'Regional Italian specialities, from pasta to cured meats.', loc:'Via Garibaldi / Corso Italia', mapx:60.5, mapy:78.5,
      stands:[
        { id:'sapori-italia', name:"Sapori d'Italia", hours:FESTIVAL_HOURS_LABEL, loc:'Via Garibaldi',
          items:[
            {name:'Tagliatelle al rag&ugrave;', desc:'Fresh handmade pasta', price:7, tags:[], icon:'wrap'},
            {name:'Cured meats & cheese board', desc:'Regional selection', price:8, tags:[], icon:'grill'},
            {name:'Tiramis&ugrave;', desc:'Classic recipe', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:2, id:'mercatino', name:'Mercatino di Gusti', country:'Local products', flag:'&#127811;', color:'#f7b99d',
      desc:'A small market of local specialities from around the world.', loc:'Piazza Battisti', mapx:54.1, mapy:61.6,
      stands:[
        { id:'mercatino-corner', name:'Mercatino Corner', hours:FESTIVAL_HOURS_LABEL, loc:'Piazza Battisti',
          items:[
            {name:'Mixed street food tasting', desc:'Rotating selection', price:6, tags:[], icon:'wrap'},
            {name:'Local jams & honey', desc:'Take-away jar', price:5, tags:['veg','vegan'], icon:'sweet'},
            {name:'Fresh fruit juice', desc:'Freshly squeezed', price:3, tags:['vegan'], icon:'drink'}
          ]}
      ]},
    { num:3, id:'austria', name:'Borgo Austria', country:'Austria', flag:'&#127462;&#127481;', color:'#a19fc5',
      desc:'Grilled sausages, pretzels, canederli and Viennese pastries.', loc:'Via Cadorna', mapx:57.4, mapy:36.5,
      stands:[
        { id:'wien-imbiss', name:'Wien Imbiss', hours:FESTIVAL_HOURS_LABEL, loc:'Via Cadorna',
          items:[
            {name:'Mixed sausages', desc:'With mustard and sauerkraut', price:6, tags:[], icon:'grill'},
            {name:'Bavarian pretzel', desc:'Soft-baked, coarse salt', price:4, tags:['veg'], icon:'bread'},
            {name:'Canederli in brodo', desc:'Bread dumplings in broth', price:6, tags:['veg'], icon:'soup'},
            {name:'Apfelstrudel', desc:'Apple strudel with vanilla cream', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:4, id:'americhe', name:'Borgo Americhe', country:'USA &middot; Canada', flag:'&#127482;&#127480;', color:'#da090a',
      desc:'Burgers, Tex-Mex and grilled North American favourites.', loc:'Via Cadorna (near Giardini Pubblici)', mapx:57.3, mapy:45.4,
      stands:[
        { id:'route66', name:'Route 66 Diner', hours:FESTIVAL_HOURS_LABEL, loc:'Via Cadorna',
          items:[
            {name:'Classic cheeseburger', desc:'With fries', price:8, tags:[], icon:'grill'},
            {name:'Loaded nachos', desc:'Tex-Mex style, cheese and jalapeños', price:6, tags:['veg'], icon:'wrap'},
            {name:'Cheesecake', desc:'Slice with berry coulis', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:5, id:'mare', name:'Borgo Mare', country:'Seafood', flag:'&#127859;', color:'#0aa051',
      desc:'Exclusively fish and seafood dishes — the only borgo reserved for it.', loc:'Via Boccaccio', mapx:66.5, mapy:38.5,
      stands:[
        { id:'mare-nostrum', name:'Mare Nostrum', hours:FESTIVAL_HOURS_LABEL, loc:'Via Boccaccio',
          items:[
            {name:'Mixed fried fish', desc:'Assorted fried small fish', price:9, tags:[], icon:'grill'},
            {name:'Octopus sandwich', desc:'Grilled octopus', price:7, tags:[], icon:'wrap'},
            {name:'Mussels marinara', desc:'With toasted bread', price:7, tags:[], icon:'soup'}
          ]}
      ]},
    { num:6, id:'australia', name:'Borgo Australia', country:'Oceania', flag:'&#127462;&#127482;', color:'#bc5455',
      desc:"Street food from the other side of the world: grilled meats, damper bread and iconic sweets.", loc:'Via Santa Chiara (corner of Via Brass)', mapx:66.0, mapy:26.7,
      stands:[
        { id:'outback-grill', name:'Outback Grill', hours:FESTIVAL_HOURS_LABEL, loc:'Via Brass',
          items:[
            {name:'Kangaroo burger', desc:'Grilled kangaroo burger', price:8, tags:[], icon:'grill'},
            {name:'Meat pie', desc:'Classic meat-filled savoury pie', price:5, tags:[], icon:'wrap'},
            {name:'Lamington', desc:'Sponge cake with chocolate and coconut', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'barbie-bar', name:'Barbie Bar', hours:FESTIVAL_HOURS_LABEL, loc:'Via Brass',
          items:[
            {name:'BBQ ribs', desc:'Marinated ribs, slow-cooked over coals', price:10, tags:[], icon:'grill'},
            {name:'Damper bread', desc:'Traditional Australian campfire bread', price:3, tags:['veg'], icon:'bread'},
            {name:'Tim Tam shake', desc:'Chocolate-biscuit milkshake', price:4, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:7, id:'africa', name:'Borgo Africa', country:'Maghreb &middot; West Africa', flag:'&#127463;&#127465;', color:'#74b3e1',
      desc:'Couscous, tajine and spiced grills from the Maghreb and sub-Saharan Africa.', loc:'Via Brass (corner of Via Santa Chiara)', mapx:67.9, mapy:26.3,
      stands:[
        { id:'marrakech-tajine', name:'Marrakech Tajine', hours:FESTIVAL_HOURS_LABEL, loc:'Via Brass',
          items:[
            {name:'Lamb tajine', desc:'Slow-cooked with dried apricots and almonds', price:9, tags:['gluten-free'], icon:'soup'},
            {name:'Vegetable couscous', desc:'Couscous with seasonal vegetables', price:6, tags:['vegan'], icon:'rice'},
            {name:'Mint tea', desc:'Served hot and sweetened', price:2, tags:['vegan'], icon:'drink'}
          ]},
        { id:'sahel-kitchen', name:'Sahel Kitchen', hours:FESTIVAL_HOURS_LABEL, loc:'Via Brass',
          items:[
            {name:'Chicken yassa', desc:'Senegalese-style, marinated in lemon and onion', price:7, tags:['gluten-free'], icon:'grill'},
            {name:'Jollof rice', desc:'Spiced tomato rice', price:5, tags:['vegan'], icon:'rice'},
            {name:'Beignet', desc:'Sugared fritters', price:2, tags:['veg'], icon:'sweet'}
          ]},
        { id:'savana-grill', name:'Savana Grill', hours:FESTIVAL_HOURS_LABEL, loc:'Via Brass',
          items:[
            {name:'Spicy skewers', desc:'Suya marinade, roasted peanuts', price:6, tags:[], icon:'skewer'},
            {name:'Vegetable couscous', desc:'Couscous with seasonal vegetables', price:5, tags:['vegan'], icon:'rice'},
            {name:'Mint tea', desc:'Served hot and sweetened', price:2, tags:['vegan'], icon:'drink'}
          ]}
      ]},
    { num:8, id:'oriente', name:'Borgo Oriente', country:'Middle East &middot; Asia', flag:'&#127826;', color:'#ee9610',
      desc:'Sushi, ramen, curry, steamed dumplings and Middle Eastern specialities.', loc:'Via Santa Chiara / Via Boccaccio', mapx:71.4, mapy:37.4,
      stands:[
        { id:'shawarma-house', name:'Shawarma House', hours:FESTIVAL_HOURS_LABEL, loc:'Via Santa Chiara',
          items:[
            {name:'Chicken shawarma', desc:'Flatbread, yoghurt and tahini sauces', price:6, tags:[], icon:'wrap'},
            {name:'Hummus & pita', desc:'With oil and paprika', price:4, tags:['vegan'], icon:'soup'},
            {name:'Pistachio baklava', desc:'Sweet pastry, crushed pistachios', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'noodle-corner', name:'Noodle Corner', hours:FESTIVAL_HOURS_LABEL, loc:'Via Santa Chiara',
          items:[
            {name:'Chicken ramen', desc:'Noodle soup, soft egg, spring onion', price:8, tags:[], icon:'soup'},
            {name:'Gyoza (6 pcs)', desc:'Filled steamed dumplings', price:5, tags:[], icon:'wrap'},
            {name:'Jasmine tea', desc:'Served hot', price:2, tags:['vegan'], icon:'drink'}
          ]},
        { id:'sakura-sushi', name:'Sakura Sushi & Curry', hours:FESTIVAL_HOURS_LABEL, loc:'Via Boccaccio',
          items:[
            {name:'Mixed sushi platter (8 pcs)', desc:'Nigiri and maki selection', price:9, tags:['gluten-free'], icon:'rice'},
            {name:'Chicken katsu curry', desc:'Breaded chicken, rice, curry sauce', price:8, tags:[], icon:'wrap'},
            {name:'Edamame', desc:'Steamed and salted soybeans', price:3, tags:['vegan','gluten-free'], icon:'soup'}
          ]}
      ]},
    { num:9, id:'latinoamericano', name:'Borgo Latino Americano', country:'Mexico &middot; Argentina', flag:'&#127765;', color:'#99639c',
      desc:'From Mexico to Patagonia: tacos, empanadas and churrasco.', loc:'Via Cadorna', mapx:61.3, mapy:31.5,
      stands:[
        { id:'taqueria-frontera', name:'Taquer&iacute;a Frontera', hours:FESTIVAL_HOURS_LABEL, loc:'Via Cadorna',
          items:[
            {name:'Al pastor tacos (3 pcs)', desc:'Marinated pork, pineapple, coriander', price:6, tags:[], icon:'wrap'},
            {name:'Empanadas (2 pcs)', desc:'Filled with hand-cut meat', price:5, tags:[], icon:'wrap'},
            {name:'Churros', desc:'With hot chocolate', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'gaucho-grill', name:'Gaucho Grill', hours:FESTIVAL_HOURS_LABEL, loc:'Via Cadorna',
          items:[
            {name:'Churrasco skewer', desc:'Argentine-style grilled beef', price:8, tags:['gluten-free'], icon:'skewer'},
            {name:'Chimichurri bread', desc:'Toasted bread with chimichurri sauce', price:3, tags:['vegan'], icon:'bread'},
            {name:'Dulce de leche pancake', desc:'Folded pancake with caramel filling', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:10, id:'francia', name:'Borgo Francia', country:'France', flag:'&#127467;&#127479;', color:'#b98741',
      desc:'Cr&ecirc;pes, cheeses, oysters and French sweets.', loc:'Via Morelli', mapx:69.2, mapy:50.2,
      stands:[
        { id:'creperie-nice', name:'Cr&ecirc;perie Nice', hours:FESTIVAL_HOURS_LABEL, loc:'Via Morelli',
          items:[
            {name:'Cheese cr&ecirc;pe', desc:'Melted cheese and ham', price:6, tags:[], icon:'wrap'},
            {name:'Nutella cr&ecirc;pe', desc:'Classic sweet cr&ecirc;pe', price:4, tags:['veg'], icon:'sweet'},
            {name:'Mulled wine', desc:'Hot spiced wine', price:3, tags:['veg'], icon:'drink'}
          ]},
        { id:'huitres-bar', name:'Hu&icirc;tres Bar', hours:FESTIVAL_HOURS_LABEL, loc:'Via Morelli',
          items:[
            {name:'Fresh oysters (6 pcs)', desc:'Served with lemon and shallot vinegar', price:9, tags:['gluten-free'], icon:'soup'},
            {name:'French cheese board', desc:'Brie, comt&eacute; and camembert', price:7, tags:['veg'], icon:'grill'},
            {name:'Glass of white wine', desc:'Chilled, dry white', price:4, tags:['veg','vegan'], icon:'drink'}
          ]}
      ]},
    { num:11, id:'truckfood', name:'Borgo TruckFood', country:'Street food on wheels', flag:'&#128666;', color:'#e24552',
      desc:'Street food on wheels: gourmet sandwiches and fried treats.', loc:'Corso Verdi / Via Oberdan', mapx:72.4, mapy:44.6,
      stands:[
        { id:'truck-11', name:'Truck 11', hours:FESTIVAL_HOURS_LABEL, loc:'Corso Verdi / Via Oberdan',
          items:[
            {name:'Grilled gourmet sandwich', desc:'With house sauces', price:7, tags:[], icon:'grill'},
            {name:'Hand-cut fries', desc:'Hand cut', price:4, tags:['veg'], icon:'wrap'},
            {name:'Milkshake', desc:'Mixed flavours', price:4, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:12, id:'nordeuropa', name:'Borgo Nord Europa', country:'Scandinavia', flag:'&#127465;&#127472;', color:'#9ab70c',
      desc:'Salmon, cinnamon and Nordic specialities.', loc:'Via Roma', mapx:81.5, mapy:54.2,
      stands:[
        { id:'fjord-kitchen', name:'Fjord Kitchen', hours:FESTIVAL_HOURS_LABEL, loc:'Via Roma',
          items:[
            {name:'Cured salmon', desc:'On rye bread with mustard and dill', price:8, tags:['gluten-free'], icon:'grill'},
            {name:'Kanelbullar', desc:'Cinnamon roll', price:3, tags:['veg'], icon:'sweet'},
            {name:'Gl&ouml;gg', desc:'Nordic hot spiced wine', price:4, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:13, id:'europacentrale', name:'Borgo Europa Centrale', country:'Central Europe', flag:'&#127462;&#127481;', color:'#b3b8a4',
      desc:'Goulash, dumplings and Central European specialities.', loc:'Via Roma (near Via Morelli)', mapx:76.3, mapy:48.6,
      stands:[
        { id:'mitteleuropa-kitchen', name:'Mitteleuropa Kitchen', hours:FESTIVAL_HOURS_LABEL, loc:'Via Roma',
          items:[
            {name:'Speck dumplings', desc:'In broth or plain', price:6, tags:[], icon:'soup'},
            {name:'Goulash with bread', desc:'Spiced beef stew', price:8, tags:[], icon:'soup'},
            {name:'Strudel', desc:'Apple, with cream', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:14, id:'associazioni', name:'Borgo Associazioni', country:'Local community', flag:'&#129309;', color:'#90d2e4',
      desc:'Stands run by local community associations.', loc:'Via Crispi', mapx:72.5, mapy:65.1,
      stands:[
        { id:'associazione-solidale', name:'Associazione Solidale', hours:FESTIVAL_HOURS_LABEL, loc:'Via Crispi',
          items:[
            {name:'Traditional Gorizia dish', desc:'Local recipe', price:7, tags:[], icon:'soup'},
            {name:'Homemade dessert', desc:'Rotating recipe', price:3, tags:['veg'], icon:'sweet'},
            {name:'House wine (glass)', desc:'Local selection', price:3, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:15, id:'fvg', name:'Borgo FVG', country:'Friuli Venezia Giulia', flag:'&#127470;&#127481;', color:'#c2804a',
      desc:'The flavours of Friuli Venezia Giulia, from prosciutto to frico.', loc:'Piazza Municipio', mapx:66.8, mapy:91.4,
      stands:[
        { id:'sapori-friuli', name:'Sapori del Friuli', hours:FESTIVAL_HOURS_LABEL, loc:'Piazza Municipio',
          items:[
            {name:'Frico with polenta', desc:'Crispy cheese and potatoes', price:8, tags:['veg','gluten-free'], icon:'grill'},
            {name:'San Daniele prosciutto board', desc:'Long-aged', price:9, tags:['gluten-free'], icon:'grill'},
            {name:'Gubana', desc:'Traditional rolled pastry', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:16, id:'slovenia-balcani', name:'Borgo Slovenia e Penisola Balcanica', country:'Slovenia &middot; Balkans', flag:'&#127480;&#127470;', color:'#db548b',
      desc:'The Slovenian-Balkan village: &scaron;truklji, &#263;evapi and Collio wines.', loc:'Via De Gasperi (near Piazza Municipio)', mapx:68.1, mapy:82.3,
      stands:[
        { id:'gostilna-vas', name:'Gostilna Vas', hours:FESTIVAL_HOURS_LABEL, loc:'Via Crispi / Via De Gasperi',
          items:[
            {name:'&Scaron;truklji', desc:'Filled pastry roll, savoury version', price:5, tags:['veg'], icon:'wrap'},
            {name:'Jota', desc:'Bean, sauerkraut and potato soup', price:6, tags:['veg'], icon:'soup'},
            {name:'Potica', desc:'Rolled walnut pastry', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'cevapi-sarajevo', name:'&#262;evapi Sarajevo', hours:FESTIVAL_HOURS_LABEL, loc:'Via Crispi / Via De Gasperi',
          items:[
            {name:'&#262;evapi (5 pcs)', desc:'Grilled mixed-meat rolls, raw onion', price:7, tags:[], icon:'grill'},
            {name:'Pljeskavica', desc:'Grilled mixed-meat patty, kajmak and ajvar', price:7, tags:[], icon:'grill'},
            {name:'Meat burek', desc:'Filled pastry, freshly baked', price:4, tags:[], icon:'wrap'},
            {name:'Baklava', desc:'Pastry, walnuts and honey', price:3, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:17, id:'borderless', name:'Borgo Borderless', country:'Fusion cuisine', flag:'&#127760;', color:'#07a7a3',
      desc:'Borderless fusion cuisine, at Piazza Transalpina.', loc:'Piazza Transalpina', mapx:91.6, mapy:19.8,
      stands:[
        { id:'fusion-lab', name:'Fusion Lab', hours:FESTIVAL_HOURS_LABEL, loc:'Piazza Transalpina',
          items:[
            {name:'Kimchi taco', desc:'Mexican taco with Korean kimchi', price:6, tags:[], icon:'wrap'},
            {name:'Ramen burger', desc:'Burger with noodle-cake buns instead of bread', price:8, tags:[], icon:'grill'},
            {name:'Matcha tea gelato', desc:'Artisan gelato', price:4, tags:['veg','gluten-free'], icon:'sweet'}
          ]}
      ]}
  ];

  var LANDMARKS = [
    {name:'Gorizia Castle (Borgo Castello)', query:'Castello di Gorizia'},
    {name:'Piazza della Vittoria', query:'Piazza della Vittoria Gorizia'},
    {name:'Promoturismo FVG stand', query:'Piazza della Vittoria Gorizia'},
    {name:'DAG entrance (Bombi Gallery)', query:'Gallerie Bombi Gorizia'},
    {name:'Piazza Transalpina (Gorizia–Nova Gorica border)', query:'Piazza Transalpina'},
    {name:'Train station', query:'Stazione di Gorizia Centrale'}
  ];

  var DIET_LABELS = {veg:'Vegetarian', vegan:'Vegan', 'gluten-free':'Gluten-free'};

  var CURRENT_DISH_PHOTOS = [];
  var ALL_ITEMS = [];
  BORGHI.forEach(function(b){
    b.stands.forEach(function(s){
      s.items.forEach(function(it){
        ALL_ITEMS.push({item:it, stand:s, borgo:b});
      });
    });
  });

  var state = {
    view:'home', borgoId:null, standId:null,
    savedIds: loadSaved(), search:'', priceFilter:null, dietFilter:null, borgoFilters:[]
  };

  function loadSaved(){ try{ var r=localStorage.getItem('gd_saved'); return r?JSON.parse(r):[]; }catch(e){ return []; } }
  function persistSaved(){ try{ localStorage.setItem('gd_saved', JSON.stringify(state.savedIds)); }catch(e){} }

  function findBorgo(id){ return BORGHI.filter(function(b){return b.id===id;})[0]; }
  function findStand(bId,sId){ var b=findBorgo(bId); return b ? b.stands.filter(function(s){return s.id===sId;})[0] : null; }
  function priceRange(stand){
    var p = stand.items.map(function(i){return i.price;});
    return '&euro;' + Math.min.apply(null,p) + '&ndash;' + Math.max.apply(null,p);
  }

  // Only images we actually have the rights to use. Real visitor photos on Google Maps
  // are uploaded by individual contributors and are not ours to copy/rehost here —
  // the Photos tab links out to the official Google Maps listing for those instead.
  // The photos below were supplied directly for this app, taken on site at the festival.
  // One illustrative photo per dish, keyed by the exact dish name string used in
  // BORGHI below. Sourced from Openverse (openverse.org) — a Creative Commons
  // search engine — never scraped from a plain Google Images search, since
  // those results are almost entirely photos under full copyright with no
  // licence for reuse. Every entry here keeps its required CC attribution and
  // a link back to the original. A dish with no confident, clearly-matching
  // licensed photo simply has no entry — never a mismatched or misleading one.
  var DISH_PHOTOS = {
    'Tagliatelle al rag&ugrave;': { src:'assets/dishes/tagliatelle-al-ragu.jpg', credit:'&ldquo;Trattoria del Moro - Dinner&rdquo; by BrownGuacamole', license:'CC BY-ND 2.0', source:'https://www.flickr.com/photos/20688578@N00/2671843433' },
    'Cured meats & cheese board': { src:'assets/dishes/cured-meats-cheese-board.jpg', credit:'&ldquo;charcuterie plate&rdquo; by gorgeoux', license:'CC BY-NC-SA 2.0', source:'https://www.flickr.com/photos/77597743@N00/2377583635' },
    'Tiramis&ugrave;': { src:'assets/dishes/tiramisu.jpg', credit:'&ldquo;Tiramisu Dessert&rdquo; by Michal Kulesza', license:'CC0 1.0', source:'https://stocksnap.io/photo/tiramisu-dessert-32X9HJRG2N' },
    'Mixed street food tasting': { src:'assets/dishes/mixed-street-food-tasting.jpg', credit:'&ldquo;Spicy Chicken with Handmade Noodles&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/4408727440' },
    'Local jams & honey': { src:'assets/dishes/local-jams-honey.jpg', credit:'&ldquo;Honey Show 2&rdquo; by Vicky Brock', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/43881438@N00/225555649' },
    'Fresh fruit juice': { src:'assets/dishes/fresh-fruit-juice.jpg', credit:'Photo by Flavio~', license:'CC BY 2.0', source:'https://www.flickr.com/photos/37873897@N06/5105184060' },
    'Mixed sausages': { src:'assets/dishes/mixed-sausages.jpg', credit:'&ldquo;Hot Dogs on a Bun&rdquo; by TheBusyBrain', license:'CC BY 2.0', source:'https://www.flickr.com/photos/26176646@N04/2632651360' },
    'Bavarian pretzel': { src:'assets/dishes/bavarian-pretzel.jpg', credit:'Photo by gruntzooki', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/37996580417@N01/37735661405' },
    'Apfelstrudel': { src:'assets/dishes/apfelstrudel.jpg', credit:'&ldquo;Apple Strudel, Beef Pie, Coffee, Tea&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/4295379468' },
    'Classic cheeseburger': { src:'assets/dishes/classic-cheeseburger.jpg', credit:'&ldquo;Cheeseburger and Fries&rdquo; by powerplantop', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/40726522@N02/5187810061' },
    'Loaded nachos': { src:'assets/dishes/loaded-nachos.jpg', credit:'&ldquo;Eat Real Festival 2018&rdquo; by Thomas Hawk', license:'CC BY-NC 2.0', source:'https://www.flickr.com/photos/51035555243@N01/44720907691' },
    'Cheesecake': { src:'assets/dishes/cheesecake.jpg', credit:'&ldquo;Vegan Pumpkin Cheesecake Slice&rdquo; by tomatoes and friends', license:'CC BY 2.0', source:'https://www.flickr.com/photos/49845772@N03/7057275773' },
    'Mixed fried fish': { src:'assets/dishes/mixed-fried-fish.jpg', credit:'&ldquo;fried fish platter&rdquo; by u m a m i', license:'CC BY-NC 2.0', source:'https://www.flickr.com/photos/95842339@N00/3115539581' },
    'Octopus sandwich': { src:'assets/dishes/octopus-sandwich.jpg', credit:'&ldquo;Greek Dish - Octopus Pita&rdquo; by TheBusyBrain', license:'CC BY 2.0', source:'https://www.flickr.com/photos/26176646@N04/2853800380' },
    'Mussels marinara': { src:'assets/dishes/mussels-marinara.jpg', credit:'Photo by Galveston.com', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/22922790@N06/6856641989' },
    'Kangaroo burger': { src:'assets/dishes/kangaroo-burger.jpg', credit:'&ldquo;kangaroo burgers&rdquo; by Phil Denton', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/37475039@N04/6111133858' },
    'Meat pie': { src:'assets/dishes/meat-pie.jpg', credit:'&ldquo;A Bloody Good Australian Meat Pie&rdquo; by WestonEyes', license:'CC BY 2.0', source:'https://www.flickr.com/photos/130719407@N02/18727968000' },
    'Lamington': { src:'assets/dishes/lamington.jpg', credit:'&ldquo;Lamington Cake&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/179695927' },
    'BBQ ribs': { src:'assets/dishes/bbq-ribs.jpg', credit:'&ldquo;Aunty Linda&rsquo;s BBQ Pork Ribs&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/2307432906' },
    'Damper bread': { src:'assets/dishes/damper-bread.jpg', credit:'Photo by Memarkyb', license:'CC BY 2.0', source:'https://www.flickr.com/photos/117415483@N02/27010662424' },
    'Tim Tam shake': { src:'assets/dishes/tim-tam-shake.jpg', credit:'&ldquo;Chocolate Milkshake&rdquo; by Svadilfari', license:'CC BY-ND 2.0', source:'https://www.flickr.com/photos/22280677@N07/3304202465' },
    'Lamb tajine': { src:'assets/dishes/lamb-tajine.jpg', credit:'&ldquo;Vegetable Tajine&rdquo; by 16:9clue', license:'CC BY 2.0', source:'https://www.flickr.com/photos/53255320@N07/5342012559' },
    'Vegetable couscous': { src:'assets/dishes/vegetable-couscous.jpg', credit:'&ldquo;Chicken & Vegetables Couscous&rdquo; by wEnDaLicious', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/25597828@N00/4686608157' },
    'Mint tea': { src:'assets/dishes/mint-tea.jpg', credit:'&ldquo;Moroccan Mint Tea&rdquo; by simon_music', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/28878339@N00/6869050698' },
    'Jollof rice': { src:'assets/dishes/jollof-rice.jpg', credit:'&ldquo;Jollof Rice&rdquo; by secretlondon123', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/25834786@N03/3013516170' },
    'Beignet': { src:'assets/dishes/beignet.jpg', credit:'&ldquo;Caf&eacute; du Monde - Beignets&rdquo; by wallyg', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/70323761@N00/2469780708' },
    'Spicy skewers': { src:'assets/dishes/spicy-skewers.jpg', credit:'&ldquo;Grilling kebab skewers&rdquo; by PersonalCreations.com', license:'CC BY 2.0', source:'https://www.flickr.com/photos/127294011@N07/14888757030' },
    'Chicken shawarma': { src:'assets/dishes/chicken-shawarma.jpg', credit:'&ldquo;Chicken Shawafal&rdquo; by Laissez Fare', license:'CC BY-NC 2.0', source:'https://www.flickr.com/photos/48153685@N02/6273990569' },
    'Hummus & pita': { src:'assets/dishes/hummus-pita.jpg', credit:'&ldquo;Hummus Dip&rdquo; by ella.o', license:'CC BY 2.0', source:'https://www.flickr.com/photos/155807330@N05/30863436677' },
    'Pistachio baklava': { src:'assets/dishes/pistachio-baklava.jpg', credit:'&ldquo;Pistachio Baklava and Coffee&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/1222363576' },
    'Chicken ramen': { src:'assets/dishes/chicken-ramen.jpg', credit:'Free Japanese ramen bowl image', license:'CC0 1.0', source:'https://www.rawpixel.com/image/5925771/photo-image-public-domain-food-free' },
    'Gyoza (6 pcs)': { src:'assets/dishes/gyoza.jpg', credit:'&ldquo;Gyoza, Dumpling&rdquo; by jetalone', license:'CC BY 2.0', source:'https://www.flickr.com/photos/92203585@N00/4695468991' },
    'Mixed sushi platter (8 pcs)': { src:'assets/dishes/mixed-sushi-platter.jpg', credit:'&ldquo;Sushi Sashimi Platter&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/4004747776' },
    'Chicken katsu curry': { src:'assets/dishes/chicken-katsu-curry.jpg', credit:'&ldquo;Chicken Katsu Curry Rice&rdquo; by jetalone', license:'CC BY 2.0', source:'https://www.flickr.com/photos/92203585@N00/5195010000' },
    'Al pastor tacos (3 pcs)': { src:'assets/dishes/al-pastor-tacos.jpg', credit:'&ldquo;al pastor tacos&rdquo; by gsz', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/37601286@N06/9591725575' },
    'Empanadas (2 pcs)': { src:'assets/dishes/empanadas.jpg', credit:'&ldquo;Seafood / Mariscos Empanadas&rdquo; by powerplantop', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/40726522@N02/5072212357' },
    'Churros': { src:'assets/dishes/churros.jpg', credit:'&ldquo;Churros with Chocolate Sauce&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/348229335' },
    'Churrasco skewer': { src:'assets/dishes/churrasco-skewer.jpg', credit:'&ldquo;Grilled Beef Skewers&rdquo; by wEnDaLicious', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/25597828@N00/4686608153' },
    'Chimichurri bread': { src:'assets/dishes/chimichurri-bread.jpg', credit:'&ldquo;Chimichurri Bread&rdquo; by yummysmellsca', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/14125170@N02/22676132812' },
    'Dulce de leche pancake': { src:'assets/dishes/dulce-de-leche-pancake.jpg', credit:'&ldquo;Torbellino de chocolate y Dulce de Leche&rdquo; by Sebasti&aacute;n-Dario', license:'CC BY-NC 2.0', source:'https://www.flickr.com/photos/12817132@N07/3787363004' },
    'Cheese cr&ecirc;pe': { src:'assets/dishes/cheese-crepe.jpg', credit:'&ldquo;Savory Chicken Crepes&rdquo; by ralph and jenny', license:'CC BY 2.0', source:'https://www.flickr.com/photos/92269745@N00/4544048268' },
    'Nutella cr&ecirc;pe': { src:'assets/dishes/nutella-crepe.jpg', credit:'Photo by chotda', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/48600074651@N01/3511966974' },
    'Fresh oysters (6 pcs)': { src:'assets/dishes/fresh-oysters.jpg', credit:'&ldquo;Fresh Oyster Plate&rdquo; by theforeignflash', license:'CC BY-ND 2.0', source:'https://www.flickr.com/photos/67728864@N06/6632267621' },
    'French cheese board': { src:'assets/dishes/french-cheese-board.jpg', credit:'&ldquo;French cheese board&rdquo; by tristanf', license:'CC BY 2.0', source:'https://www.flickr.com/photos/89056504@N00/3477151232' },
    'Glass of white wine': { src:'assets/dishes/glass-white-wine.jpg', credit:'&ldquo;Glass of White Wine&rdquo; by RobW_', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/82362654@N00/807248389' },
    'Grilled gourmet sandwich': { src:'assets/dishes/grilled-gourmet-sandwich.jpg', credit:'&ldquo;The Grilled Cheese Truck&rdquo; by ricardodiaz11', license:'CC BY 2.0', source:'https://www.flickr.com/photos/41652235@N00/4299181241' },
    'Hand-cut fries': { src:'assets/dishes/hand-cut-fries.jpg', credit:'&ldquo;Hand-cut Fries&rdquo; by wEnDaLicious', license:'CC BY-ND 2.0', source:'https://www.flickr.com/photos/25597828@N00/388794193' },
    'Milkshake': { src:'assets/dishes/milkshake.jpg', credit:'Photo by Nealy-J', license:'CC BY-NC-SA 2.0', source:'https://www.flickr.com/photos/98057950@N00/2815228619' },
    'Cured salmon': { src:'assets/dishes/cured-salmon.jpg', credit:'&ldquo;cured salmon&rdquo; by stu_spivack', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/35034346243@N01/2698299091' },
    'Kanelbullar': { src:'assets/dishes/kanelbullar.jpg', credit:'&ldquo;Kanelbullar / Cinnamon Rolls&rdquo; by Sophie Gironi', license:'CC BY-NC-SA 2.0', source:'https://www.flickr.com/photos/53301411@N02/11007257296' },
    'Gl&ouml;gg': { src:'assets/dishes/glogg.jpg', credit:'&ldquo;Mulled Wine&rdquo; by Ian Hayhurst', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/7213502@N03/4257407179' },
    'Speck dumplings': { src:'assets/dishes/speck-dumplings.jpg', credit:'&ldquo;Austrian Bread Dumpling&rdquo; by Bibi&rsquo;s Culinary Journey', license:'CC BY 2.0', source:'https://www.flickr.com/photos/57880801@N02/5364652749' },
    'Goulash with bread': { src:'assets/dishes/goulash-with-bread.jpg', credit:'&ldquo;Goulash&rdquo; by Dushan and Miae', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/97304820@N00/6054216923' },
    'Strudel': { src:'assets/dishes/strudel.jpg', credit:'&ldquo;Apple Strudel - Sliced&rdquo; by tonydolor', license:'CC BY-ND 2.0', source:'https://www.flickr.com/photos/16375307@N00/3568199351' },
    'Traditional Gorizia dish': { src:'assets/dishes/traditional-gorizia-dish.jpg', credit:'&ldquo;Dinner at Il Pirata Delle Cinque Terre&rdquo; by JoeDuck', license:'CC BY 2.0', source:'https://www.flickr.com/photos/53175402@N00/4712286139' },
    'House wine (glass)': { src:'assets/dishes/house-wine-glass.jpg', credit:'&ldquo;One glass of red wine&rdquo; by quinn.anya', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/53326337@N00/3970183707' },
    'San Daniele prosciutto board': { src:'assets/dishes/san-daniele-prosciutto-board.jpg', credit:'&ldquo;Meat + Cheese Tray&rdquo; by Eric Kilby', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/8749778@N06/3261977842' },
    'Jota': { src:'assets/dishes/jota.jpg', credit:'Stew with sauerkraut, by T.Tseng', license:'CC BY 2.0', source:'https://www.flickr.com/photos/68147320@N02/9752984491' },
    'Potica': { src:'assets/dishes/potica.jpg', credit:'&ldquo;Potica - Ljubljana, Slovenia&rdquo; by whl.travel', license:'CC BY-NC-SA 2.0', source:'https://www.flickr.com/photos/40382540@N08/4174348072' },
    '&#262;evapi (5 pcs)': { src:'assets/dishes/cevapi.jpg', credit:'&ldquo;&#262;evapi&rdquo; by davduf', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/14483308@N00/720037874' },
    'Meat burek': { src:'assets/dishes/meat-burek.jpg', credit:'&ldquo;Spicy Lamb Borek&rdquo; by avlxyz', license:'CC BY-SA 2.0', source:'https://www.flickr.com/photos/10559879@N00/4204721929' },
    'Baklava': { src:'assets/dishes/baklava.jpg', credit:'&ldquo;Lebanese Baklava&rdquo; by lisamurray', license:'CC BY-ND 2.0', source:'https://www.flickr.com/photos/22171342@N02/6429963321' },
    'Kimchi taco': { src:'assets/dishes/kimchi-taco.jpg', credit:'&ldquo;KimChi Tacos&rdquo; by Pabo76', license:'CC BY-NC-ND 2.0', source:'https://www.flickr.com/photos/12687042@N00/5489980284' },
    'Matcha tea gelato': { src:'assets/dishes/matcha-tea-gelato.jpg', credit:'&ldquo;Uji Matcha Ice Cream&rdquo; by avlxyz', license:'CC BY-NC 2.0', source:'https://www.flickr.com/photos/10559879@N00/54577436644' }
  };

  var PHOTOS = [
    { src:'assets/festival-map.jpg', alt:'Official Gusti di Frontiera festival map', credit:'Official festival map &middot; Comune di Gorizia' },
    { src:'assets/photos/opening-ceremony-crowd.jpg', alt:'Crowd gathered for the opening ceremony in front of a Gorizia church', credit:'Opening ceremony &middot; on site' },
    { src:'assets/photos/fvg-stand-piazza-vittoria.jpg', alt:'The "Io Sono Friuli Venezia Giulia" stand in Piazza della Vittoria', credit:'Borgo FVG &middot; Piazza della Vittoria' },
    { src:'assets/photos/balkan-brass-band.jpg', alt:'Balkan brass band playing next to a stand selling popcorn, &scaron;trudel and burek', credit:'Live brass band &middot; Borgo Slovenia e Penisola Balcanica' },
    { src:'assets/photos/balkan-grill-menu-banner.jpg', alt:'Grill stand banner showing &#263;evap&#269;i&#263;i, spicy sausage, mixed meat and pljeskavica with tortiglia', credit:'Grill menu board &middot; Borgo Slovenia e Penisola Balcanica' },
    { src:'assets/photos/francia-raclette-potatoes.jpg', alt:'Potatoes cooking on a large pan at a raclette stand', credit:'Raclette potatoes &middot; Borgo Francia' },
    { src:'assets/photos/bakery-oven-buns.jpg', alt:'Trays of freshly baked buns coming out of a portable oven', credit:'Fresh-baked buns &middot; on site' },
    { src:'assets/photos/chimney-cake-spit.jpg', alt:'Dough wrapped around spits, roasting over coals for chimney cake', credit:'Chimney cake on the grill &middot; on site' },
    { src:'assets/photos/stroopwafel-stand.jpg', alt:'Stand staff preparing waffles on a large flat griddle', credit:'Waffle stand &middot; on site' },
    { src:'assets/photos/sausage-toppings-bar.jpg', alt:'Grilled sausages and a toppings bar with tomato, cucumber and cabbage', credit:'Sausage stand &middot; on site' },
    { src:'assets/photos/skewer-grill.jpg', alt:'Rows of skewers cooking on a long charcoal grill', credit:'Skewer grill &middot; on site' },
    { src:'assets/photos/london-bus-bar.jpg', alt:'A red London double-decker bus set up as a drinks bar in a piazza', credit:'London bus bar &middot; on site' }
  ];

  var views = ['home','borgo','stand','search','map','saved','photos'];
  function showView(name){
    state.view = name;
    views.forEach(function(v){ document.getElementById('view-'+v).classList.toggle('active', v===name); });
    document.querySelectorAll('.tab-btn').forEach(function(btn){ btn.classList.toggle('active', btn.getAttribute('data-tab')===name); });
    window.scrollTo(0,0);
  }

  function renderHome(){
    document.getElementById('stat-borghi').textContent = BORGHI.length;
    document.getElementById('stat-stand').textContent = BORGHI.reduce(function(a,b){return a+b.stands.length;},0);
    document.getElementById('stat-piatti').textContent = ALL_ITEMS.length;
    var grid = document.getElementById('borgo-grid');
    grid.innerHTML = '';
    BORGHI.forEach(function(b){
      var card = document.createElement('button');
      card.className = 'borgo-card';
      card.setAttribute('data-open-borgo', b.id);
      card.innerHTML =
        '<div class="borgo-top" style="background:'+b.color+'"></div>'+
        '<div class="borgo-body">'+
          '<div class="borgo-flag">'+b.flag+' <span class="badge-count" style="float:right;">No. '+b.num+'</span></div>'+
          '<div class="borgo-name">'+b.name+'</div>'+
          '<div class="borgo-country">'+b.country+'</div>'+
          '<div class="borgo-meta"><span class="badge-count">'+b.stands.length+' stand'+(b.stands.length===1?'':'s')+'</span><span>'+b.loc+'</span></div>'+
        '</div>';
      grid.appendChild(card);
    });
  }

  function renderBorgo(id){
    var b = findBorgo(id);
    if(!b) return;
    state.borgoId = id;
    var banner = document.getElementById('borgo-banner');
    banner.style.background = b.color;
    banner.innerHTML =
      '<div class="eyebrow" style="color:rgba(255,255,255,0.85)">No. '+b.num+' &middot; '+b.flag+' &nbsp;'+b.country+'</div>'+
      '<h2>'+b.name+'</h2>'+
      '<p>'+b.desc+'</p>'+
      '<div class="detail-loc">&#128205; '+b.loc+'</div>'+
      '<a class="maps-link" href="'+gmaps(b.loc+', Gorizia')+'" target="_blank" rel="noopener">&#128506;&#65039; Open in Google Maps</a>';

    var list = document.getElementById('borgo-stand-list');
    list.innerHTML = '';
    b.stands.forEach(function(s){
      var card = document.createElement('button');
      card.className = 'stand-card';
      card.setAttribute('data-open-stand', s.id);
      card.innerHTML =
        '<div class="stand-top"><span class="stand-name">'+s.name+'</span><span class="status-pill '+(isFestivalOpenNow()?'status-open':'status-closed')+'">'+(isFestivalOpenNow()?'OPEN NOW':'CLOSED NOW')+'</span></div>'+
        '<div class="stand-sub"><span>&#128337; '+s.hours+'</span><span>&#128205; '+s.loc+'</span></div>'+
        '<div class="stand-price">'+priceRange(s)+' per dish</div>';
      list.appendChild(card);
    });
    showView('borgo');
  }

  function renderStand(bId, sId){
    var b = findBorgo(bId), s = findStand(bId, sId);
    if(!b || !s) return;
    state.borgoId = bId; state.standId = sId;

    var banner = document.getElementById('stand-banner');
    banner.style.background = b.color;
    banner.innerHTML =
      '<div class="eyebrow" style="color:rgba(255,255,255,0.85)">No. '+b.num+' &middot; '+b.flag+' &nbsp;'+b.name+'</div>'+
      '<h2>'+s.name+'</h2>'+
      '<div class="detail-loc">&#128337; '+s.hours+' &nbsp;&middot;&nbsp; &#128205; '+s.loc+'</div>'+
      '<a class="maps-link" href="'+gmaps(s.loc+', Gorizia')+'" target="_blank" rel="noopener">&#128506;&#65039; Open in Google Maps</a>';

    document.getElementById('stand-item-count').textContent = s.items.length+' DISHES';
    var menu = document.getElementById('stand-menu');
    menu.innerHTML = '';
    CURRENT_DISH_PHOTOS = [];
    s.items.forEach(function(it){
      var row = document.createElement('div');
      row.className = 'menu-item';
      var tagsHtml = it.tags.map(function(t){return '<span class="tag-chip">'+(DIET_LABELS[t]||t)+'</span>';}).join('');
      // Look up by the raw (still HTML-entity-encoded) name string here, before it
      // goes through innerHTML — the browser would decode entities like &ugrave;
      // into their real character once parsed, so a later re-lookup from a
      // data-attribute value would silently fail to match. Referencing this
      // dish's photo by array index instead sidesteps that round-trip entirely.
      var photo = DISH_PHOTOS[it.name];
      var iconHtml;
      if(photo){
        var idx = CURRENT_DISH_PHOTOS.length;
        CURRENT_DISH_PHOTOS.push({ photo: photo, name: it.name });
        iconHtml = '<button class="item-icon item-icon-photo" data-dish-photo-idx="'+idx+'" style="background-image:url(&quot;'+photo.src+'&quot;)" aria-label="View photo of '+it.name+'"><span class="item-icon-zoom">&#128269;</span></button>';
      } else {
        iconHtml = '<div class="item-icon" style="background:'+b.color+'22">'+ICONS[it.icon]+'</div>';
      }
      row.innerHTML =
        iconHtml+
        '<div class="item-body">'+
          '<div class="item-name">'+it.name+'</div>'+
          '<div class="item-desc">'+it.desc+'</div>'+
          (tagsHtml ? '<div class="item-tags">'+tagsHtml+'</div>' : '')+
        '</div>'+
        '<div class="item-price">&euro;'+it.price+'</div>';
      menu.appendChild(row);
    });

    document.getElementById('stand-fresh').innerHTML = '<span class="dot"></span> Menu updated 2 hours ago &middot; source: festival staff';

    var favBtn = document.getElementById('fav-toggle');
    var isSaved = state.savedIds.indexOf(s.id) !== -1;
    favBtn.classList.toggle('saved', isSaved);
    favBtn.innerHTML = isSaved ? '&#9829; Saved' : '&#9825; Add to favorites';

    showView('stand');
  }

  var PRICE_BANDS = [
    {id:'lt5', label:'Under &euro;5', test:function(p){return p<5;}},
    {id:'5-10', label:'&euro;5&ndash;10', test:function(p){return p>=5 && p<=10;}},
    {id:'gt10', label:'Over &euro;10', test:function(p){return p>10;}}
  ];
  var DIET_BANDS = [
    {id:'veg', label:'Vegetarian'}, {id:'vegan', label:'Vegan'}, {id:'gluten-free', label:'Gluten-free'}
  ];

  function renderFilters(){
    var pWrap = document.getElementById('filter-price'); pWrap.innerHTML = '';
    PRICE_BANDS.forEach(function(pb){
      var c = document.createElement('button');
      c.className = 'chip'+(state.priceFilter===pb.id?' on':'');
      c.setAttribute('data-price', pb.id); c.innerHTML = pb.label;
      pWrap.appendChild(c);
    });
    var dWrap = document.getElementById('filter-diet'); dWrap.innerHTML = '';
    DIET_BANDS.forEach(function(db){
      var c = document.createElement('button');
      c.className = 'chip'+(state.dietFilter===db.id?' on':'');
      c.setAttribute('data-diet', db.id); c.innerHTML = db.label;
      dWrap.appendChild(c);
    });
    var bWrap = document.getElementById('filter-borgo'); bWrap.innerHTML = '';
    BORGHI.forEach(function(b){
      var on = state.borgoFilters.indexOf(b.id)!==-1;
      var c = document.createElement('button');
      c.className = 'chip'+(on?' on':'');
      c.setAttribute('data-borgo-filter', b.id);
      c.innerHTML = '<span class="swatch" style="background:'+(on?'#fff':b.color)+'"></span>'+b.name.replace('Borgo ','');
      bWrap.appendChild(c);
    });
  }

  function runSearch(){
    var q = state.search.trim().toLowerCase();
    var results = ALL_ITEMS.filter(function(r){
      if(q){
        var hay = (r.item.name+' '+r.stand.name+' '+r.borgo.name+' '+r.borgo.country).toLowerCase();
        if(hay.indexOf(q)===-1) return false;
      }
      if(state.priceFilter){
        var band = PRICE_BANDS.filter(function(p){return p.id===state.priceFilter;})[0];
        if(band && !band.test(r.item.price)) return false;
      }
      if(state.dietFilter && r.item.tags.indexOf(state.dietFilter)===-1) return false;
      if(state.borgoFilters.length && state.borgoFilters.indexOf(r.borgo.id)===-1) return false;
      return true;
    });

    document.getElementById('results-count').textContent = results.length + ' result' + (results.length===1?'':'s');
    var list = document.getElementById('results-list'); list.innerHTML = '';
    if(!results.length){
      list.innerHTML = '<div class="empty-state"><div class="glyph">&#127860;</div><p>No dishes found. Try removing a filter.</p></div>';
      return;
    }
    results.forEach(function(r){
      var row = document.createElement('div');
      row.className = 'result-row';
      row.setAttribute('data-open-stand-from-search', r.stand.id);
      row.setAttribute('data-borgo-id', r.borgo.id);
      var tagsHtml = r.item.tags.map(function(t){return DIET_LABELS[t]||t;}).join(' &middot; ');
      row.innerHTML =
        '<div class="item-icon" style="background:'+r.borgo.color+'22">'+ICONS[r.item.icon]+'</div>'+
        '<div class="item-body">'+
          '<div class="item-name">'+r.item.name+'</div>'+
          '<div class="result-sub"><span class="swatch" style="background:'+r.borgo.color+'"></span>'+r.stand.name+' &middot; '+r.borgo.name.replace('Borgo ','')+(tagsHtml?' &middot; '+tagsHtml:'')+'</div>'+
        '</div>'+
        '<div class="item-price">&euro;'+r.item.price+'</div>';
      list.appendChild(row);
    });
  }

  function renderMap(){
    var grid = document.getElementById('map-pin-grid');
    grid.innerHTML = '';
    BORGHI.forEach(function(b){
      var btn = document.createElement('button');
      btn.className = 'map-pin-btn';
      btn.setAttribute('data-open-borgo', b.id);
      btn.innerHTML =
        '<span class="num" style="background:'+b.color+'">'+b.num+'</span>'+
        '<span class="name">'+b.name.replace('Borgo ','')+'</span>';
      grid.appendChild(btn);
    });

    var legend = document.getElementById('map-legend');
    legend.innerHTML = '';
    LANDMARKS.forEach(function(lm){
      var item = document.createElement('a');
      item.className = 'legend-item';
      item.href = gmaps(lm.query);
      item.target = '_blank'; item.rel = 'noopener';
      item.style.textDecoration = 'none'; item.style.color = 'var(--blue)';
      item.innerHTML = '<span class="swatch" style="background:#5c6b78"></span>&#128506;&#65039; '+lm.name;
      legend.appendChild(item);
    });
  }

  function renderSaved(){
    var wrap = document.getElementById('saved-content'); wrap.innerHTML = '';
    if(!state.savedIds.length){
      wrap.innerHTML = '<div class="empty-state"><div class="glyph">&#9733;</div><p>No favorites yet. Explore the borghi and tap &#9825; on a stand to save it here.</p></div>';
      return;
    }
    var list = document.createElement('div'); list.className = 'saved-list';
    state.savedIds.forEach(function(sid){
      var found = null;
      BORGHI.forEach(function(b){ b.stands.forEach(function(s){ if(s.id===sid) found = {b:b,s:s}; }); });
      if(!found) return;
      var card = document.createElement('button');
      card.className = 'stand-card';
      card.setAttribute('data-open-stand-direct', found.s.id);
      card.setAttribute('data-borgo-id', found.b.id);
      card.innerHTML =
        '<div class="stand-top"><span class="stand-name">'+found.s.name+'</span><span class="status-pill '+(isFestivalOpenNow()?'status-open':'status-closed')+'">'+(isFestivalOpenNow()?'OPEN NOW':'CLOSED NOW')+'</span></div>'+
        '<div class="stand-sub"><span>'+found.b.flag+' '+found.b.name+'</span><span>&#128205; '+found.s.loc+'</span></div>'+
        '<div class="stand-price">'+priceRange(found.s)+' per dish</div>';
      list.appendChild(card);
    });
    wrap.appendChild(list);
  }

  function renderPhotos(){
    var grid = document.getElementById('photo-grid');
    grid.innerHTML = '';
    PHOTOS.forEach(function(p, i){
      var tile = document.createElement('button');
      tile.className = 'photo-tile';
      tile.setAttribute('data-photo-index', i);
      tile.innerHTML = '<img src="'+p.src+'" alt="'+p.alt+'" loading="lazy">'+
        '<span class="photo-credit">'+p.credit+'</span>';
      grid.appendChild(tile);
    });
    var addTile = document.createElement('div');
    addTile.className = 'photo-tile placeholder';
    addTile.innerHTML = '<span class="glyph">&#128248;</span><span class="lbl">Your photos here soon</span>';
    grid.appendChild(addTile);
  }

  document.addEventListener('click', function(e){
    var openBorgo = e.target.closest('[data-open-borgo]');
    var openStand = e.target.closest('[data-open-stand]');
    var openStandSearch = e.target.closest('[data-open-stand-from-search]');
    var openStandDirect = e.target.closest('[data-open-stand-direct]');
    var backBtn = e.target.closest('[data-back]');
    var tabBtn = e.target.closest('.tab-btn');
    var priceChip = e.target.closest('[data-price]');
    var dietChip = e.target.closest('[data-diet]');
    var borgoChip = e.target.closest('[data-borgo-filter]');
    var favBtn = e.target.closest('#fav-toggle');
    var photoTile = e.target.closest('[data-photo-index]');
    var dishPhotoBtn = e.target.closest('[data-dish-photo-idx]');

    if(e.target.closest('a[href]')) return; // let real links behave normally

    if(openBorgo){ renderBorgo(openBorgo.getAttribute('data-open-borgo')); return; }
    if(openStand){ renderStand(state.borgoId, openStand.getAttribute('data-open-stand')); return; }
    if(openStandSearch){ renderStand(openStandSearch.getAttribute('data-borgo-id'), openStandSearch.getAttribute('data-open-stand-from-search')); return; }
    if(openStandDirect){ renderStand(openStandDirect.getAttribute('data-borgo-id'), openStandDirect.getAttribute('data-open-stand-direct')); return; }
    if(backBtn){
      var to = backBtn.getAttribute('data-back');
      if(to==='home') showView('home');
      if(to==='borgo') renderBorgo(state.borgoId);
      return;
    }
    if(tabBtn){
      var t = tabBtn.getAttribute('data-tab');
      if(t==='search'){ renderFilters(); runSearch(); }
      if(t==='map') renderMap();
      if(t==='saved') renderSaved();
      if(t==='photos') renderPhotos();
      showView(t);
      return;
    }
    if(photoTile){
      var pIdx = Number(photoTile.getAttribute('data-photo-index'));
      var photo = PHOTOS[pIdx];
      if(photo){
        document.getElementById('lightbox-img').src = photo.src;
        document.getElementById('lightbox-img').alt = photo.alt;
        document.getElementById('lightbox-credit').innerHTML = photo.credit;
        document.getElementById('photo-lightbox').hidden = false;
      }
      return;
    }
    if(dishPhotoBtn){
      var dishEntry = CURRENT_DISH_PHOTOS[Number(dishPhotoBtn.getAttribute('data-dish-photo-idx'))];
      if(dishEntry){
        document.getElementById('lightbox-img').src = dishEntry.photo.src;
        document.getElementById('lightbox-img').alt = dishPhotoBtn.getAttribute('aria-label') || '';
        document.getElementById('lightbox-credit').innerHTML =
          '<b>Symbolic photo &mdash; not the actual dish served at this stand.</b><br>'+
          dishEntry.photo.credit+' &middot; '+dishEntry.photo.license+
          ' &middot; <a href="'+dishEntry.photo.source+'" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;">source</a>';
        document.getElementById('photo-lightbox').hidden = false;
      }
      return;
    }
    if(e.target.closest('#lightbox-close') || e.target.id === 'photo-lightbox'){
      document.getElementById('photo-lightbox').hidden = true;
      return;
    }
    if(priceChip){
      var pid = priceChip.getAttribute('data-price');
      state.priceFilter = state.priceFilter===pid ? null : pid;
      renderFilters(); runSearch(); return;
    }
    if(dietChip){
      var did = dietChip.getAttribute('data-diet');
      state.dietFilter = state.dietFilter===did ? null : did;
      renderFilters(); runSearch(); return;
    }
    if(borgoChip){
      var bid = borgoChip.getAttribute('data-borgo-filter');
      var idx = state.borgoFilters.indexOf(bid);
      if(idx===-1) state.borgoFilters.push(bid); else state.borgoFilters.splice(idx,1);
      renderFilters(); runSearch(); return;
    }
    if(favBtn){
      var sid = state.standId;
      var i = state.savedIds.indexOf(sid);
      if(i===-1) state.savedIds.push(sid); else state.savedIds.splice(i,1);
      persistSaved();
      renderStand(state.borgoId, state.standId);
      return;
    }
    if(e.target.closest('#btn-search-shortcut')){ renderFilters(); runSearch(); showView('search'); return; }
    if(e.target.closest('#demo-dismiss')){
      document.getElementById('demo-banner').style.display = 'none';
      try{ localStorage.setItem('gd_demo_dismissed','1'); }catch(err){}
      return;
    }
  });

  document.getElementById('search-input').addEventListener('input', function(e){
    state.search = e.target.value; runSearch();
  });

  function start(){
    try{
      if(localStorage.getItem('gd_demo_dismissed')==='1'){
        document.getElementById('demo-banner').style.display = 'none';
      }
    }catch(e){}
    renderHome();
  }

  start();

  // ---------- Global visits counter ----------
  // The counter itself is a plain <img> in index.html pointing at
  // visitor-badge.laobi.icu (a free, key-less hit-counter badge with no
  // signup/verification step — unlike kvdb.io, which now requires a verified
  // owner email before it accepts writes). Every image request increments a
  // server-side count and returns an SVG with the new total baked in, so no
  // JS is needed here at all; the badge's own onerror attribute hides the
  // card if the service is ever unreachable.
})();
