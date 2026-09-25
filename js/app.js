(function(){
  "use strict";

  var ICONS = {
    grill:'&#127831;', soup:'&#127860;', sweet:'&#127843;', drink:'&#127866;',
    bread:'&#129360;', wrap:'&#127837;', rice:'&#127834;', skewer:'&#129381;'
  };

  function gmaps(query){
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  // Numbers, colors and street locations below match the OFFICIAL festival map exactly (borghi 1–17).
  // Official borgo names are kept in Italian (as printed on the real map) for on-site wayfinding; everything else is in English.
  var BORGHI = [
    { num:1, id:'italia', name:'Borgo Italia', country:'Italy', flag:'&#127470;&#127481;', color:'#95c997',
      desc:'Regional Italian specialities, from pasta to cured meats.', loc:'Via Garibaldi / Corso Italia', mapx:60.5, mapy:78.5,
      stands:[
        { id:'sapori-italia', name:"Sapori d'Italia", hours:'11:00 &ndash; 00:00', loc:'Via Garibaldi', open:true,
          items:[
            {name:'Tagliatelle al rag&ugrave;', desc:'Fresh handmade pasta', price:7, tags:[], icon:'wrap'},
            {name:'Cured meats & cheese board', desc:'Regional selection', price:8, tags:[], icon:'grill'},
            {name:'Tiramis&ugrave;', desc:'Classic recipe', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:2, id:'mercatino', name:'Mercatino di Gusti', country:'Local products', flag:'&#127811;', color:'#f7b99d',
      desc:'A small market of local specialities from around the world.', loc:'Piazza Battisti', mapx:54.1, mapy:61.6,
      stands:[
        { id:'mercatino-corner', name:'Mercatino Corner', hours:'10:00 &ndash; 22:00', loc:'Piazza Battisti', open:true,
          items:[
            {name:'Mixed street food tasting', desc:'Rotating selection', price:6, tags:[], icon:'wrap'},
            {name:'Local jams & honey', desc:'Take-away jar', price:5, tags:['veg','vegan'], icon:'sweet'},
            {name:'Fresh fruit juice', desc:'Freshly squeezed', price:3, tags:['vegan'], icon:'drink'}
          ]}
      ]},
    { num:3, id:'austria', name:'Borgo Austria', country:'Austria', flag:'&#127462;&#127481;', color:'#a19fc5',
      desc:'Grilled sausages, pretzels, canederli and Viennese pastries.', loc:'Via Cadorna', mapx:57.4, mapy:36.5,
      stands:[
        { id:'wien-imbiss', name:'Wien Imbiss', hours:'11:00 &ndash; 00:00', loc:'Via Cadorna', open:true,
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
        { id:'route66', name:'Route 66 Diner', hours:'11:00 &ndash; 01:00', loc:'Via Cadorna', open:true,
          items:[
            {name:'Classic cheeseburger', desc:'With fries', price:8, tags:[], icon:'grill'},
            {name:'Loaded nachos', desc:'Tex-Mex style, cheese and jalapeños', price:6, tags:['veg'], icon:'wrap'},
            {name:'Cheesecake', desc:'Slice with berry coulis', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:5, id:'mare', name:'Borgo Mare', country:'Seafood', flag:'&#127859;', color:'#0aa051',
      desc:'Exclusively fish and seafood dishes — the only borgo reserved for it.', loc:'Via Boccaccio', mapx:66.5, mapy:38.5,
      stands:[
        { id:'mare-nostrum', name:'Mare Nostrum', hours:'11:00 &ndash; 00:00', loc:'Via Boccaccio', open:true,
          items:[
            {name:'Mixed fried fish', desc:'Assorted fried small fish', price:9, tags:[], icon:'grill'},
            {name:'Octopus sandwich', desc:'Grilled octopus', price:7, tags:[], icon:'wrap'},
            {name:'Mussels marinara', desc:'With toasted bread', price:7, tags:[], icon:'soup'}
          ]}
      ]},
    { num:6, id:'australia', name:'Borgo Australia', country:'Oceania', flag:'&#127462;&#127482;', color:'#bc5455',
      desc:"Street food from the other side of the world: grilled meats, damper bread and iconic sweets.", loc:'Via Santa Chiara (corner of Via Brass)', mapx:66.0, mapy:26.7,
      stands:[
        { id:'outback-grill', name:'Outback Grill', hours:'11:00 &ndash; 01:00', loc:'Via Brass', open:true,
          items:[
            {name:'Kangaroo burger', desc:'Grilled kangaroo burger', price:8, tags:[], icon:'grill'},
            {name:'Meat pie', desc:'Classic meat-filled savoury pie', price:5, tags:[], icon:'wrap'},
            {name:'Lamington', desc:'Sponge cake with chocolate and coconut', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'barbie-bar', name:'Barbie Bar', hours:'12:00 &ndash; 00:00', loc:'Via Brass', open:false,
          items:[
            {name:'BBQ ribs', desc:'Marinated ribs, slow-cooked over coals', price:10, tags:[], icon:'grill'},
            {name:'Damper bread', desc:'Traditional Australian campfire bread', price:3, tags:['veg'], icon:'bread'},
            {name:'Tim Tam shake', desc:'Chocolate-biscuit milkshake', price:4, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:7, id:'africa', name:'Borgo Africa', country:'Maghreb &middot; West Africa', flag:'&#127463;&#127465;', color:'#74b3e1',
      desc:'Couscous, tajine and spiced grills from the Maghreb and sub-Saharan Africa.', loc:'Via Brass (corner of Via Santa Chiara)', mapx:67.9, mapy:26.3,
      stands:[
        { id:'marrakech-tajine', name:'Marrakech Tajine', hours:'11:00 &ndash; 00:00', loc:'Via Brass', open:true,
          items:[
            {name:'Lamb tajine', desc:'Slow-cooked with dried apricots and almonds', price:9, tags:['gluten-free'], icon:'soup'},
            {name:'Vegetable couscous', desc:'Couscous with seasonal vegetables', price:6, tags:['vegan'], icon:'rice'},
            {name:'Mint tea', desc:'Served hot and sweetened', price:2, tags:['vegan'], icon:'drink'}
          ]},
        { id:'sahel-kitchen', name:'Sahel Kitchen', hours:'11:00 &ndash; 00:00', loc:'Via Brass', open:true,
          items:[
            {name:'Chicken yassa', desc:'Senegalese-style, marinated in lemon and onion', price:7, tags:['gluten-free'], icon:'grill'},
            {name:'Jollof rice', desc:'Spiced tomato rice', price:5, tags:['vegan'], icon:'rice'},
            {name:'Beignet', desc:'Sugared fritters', price:2, tags:['veg'], icon:'sweet'}
          ]},
        { id:'savana-grill', name:'Savana Grill', hours:'12:00 &ndash; 01:00', loc:'Via Brass', open:true,
          items:[
            {name:'Spicy skewers', desc:'Suya marinade, roasted peanuts', price:6, tags:[], icon:'skewer'},
            {name:'Vegetable couscous', desc:'Couscous with seasonal vegetables', price:5, tags:['vegan'], icon:'rice'},
            {name:'Mint tea', desc:'Served hot and sweetened', price:2, tags:['vegan'], icon:'drink'}
          ]}
      ]},
    { num:8, id:'oriente', name:'Borgo Oriente', country:'Middle East &middot; Asia', flag:'&#127826;', color:'#ee9610',
      desc:'Sushi, ramen, curry, steamed dumplings and Middle Eastern specialities.', loc:'Via Santa Chiara / Via Boccaccio', mapx:71.4, mapy:37.4,
      stands:[
        { id:'shawarma-house', name:'Shawarma House', hours:'11:00 &ndash; 02:00', loc:'Via Santa Chiara', open:true,
          items:[
            {name:'Chicken shawarma', desc:'Flatbread, yoghurt and tahini sauces', price:6, tags:[], icon:'wrap'},
            {name:'Hummus & pita', desc:'With oil and paprika', price:4, tags:['vegan'], icon:'soup'},
            {name:'Pistachio baklava', desc:'Sweet pastry, crushed pistachios', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'noodle-corner', name:'Noodle Corner', hours:'12:00 &ndash; 01:00', loc:'Via Santa Chiara', open:false,
          items:[
            {name:'Chicken ramen', desc:'Noodle soup, soft egg, spring onion', price:8, tags:[], icon:'soup'},
            {name:'Gyoza (6 pcs)', desc:'Filled steamed dumplings', price:5, tags:[], icon:'wrap'},
            {name:'Jasmine tea', desc:'Served hot', price:2, tags:['vegan'], icon:'drink'}
          ]},
        { id:'sakura-sushi', name:'Sakura Sushi & Curry', hours:'11:00 &ndash; 01:00', loc:'Via Boccaccio', open:true,
          items:[
            {name:'Mixed sushi platter (8 pcs)', desc:'Nigiri and maki selection', price:9, tags:['gluten-free'], icon:'rice'},
            {name:'Chicken katsu curry', desc:'Breaded chicken, rice, curry sauce', price:8, tags:[], icon:'wrap'},
            {name:'Edamame', desc:'Steamed and salted soybeans', price:3, tags:['vegan','gluten-free'], icon:'soup'}
          ]}
      ]},
    { num:9, id:'latinoamericano', name:'Borgo Latino Americano', country:'Mexico &middot; Argentina', flag:'&#127765;', color:'#99639c',
      desc:'From Mexico to Patagonia: tacos, empanadas and churrasco.', loc:'Via Cadorna', mapx:61.3, mapy:31.5,
      stands:[
        { id:'taqueria-frontera', name:'Taquer&iacute;a Frontera', hours:'11:00 &ndash; 01:00', loc:'Via Cadorna', open:true,
          items:[
            {name:'Al pastor tacos (3 pcs)', desc:'Marinated pork, pineapple, coriander', price:6, tags:[], icon:'wrap'},
            {name:'Empanadas (2 pcs)', desc:'Filled with hand-cut meat', price:5, tags:[], icon:'wrap'},
            {name:'Churros', desc:'With hot chocolate', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'gaucho-grill', name:'Gaucho Grill', hours:'11:00 &ndash; 01:00', loc:'Via Cadorna', open:true,
          items:[
            {name:'Churrasco skewer', desc:'Argentine-style grilled beef', price:8, tags:['gluten-free'], icon:'skewer'},
            {name:'Chimichurri bread', desc:'Toasted bread with chimichurri sauce', price:3, tags:['vegan'], icon:'bread'},
            {name:'Dulce de leche pancake', desc:'Folded pancake with caramel filling', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:10, id:'francia', name:'Borgo Francia', country:'France', flag:'&#127467;&#127479;', color:'#b98741',
      desc:'Cr&ecirc;pes, cheeses, oysters and French sweets.', loc:'Via Morelli', mapx:69.2, mapy:50.2,
      stands:[
        { id:'creperie-nice', name:'Cr&ecirc;perie Nice', hours:'11:00 &ndash; 01:00', loc:'Via Morelli', open:true,
          items:[
            {name:'Cheese cr&ecirc;pe', desc:'Melted cheese and ham', price:6, tags:[], icon:'wrap'},
            {name:'Nutella cr&ecirc;pe', desc:'Classic sweet cr&ecirc;pe', price:4, tags:['veg'], icon:'sweet'},
            {name:'Mulled wine', desc:'Hot spiced wine', price:3, tags:['veg'], icon:'drink'}
          ]},
        { id:'huitres-bar', name:'Hu&icirc;tres Bar', hours:'11:00 &ndash; 00:00', loc:'Via Morelli', open:true,
          items:[
            {name:'Fresh oysters (6 pcs)', desc:'Served with lemon and shallot vinegar', price:9, tags:['gluten-free'], icon:'soup'},
            {name:'French cheese board', desc:'Brie, comt&eacute; and camembert', price:7, tags:['veg'], icon:'grill'},
            {name:'Glass of white wine', desc:'Chilled, dry white', price:4, tags:['veg','vegan'], icon:'drink'}
          ]}
      ]},
    { num:11, id:'truckfood', name:'Borgo TruckFood', country:'Street food on wheels', flag:'&#128666;', color:'#e24552',
      desc:'Street food on wheels: gourmet sandwiches and fried treats.', loc:'Corso Verdi / Via Oberdan', mapx:72.4, mapy:44.6,
      stands:[
        { id:'truck-11', name:'Truck 11', hours:'11:00 &ndash; 02:00', loc:'Corso Verdi / Via Oberdan', open:true,
          items:[
            {name:'Grilled gourmet sandwich', desc:'With house sauces', price:7, tags:[], icon:'grill'},
            {name:'Hand-cut fries', desc:'Hand cut', price:4, tags:['veg'], icon:'wrap'},
            {name:'Milkshake', desc:'Mixed flavours', price:4, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:12, id:'nordeuropa', name:'Borgo Nord Europa', country:'Scandinavia', flag:'&#127465;&#127472;', color:'#9ab70c',
      desc:'Salmon, cinnamon and Nordic specialities.', loc:'Via Roma', mapx:81.5, mapy:54.2,
      stands:[
        { id:'fjord-kitchen', name:'Fjord Kitchen', hours:'11:00 &ndash; 00:00', loc:'Via Roma', open:true,
          items:[
            {name:'Cured salmon', desc:'On rye bread with mustard and dill', price:8, tags:['gluten-free'], icon:'grill'},
            {name:'Kanelbullar', desc:'Cinnamon roll', price:3, tags:['veg'], icon:'sweet'},
            {name:'Gl&ouml;gg', desc:'Nordic hot spiced wine', price:4, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:13, id:'europacentrale', name:'Borgo Europa Centrale', country:'Central Europe', flag:'&#127462;&#127481;', color:'#b3b8a4',
      desc:'Goulash, dumplings and Central European specialities.', loc:'Via Roma (near Via Morelli)', mapx:76.3, mapy:48.6,
      stands:[
        { id:'mitteleuropa-kitchen', name:'Mitteleuropa Kitchen', hours:'11:00 &ndash; 00:00', loc:'Via Roma', open:true,
          items:[
            {name:'Speck dumplings', desc:'In broth or plain', price:6, tags:[], icon:'soup'},
            {name:'Goulash with bread', desc:'Spiced beef stew', price:8, tags:[], icon:'soup'},
            {name:'Strudel', desc:'Apple, with cream', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:14, id:'associazioni', name:'Borgo Associazioni', country:'Local community', flag:'&#129309;', color:'#90d2e4',
      desc:'Stands run by local community associations.', loc:'Via Crispi', mapx:72.5, mapy:65.1,
      stands:[
        { id:'associazione-solidale', name:'Associazione Solidale', hours:'11:00 &ndash; 23:00', loc:'Via Crispi', open:true,
          items:[
            {name:'Traditional Gorizia dish', desc:'Local recipe', price:7, tags:[], icon:'soup'},
            {name:'Homemade dessert', desc:'Rotating recipe', price:3, tags:['veg'], icon:'sweet'},
            {name:'House wine (glass)', desc:'Local selection', price:3, tags:['veg'], icon:'drink'}
          ]}
      ]},
    { num:15, id:'fvg', name:'Borgo FVG', country:'Friuli Venezia Giulia', flag:'&#127470;&#127481;', color:'#c2804a',
      desc:'The flavours of Friuli Venezia Giulia, from prosciutto to frico.', loc:'Piazza Municipio', mapx:66.8, mapy:91.4,
      stands:[
        { id:'sapori-friuli', name:'Sapori del Friuli', hours:'11:00 &ndash; 00:00', loc:'Piazza Municipio', open:true,
          items:[
            {name:'Frico with polenta', desc:'Crispy cheese and potatoes', price:8, tags:['veg','gluten-free'], icon:'grill'},
            {name:'San Daniele prosciutto board', desc:'Long-aged', price:9, tags:['gluten-free'], icon:'grill'},
            {name:'Gubana', desc:'Traditional rolled pastry', price:4, tags:['veg'], icon:'sweet'}
          ]}
      ]},
    { num:16, id:'slovenia-balcani', name:'Borgo Slovenia e Penisola Balcanica', country:'Slovenia &middot; Balkans', flag:'&#127480;&#127470;', color:'#db548b',
      desc:'The Slovenian-Balkan village: &scaron;truklji, &#263;evapi and Collio wines.', loc:'Via De Gasperi (near Piazza Municipio)', mapx:68.1, mapy:82.3,
      stands:[
        { id:'gostilna-vas', name:'Gostilna Vas', hours:'11:00 &ndash; 00:00', loc:'Via Crispi / Via De Gasperi', open:true,
          items:[
            {name:'&Scaron;truklji', desc:'Filled pastry roll, savoury version', price:5, tags:['veg'], icon:'wrap'},
            {name:'Jota', desc:'Bean, sauerkraut and potato soup', price:6, tags:['veg'], icon:'soup'},
            {name:'Potica', desc:'Rolled walnut pastry', price:3, tags:['veg'], icon:'sweet'}
          ]},
        { id:'cevapi-sarajevo', name:'&#262;evapi Sarajevo', hours:'11:00 &ndash; 02:00', loc:'Via Crispi / Via De Gasperi', open:true,
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
        { id:'fusion-lab', name:'Fusion Lab', hours:'11:00 &ndash; 02:00', loc:'Piazza Transalpina', open:true,
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
        '<div class="stand-top"><span class="stand-name">'+s.name+'</span><span class="status-pill '+(s.open?'status-open':'status-closed')+'">'+(s.open?'OPEN':'CLOSED NOW')+'</span></div>'+
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

    var media = document.getElementById('stand-media');
    media.innerHTML = '';
    var mediaEmojis = ['&#127909;','&#127860;','&#127859;'];
    for(var i=0;i<3;i++){
      var t = document.createElement('div');
      t.className = 'media-tile';
      t.innerHTML = mediaEmojis[i]+'<span class="tag">PHOTO</span>';
      media.appendChild(t);
    }
    var vid = document.createElement('div');
    vid.className = 'media-tile';
    vid.setAttribute('data-video','1');
    vid.innerHTML = '&#127909;<span class="tag">VIDEO</span><div class="play-badge">&#9654;&#65039;</div>';
    media.appendChild(vid);

    document.getElementById('stand-item-count').textContent = s.items.length+' DISHES';
    var menu = document.getElementById('stand-menu');
    menu.innerHTML = '';
    s.items.forEach(function(it){
      var row = document.createElement('div');
      row.className = 'menu-item';
      var tagsHtml = it.tags.map(function(t){return '<span class="tag-chip">'+(DIET_LABELS[t]||t)+'</span>';}).join('');
      row.innerHTML =
        '<div class="item-icon" style="background:'+b.color+'22">'+ICONS[it.icon]+'</div>'+
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
        '<div class="stand-top"><span class="stand-name">'+found.s.name+'</span><span class="status-pill '+(found.s.open?'status-open':'status-closed')+'">'+(found.s.open?'OPEN':'CLOSED NOW')+'</span></div>'+
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
    var videoTile = e.target.closest('[data-video]');
    var favBtn = e.target.closest('#fav-toggle');
    var photoTile = e.target.closest('[data-photo-index]');

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
    if(videoTile){ document.getElementById('video-modal').hidden = false; return; }
    if(e.target.closest('#video-modal-close')){ document.getElementById('video-modal').hidden = true; return; }
    if(e.target.id === 'video-modal'){ document.getElementById('video-modal').hidden = true; return; }
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
})();
