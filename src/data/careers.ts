export type LifeIndicatorValue = "low" | "medium" | "high";

export type LifeIndicators = {
  ruhe: LifeIndicatorValue;
  menschen: LifeIndicatorValue;
  bewegung: LifeIndicatorValue;
  struktur: LifeIndicatorValue;
  sichtbaresErgebnis: LifeIndicatorValue;
};

export type Career = {
  slug: string;
  title: string;
  short: string;
  atmosphere: string;
  secretlyLike: string;
  annoys: string;
  comfortableFor: string;
  color: string;
  tags: string[];
  lifeIndicators: LifeIndicators;
  practicalSignals: string[];
  realSentences: string[];
  realism: {
    underestimated: string[];
    afterDay: string;
    entry: string[];
    localTexture: string;
  };
  searchKeywords?: string[];
  discoveryNote: string;
  discoveryGroup: string;
  laterNotices: string[];
  observations: string[];
  emotionalPathways: {
    prompt: string;
    note: string;
    slugs: string[];
  }[];
  typicalTuesday: {
    time: string;
    text: string;
  }[];
  dayMoments: {
    timeLabel: string;
    text: string;
    realSentence?: string;
  }[];
  whyItMightFit: string;
};

export type Situation = {
  prompt: string;
  note: string;
  slugs: string[];
};

const careerEntries: Omit<
  Career,
  | "dayMoments"
  | "laterNotices"
  | "lifeIndicators"
  | "practicalSignals"
  | "realSentences"
  | "realism"
>[] = [
  {
    slug: "fachinformatiker-systemintegration",
    title: "Fachinformatiker Systemintegration",
    searchKeywords: ["it", "it-systeme", "systemintegration", "computer", "technik"],
    short:
      "Für Leute, die lieber herausfinden, warum etwas nicht läuft, als einfach nochmal neu zu starten.",
    atmosphere:
      "Ruhige Räume, Kabel unter Tischen, Tickets mit zu wenig Infos. Und irgendwann dieser Moment, in dem nach zwei Stunden plötzlich wieder alles funktioniert.",
    secretlyLike:
      "Dass man oft im Hintergrund den Tag rettet, ohne groß darüber zu reden.",
    annoys:
      "Wenn jemand sagt: „Ich hab nichts gemacht“, und natürlich wurde sehr viel gemacht.",
    comfortableFor:
      "Menschen, die nicht sofort eine Antwort brauchen, sondern so lange nachschauen, bis es Sinn ergibt.",
    color: "from-[#9fb79a]/28 to-[#2b2a21]/30",
    tags: ["ruhig", "technisch", "dranbleiben"],
    discoveryNote:
      "Überraschend passend für ruhige Leute, die Chaos schnell müde macht.",
    discoveryGroup: "Wenn du lieber erstmal nachschaust",
    observations: [
      "Du merkst irgendwann automatisch, wenn etwas schlecht organisiert ist.",
      "Manche bleiben nicht wegen Technik. Sondern wegen der Ruhe, wenn niemand gerade etwas von ihnen will.",
      "Du entwickelst Geduld für Dinge, die andere nach zehn Minuten wütend machen.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Ruhe gefällt",
        note: "Nicht komplett allein, aber oft genug in deinem eigenen Kopf.",
        slugs: ["bauzeichner", "mediengestalter", "fachkraft-lagerlogistik"],
      },
      {
        prompt: "Wenn dir eher das Problemlösen gefällt",
        note: "Andere Baustelle, gleiches Gefühl: suchen, testen, nochmal messen.",
        slugs: ["elektroniker", "mechatroniker", "industriemechaniker"],
      },
      {
        prompt: "Wenn du doch mehr echte Menschen im Tag brauchst",
        note: "Weniger Bildschirm, mehr direktes Reagieren.",
        slugs: ["pflegefachkraft", "notfallsanitaeter", "medizinische-fachangestellte"],
      },
    ],
    whyItMightFit:
      "Wenn du gern Dinge auseinanderdenkst und es dich nicht nervt, wenn eine Lösung erst beim dritten Versuch auftaucht.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Erstmal schauen, was über Nacht kaputt gegangen ist. Meistens ist es weniger dramatisch, als es klingt.",
      },
      {
        time: "Irgendwann später",
        text: "Ein Problem nachbauen, das bei dir natürlich nicht sofort passiert. Das gehört fast schon dazu.",
      },
      {
        time: "Mittags",
        text: "Essen, kurz Handy, kurz nicht an Passwörter denken.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Jemandem erklären, dass es nicht „das Internet“ war. So freundlich wie möglich.",
      },
      {
        time: "Kurz vor Feierabend",
        text: "Aufschreiben, was geholfen hat, weil du es sonst morgen selbst vergisst.",
      },
    ],
  },
  {
    slug: "elektroniker",
    title: "Elektroniker",
    searchKeywords: ["elektro", "elektrik", "handwerk", "technik"],
    short: "Für Leute, die lieber etwas reparieren als lange darüber reden.",
    atmosphere:
      "Werkzeug, Staub, kalte Finger, Pläne, die nicht ganz zur Wand passen. Und am Ende geht das Licht an.",
    secretlyLike:
      "Wenn man etwas anschließt, misst, nochmal nachzieht und es dann einfach funktioniert.",
    annoys:
      "Schlecht vorbereitete Baustellen, Kabelsalat, Kälte und Menschen, die „nur kurz“ sagen.",
    comfortableFor:
      "Menschen, die gerne unterwegs sind, mitdenken und kein Problem damit haben, sich auch mal dreckig zu machen.",
    color: "from-[#a8b58c]/28 to-[#24221b]/30",
    tags: ["praktisch", "präzise", "unterwegs"],
    discoveryNote:
      "Für Leute, die lieber machen als reden. Nicht immer leicht, aber sehr echt.",
    discoveryGroup: "Wenn du sehen willst, was du geschafft hast",
    observations: [
      "Manchmal fühlt es sich gut an, einfach etwas sichtbar fertig gemacht zu haben.",
      "Du entwickelst ein Auge für schiefe Dinge, lose Kabel und schlecht geplante Ecken.",
      "Nicht jeder Tag ist angenehm. Aber oft weißt du abends ziemlich genau, was du gemacht hast.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Problemlösen gefällt",
        note: "Weniger Staub, mehr Systeme. Das Suchen bleibt.",
        slugs: ["fachinformatiker-systemintegration", "mechatroniker"],
      },
      {
        prompt: "Wenn dir daran eher das Sichtbare gefällt",
        note: "Auch hier sieht man am Ende, ob etwas stimmt. Nur anders.",
        slugs: ["tischler", "mediengestalter", "florist"],
      },
      {
        prompt: "Wenn du Bewegung magst, aber mehr Menschen im Tag brauchst",
        note: "Nicht ruhiger. Aber manchmal näher an dem, was gerade zählt.",
        slugs: ["notfallsanitaeter", "pflegefachkraft", "veranstaltungstechniker"],
      },
    ],
    whyItMightFit:
      "Wenn du gern siehst, was du geschafft hast, statt nur darüber zu sprechen.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Material laden. Irgendein Teil fehlt trotzdem, das ist fast Tradition.",
      },
      {
        time: "Auf der Baustelle",
        text: "Leitungen prüfen und herausfinden, warum der Plan nicht ganz stimmt.",
      },
      {
        time: "Pause",
        text: "Draußen sitzen. Jacke anlassen. Nicht viel sagen müssen.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Anlage anschließen, messen, nochmal messen, dann erst zufrieden sein.",
      },
      {
        time: "Kurz vor Feierabend",
        text: "Werkzeug einpacken. Morgen eine andere Wand, ein anderes Problem.",
      },
    ],
  },
  {
    slug: "pflegefachkraft",
    title: "Pflegefachkraft",
    searchKeywords: ["pflege", "gesundheit", "krankenpflege", "menschen"],
    short:
      "Für Leute, die mit Menschen klarkommen, auch wenn ein Tag nicht sauber und ordentlich ist.",
    atmosphere:
      "Flure, Klingeln, Kaffee, Hände waschen, kurze Sätze zwischen Türen. Viel Nähe, viel Routine, manchmal ein Satz, der hängen bleibt.",
    secretlyLike:
      "Wenn jemand ruhiger wird, weil du da bist. Nicht wegen großer Worte, eher wegen kleinen Dingen.",
    annoys:
      "Zu wenig Zeit, zu viel Dokumentation und dass manche Arbeit erst auffällt, wenn sie niemand macht.",
    comfortableFor:
      "Menschen, die praktisch helfen können, ohne jedes Mal ein großes Ding daraus zu machen.",
    color: "from-[#9eb7ad]/28 to-[#24221b]/30",
    tags: ["nah", "sinnvoll", "lebendig"],
    discoveryNote: "Für Leute, die merken, wenn jemand gerade nicht okay ist.",
    discoveryGroup: "Wenn Nähe dich nicht sofort abschreckt",
    observations: [
      "Du merkst irgendwann an kleinen Dingen, wenn jemand heute anders ist.",
      "Manche Tage sind nicht schön. Aber sie sind echt.",
      "Nach manchen Schichten willst du sitzen, duschen und erstmal keine Frage beantworten.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Nähe gefällt",
        note: "Noch direkter, noch unplanbarer, manchmal auch ehrlicher.",
        slugs: ["notfallsanitaeter", "erzieher"],
      },
      {
        prompt: "Wenn du Menschen brauchst, aber weniger körperliche Arbeit",
        note: "Immer noch viel Wahrnehmung. Nur mit mehr Abstand.",
        slugs: ["medizinische-fachangestellte", "zugbegleiter", "verkaeufer"],
      },
      {
        prompt: "Wenn du nach der Schicht lieber weniger reden willst",
        note: "Praktisch bleiben, aber mit mehr Werkzeug und weniger Flur.",
        slugs: ["elektroniker", "tischler", "fachkraft-lagerlogistik"],
      },
    ],
    whyItMightFit:
      "Wenn du nicht vor echtem Alltag zurückschreckst und Menschen auch dann ernst nimmst, wenn es anstrengend ist.",
    typicalTuesday: [
      {
        time: "Früh am Morgen",
        text: "Übergabe. Drei Dinge merken, während schon jemand klingelt.",
      },
      {
        time: "Vormittags",
        text: "Waschen, erklären, beruhigen. Manchmal alles gleichzeitig.",
      },
      {
        time: "Zwischendurch",
        text: "Medikamente, Dokumentation, kurzer Blick: Wer wirkt heute anders?",
      },
      {
        time: "Gegen Nachmittag",
        text: "Ein Gespräch, das eigentlich keine Zeit hatte, aber trotzdem wichtig war.",
      },
      {
        time: "Beim Rausgehen",
        text: "Müde sein und hoffen, dass man nichts vergessen hat.",
      },
    ],
  },
  {
    slug: "mediengestalter",
    title: "Mediengestalter",
    searchKeywords: ["design", "gestaltung", "kreativ", "medien"],
    short:
      "Für Leute, die merken, wenn etwas irgendwie falsch aussieht, auch wenn sie noch nicht sagen können, warum.",
    atmosphere:
      "Zu viele Tabs offen, alte Screenshots im Download-Ordner, Farben, die fast gleich aussehen. Viel Probieren, bis es nicht mehr stört.",
    secretlyLike:
      "Wenn jemand sagt: „Genau so meinte ich das“, obwohl vorher niemand genau wusste, was gemeint war.",
    annoys:
      "Unklare Wünsche, „mach mal moderner“ und Änderungen, die fünf Minuten vor Schluss kommen.",
    comfortableFor:
      "Menschen, die Details sehen, aber lernen müssen, nicht an jedem Pixel hängen zu bleiben.",
    color: "from-[#b7b090]/28 to-[#24221b]/30",
    tags: ["visuell", "sensibel", "geduldig"],
    discoveryNote:
      "Kann überraschend satisfying sein, wenn dich kleine Details nicht loslassen.",
    discoveryGroup: "Wenn du merkst, dass etwas noch nicht stimmt",
    observations: [
      "Du wirst irgendwann automatisch schlechte Logos bemerken. Auch wenn du frei hast.",
      "Manchmal fühlt sich ein guter Abstand zwischen zwei Elementen ernsthaft wie Erleichterung an.",
      "Du lernst, dass Geschmack nicht immer fair ist. Und dass man trotzdem weitermacht.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die stille Konzentration gefällt",
        note: "Weniger Geschmackssache, mehr: Warum klappt das gerade nicht?",
        slugs: ["fachinformatiker-systemintegration", "bauzeichner"],
      },
      {
        prompt: "Wenn du lieber mit den Händen denkst",
        note: "Raus aus dem Layout, rein in Dinge, die am Ende wirklich stehen.",
        slugs: ["tischler", "florist", "elektroniker"],
      },
      {
        prompt: "Wenn dir der Trubel hinter Veranstaltungen gefällt",
        note: "Mehr Druck, mehr Menschen, weniger Bildschirmruhe.",
        slugs: ["veranstaltungstechniker"],
      },
    ],
    whyItMightFit:
      "Wenn du gern etwas sichtbar machst und damit leben kannst, dass Geschmack manchmal unfair wirkt.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Referenzen sammeln und merken, dass drei Ideen doch dieselbe Idee sind.",
      },
      {
        time: "Später",
        text: "Layout bauen, löschen, nochmal bauen. Diesmal mit weniger Chaos.",
      },
      {
        time: "Nach Feedback",
        text: "Kurz nicht beleidigt sein. Dann merken, dass ein Satz vielleicht doch stimmt.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Abstände korrigieren, die außer dir vielleicht niemand sieht.",
      },
      {
        time: "Kurz vor Schluss",
        text: "Exportieren. Datei heißt final_final_neu, natürlich.",
      },
    ],
  },
  {
    slug: "notfallsanitaeter",
    title: "Notfallsanitäter",
    searchKeywords: ["rettung", "rettungsdienst", "sani", "sanitäter", "notfall", "medizin", "gesundheit"],
    short:
      "Für Leute, die in unübersichtlichen Momenten nicht sofort weg wollen.",
    atmosphere:
      "Funkgerät, Blaulicht, kalte Luft morgens um sieben. Manchmal Drama, manchmal nur jemand, der Angst hat und nicht allein sein will.",
    secretlyLike:
      "Dass man sehr schnell merkt, ob man gerade hilfreich ist. Nicht perfekt, aber da.",
    annoys:
      "Warten, Papierkram, dumme Kommentare am Einsatzort und Tage, die noch im Kopf bleiben, obwohl Schichtende war.",
    comfortableFor:
      "Menschen, die direkt sein können, aber nicht hart werden müssen.",
    color: "from-[#b99d91]/28 to-[#24221b]/30",
    tags: ["direkt", "menschlich", "wach"],
    discoveryNote:
      "Nicht nur Action. Manchmal geht es einfach darum, nicht hektisch zu werden.",
    discoveryGroup: "Wenn du in echten Momenten klarer wirst",
    observations: [
      "Nach manchen Schichten willst du einfach kurz niemanden hören.",
      "Du lernst, ruhig zu wirken, auch wenn innerlich noch alles sortiert wird.",
      "Manche Einsätze bleiben nicht wegen Blut oder Blaulicht hängen, sondern wegen einem Blick.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Menschliche gefällt",
        note: "Mehr Alltag, weniger Blaulicht, aber trotzdem sehr nah dran.",
        slugs: ["pflegefachkraft", "medizinische-fachangestellte"],
      },
      {
        prompt: "Wenn du eher Ruhe nach Chaos suchst",
        note: "Probleme bleiben, aber sie schreien seltener zurück.",
        slugs: ["fachinformatiker-systemintegration", "bauzeichner"],
      },
      {
        prompt: "Wenn dir Bewegung gefällt, aber weniger Ausnahmezustand",
        note: "Unterwegs sein, praktisch arbeiten, abends wissen, was gemacht wurde.",
        slugs: ["elektroniker", "zugbegleiter", "veranstaltungstechniker"],
      },
    ],
    whyItMightFit:
      "Wenn du nicht alles planen musst und trotzdem ruhig bleiben kannst, wenn andere kurz die Orientierung verlieren.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Fahrzeug checken. Irgendwas fehlt fast immer, und irgendwer weiß meistens, wo es liegt.",
      },
      {
        time: "Beim ersten Einsatz",
        text: "Zuhören, sortieren, nicht hektischer werden als die Situation.",
      },
      {
        time: "Zwischendurch",
        text: "Zurück auf Wache. Bericht schreiben, Kaffee, kurz still werden.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Transport ins Krankenhaus. Übergabe, die kurz und klar sein muss, auch wenn der Tag nicht klar war.",
      },
      {
        time: "Nach der Schicht",
        text: "Körper zuhause, Kopf manchmal noch im Fahrzeug.",
      },
    ],
  },
  {
    slug: "fachkraft-lagerlogistik",
    title: "Fachkraft für Lagerlogistik",
    searchKeywords: ["lager", "logistik", "ordnung", "waren", "stapler"],
    short:
      "Für Leute, die merken, dass Ordnung manchmal weniger spießig ist, als sie klingt.",
    atmosphere:
      "Hallenluft, Scanner, Paletten, Staplerpiepen. Viel Bewegung, wenig Show, und ständig die Frage: Wo ist das Teil wirklich?",
    secretlyLike:
      "Wenn am Ende alles dort steht, wo es stehen soll, und niemand lange suchen muss.",
    annoys:
      "Falsch beschriftete Ware, Zeitdruck, schwere Sachen und Systeme, die langsamer sind als du.",
    comfortableFor:
      "Menschen, die gern praktisch arbeiten und dabei im Kopf sortieren, ohne viel darüber zu reden.",
    color: "from-[#a9b28c]/28 to-[#24221b]/30",
    tags: ["geordnet", "körperlich", "direkt"],
    discoveryNote:
      "Manche mögen daran erst später, dass der Tag klarer ist als viele andere Tage.",
    discoveryGroup: "Wenn Struktur dich beruhigt",
    observations: [
      "Du merkst irgendwann automatisch, wenn ein Regal keinen Sinn ergibt.",
      "Manche bleiben nicht wegen der Ware. Sondern wegen der Ruhe in klaren Abläufen.",
      "Es ist komisch befriedigend, wenn eine Lieferung genau aufgeht.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Struktur gefällt",
        note: "Auch dort zählt, dass Dinge richtig liegen. Nur digitaler.",
        slugs: ["fachinformatiker-systemintegration", "kaufmann-bueromanagement"],
      },
      {
        prompt: "Wenn du lieber sichtbarer baust",
        note: "Mehr Werkzeug, mehr Material, weniger Scanner.",
        slugs: ["tischler", "elektroniker", "industriemechaniker"],
      },
      {
        prompt: "Wenn du Bewegung willst, aber mehr Menschen",
        note: "Unterwegs bleiben, mit mehr Kontakt und mehr spontanen Momenten.",
        slugs: ["zugbegleiter", "verkaeufer"],
      },
    ],
    whyItMightFit:
      "Wenn du Chaos nicht wegredest, sondern lieber anfängst, es zu sortieren.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Wareneingang. Kartons, Lieferscheine, ein Teil, das anders heißt als erwartet.",
      },
      {
        time: "Später in der Halle",
        text: "Mit dem Scanner durch Gänge laufen und innerlich schon wissen, dass etwas falsch abgelegt wurde.",
      },
      {
        time: "Mittendrin",
        text: "Kurz schwitzen, kurz fluchen, dann doch eine Lösung finden.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Aufträge zusammenstellen. Nicht schön, aber wenn es passt, passt es.",
      },
      {
        time: "Vor dem Gehen",
        text: "Noch einmal schauen, ob morgen jemand über dein Chaos stolpert.",
      },
    ],
  },
  {
    slug: "mechatroniker",
    title: "Mechatroniker",
    searchKeywords: ["kfz", "mechanik", "mechatronik", "maschinen", "technik"],
    short:
      "Für Leute, die nicht nur wissen wollen, dass etwas kaputt ist, sondern wo genau es anfängt.",
    atmosphere:
      "Maschinen, Messgeräte, Ölgeruch, Schrauben, Kabel und Pläne, die erst beim dritten Blick Sinn ergeben.",
    secretlyLike:
      "Wenn eine Maschine nach langem Suchen wieder sauber läuft und alle plötzlich etwas ruhiger werden.",
    annoys:
      "Fehler, die nur manchmal auftreten, enge Stellen, alte Anlagen und der Satz: „Gestern ging es noch.“",
    comfortableFor:
      "Menschen, die Technik nicht nur anschauen, sondern anfassen und verstehen wollen.",
    color: "from-[#9db0a4]/28 to-[#24221b]/30",
    tags: ["technisch", "praktisch", "genau"],
    discoveryNote:
      "Für Leute, die gerne suchen, messen, schrauben und nicht sofort aufgeben.",
    discoveryGroup: "Wenn Maschinen dich nicht abschrecken",
    observations: [
      "Du lernst, Geräusche ernst zu nehmen, die andere gar nicht hören.",
      "Manchmal ist der Fehler winzig und der halbe Tag trotzdem weg.",
      "Es fühlt sich kurz unfair gut an, wenn ein Problem endlich nachgibt.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Messen gefällt",
        note: "Noch elektrischer, noch genauer, oft etwas direkter.",
        slugs: ["elektroniker", "industriemechaniker"],
      },
      {
        prompt: "Wenn du lieber Systeme als Maschinen magst",
        note: "Weniger Öl, mehr Kabelsalat im Kopf.",
        slugs: ["fachinformatiker-systemintegration"],
      },
      {
        prompt: "Wenn du lieber zeichnest, bevor gebaut wird",
        note: "Mehr Plan, weniger Lärm. Aber trotzdem echte Dinge.",
        slugs: ["bauzeichner"],
      },
    ],
    whyItMightFit:
      "Wenn du mit Frust umgehen kannst, solange du irgendwann verstehst, was los war.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Anlage anschauen, Meldung lesen, schon ahnen, dass es nicht nur ein Knopf ist.",
      },
      {
        time: "Beim Suchen",
        text: "Messen, öffnen, wieder schließen. Der Fehler tut so, als wäre er weg.",
      },
      {
        time: "Zwischendurch",
        text: "Ein Kollege sagt einen halben Satz, der plötzlich alles erklärt.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Teil tauschen, Testlauf starten, leise hoffen.",
      },
      {
        time: "Am Ende",
        text: "Werkzeug weg. Maschine läuft. Niemand klatscht, aber alle merken es.",
      },
    ],
  },
  {
    slug: "erzieher",
    title: "Erzieher",
    short:
      "Für Leute, die kleine Menschen ernst nehmen können, ohne den ganzen Tag laut zu werden.",
    atmosphere:
      "Jacken, Brotdosen, Streit um Spielzeug, kleine Hände, viel Lärm und manchmal ein Satz, der ehrlicher ist als alles von Erwachsenen.",
    secretlyLike:
      "Wenn ein Kind dir vertraut, ohne dass es eine große Szene daraus macht.",
    annoys:
      "Dauerlärm, Elternstress, zu wenig Personal und Tage, an denen alle gleichzeitig etwas brauchen.",
    comfortableFor:
      "Menschen, die Wärme haben, aber Grenzen nicht komplett vergessen.",
    color: "from-[#b6aa8f]/28 to-[#24221b]/30",
    tags: ["lebendig", "nah", "geduldig"],
    discoveryNote:
      "Nicht süß im Instagram-Sinn. Eher echt, laut, chaotisch und manchmal sehr schön.",
    discoveryGroup: "Wenn du Menschen früh ernst nimmst",
    observations: [
      "Du lernst, zwischen laut und wirklich schlimm zu unterscheiden.",
      "Manche Tage hängen an einem Kind, das plötzlich wieder mitmacht.",
      "Nach Feierabend hörst du manchmal noch Stimmen, obwohl es still ist.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Nähe gefällt",
        note: "Ähnlich menschlich, aber mit einem anderen Rhythmus.",
        slugs: ["pflegefachkraft", "medizinische-fachangestellte"],
      },
      {
        prompt: "Wenn dich der Lärm schnell leer macht",
        note: "Mehr Ruhe, mehr Gegenstände, weniger dauerndes Reagieren.",
        slugs: ["florist", "tischler", "bauzeichner"],
      },
      {
        prompt: "Wenn du gern erklärst, aber weniger Kindertrubel willst",
        note: "Immer noch Kontakt. Nur erwachsener und oft kürzer.",
        slugs: ["verkaeufer", "zugbegleiter"],
      },
    ],
    whyItMightFit:
      "Wenn du Geduld nicht mit Nettsein verwechselst und trotzdem gern nah an echten Tagen bist.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Ankommen. Schuhe suchen. Tränen wegen etwas, das für Erwachsene klein aussieht.",
      },
      {
        time: "Vormittags",
        text: "Vorlesen, streiten schlichten, nochmal vorlesen, weil jemand nur so ruhig wird.",
      },
      {
        time: "Mittendrin",
        text: "Ein Kind sagt etwas komplett Logisches und komplett Unerwartetes.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Eltern abholen, kurze Sätze, wichtige Dinge nicht vergessen.",
      },
      {
        time: "Nach dem Aufräumen",
        text: "Der Raum sieht wieder aus wie ein Raum. Für ungefähr zehn Minuten.",
      },
    ],
  },
  {
    slug: "verkaeufer",
    title: "Verkäufer",
    short:
      "Für Leute, die mit Menschen umgehen können, auch wenn manche es einem nicht leicht machen.",
    atmosphere:
      "Regale, Kasse, Schritte auf hartem Boden, kurze Fragen, lange Schlangen und Ware, die nie dort bleibt, wo sie soll.",
    secretlyLike:
      "Wenn du jemandem schnell helfen kannst und der Tag für beide kurz leichter wird.",
    annoys:
      "Unfreundliche Kunden, dauerndes Stehen, Aktionen, Preisschilder und die Frage, ob noch etwas im Lager ist.",
    comfortableFor:
      "Menschen, die wach bleiben, freundlich sein können und trotzdem innerlich eine Grenze behalten.",
    color: "from-[#b1a88f]/28 to-[#24221b]/30",
    tags: ["direkt", "wach", "alltag"],
    discoveryNote:
      "Nicht glamorous, aber sehr real. Du lernst schnell, wie Menschen so drauf sind.",
    discoveryGroup: "Wenn du Alltag aushältst",
    observations: [
      "Du erkennst irgendwann an Schritten, ob jemand gleich etwas fragt.",
      "Manche Menschen sind überraschend nett. Andere nicht. Beides prägt den Tag.",
      "Nach einer langen Schicht willst du manchmal einfach nur sitzen.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir der Kontakt gefällt",
        note: "Mehr Verantwortung im Moment, oft weniger Verkaufsgespräch.",
        slugs: ["zugbegleiter", "medizinische-fachangestellte", "pflegefachkraft"],
      },
      {
        prompt: "Wenn du lieber im Hintergrund sortierst",
        note: "Weniger Kundengespräche, mehr Ablauf.",
        slugs: ["fachkraft-lagerlogistik", "kaufmann-bueromanagement"],
      },
      {
        prompt: "Wenn dir die schönen Dinge daran gefallen",
        note: "Mehr Gestaltung, weniger Kasse.",
        slugs: ["florist", "friseur"],
      },
    ],
    whyItMightFit:
      "Wenn du nicht jeden Tag perfekt finden musst und trotzdem gern merkst, was Menschen brauchen.",
    typicalTuesday: [
      {
        time: "Vor Ladenöffnung",
        text: "Regale auffüllen, Preisschilder prüfen, schon sehen, was später wieder fehlt.",
      },
      {
        time: "Vormittags",
        text: "Jemand sucht etwas sehr Bestimmtes und beschreibt es sehr unbestimmt.",
      },
      {
        time: "An der Kasse",
        text: "Scannen, lächeln, kurz warten, weil der Bon natürlich klemmt.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Ware verräumen, während dich drei Menschen gleichzeitig anschauen.",
      },
      {
        time: "Nach Ladenschluss",
        text: "Aufräumen. Den Laden wieder so tun lassen, als wäre nichts passiert.",
      },
    ],
  },
  {
    slug: "koch",
    title: "Koch",
    short:
      "Für Leute, die Druck nicht romantisieren, aber trotzdem gern sehen, wenn etwas direkt rausgeht.",
    atmosphere:
      "Hitze, Messer, Pfannen, Zurufe, volle Bonleisten. Wenig Platz, viel Timing, manchmal ein stiller Stolz nach dem Service.",
    secretlyLike:
      "Wenn ein Teller genauso rausgeht, wie er soll, und niemand dafür eine Besprechung braucht.",
    annoys:
      "Stressspitzen, Schnitte, schlechte Planung, kaputte Geräte und Leute, die denken, Kochen sei immer entspannt.",
    comfortableFor:
      "Menschen, die schnell arbeiten können, ohne bei jedem Fehler komplett auszusteigen.",
    color: "from-[#b49a86]/28 to-[#24221b]/30",
    tags: ["intensiv", "handwerk", "tempo"],
    discoveryNote:
      "Kann hart sein. Aber wenn du Rhythmus magst, kann es sich sehr klar anfühlen.",
    discoveryGroup: "Wenn Tempo dich eher wach macht",
    observations: [
      "Du merkst irgendwann am Geräusch, ob etwas gleich anbrennt.",
      "Nach dem Service ist man müde auf eine sehr körperliche Art.",
      "Manchmal ist ein sauberer Arbeitsplatz der einzige ruhige Gedanke im Raum.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Handwerk gefällt",
        note: "Weniger Hitze, mehr Material, trotzdem sichtbar.",
        slugs: ["tischler", "florist", "friseur"],
      },
      {
        prompt: "Wenn dir der Druck zu viel wird",
        note: "Mehr Struktur, weniger Service-Spitzen.",
        slugs: ["fachkraft-lagerlogistik", "industriemechaniker"],
      },
      {
        prompt: "Wenn dir das Live-Gefühl gefällt",
        note: "Auch dort passiert viel genau dann, wenn es passieren muss.",
        slugs: ["veranstaltungstechniker", "notfallsanitaeter"],
      },
    ],
    whyItMightFit:
      "Wenn du gern mit den Händen denkst und ein Tag für dich ruhig auch mal intensiv sein darf.",
    typicalTuesday: [
      {
        time: "Vor dem Service",
        text: "Schneiden, vorbereiten, Listen im Kopf sortieren.",
      },
      {
        time: "Wenn es losgeht",
        text: "Plötzlich sprechen alle kürzer. Nicht unfreundlich, eher notwendig.",
      },
      {
        time: "Mittendrin",
        text: "Drei Sachen gleichzeitig. Eine davon darf nicht zu dunkel werden.",
      },
      {
        time: "Nach der Spitze",
        text: "Kurz trinken, kurz atmen, dann weiter sauber machen.",
      },
      {
        time: "Beim Rausgehen",
        text: "Die Kleidung riecht nach Küche. Der Kopf oft auch.",
      },
    ],
  },
  {
    slug: "tischler",
    title: "Tischler",
    short:
      "Für Leute, die gern mit den Händen denken und am Ende etwas anfassen können.",
    atmosphere:
      "Holzstaub, Maschinen, Schleifpapier, Maßband, kleine Ungenauigkeiten, die später jeder sieht, wenn du sie nicht ernst nimmst.",
    secretlyLike:
      "Wenn etwas passt, ohne zu klemmen. Dieser kleine Moment ist schwer zu erklären.",
    annoys:
      "Vermessene Teile, Splitter, laute Maschinen, schwere Platten und Kundenwünsche, die physikalisch nicht ganz wollen.",
    comfortableFor:
      "Menschen, die ruhig genau sein können und nicht sofort nervös werden, wenn etwas länger dauert.",
    color: "from-[#b09a7f]/28 to-[#24221b]/30",
    tags: ["handwerk", "ruhig", "sichtbar"],
    discoveryNote:
      "Für Leute, die lieber etwas bauen als lange darüber zu reden, wie etwas wirken soll.",
    discoveryGroup: "Wenn Material dich beruhigt",
    observations: [
      "Du entwickelst Respekt vor einem Millimeter.",
      "Manchmal riecht ein guter Arbeitstag einfach nach Holz und Staub.",
      "Es ist angenehm ehrlich, wenn etwas passt. Und sehr nervig, wenn nicht.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Material gefällt",
        note: "Auch schön, auch händisch, nur viel feiner und vergänglicher.",
        slugs: ["florist", "friseur"],
      },
      {
        prompt: "Wenn du mehr Technik im Handwerk willst",
        note: "Mehr Strom, mehr Messung, andere Fehler.",
        slugs: ["elektroniker", "mechatroniker"],
      },
      {
        prompt: "Wenn du lieber planst als baust",
        note: "Mehr Linien, weniger Staub. Aber immer noch echte Räume.",
        slugs: ["bauzeichner"],
      },
    ],
    whyItMightFit:
      "Wenn dich sichtbare Arbeit beruhigt und du Geduld für Dinge hast, die nicht sofort fertig sind.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Maße prüfen. Nochmal prüfen, weil später keiner wissen will, warum es nicht passt.",
      },
      {
        time: "In der Werkstatt",
        text: "Zusägen, schleifen, kurz nichts sagen, weil die Maschine zu laut ist.",
      },
      {
        time: "Zwischendurch",
        text: "Ein Teil ist minimal schief. Minimal reicht leider.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Montieren, nachjustieren, mit der Hand über die Kante gehen.",
      },
      {
        time: "Am Ende",
        text: "Staub überall. Aber auch etwas, das vorher nicht da war.",
      },
    ],
  },
  {
    slug: "bauzeichner",
    title: "Bauzeichner",
    short:
      "Für Leute, die Räume gern verstehen, bevor irgendjemand anfängt, Wände zu bauen.",
    atmosphere:
      "Pläne, Maße, CAD, Rückfragen, Linien, die später echte Kanten werden. Viel Genauigkeit, wenig Drama, aber Fehler bleiben teuer.",
    secretlyLike:
      "Wenn ein Plan plötzlich sauber wirkt und alle verstehen, was gemeint ist.",
    annoys:
      "Änderungen kurz vor Abgabe, unklare Maße, alte Unterlagen und Details, die erst auffallen, wenn alles fertig schien.",
    comfortableFor:
      "Menschen, die ruhig und genau arbeiten können, ohne ständig im Mittelpunkt sein zu wollen.",
    color: "from-[#9da997]/28 to-[#24221b]/30",
    tags: ["ruhig", "genau", "planen"],
    discoveryNote:
      "Für Leute, die lieber still etwas ordnen, bevor es draußen teuer und laut wird.",
    discoveryGroup: "Wenn du Räume im Kopf sortierst",
    observations: [
      "Du merkst irgendwann, dass ein Raum auf Papier schon komisch wirken kann.",
      "Manchmal ist eine saubere Linie weniger langweilig, als andere denken.",
      "Du lernst, dass kleine Fehler sehr reale Folgen haben können.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Ruhe gefällt",
        note: "Ähnlich konzentriert, nur mit anderen Werkzeugen.",
        slugs: ["mediengestalter", "fachinformatiker-systemintegration"],
      },
      {
        prompt: "Wenn du lieber raus aus dem Plan willst",
        note: "Mehr Staub, mehr Hände, weniger Bildschirm.",
        slugs: ["tischler", "elektroniker"],
      },
      {
        prompt: "Wenn dir Maschinenlogik mehr liegt",
        note: "Auch technisch, aber beweglicher und lauter.",
        slugs: ["mechatroniker", "industriemechaniker"],
      },
    ],
    whyItMightFit:
      "Wenn du gern genau hinschaust und dich nicht langweilst, nur weil etwas leise passiert.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Plan öffnen und kurz wieder reinfinden, was gestern noch selbstverständlich war.",
      },
      {
        time: "Beim Zeichnen",
        text: "Maße anpassen, Layer sortieren, merken, dass eine Tür plötzlich keinen Sinn ergibt.",
      },
      {
        time: "Nach einer Rückfrage",
        text: "Etwas ändern, das eigentlich schon fertig war. Natürlich.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Details kontrollieren. Nicht spannend, aber wichtig.",
      },
      {
        time: "Vor dem Speichern",
        text: "Nochmal rauszoomen und schauen, ob der Plan atmet oder nur voll ist.",
      },
    ],
  },
  {
    slug: "industriemechaniker",
    title: "Industriemechaniker",
    short:
      "Für Leute, die große Dinge nicht einschüchtern, solange man sie Stück für Stück versteht.",
    atmosphere:
      "Werkhalle, Metall, Maschinen, Lärm, Öl, Werkzeuge und Teile, die nicht einfach irgendwie passen dürfen.",
    secretlyLike:
      "Wenn eine Anlage nach deiner Arbeit wieder läuft und der ganze Betrieb es indirekt merkt.",
    annoys:
      "Schwere Teile, enge Stellen, Schichtwechsel, stumpfe Werkzeuge und Fehler, die irgendwo tief in der Maschine sitzen.",
    comfortableFor:
      "Menschen, die körperlich arbeiten können und trotzdem genau im Kopf bleiben.",
    color: "from-[#9fa596]/28 to-[#24221b]/30",
    tags: ["mechanisch", "robust", "genau"],
    discoveryNote:
      "Für Leute, die keine Angst vor großen Maschinen haben, aber Respekt vor kleinen Abweichungen.",
    discoveryGroup: "Wenn Mechanik dich interessiert",
    observations: [
      "Du entwickelst ein Gefühl dafür, wann Metall nicht richtig klingt.",
      "Manchmal besteht Fortschritt darin, dass sich endlich eine Schraube bewegt.",
      "Es ist keine saubere Arbeit im Sinne von sauber. Aber oft sehr klar.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Maschine gefällt",
        note: "Noch mehr Verbindung zwischen Mechanik, Strom und Steuerung.",
        slugs: ["mechatroniker", "elektroniker"],
      },
      {
        prompt: "Wenn du mehr Ruhe und weniger Halle willst",
        note: "Technisch bleiben, aber mit mehr Bildschirm und weniger Lärm.",
        slugs: ["bauzeichner", "fachinformatiker-systemintegration"],
      },
      {
        prompt: "Wenn dir sichtbares Handwerk wichtiger ist",
        note: "Mehr Materialgefühl, weniger Industrieanlage.",
        slugs: ["tischler"],
      },
    ],
    whyItMightFit:
      "Wenn du gern praktisch arbeitest und Genauigkeit für dich nicht nach Schule, sondern nach Können klingt.",
    typicalTuesday: [
      {
        time: "Schichtbeginn",
        text: "Übergabe. Jemand sagt: „Die macht komische Geräusche.“ Mehr weiß man erstmal nicht.",
      },
      {
        time: "In der Halle",
        text: "Abdeckung runter, Werkzeug holen, merken, dass man anderes Werkzeug braucht.",
      },
      {
        time: "Mittendrin",
        text: "Ein Teil sitzt fest. Der Tag auch kurz.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Zusammenbauen, testen, nicht zu früh zufrieden sein.",
      },
      {
        time: "Am Ende",
        text: "Hände waschen. Es geht nicht alles ab.",
      },
    ],
  },
  {
    slug: "veranstaltungstechniker",
    title: "Veranstaltungstechniker",
    short:
      "Für Leute, die mögen, wenn hinter einem schönen Abend sehr viel unsichtbare Arbeit steckt.",
    atmosphere:
      "Cases, Kabel, Licht, Soundcheck, schwarze Kleidung, lange Wege, leere Hallen vor dem Einlass und Chaos kurz vor perfekt.",
    secretlyLike:
      "Wenn das Licht genau im richtigen Moment kommt und fast niemand weiß, wie viel Arbeit dahinter steckte.",
    annoys:
      "Schleppen, späte Uhrzeiten, Wetter, spontane Änderungen und Menschen, die „nur kurz“ noch etwas anders wollen.",
    comfortableFor:
      "Menschen, die anpacken können und unter Druck nicht sofort laut werden.",
    color: "from-[#8f9d94]/28 to-[#24221b]/30",
    tags: ["live", "technisch", "nachts"],
    discoveryNote:
      "Nicht glamourös. Eher Kabel, Rücken, Timing und kurz dieses Gefühl, wenn alles läuft.",
    discoveryGroup: "Wenn du gern hinter den Kulissen bist",
    observations: [
      "Du siehst leere Bühnen irgendwann anders als andere Menschen.",
      "Manchmal ist der beste Moment, wenn niemand merkt, dass du gerade etwas gerettet hast.",
      "Nach manchen Nächten fühlt sich Tageslicht ein bisschen unwirklich an.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Technik gefällt",
        note: "Weniger Publikum, mehr dauerhafte Systeme.",
        slugs: ["elektroniker", "mechatroniker"],
      },
      {
        prompt: "Wenn dir das Live-Gefühl gefällt",
        note: "Auch dort zählt, im Moment klar zu bleiben.",
        slugs: ["notfallsanitaeter", "koch"],
      },
      {
        prompt: "Wenn du lieber gestaltest als schleppst",
        note: "Mehr Bildschirm, weniger Flightcase.",
        slugs: ["mediengestalter"],
      },
    ],
    whyItMightFit:
      "Wenn du gern Teil von etwas bist, ohne vorne stehen zu müssen.",
    typicalTuesday: [
      {
        time: "Beim Aufbau",
        text: "Cases rollen, Kabel ziehen, kurz hoffen, dass wirklich alles da ist.",
      },
      {
        time: "Soundcheck",
        text: "Ein Brummen suchen, das keiner braucht und alle hören.",
      },
      {
        time: "Vor Einlass",
        text: "Die Halle ist leer, aber schon angespannt.",
      },
      {
        time: "Währenddessen",
        text: "Aufmerksam bleiben, obwohl du schon viele Stunden wach bist.",
      },
      {
        time: "Nach Abbau",
        text: "Alles wieder in Kisten. Der Abend verschwindet erstaunlich schnell.",
      },
    ],
  },
  {
    slug: "medizinische-fachangestellte",
    title: "Medizinische Fachangestellte",
    searchKeywords: ["mfa", "arztpraxis", "medizin", "gesundheit", "pflege"],
    short:
      "Für Leute, die freundlich bleiben können, während im Hintergrund schon drei Dinge warten.",
    atmosphere:
      "Telefon, Wartezimmer, Desinfektionsmittel, kurze Blicke, Termine, Blutdruck, Menschen mit Angst und Menschen ohne Geduld.",
    secretlyLike:
      "Wenn du jemanden beruhigst, ohne groß darüber zu sprechen.",
    annoys:
      "Dauertelefon, volle Wartezimmer, schlechte Laune, knappe Zeit und Formulare, die niemand freiwillig liebt.",
    comfortableFor:
      "Menschen, die organisieren können und trotzdem merken, dass vor ihnen ein Mensch sitzt.",
    color: "from-[#9fb5aa]/28 to-[#24221b]/30",
    tags: ["nah", "organisiert", "wach"],
    discoveryNote:
      "Viel Alltag, viel Taktgefühl. Manchmal reicht ein ruhiger Satz.",
    discoveryGroup: "Wenn du Ruhe in kleine Krisen bringst",
    observations: [
      "Du merkst schnell, wer nur genervt ist und wer wirklich Angst hat.",
      "Manche Tage bestehen aus hundert kleinen Unterbrechungen.",
      "Du lernst, freundlich kurz zu sein. Das ist eine eigene Fähigkeit.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Nähe gefällt",
        note: "Mehr Körper, mehr Pflege, mehr längere Begleitung.",
        slugs: ["pflegefachkraft", "notfallsanitaeter"],
      },
      {
        prompt: "Wenn dir eher das Organisieren gefällt",
        note: "Mehr Büro, weniger Blutdruckmanschette.",
        slugs: ["kaufmann-bueromanagement"],
      },
      {
        prompt: "Wenn du Kontakt willst, aber weniger Praxisdruck",
        note: "Immer noch Menschen, aber andere Art von Alltag.",
        slugs: ["verkaeufer", "zugbegleiter"],
      },
    ],
    whyItMightFit:
      "Wenn du mehrere Dinge im Blick behalten kannst, ohne den Menschen davor zu vergessen.",
    typicalTuesday: [
      {
        time: "Praxisstart",
        text: "Telefon blinkt schon, bevor der Tag richtig angefangen hat.",
      },
      {
        time: "Vormittags",
        text: "Termine sortieren, Menschen aufrufen, kurz erklären, was gleich passiert.",
      },
      {
        time: "Zwischendurch",
        text: "Jemand ist nervös. Du sagst nichts Großes, aber etwas Ruhiges.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Dokumentation, Rezepte, Rückfragen. Alles klingt klein, bis es fehlt.",
      },
      {
        time: "Nach Sprechstunde",
        text: "Wartezimmer leer. Kopf noch nicht ganz.",
      },
    ],
  },
  {
    slug: "kaufmann-bueromanagement",
    title: "Kaufmann für Büromanagement",
    searchKeywords: ["büro", "buero", "verwaltung", "organisation", "office"],
    short:
      "Für Leute, die merken, dass Ordnung im Hintergrund manchmal den ganzen Laden zusammenhält.",
    atmosphere:
      "Mails, Listen, Telefon, Kalender, Ablagen, kurze Rückfragen und die stille Macht eines Dokuments, das wirklich stimmt.",
    secretlyLike:
      "Wenn ein Durcheinander langsam wieder nachvollziehbar wird.",
    annoys:
      "Unklare Zuständigkeiten, endlose Mails, Drucker, die genau dann streiken, und Menschen, die nichts vollständig schicken.",
    comfortableFor:
      "Menschen, die ruhig sortieren können und nicht alles dramatisch finden müssen.",
    color: "from-[#a8b09b]/28 to-[#24221b]/30",
    tags: ["geordnet", "ruhig", "überblick"],
    discoveryNote:
      "Kann erstaunlich angenehm sein, wenn du Chaos lieber sortierst als es laut zu kommentieren.",
    discoveryGroup: "Wenn Überblick dich beruhigt",
    observations: [
      "Du merkst irgendwann, welche Mail später Ärger macht.",
      "Manche Arbeit sieht keiner. Bis sie nicht gemacht wurde.",
      "Ein gut benannter Ordner kann sich lächerlich befriedigend anfühlen.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Struktur gefällt",
        note: "Mehr Bewegung, aber ähnlich viel Sortieren.",
        slugs: ["fachkraft-lagerlogistik"],
      },
      {
        prompt: "Wenn du weniger Bürogefühl willst",
        note: "Mehr echte Räume, Hände und Menschen.",
        slugs: ["medizinische-fachangestellte", "florist", "verkaeufer"],
      },
      {
        prompt: "Wenn du lieber technische Probleme sortierst",
        note: "Ähnlicher Kopf, andere Art von Chaos.",
        slugs: ["fachinformatiker-systemintegration"],
      },
    ],
    whyItMightFit:
      "Wenn du gern Überblick schaffst und es dir nichts ausmacht, dass gute Arbeit oft leise bleibt.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Mails öffnen und sofort wissen, welche du lieber noch nicht öffnest.",
      },
      {
        time: "Vormittags",
        text: "Telefon, Termin, Rückfrage, nochmal Telefon. Nichts davon einzeln schwer, zusammen schon.",
      },
      {
        time: "Zwischendurch",
        text: "Eine Tabelle reparieren, die jemand sehr mutig benutzt hat.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Dokumente prüfen und Dinge finden, bevor sie später jemand vermisst.",
      },
      {
        time: "Vor Feierabend",
        text: "Schreibtisch kurz ordnen. Nicht perfekt, aber morgen weniger schlimm.",
      },
    ],
  },
  {
    slug: "friseur",
    title: "Friseur",
    short:
      "Für Leute, die nah an Menschen arbeiten können, ohne jedes Gespräch künstlich groß zu machen.",
    atmosphere:
      "Spiegel, Föhn, Haare auf dem Boden, Geruch von Shampoo, kleine Wünsche, große Unsicherheiten und sehr direkte Reaktionen.",
    secretlyLike:
      "Wenn jemand nach dem Schnitt anders in den Spiegel schaut als vorher.",
    annoys:
      "Stehen, volle Tage, unrealistische Bilder vom Handy und Gespräche, die man nicht immer führen wollte.",
    comfortableFor:
      "Menschen, die mit Nähe umgehen können und ein Auge für kleine Veränderungen haben.",
    color: "from-[#b5a090]/28 to-[#24221b]/30",
    tags: ["nah", "visuell", "handwerk"],
    discoveryNote:
      "Viel mehr als Haare. Manchmal geht es darum, dass jemand sich kurz wieder erkennt.",
    discoveryGroup: "Wenn Veränderung sichtbar sein soll",
    observations: [
      "Du lernst, dass „nur die Spitzen“ nicht immer nur die Spitzen heißt.",
      "Manche Menschen erzählen im Stuhl mehr als sie geplant hatten.",
      "Ein guter Schnitt ist manchmal leiser als ein Kompliment.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Gestalten gefällt",
        note: "Weniger Nähe, mehr Fläche, aber ähnlich viel Gefühl für Form.",
        slugs: ["mediengestalter", "florist"],
      },
      {
        prompt: "Wenn du lieber mit Material als Menschen arbeitest",
        note: "Mehr Holz, weniger Smalltalk.",
        slugs: ["tischler"],
      },
      {
        prompt: "Wenn dir das Helfende daran gefällt",
        note: "Mehr medizinisch, weniger Spiegel.",
        slugs: ["medizinische-fachangestellte", "pflegefachkraft"],
      },
    ],
    whyItMightFit:
      "Wenn du Hände, Auge und Gespräch gleichzeitig benutzen kannst, ohne dich komplett zu verlieren.",
    typicalTuesday: [
      {
        time: "Morgens",
        text: "Platz vorbereiten, Termine anschauen, kurz hoffen, dass niemand zu spät kommt.",
      },
      {
        time: "Beim ersten Schnitt",
        text: "Zuhören, nachfragen, merken, was jemand wirklich meint.",
      },
      {
        time: "Zwischendurch",
        text: "Fegen. Immer wieder fegen. Haare sind überall ehrlicher als man denkt.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Farbe einwirken lassen, gleichzeitig schon den nächsten Kopf im Blick.",
      },
      {
        time: "Am Ende",
        text: "Der Rücken merkt den Tag. Der Boden auch.",
      },
    ],
  },
  {
    slug: "florist",
    title: "Florist",
    short:
      "Für Leute, die schöne Dinge mögen, aber wissen, dass Schönheit auch Arbeit, Kälte und frühe Lieferungen bedeutet.",
    atmosphere:
      "Kühle Luft, Wasser, Stiele, Draht, Erde, Verpackungspapier und Menschen, die Blumen oft für etwas sagen lassen.",
    secretlyLike:
      "Wenn ein Strauß plötzlich stimmt und man nicht mehr viel erklären muss.",
    annoys:
      "Kalte Hände, kaputte Stiele, Zeitdruck vor Feiertagen und Kundensätze wie „machen Sie einfach schön“.",
    comfortableFor:
      "Menschen, die fein arbeiten können und ein Gefühl für Stimmung haben.",
    color: "from-[#9fb58d]/28 to-[#24221b]/30",
    tags: ["fein", "ruhig", "gestalten"],
    discoveryNote:
      "Ruhiger als viele denken, aber nicht weich. Blumen sind empfindlich und der Tag oft nicht.",
    discoveryGroup: "Wenn kleine Dinge Stimmung ändern",
    observations: [
      "Du merkst irgendwann, welche Blumen zusammen nicht nur hübsch, sondern richtig wirken.",
      "Manche Kunden wissen nicht, was sie fühlen. Nur, dass sie etwas mitbringen wollen.",
      "Vor Feiertagen ist es weniger poetisch und mehr: schnell, nass, kalt.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher das Gestalten gefällt",
        note: "Mehr digital oder näher am Menschen, aber beide brauchen Auge.",
        slugs: ["mediengestalter", "friseur"],
      },
      {
        prompt: "Wenn du lieber robusteres Material willst",
        note: "Weniger zart, mehr Werkzeug.",
        slugs: ["tischler", "elektroniker"],
      },
      {
        prompt: "Wenn du den Ladenalltag magst",
        note: "Mehr Kundenfluss, weniger Stiele schneiden.",
        slugs: ["verkaeufer"],
      },
    ],
    whyItMightFit:
      "Wenn du leise gestalten kannst und nicht alles, was schön ist, kitschig findest.",
    typicalTuesday: [
      {
        time: "Früh",
        text: "Lieferung auspacken. Erstmal Wasser, schneiden, sortieren.",
      },
      {
        time: "Im Laden",
        text: "Jemand braucht etwas für einen Anlass, über den nicht viel gesagt wird.",
      },
      {
        time: "Zwischendurch",
        text: "Blätter entfernen, Gefäße sauber machen, Hände kalt.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Ein Strauß wird besser, nachdem du zwei Dinge wieder rausnimmst.",
      },
      {
        time: "Vor dem Schließen",
        text: "Alles nochmal frisch wirken lassen, obwohl der Tag es nicht mehr ist.",
      },
    ],
  },
  {
    slug: "zugbegleiter",
    title: "Zugbegleiter",
    short:
      "Für Leute, die unterwegs ruhig bleiben können, auch wenn andere gerade nicht ruhig sind.",
    atmosphere:
      "Bahnsteige, Durchsagen, Türen, Koffer, Verspätungen, Fragen, Beschwerden und kleine Momente zwischen fremden Menschen.",
    secretlyLike:
      "Wenn du eine angespannte Situation klein hältst, bevor sie groß wird.",
    annoys:
      "Verspätungsfrust, aggressive Stimmung, Schichtzeiten und Dinge, für die du verantwortlich klingst, obwohl du sie nicht verursacht hast.",
    comfortableFor:
      "Menschen, die freundlich klar sein können und unterwegs nicht sofort die Orientierung verlieren.",
    color: "from-[#9aaea2]/28 to-[#24221b]/30",
    tags: ["unterwegs", "kontakt", "klar"],
    discoveryNote:
      "Nicht nur Fahrkarten. Viel Stimmung lesen, ruhig bleiben und weitergehen.",
    discoveryGroup: "Wenn du unterwegs klar bleibst",
    observations: [
      "Du lernst, an Gesichtern zu sehen, wer gleich eine Frage hat.",
      "Manchmal musst du freundlich sein, während dich jemand für das Wetter verantwortlich macht.",
      "Nach manchen Schichten fühlt sich Stille zuhause ungewohnt gut an.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher der Menschenkontakt gefällt",
        note: "Mehr fester Ort, ähnliches Gespür für Stimmung.",
        slugs: ["verkaeufer", "medizinische-fachangestellte"],
      },
      {
        prompt: "Wenn dir das Unterwegssein gefällt",
        note: "Auch Bewegung und wechselnde Orte, nur praktischer.",
        slugs: ["elektroniker", "fachkraft-lagerlogistik"],
      },
      {
        prompt: "Wenn dir Konflikte zu viel werden",
        note: "Mehr Rückzug, weniger Publikum.",
        slugs: ["bauzeichner", "fachinformatiker-systemintegration"],
      },
    ],
    whyItMightFit:
      "Wenn du Menschen ernst nehmen kannst, ohne jede Stimmung mit nach Hause zu nehmen.",
    typicalTuesday: [
      {
        time: "Vor der Fahrt",
        text: "Dienstbeginn, Infos checken, schon sehen, wo es später schwierig werden könnte.",
      },
      {
        time: "Im Zug",
        text: "Durchgehen, Fragen beantworten, dabei nicht aus dem Takt kommen.",
      },
      {
        time: "Bei Verspätung",
        text: "Denselben Satz ruhig sagen, obwohl du ihn heute schon oft gesagt hast.",
      },
      {
        time: "Zwischen zwei Stopps",
        text: "Kurz aus dem Fenster schauen. Nicht lange, aber genug.",
      },
      {
        time: "Nach Dienstende",
        text: "Irgendwo ankommen, obwohl du den ganzen Tag angekommen bist.",
      },
    ],
  },
  {
    slug: "tierpfleger",
    title: "Tierpfleger",
    short:
      "Für Leute, die Tiere mögen, aber nicht vergessen, dass echte Fürsorge oft aus Putzen, Geduld und frühen Morgen besteht.",
    atmosphere:
      "Futter, Stroh, Wasser, Gerüche, Routinen, genaue Blicke und Tiere, die nicht sagen können, was los ist.",
    secretlyLike:
      "Wenn du an kleinen Veränderungen merkst, dass es einem Tier besser geht.",
    annoys:
      "Schwere Arbeit, Dreck, Geruch, Wochenenden und romantische Vorstellungen von Leuten, die nur süße Bilder sehen.",
    comfortableFor:
      "Menschen, die ruhig beobachten können und keine Angst vor unglamourösen Aufgaben haben.",
    color: "from-[#9ead91]/28 to-[#24221b]/30",
    tags: ["ruhig", "körperlich", "fürsorglich"],
    discoveryNote:
      "Für Leute, die lieber genau hinschauen als viel reden. Aber wirklich hinschauen.",
    discoveryGroup: "Wenn Fürsorge leise sein darf",
    observations: [
      "Du lernst, Verhalten zu lesen, bevor etwas offensichtlich krank wirkt.",
      "Viele schöne Momente passieren, während du eigentlich gerade sauber machst.",
      "Tierliebe klingt weich. Die Arbeit ist es oft nicht.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran eher die Fürsorge gefällt",
        note: "Mehr Menschen, aber ähnlich viel Aufmerksamkeit für kleine Zeichen.",
        slugs: ["pflegefachkraft", "erzieher"],
      },
      {
        prompt: "Wenn du lieber Pflanzen und Stimmungen magst",
        note: "Auch lebendig, aber leiser und gestaltbarer.",
        slugs: ["florist"],
      },
      {
        prompt: "Wenn du mehr Struktur und weniger Emotion willst",
        note: "Körperlich bleiben, aber mit klareren Abläufen.",
        slugs: ["fachkraft-lagerlogistik", "industriemechaniker"],
      },
    ],
    whyItMightFit:
      "Wenn du geduldig bist und Nähe nicht nur dann magst, wenn sie sauber und einfach ist.",
    typicalTuesday: [
      {
        time: "Früh",
        text: "Füttern, kontrollieren, merken, wer heute anders wirkt.",
      },
      {
        time: "Vormittags",
        text: "Sauber machen. Mehr davon, als Außenstehende denken.",
      },
      {
        time: "Zwischendurch",
        text: "Ein Tier frisst nicht richtig. Der Tag wird sofort genauer.",
      },
      {
        time: "Gegen Nachmittag",
        text: "Dokumentieren, vorbereiten, nochmal Wasser prüfen.",
      },
      {
        time: "Am Ende",
        text: "Müde sein und trotzdem kurz zurückschauen, ob alles ruhig ist.",
      },
    ],
  },
];

const defaultLifeIndicators: LifeIndicators = {
  ruhe: "medium",
  menschen: "medium",
  bewegung: "medium",
  struktur: "medium",
  sichtbaresErgebnis: "medium",
};

const defaultPracticalSignals = ["Ausbildung", "echter Alltag", "regional abhängig"];
const defaultCareerRealism = {
  underestimated: [
    "dass der Anfang oft weniger klar wirkt, als der Titel klingt",
    "wie stark Betrieb und Team den Alltag verändern",
  ],
  afterDay: "eher müde, aber mit ein paar echten Momenten im Kopf",
  entry: ["Ausbildung", "Praktikum hilft", "regional unterschiedlich"],
  localTexture:
    "In manchen Regionen begegnet man solchen Wegen viel öfter als in anderen.",
};

const careerLifeIndicators: Record<string, LifeIndicators> = {
  "fachinformatiker-systemintegration": {
    ruhe: "high",
    menschen: "low",
    bewegung: "low",
    struktur: "high",
    sichtbaresErgebnis: "medium",
  },
  elektroniker: {
    ruhe: "medium",
    menschen: "medium",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "high",
  },
  pflegefachkraft: {
    ruhe: "low",
    menschen: "high",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "medium",
  },
  mediengestalter: {
    ruhe: "high",
    menschen: "medium",
    bewegung: "low",
    struktur: "medium",
    sichtbaresErgebnis: "high",
  },
  notfallsanitaeter: {
    ruhe: "low",
    menschen: "high",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "high",
  },
  "fachkraft-lagerlogistik": {
    ruhe: "medium",
    menschen: "low",
    bewegung: "high",
    struktur: "high",
    sichtbaresErgebnis: "high",
  },
  mechatroniker: {
    ruhe: "medium",
    menschen: "low",
    bewegung: "high",
    struktur: "high",
    sichtbaresErgebnis: "high",
  },
  erzieher: {
    ruhe: "low",
    menschen: "high",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "medium",
  },
  verkaeufer: {
    ruhe: "low",
    menschen: "high",
    bewegung: "medium",
    struktur: "medium",
    sichtbaresErgebnis: "medium",
  },
  koch: {
    ruhe: "low",
    menschen: "medium",
    bewegung: "high",
    struktur: "high",
    sichtbaresErgebnis: "high",
  },
  tischler: {
    ruhe: "medium",
    menschen: "low",
    bewegung: "high",
    struktur: "high",
    sichtbaresErgebnis: "high",
  },
  bauzeichner: {
    ruhe: "high",
    menschen: "low",
    bewegung: "low",
    struktur: "high",
    sichtbaresErgebnis: "medium",
  },
  industriemechaniker: {
    ruhe: "medium",
    menschen: "low",
    bewegung: "high",
    struktur: "high",
    sichtbaresErgebnis: "high",
  },
  veranstaltungstechniker: {
    ruhe: "low",
    menschen: "medium",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "high",
  },
  "medizinische-fachangestellte": {
    ruhe: "low",
    menschen: "high",
    bewegung: "medium",
    struktur: "high",
    sichtbaresErgebnis: "medium",
  },
  "kaufmann-bueromanagement": {
    ruhe: "high",
    menschen: "medium",
    bewegung: "low",
    struktur: "high",
    sichtbaresErgebnis: "medium",
  },
  friseur: {
    ruhe: "low",
    menschen: "high",
    bewegung: "medium",
    struktur: "medium",
    sichtbaresErgebnis: "high",
  },
  florist: {
    ruhe: "medium",
    menschen: "medium",
    bewegung: "medium",
    struktur: "medium",
    sichtbaresErgebnis: "high",
  },
  zugbegleiter: {
    ruhe: "low",
    menschen: "high",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "medium",
  },
  tierpfleger: {
    ruhe: "high",
    menschen: "low",
    bewegung: "high",
    struktur: "medium",
    sichtbaresErgebnis: "medium",
  },
};

const careerPracticalSignals: Record<string, string[]> = {
  "fachinformatiker-systemintegration": [
    "Ausbildung",
    "eher drinnen",
    "viel Fehlersuche",
  ],
  elektroniker: ["Ausbildung", "unterwegs möglich", "sichtbare Arbeit"],
  pflegefachkraft: ["Ausbildung", "Schicht möglich", "direkter Alltag"],
  mediengestalter: ["Ausbildung", "viel Bildschirm", "sichtbare Details"],
  notfallsanitaeter: ["Ausbildung", "Schicht möglich", "viel Bewegung"],
  "fachkraft-lagerlogistik": ["Ausbildung", "klare Abläufe", "körperlicher"],
  mechatroniker: ["Ausbildung", "Werkstatt/Halle", "viel Fehlersuche"],
  erzieher: ["Ausbildung", "viel Nähe", "lauter Alltag"],
  verkaeufer: ["Ausbildung", "viel Kontakt", "Stehen gehört dazu"],
  koch: ["Ausbildung", "Schicht möglich", "Tempo im Tag"],
  tischler: ["Ausbildung", "Werkstatt", "sichtbare Arbeit"],
  bauzeichner: ["Ausbildung", "eher ruhig", "viel Genauigkeit"],
  industriemechaniker: ["Ausbildung", "Halle/Werkstatt", "praktisch"],
  veranstaltungstechniker: ["Ausbildung", "späte Zeiten möglich", "viel Aufbau"],
  "medizinische-fachangestellte": ["Ausbildung", "Praxisalltag", "viel Taktung"],
  "kaufmann-bueromanagement": ["Ausbildung", "eher drinnen", "klare Abläufe"],
  friseur: ["Ausbildung", "viel Kontakt", "sichtbare Veränderung"],
  florist: ["Ausbildung", "Laden/Werkstatt", "feine Handarbeit"],
  zugbegleiter: ["Ausbildung", "unterwegs", "Schicht möglich"],
  tierpfleger: ["Ausbildung", "frühe Tage", "körperlicher"],
};

const careerRealism: Record<string, typeof defaultCareerRealism> = {
  "fachinformatiker-systemintegration": {
    underestimated: [
      "wie viel Geduld stille Probleme brauchen",
      "dass Ruhe nicht heißt, dass nichts Druck macht",
    ],
    afterDay: "oft noch ein bisschen im Kopf, aber selten komplett leergeredet",
    entry: ["Ausbildung wirkt oft klar", "Praktikum macht viel verständlicher", "Betriebe sehr verschieden"],
    localTexture:
      "In kleinen Betrieben bist du oft näher an allem. In größeren Teams wird der Alltag spezieller.",
  },
  elektroniker: {
    underestimated: [
      "wie körperlich genaues Arbeiten sein kann",
      "wie oft Pläne erst vor Ort wirklich Sinn ergeben",
    ],
    afterDay: "körperlich müde, aber öfter mit dem Gefühl: etwas läuft jetzt",
    entry: ["Ausbildung meist gut auffindbar", "Praktikum zeigt schnell viel", "Betriebsgröße verändert den Tag"],
    localTexture:
      "In kleineren Orten kennt man solche Betriebe oft über Umwege, Familie oder Praktika.",
  },
  pflegefachkraft: {
    underestimated: [
      "wie viel Aufmerksamkeit zwischen kurzen Sätzen passiert",
      "dass Nähe nicht immer laut oder dramatisch ist",
    ],
    afterDay: "müde von Menschen, aber manchmal auch seltsam klar",
    entry: ["Ausbildung klar", "Schichten früh spürbar", "Praxisort macht viel aus"],
    localTexture:
      "Kleine Einrichtungen fühlen sich oft anders an als große Häuser. Nicht leichter, nur persönlicher.",
  },
  mediengestalter: {
    underestimated: [
      "wie viel Geduld Gestaltung mit Feedback braucht",
      "dass Kreativität oft aus Korrigieren besteht",
    ],
    afterDay: "visuell satt, manchmal noch mit einem Detail im Kopf",
    entry: ["Portfolio hilft", "Praktikum zeigt den Alltag", "Büros unterscheiden sich stark"],
    localTexture:
      "Agentur, Druckerei und internes Team können sich wie drei verschiedene Tage anfühlen.",
  },
  notfallsanitaeter: {
    underestimated: [
      "wie viel Warten zwischen direkten Momenten liegt",
      "dass ruhig wirken manchmal die eigentliche Arbeit ist",
    ],
    afterDay: "körperlich daheim, innerlich manchmal noch unterwegs",
    entry: ["Ausbildung klar", "Schichtrealität früh prüfen", "Region verändert Einsätze"],
    localTexture:
      "Stadt, Land und Träger verändern den Rhythmus stärker, als man von außen denkt.",
  },
  "fachkraft-lagerlogistik": {
    underestimated: [
      "wie beruhigend klare Abläufe sein können",
      "dass Ordnung im Lager selten von allein passiert",
    ],
    afterDay: "körperlich leerer, im Kopf oft angenehm sortiert",
    entry: ["Ausbildung klar", "Praktikum schnell aussagekräftig", "Betriebe sehr unterschiedlich"],
    localTexture:
      "In manchen Regionen gibt es davon viel mehr, als man erst bemerkt. Oft sieht man es nicht von außen.",
  },
  mechatroniker: {
    underestimated: [
      "wie lange kleine Fehler unsichtbar bleiben können",
      "dass Technik oft mehr Geduld als Action braucht",
    ],
    afterDay: "müde vom Suchen, aber zufrieden, wenn etwas wieder läuft",
    entry: ["Ausbildung klar", "Werkstatt früh anschauen", "Anlagen prägen den Alltag"],
    localTexture:
      "Ein kleiner Betrieb fühlt sich hier oft ganz anders an als Industrie oder großes Autohaus.",
  },
  erzieher: {
    underestimated: [
      "wie viel Wahrnehmung ein voller Raum braucht",
      "dass Lärm nicht das Einzige ist, was müde macht",
    ],
    afterDay: "menschlich voll, manchmal aber auch weich zufrieden",
    entry: ["Ausbildung je nach Bundesland", "Praktikum sehr hilfreich", "Einrichtung macht viel aus"],
    localTexture:
      "Kita, Hort und Jugendhilfe fühlen sich oft weniger ähnlich an, als der Titel klingt.",
  },
  verkaeufer: {
    underestimated: [
      "wie viel Stimmung man nebenbei abfedert",
      "dass kurze Kontakte trotzdem Kraft kosten können",
    ],
    afterDay: "Beine müde, Kopf froh über weniger Fragen",
    entry: ["Ausbildung klar", "Filiale prägt stark", "Teamgröße zählt"],
    localTexture:
      "Kleiner Laden und große Kette sind hier fast unterschiedliche Alltage.",
  },
  koch: {
    underestimated: [
      "wie körperlich Timing sein kann",
      "dass Stolz oft erst nach dem Stress kommt",
    ],
    afterDay: "körperlich leer, manchmal zufrieden, weil etwas wirklich rausging",
    entry: ["Ausbildung klar", "Küche vorher erleben", "Arbeitszeiten ernst nehmen"],
    localTexture:
      "Restaurant, Hotel, Kantine und kleines Café können völlig andere Tage bedeuten.",
  },
  tischler: {
    underestimated: [
      "wie viel Geduld in einem Millimeter steckt",
      "dass sichtbare Arbeit trotzdem viel Kopfarbeit ist",
    ],
    afterDay: "müde in den Händen, oft ruhiger im Kopf",
    entry: ["Ausbildung klar", "Werkstatt anschauen", "Betrieb prägt Material und Tempo"],
    localTexture:
      "Kleine Werkstätten wirken oft persönlicher. Große Betriebe können dafür planbarer sein.",
  },
  bauzeichner: {
    underestimated: [
      "wie real kleine Linien später werden",
      "dass ruhige Arbeit trotzdem Verantwortung haben kann",
    ],
    afterDay: "eher ruhig im Kopf, manchmal mit einem Maß, das noch nachläuft",
    entry: ["Ausbildung klar", "CAD früh ausprobieren", "Büroart verändert viel"],
    localTexture:
      "Architekturbüro, Ingenieurbüro und Verwaltung fühlen sich im Alltag deutlich anders an.",
  },
  industriemechaniker: {
    underestimated: [
      "wie genau schwere Arbeit sein kann",
      "dass Maschinen Geduld erzwingen",
    ],
    afterDay: "körperlich müde, aber oft mit klarerem Kopf als vorher",
    entry: ["Ausbildung klar", "Halle vorher erleben", "Industrie sehr unterschiedlich"],
    localTexture:
      "In Regionen mit Industrie taucht dieser Weg oft ganz selbstverständlich auf. Anderswo kaum.",
  },
  veranstaltungstechniker: {
    underestimated: [
      "wie unsichtbar gute Vorbereitung bleibt",
      "dass späte Abende anders müde machen",
    ],
    afterDay: "wach vom Druck, später plötzlich sehr leer",
    entry: ["Ausbildung klar", "Aufbau mitmachen hilft", "Zeiten vorher ernst nehmen"],
    localTexture:
      "Große Hallen, Theater und kleine Eventfirmen haben sehr unterschiedliche Rhythmen.",
  },
  "medizinische-fachangestellte": {
    underestimated: [
      "wie viel Taktung hinter freundlichen Sätzen steckt",
      "dass kurze Kontakte trotzdem nah sein können",
    ],
    afterDay: "müde von Unterbrechungen, aber oft noch okay für Menschen",
    entry: ["Ausbildung klar", "Praxis vorher erleben", "Fachrichtung verändert viel"],
    localTexture:
      "Eine kleine Hausarztpraxis fühlt sich anders an als eine große Facharztpraxis.",
  },
  "kaufmann-bueromanagement": {
    underestimated: [
      "wie viel Ruhe gute Organisation bringen kann",
      "dass leise Arbeit oft erst auffällt, wenn sie fehlt",
    ],
    afterDay: "eher kopfmüde, aber nicht unbedingt sozial leer",
    entry: ["Ausbildung klar", "Büro vorher anschauen", "Teamkultur macht viel aus"],
    localTexture:
      "Kleine Firmen geben oft mehr Überblick. Große eher klarere Zuständigkeiten.",
  },
  friseur: {
    underestimated: [
      "wie viel Nähe in scheinbar kleinen Gesprächen liegt",
      "dass sichtbare Veränderung körperlich anstrengend ist",
    ],
    afterDay: "Beine müde, Kopf voll mit Stimmen und Spiegeln",
    entry: ["Ausbildung klar", "Salon vorher erleben", "Kundenrhythmus zählt"],
    localTexture:
      "Ein kleiner Salon und eine große Kette fühlen sich im Alltag sehr verschieden an.",
  },
  florist: {
    underestimated: [
      "wie viel Arbeit schöne Dinge machen",
      "dass Stimmung oft über kleine Entscheidungen läuft",
    ],
    afterDay: "kalte Hände, ruhiger Kopf, manchmal feine Zufriedenheit",
    entry: ["Ausbildung klar", "Ladenalltag testen", "Saison macht viel aus"],
    localTexture:
      "Vor Feiertagen wirkt dieser Alltag anders als an normalen Dienstagen.",
  },
  zugbegleiter: {
    underestimated: [
      "wie viel Stimmung man unterwegs lesen muss",
      "dass freundlich klar bleiben Kraft kostet",
    ],
    afterDay: "froh, irgendwo anzukommen und nicht mehr antworten zu müssen",
    entry: ["Ausbildung klar", "Schichten prüfen", "Strecken verändern viel"],
    localTexture:
      "Regionalverkehr und Fernverkehr fühlen sich oft wie verschiedene Alltage an.",
  },
  tierpfleger: {
    underestimated: [
      "wie viel Putzen echte Fürsorge enthält",
      "dass ruhiges Beobachten Arbeit ist",
    ],
    afterDay: "körperlich müde, aber oft leiser im Kopf",
    entry: ["Ausbildung klar", "Praktikum wichtig", "Tierart verändert alles"],
    localTexture:
      "Zoo, Tierheim, Praxisnähe oder Landwirtschaft fühlen sich sehr unterschiedlich an.",
  },
};

const careerLaterNotices: Record<string, string[]> = {
  "fachinformatiker-systemintegration": [
    "Du bemerkst schlechte WLANs sofort.",
    "Du fragst automatisch, ob schon neu gestartet wurde.",
    "Drucker wirken irgendwann persönlich.",
    "Du erkennst Chaos schon an Ordnernamen.",
    "Ein voller Desktop macht dich innerlich unruhig.",
    "Du hörst an der Beschreibung, dass etwas anderes kaputt ist.",
  ],
  elektroniker: [
    "Du schaust automatisch auf Kabel.",
    "Kaputte Dinge wirken oft reparierbar.",
    "Du hörst Geräusche, die andere ignorieren.",
    "Steckdosen werden plötzlich interessant.",
    "Du siehst schiefe Schalterplatten aus drei Metern Entfernung.",
    "Du traust keiner Wand, bevor du weißt, was dahinterliegt.",
  ],
  pflegefachkraft: [
    "Du merkst schneller, wenn jemand nicht okay ist.",
    "Du siehst Müdigkeit früher als andere.",
    "Kleine Gesten bleiben länger hängen.",
    "Du gewöhnst dir an, ständig mitzudenken.",
    "Du liest Räume, bevor jemand etwas sagt.",
    "Manche Gerüche bringen sofort einen ganzen Tag zurück.",
  ],
  mediengestalter: [
    "Schlechte Logos springen dich plötzlich an.",
    "Du verschiebst Dinge manchmal um zwei Pixel.",
    "Du bemerkst Schriftarten auf Speisekarten.",
    "Manche Werbeplakate machen dich heimlich wütend.",
    "Du kannst nicht mehr nicht auf Abstände schauen.",
    "Dateinamen verraten dir, wie chaotisch ein Projekt war.",
  ],
  notfallsanitaeter: [
    "Du hörst an Stimmen schneller, ob jemand wirklich Angst hat.",
    "Blaulicht wirkt irgendwann weniger wie Film und mehr wie Arbeit.",
    "Du merkst, welche Stille gefährlich sein kann.",
    "Du prüfst Räume automatisch nach Auswegen.",
    "Manche Hausflure bleiben dir länger im Kopf als Einsätze.",
    "Du gewöhnst dich an, ruhig zu wirken, bevor du dich ruhig fühlst.",
  ],
  "fachkraft-lagerlogistik": [
    "Du merkst sofort, wenn ein Regal keinen Sinn ergibt.",
    "Du denkst in Wegen, nicht nur in Dingen.",
    "Falsch beschriftete Kartons nerven dich unverhältnismäßig.",
    "Du freust dich leise, wenn eine Palette genau aufgeht.",
    "Du siehst Platz, wo andere nur Kram sehen.",
    "Ein guter Ablauf fühlt sich irgendwann fast körperlich angenehm an.",
  ],
  mechatroniker: [
    "Du hörst Maschinen anders als früher.",
    "Ein kleines Ruckeln wirkt plötzlich wie ein Hinweis.",
    "Du vertraust keinem Fehler, der nur manchmal auftaucht.",
    "Ölgeruch kann beruhigend und nervig zugleich werden.",
    "Du schaust bei Geräten zuerst dahin, wo Bewegung entsteht.",
    "Du merkst, wie viele Dinge nur funktionieren, weil niemand hinsieht.",
  ],
  erzieher: [
    "Du hörst an Lärm, ob ein Raum kippt.",
    "Du bemerkst kleine Ungerechtigkeiten schneller.",
    "Kinderzeichnungen erzählen dir irgendwann mehr als geplant.",
    "Du gewöhnst dich an, drei Gespräche gleichzeitig mitzudenken.",
    "Stille wirkt manchmal verdächtiger als Geschrei.",
    "Du siehst, wie lange kleine Sätze nachwirken können.",
  ],
  verkaeufer: [
    "Du erkennst unentschlossene Menschen schon am Gang.",
    "Du faltest Dinge nebenbei ordentlicher als privat nötig wäre.",
    "Du hörst, ob eine Frage wirklich eine Frage ist.",
    "Regale wirken irgendwann wie Stimmungsmesser.",
    "Du merkst schneller, wann Freundlichkeit nur Fassade ist.",
    "Du kennst die Uhrzeit am Geräusch des Ladens.",
  ],
  koch: [
    "Du hörst, wenn eine Pfanne zu heiß wird.",
    "Du liest Speisekarten plötzlich taktisch.",
    "Messer, die nicht scharf sind, machen dich müde.",
    "Du riechst früher, wenn etwas gleich kippt.",
    "Timing verfolgt dich auch beim privaten Essen.",
    "Du siehst an Tellern, wo jemand unter Druck war.",
  ],
  tischler: [
    "Du streichst über Kanten, ohne darüber nachzudenken.",
    "Ein Millimeter fühlt sich irgendwann nicht mehr klein an.",
    "Billige Möbel verraten sich sofort.",
    "Du hörst, ob eine Maschine sauber läuft.",
    "Holz arbeitet in deinem Kopf weiter.",
    "Du siehst Oberflächenfehler, die andere nie bemerken.",
  ],
  bauzeichner: [
    "Du siehst Gebäude plötzlich in Linien.",
    "Treppen, Türen und Fenster wirken nicht mehr selbstverständlich.",
    "Ein falsches Maß bleibt dir unangenehm lange im Kopf.",
    "Du erkennst, wo jemand sauber geplant hat.",
    "Baustellen sehen für dich weniger zufällig aus.",
    "Du merkst, dass kleine Striche später echte Wände werden.",
  ],
  industriemechaniker: [
    "Du hörst, wenn eine Anlage nicht rund läuft.",
    "Schwere Dinge wirken genauer, als sie aussehen.",
    "Du entwickelst Respekt vor gut geschmierten Teilen.",
    "Ein lockerer Rhythmus in einer Maschine fällt dir sofort auf.",
    "Du siehst Verschleiß, bevor etwas wirklich kaputt ist.",
    "Du merkst, wie viel Ruhe in einer sauber laufenden Halle liegt.",
  ],
  veranstaltungstechniker: [
    "Du schaust bei Konzerten zuerst nach oben.",
    "Kabelwege erzählen dir, ob jemand mitgedacht hat.",
    "Du bemerkst gutes Licht erst, wenn es fehlt.",
    "Applaus fühlt sich manchmal nach Abbau an.",
    "Du hörst Rückkopplung schon, bevor sie peinlich wird.",
    "Leere Hallen wirken nach einer Veranstaltung anders.",
  ],
  "medizinische-fachangestellte": [
    "Du hörst am Telefon schneller, wie dringend etwas ist.",
    "Wartezimmer fühlen sich irgendwann lesbar an.",
    "Du merkst, wer Angst hinter Ungeduld versteckt.",
    "Handschriften werden zu kleinen Rätseln.",
    "Du kannst freundlich kurz sein, ohne kalt zu werden.",
    "Ein voller Terminkalender wirkt wie ein Wetterbericht.",
  ],
  "kaufmann-bueromanagement": [
    "Du erkennst Chaos an Betreffzeilen.",
    "Kalender erzählen dir mehr über Menschen als Gespräche.",
    "Eine saubere Ablage kann sich überraschend gut anfühlen.",
    "Du merkst, welche Kleinigkeiten später Ärger sparen.",
    "Unklare Zuständigkeiten machen dich schneller müde.",
    "Du siehst, wann ein Prozess nur so tut, als wäre er einer.",
  ],
  friseur: [
    "Du schaust Menschen zuerst auf Übergänge.",
    "Scherenklang wird irgendwann vertraut.",
    "Du merkst, wer wirklich Veränderung will.",
    "Spiegel erzählen mehr, als Kundinnen sagen.",
    "Du siehst schlechte Haarschnitte auch im Vorbeigehen.",
    "Ein halber Zentimeter kann plötzlich viel bedeuten.",
  ],
  florist: [
    "Du riechst, welche Blumen schon zu lange stehen.",
    "Farben wirken irgendwann nach Anlass.",
    "Du siehst an Sträußen, ob jemand unsicher war.",
    "Kalte Hände gehören irgendwann zum Denken dazu.",
    "Feiertage fühlen sich anders an als für andere.",
    "Du bemerkst, wie viel Arbeit hinter etwas Leichtem steckt.",
  ],
  zugbegleiter: [
    "Du erkennst Stress schon am Einsteigen.",
    "Durchsagen klingen für dich irgendwann wie kleine Entscheidungen.",
    "Du merkst, welche Ruhe einen Wagen beruhigt.",
    "Verspätungen verändern die Stimmung schneller als das Wetter.",
    "Bahnhöfe fühlen sich nach Uhrzeiten unterschiedlich an.",
    "Du gewöhnst dich daran, freundlich klar zu bleiben.",
  ],
  tierpfleger: [
    "Du merkst, wenn ein Tier heute anders schaut.",
    "Putzen wirkt irgendwann weniger nebensächlich.",
    "Du hörst kleine Veränderungen in gewohnten Geräuschen.",
    "Futterzeiten strukturieren deinen Kopf.",
    "Du siehst Fürsorge oft in sehr unromantischen Dingen.",
    "Geduld fühlt sich irgendwann mehr nach Beobachten als nach Warten an.",
  ],
};

const careerDayMoments: Record<
  string,
  { timeLabel: string; text: string; realSentence?: string }[]
> = {
  "fachinformatiker-systemintegration": [
    {
      timeLabel: "09:12",
      text: "Jemand sagt: „Das Internet geht nicht.“ Es ist nicht das Internet.",
      realSentence: "Das hat gestern noch funktioniert.",
    },
    {
      timeLabel: "10:30",
      text: "Du suchst weiter, obwohl schon wieder jemand fragt.",
    },
    {
      timeLabel: "15:40",
      text: "Es läuft wieder. Niemand sieht, wie viel Suchen drin war.",
    },
  ],
  elektroniker: [
    {
      timeLabel: "08:40",
      text: "Erstmal messen. Nicht raten.",
      realSentence: "Nur kurz messen.",
    },
    {
      timeLabel: "12:10",
      text: "Ein Kabel sieht harmlos aus und ist trotzdem der Grund.",
    },
    {
      timeLabel: "15:50",
      text: "Etwas funktioniert wieder. Das reicht manchmal.",
    },
  ],
  pflegefachkraft: [
    {
      timeLabel: "07:20",
      text: "Jemand braucht Hilfe, bevor du richtig angekommen bist.",
      realSentence: "Ich bin gleich da.",
    },
    {
      timeLabel: "11:10",
      text: "Du merkst an der Stimme, dass heute etwas anders ist.",
    },
    {
      timeLabel: "16:30",
      text: "Du bist müde, aber jemand war kurz nicht allein.",
    },
  ],
  mediengestalter: [
    {
      timeLabel: "09:25",
      text: "Drei Dateien heißen fast gleich. Eine davon ist richtig.",
      realSentence: "Welche Version ist die aktuelle?",
    },
    {
      timeLabel: "13:05",
      text: "Du verschiebst etwas minimal und es wirkt plötzlich weniger falsch.",
    },
    {
      timeLabel: "16:45",
      text: "Der Export dauert länger als der Satz „nur kurz“ klang.",
    },
  ],
  notfallsanitaeter: [
    {
      timeLabel: "06:58",
      text: "Fahrzeug checken. Noch ist alles ruhig.",
      realSentence: "Bleib kurz bei mir.",
    },
    {
      timeLabel: "10:16",
      text: "Jemand hat Angst. Du wirst nicht lauter als die Situation.",
    },
    {
      timeLabel: "18:20",
      text: "Der Körper ist zuhause. Der Kopf braucht noch länger.",
    },
  ],
  "fachkraft-lagerlogistik": [
    {
      timeLabel: "08:05",
      text: "Der Scanner sagt nein. Du weißt schon, dass es länger dauert.",
      realSentence: "Der Scanner sagt nein.",
    },
    {
      timeLabel: "11:35",
      text: "Eine Palette passt nicht. Also nochmal umdenken.",
    },
    {
      timeLabel: "15:25",
      text: "Der Gang ist frei. Morgen stolpert niemand über dein Chaos.",
    },
  ],
  mechatroniker: [
    {
      timeLabel: "08:50",
      text: "Die Maschine klingt anders. Noch nicht kaputt, aber anders.",
      realSentence: "Das Geräusch war vorhin noch nicht da.",
    },
    {
      timeLabel: "12:20",
      text: "Der Fehler kommt nur manchmal. Natürlich gerade nicht.",
    },
    {
      timeLabel: "16:10",
      text: "Sie läuft wieder ruhiger. Alle reden sofort normaler.",
    },
  ],
  erzieher: [
    {
      timeLabel: "08:15",
      text: "Der Raum ist laut, aber du hörst, wo es gerade kippt.",
      realSentence: "Nicht alle gleichzeitig.",
    },
    {
      timeLabel: "11:40",
      text: "Ein Streit ist klein. Für zwei Kinder aber gerade riesig.",
    },
    {
      timeLabel: "15:10",
      text: "Du sagst einen ruhigen Satz. Er wirkt später als gedacht.",
    },
  ],
  verkaeufer: [
    {
      timeLabel: "09:40",
      text: "Jemand sucht etwas und weiß selbst nicht genau was.",
      realSentence: "Ich schau kurz im Lager.",
    },
    {
      timeLabel: "13:15",
      text: "Die zweite Kasse geht auf, bevor die Schlange schlecht gelaunt wird.",
    },
    {
      timeLabel: "18:05",
      text: "Die Beine sind müde. Ein Regal sieht wieder ordentlich aus.",
    },
  ],
  koch: [
    {
      timeLabel: "10:20",
      text: "Noch ist es ruhig. Das bleibt nicht so.",
      realSentence: "Wie lange noch?",
    },
    {
      timeLabel: "12:35",
      text: "Tisch zwölf wartet. Die Pfanne ist zu heiß für lange Gedanken.",
    },
    {
      timeLabel: "15:00",
      text: "Kurz probieren. Noch Salz. Dann raus damit.",
    },
  ],
  tischler: [
    {
      timeLabel: "08:30",
      text: "Ein Millimeter fehlt. Das ist nicht klein.",
      realSentence: "Ein Millimeter fehlt.",
    },
    {
      timeLabel: "11:50",
      text: "Du hältst kurz die Luft an, bevor das Teil sitzt.",
    },
    {
      timeLabel: "16:00",
      text: "Staub überall. Aber die Kante stimmt.",
    },
  ],
  bauzeichner: [
    {
      timeLabel: "09:10",
      text: "Ein Maß stimmt nicht. Später wäre daraus eine echte Wand geworden.",
      realSentence: "Das Maß stimmt nicht.",
    },
    {
      timeLabel: "12:45",
      text: "Du prüfst den Plan nochmal, obwohl niemand dramatisch wirkt.",
    },
    {
      timeLabel: "15:35",
      text: "Ein Schnitt fehlt. Ohne ihn versteht morgen keiner den Rest.",
    },
  ],
  industriemechaniker: [
    {
      timeLabel: "07:55",
      text: "Die Anlage klingt anders. Du bleibst stehen.",
      realSentence: "Die Anlage klingt anders.",
    },
    {
      timeLabel: "11:15",
      text: "Schwere Teile, kleine Abstände, wenig Platz für Ungenauigkeit.",
    },
    {
      timeLabel: "15:30",
      text: "Sie läuft ruhiger. In der Halle wird es sofort entspannter.",
    },
  ],
  veranstaltungstechniker: [
    {
      timeLabel: "10:00",
      text: "Die Halle ist leer. Trotzdem ist schon Druck da.",
      realSentence: "Wer hat den Adapter?",
    },
    {
      timeLabel: "16:20",
      text: "Ein Kabelweg entscheidet, ob später jemand stolpert.",
    },
    {
      timeLabel: "23:40",
      text: "Vorne war Applaus. Hinten fängt der Abbau an.",
    },
  ],
  "medizinische-fachangestellte": [
    {
      timeLabel: "08:05",
      text: "Das Telefon hört nicht auf, bevor der Tag richtig angefangen hat.",
      realSentence: "Haben Sie Ihre Karte dabei?",
    },
    {
      timeLabel: "10:50",
      text: "Jemand wirkt genervt. Eigentlich ist es Angst.",
    },
    {
      timeLabel: "16:15",
      text: "Noch ein Termin passt irgendwo dazwischen. Knapp, aber passt.",
    },
  ],
  "kaufmann-bueromanagement": [
    {
      timeLabel: "09:00",
      text: "Drei Mails meinen dasselbe. Keine sagt es klar.",
      realSentence: "Wer hat die aktuelle Version?",
    },
    {
      timeLabel: "11:30",
      text: "Du legst etwas richtig ab, damit morgen niemand suchen muss.",
    },
    {
      timeLabel: "15:55",
      text: "Ein Kalender ist voll. Trotzdem findet sich eine Lücke.",
    },
  ],
  friseur: [
    {
      timeLabel: "09:35",
      text: "Jemand sagt „nur die Spitzen“ und meint etwas sehr Genaues.",
      realSentence: "Nur die Spitzen?",
    },
    {
      timeLabel: "12:25",
      text: "Der Spiegel zeigt, ob jemand wirklich zufrieden ist.",
    },
    {
      timeLabel: "17:10",
      text: "Du stehst seit Stunden. Der Übergang sieht gut aus.",
    },
  ],
  florist: [
    {
      timeLabel: "08:25",
      text: "Kalte Hände, nasse Stiele, ein Strauß, der noch kippt.",
      realSentence: "Für welchen Anlass ist es?",
    },
    {
      timeLabel: "12:05",
      text: "Jemand ist unsicher. Du hörst es an der Pause.",
    },
    {
      timeLabel: "16:40",
      text: "Etwas Leichtes sieht leicht aus. Deine Finger wissen es besser.",
    },
  ],
  zugbegleiter: [
    {
      timeLabel: "07:42",
      text: "Beim Einsteigen merkst du, wer schon gestresst ist.",
      realSentence: "Die Fahrkarten bitte.",
    },
    {
      timeLabel: "13:18",
      text: "Verspätung verändert die Stimmung schneller als jede Durchsage.",
    },
    {
      timeLabel: "19:05",
      text: "Der Zug leert sich. Du bleibst freundlich klar.",
    },
  ],
  tierpfleger: [
    {
      timeLabel: "07:10",
      text: "Er frisst weniger. Du merkst es, bevor es jemand aufschreibt.",
      realSentence: "Heute frisst er weniger.",
    },
    {
      timeLabel: "11:25",
      text: "Putzen ist nicht Nebenarbeit. Es zeigt, ob etwas stimmt.",
    },
    {
      timeLabel: "15:20",
      text: "Geduld fühlt sich heute eher nach genauem Hinsehen an.",
    },
  ],
};

const careerRealSentences: Record<string, string[]> = {
  "fachinformatiker-systemintegration": [
    "Ich schaue nur kurz.",
    "Das hat gestern noch funktioniert.",
    "Kannst du einmal neu starten?",
    "Welcher Drucker war es?",
    "Ich sehe es im Log.",
  ],
  elektroniker: [
    "Da sollte Strom drauf sein.",
    "Nur kurz messen.",
    "Das Kabel ist nicht beschriftet.",
    "Halt die Leiter kurz.",
    "Sicherung ist wieder drin.",
  ],
  pflegefachkraft: [
    "Ich bin gleich da.",
    "Hast du heute genug getrunken?",
    "Bleib kurz sitzen.",
    "Tut das gerade weh?",
    "Ich komme gleich wieder.",
  ],
  mediengestalter: [
    "Kannst du das etwas größer machen?",
    "Das Logo liegt nicht richtig.",
    "Ich schiebe es zwei Pixel nach links.",
    "Welche Version ist die aktuelle?",
    "Der Export ist wieder zu groß.",
  ],
  notfallsanitaeter: [
    "Bleib kurz bei mir.",
    "Atme einmal ruhig.",
    "Was ist passiert?",
    "Seit wann ist das so?",
    "Schau mich kurz an.",
  ],
  "fachkraft-lagerlogistik": [
    "Wo liegt das wirklich?",
    "Der Scanner sagt nein.",
    "Das passt nicht auf die Palette.",
    "Wer hat das falsch beschriftet?",
    "Gang drei ist voll.",
  ],
  mechatroniker: [
    "Das Geräusch war vorhin noch nicht da.",
    "Ich muss das einmal aufmachen.",
    "Der Fehler kommt nur manchmal.",
    "Gib mir kurz das Messgerät.",
    "Lass sie nochmal laufen.",
  ],
  erzieher: [
    "Wir machen das nacheinander.",
    "Ich habe dich gehört.",
    "Nicht alle gleichzeitig.",
    "Komm, wir gehen kurz raus.",
    "Das war gerade zu viel.",
  ],
  verkaeufer: [
    "Ich schau kurz im Lager.",
    "Das ist gerade leider ausverkauft.",
    "Haben Sie Ihre Karte dabei?",
    "Ich mach die zweite Kasse auf.",
    "Einen Moment, ich komme gleich.",
  ],
  koch: [
    "Wie lange noch?",
    "Pfanne ist heiß.",
    "Das muss jetzt raus.",
    "Wer hat den Bon?",
    "Tisch zwölf wartet.",
  ],
  tischler: [
    "Das ist noch nicht bündig.",
    "Ein Millimeter fehlt.",
    "Halt das mal kurz fest.",
    "Ich schleife es nochmal.",
    "Jetzt sitzt es.",
  ],
  bauzeichner: [
    "Das Maß stimmt nicht.",
    "Welche Version ist aktuell?",
    "Die Wand liegt zwei Zentimeter anders.",
    "Ich prüfe den Plan nochmal.",
    "Der Schnitt fehlt noch.",
  ],
  industriemechaniker: [
    "Die Anlage klingt anders.",
    "Das Lager hat Spiel.",
    "Wir stellen das nochmal ein.",
    "Hol mal den Schlüssel.",
    "Jetzt läuft sie ruhiger.",
  ],
  veranstaltungstechniker: [
    "Kabel bitte nicht über den Weg.",
    "Licht steht.",
    "Noch einmal Soundcheck.",
    "Wer hat den Adapter?",
    "Nach der Show bauen wir ab.",
  ],
  "medizinische-fachangestellte": [
    "Haben Sie Ihre Karte dabei?",
    "Setzen Sie sich bitte kurz ins Wartezimmer.",
    "Ich frage die Ärztin.",
    "Das Telefon hört heute nicht auf.",
    "Wir finden noch einen Termin.",
  ],
  "kaufmann-bueromanagement": [
    "Wer hat die aktuelle Version?",
    "Ich lege das in den Ordner.",
    "Der Termin steht im Kalender.",
    "Kannst du mir das kurz weiterleiten?",
    "Sonst findet das morgen niemand mehr.",
  ],
  friseur: [
    "Nur die Spitzen?",
    "Schau mal kurz in den Spiegel.",
    "Das fällt gleich weicher.",
    "Ich nehme noch ein bisschen Länge raus.",
    "So sieht es natürlicher aus.",
  ],
  florist: [
    "Das hält mit genug Wasser.",
    "Für welchen Anlass ist es?",
    "Die Stiele müssen noch kürzer.",
    "Ich binde das etwas lockerer.",
    "Der Strauß kippt sonst nach links.",
  ],
  zugbegleiter: [
    "Die Fahrkarten bitte.",
    "Der Anschluss wartet nicht.",
    "Wir haben ein paar Minuten Verspätung.",
    "Bitte einmal den Gang freimachen.",
    "Ich frage vorne nach.",
  ],
  tierpfleger: [
    "Heute frisst er weniger.",
    "Er wirkt anders als gestern.",
    "Erst sauber machen, dann füttern.",
    "Mach die Tür richtig zu.",
    "Wir beobachten das nochmal.",
  ],
};

export const careers: Career[] = careerEntries.map((career) => ({
  ...career,
  dayMoments: careerDayMoments[career.slug] ?? [],
  laterNotices: careerLaterNotices[career.slug] ?? [],
  lifeIndicators: careerLifeIndicators[career.slug] ?? defaultLifeIndicators,
  practicalSignals: careerPracticalSignals[career.slug] ?? defaultPracticalSignals,
  realSentences: careerRealSentences[career.slug] ?? [],
  realism: careerRealism[career.slug] ?? defaultCareerRealism,
}));

export const situations: Situation[] = [
  {
    prompt: "Wenn Schule nie richtig zu dir gepasst hat",
    note: "Vielleicht brauchst du nicht mehr Theorie. Vielleicht brauchst du einen Tag, der sich weniger gestellt anfühlt.",
    slugs: [
      "elektroniker",
      "tischler",
      "koch",
      "fachkraft-lagerlogistik",
      "tierpfleger",
    ],
  },
  {
    prompt: "Wenn Menschen dich schnell leer machen",
    note: "Nicht komplett allein sein. Aber genug Ruhe, um nicht ständig performen zu müssen.",
    slugs: [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "mediengestalter",
      "fachkraft-lagerlogistik",
      "tischler",
    ],
  },
  {
    prompt: "Wenn du lieber ruhig gut bist als laut auffällig",
    note: "Manche Arbeit sieht von außen unspektakulär aus. Genau das kann angenehm sein.",
    slugs: [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "kaufmann-bueromanagement",
      "florist",
      "tierpfleger",
    ],
  },
  {
    prompt: "Wenn du am Ende vom Tag sehen willst, dass etwas fertig ist",
    note: "Nicht nur reden, planen, nochmal besprechen. Irgendwas steht. Irgendwas läuft.",
    slugs: [
      "elektroniker",
      "tischler",
      "koch",
      "florist",
      "industriemechaniker",
    ],
  },
  {
    prompt: "Wenn du etwas Echtes statt Bürogefühl willst",
    note: "Mehr Flur, Straße, Werkstatt, Hände. Weniger so tun, als wäre jedes Meeting wichtig.",
    slugs: [
      "notfallsanitaeter",
      "pflegefachkraft",
      "elektroniker",
      "koch",
      "tierpfleger",
    ],
  },
  {
    prompt: "Wenn du nicht acht Stunden Smalltalk willst",
    note: "Freundlich sein, ja. Dauernd reden müssen, eher nicht.",
    slugs: [
      "fachinformatiker-systemintegration",
      "elektroniker",
      "mechatroniker",
      "bauzeichner",
      "fachkraft-lagerlogistik",
    ],
  },
  {
    prompt: "Wenn du lieber Dinge verstehst als präsentierst",
    note: "Ruhig schauen, warum etwas so ist. Nicht vorne stehen und alles verkaufen.",
    slugs: [
      "fachinformatiker-systemintegration",
      "mechatroniker",
      "industriemechaniker",
      "bauzeichner",
      "elektroniker",
    ],
  },
  {
    prompt: "Wenn du etwas willst, das nicht komplett sinnlos wirkt",
    note: "Nicht jeden Tag große Bedeutung. Aber wenigstens öfter das Gefühl: okay, das war nicht nichts.",
    slugs: [
      "pflegefachkraft",
      "notfallsanitaeter",
      "medizinische-fachangestellte",
      "erzieher",
      "tierpfleger",
    ],
  },
  {
    prompt: "Wenn du schnell von Chaos müde wirst",
    note: "Nicht komplett ohne Stress. Aber mit Abläufen, an denen man sich festhalten kann.",
    slugs: [
      "kaufmann-bueromanagement",
      "fachkraft-lagerlogistik",
      "bauzeichner",
      "fachinformatiker-systemintegration",
    ],
  },
  {
    prompt: "Wenn du gern nah dran bist, aber nicht im Mittelpunkt",
    note: "Da sein, mitbekommen, helfen. Ohne daraus eine große Show zu machen.",
    slugs: [
      "medizinische-fachangestellte",
      "friseur",
      "erzieher",
      "zugbegleiter",
      "pflegefachkraft",
    ],
  },
  {
    prompt: "Wenn du etwas Schönes machen willst, ohne kitschig zu werden",
    note: "Gestalten, verbessern, einen Unterschied sehen. Aber bitte realistisch.",
    slugs: ["mediengestalter", "florist", "friseur", "tischler"],
  },
  {
    prompt: "Wenn du bei Druck eher wach wirst",
    note: "Nicht jeden Tag. Nicht dauernd. Aber manchmal bringt Tempo dich in einen klareren Zustand.",
    slugs: [
      "koch",
      "notfallsanitaeter",
      "veranstaltungstechniker",
      "zugbegleiter",
    ],
  },
];

export function getSituationCareers(situation: Situation) {
  return situation.slugs
    .map((slug) => getCareer(slug))
    .filter((career): career is Career => Boolean(career));
}

export function getSituationsForCareer(slug: string) {
  return situations.filter((situation) => situation.slugs.includes(slug));
}

export const quizQuestions = [
  {
    id: "endure",
    question: "Was würdest du länger aushalten?",
    answers: [
      {
        label: "lange Konzentration",
        careers: [
          "fachinformatiker-systemintegration",
          "bauzeichner",
          "mediengestalter",
          "kaufmann-bueromanagement",
        ],
      },
      {
        label: "ständige Unterbrechungen",
        careers: [
          "pflegefachkraft",
          "medizinische-fachangestellte",
          "erzieher",
          "verkaeufer",
        ],
      },
    ],
  },
  {
    id: "annoyance",
    question: "Was nervt dich weniger?",
    answers: [
      {
        label: "ein Problem, das einfach nicht weggeht",
        careers: [
          "fachinformatiker-systemintegration",
          "elektroniker",
          "mechatroniker",
          "industriemechaniker",
        ],
      },
      {
        label: "viele Menschen, die gleichzeitig etwas wollen",
        careers: [
          "pflegefachkraft",
          "notfallsanitaeter",
          "medizinische-fachangestellte",
          "zugbegleiter",
        ],
      },
    ],
  },
  {
    id: "quiet",
    question: "Was gibt dir eher Ruhe?",
    answers: [
      {
        label: "wenn etwas endlich funktioniert",
        careers: [
          "elektroniker",
          "mechatroniker",
          "fachinformatiker-systemintegration",
          "industriemechaniker",
        ],
      },
      {
        label: "wenn jemand sichtbar erleichtert ist",
        careers: [
          "pflegefachkraft",
          "notfallsanitaeter",
          "medizinische-fachangestellte",
          "friseur",
        ],
      },
    ],
  },
  {
    id: "body-or-head",
    question: "Was fühlt sich weniger falsch an?",
    answers: [
      {
        label: "mit Händen etwas machen",
        careers: [
          "tischler",
          "elektroniker",
          "florist",
          "koch",
          "fachkraft-lagerlogistik",
        ],
      },
      {
        label: "im Kopf etwas sortieren",
        careers: [
          "bauzeichner",
          "kaufmann-bueromanagement",
          "fachinformatiker-systemintegration",
          "mediengestalter",
        ],
      },
    ],
  },
  {
    id: "energy-cost",
    question: "Was kostet dich weniger Energie?",
    answers: [
      {
        label: "reden",
        careers: [
          "erzieher",
          "verkaeufer",
          "friseur",
          "zugbegleiter",
          "medizinische-fachangestellte",
        ],
      },
      {
        label: "beobachten",
        careers: [
          "tierpfleger",
          "bauzeichner",
          "fachinformatiker-systemintegration",
          "fachkraft-lagerlogistik",
          "florist",
        ],
      },
    ],
  },
  {
    id: "after-day",
    question: "Was wäre am Ende vom Tag besser?",
    answers: [
      {
        label: "etwas ist fertig",
        careers: [
          "tischler",
          "elektroniker",
          "koch",
          "florist",
          "mediengestalter",
        ],
      },
      {
        label: "jemand ist nicht mehr allein",
        careers: [
          "pflegefachkraft",
          "notfallsanitaeter",
          "erzieher",
          "medizinische-fachangestellte",
        ],
      },
    ],
  },
  {
    id: "bad-day",
    question: "Was wäre an einem schlechten Tag eher auszuhalten?",
    answers: [
      {
        label: "körperlich müde sein",
        careers: [
          "fachkraft-lagerlogistik",
          "elektroniker",
          "koch",
          "tierpfleger",
          "industriemechaniker",
        ],
      },
      {
        label: "im Kopf noch weiterdenken",
        careers: [
          "fachinformatiker-systemintegration",
          "mediengestalter",
          "bauzeichner",
          "kaufmann-bueromanagement",
          "veranstaltungstechniker",
        ],
      },
    ],
  },
];

export function getCareer(slug: string) {
  return careers.find((career) => career.slug === slug);
}

export function getEmotionalPathways(slug: string) {
  const career = getCareer(slug);
  if (!career) return [];

  return career.emotionalPathways.map((pathway) => ({
    ...pathway,
    careers: pathway.slugs
      .map((pathSlug) => getCareer(pathSlug))
      .filter((pathCareer): pathCareer is Career => Boolean(pathCareer)),
  }));
}

export function getExplorationCareers(selectedSlugs: string[]) {
  const scores = new Map<string, number>();

  for (const slug of selectedSlugs) {
    scores.set(slug, (scores.get(slug) ?? 0) + 1);
  }

  return [...careers].sort((a, b) => {
    const scoreDiff = (scores.get(b.slug) ?? 0) - (scores.get(a.slug) ?? 0);
    return scoreDiff || careers.indexOf(a) - careers.indexOf(b);
  });
}
