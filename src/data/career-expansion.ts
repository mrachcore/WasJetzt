import type {
  Career,
  CareerDifferenceMoment,
  LifeIndicators,
  SignalWeights,
} from "@/data/careers";

type CareerEntry = Omit<
  Career,
  | "dayMoments"
  | "laterNotices"
  | "lifeIndicators"
  | "signalWeights"
  | "realDifferences"
  | "oftenConfusedWith"
  | "practicalSignals"
  | "realSentences"
  | "realism"
>;

export const careerExpansionEntries: CareerEntry[] = [
  {
    slug: "vermessungstechniker",
    title: "Vermessungstechniker",
    searchKeywords: ["vermessung", "geodaesie", "baustelle", "messung"],
    short:
      "Fuer Leute, die draussen stehen koennen und trotzdem millimetergenau denken.",
    atmosphere:
      "Morgens kalte Luft, Stativ, Warnweste, Bodenpunkte, Baustellenlaerm und Zahlen, die spaeter echte Grenzen werden.",
    secretlyLike:
      "Wenn ein Punkt endlich stimmt und damit ein ganzer Plan ruhiger wird.",
    annoys:
      "Wetter, Verkehr, unklare Plaene, schweres Geraet und Menschen, die Messpunkte fuer Deko halten.",
    comfortableFor:
      "Menschen, die draussen arbeiten wollen, aber nicht einfach nur draussen sein wollen.",
    color: "from-[#9fb6a5]/28 to-[#24221b]/30",
    tags: ["draussen", "genau", "technisch"],
    discoveryNote:
      "Nicht nur Karte. Eher: hier wird aus Raum eine Zahl, mit der andere bauen.",
    discoveryGroup: "Wenn draussen genau sein muss",
    observations: [
      "Du merkst, dass ein paar Zentimeter sehr real werden koennen.",
      "Manche Tage fuehlen sich nach Baustelle an, obwohl du vor allem misst.",
      "Draussen arbeiten heisst hier nicht weniger denken.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran das Messen gefaellt",
        note: "Noch mehr Daten, Karten und Raum.",
        slugs: ["geomatiker", "bauzeichner"],
      },
      {
        prompt: "Wenn du lieber praktisch draussen bleibst",
        note: "Mehr Natur, weniger Koordinaten.",
        slugs: ["forstwirt", "umwelttechnologe-abwasser"],
      },
      {
        prompt: "Wenn du die Genauigkeit magst, aber drinnen",
        note: "Praezision bleibt, das Wetter nicht.",
        slugs: ["zahntechniker", "technischer-produktdesigner"],
      },
    ],
    whyItMightFit:
      "Wenn du gern konkret arbeitest und es dich reizt, wenn ein unscheinbarer Punkt spaeter fuer viele wichtig ist.",
    typicalTuesday: [
      { time: "Morgens", text: "Geraet laden, Plan pruefen, raus zur Baustelle." },
      { time: "Vor Ort", text: "Stativ aufbauen und merken, dass genau hier jemand geparkt hat." },
      { time: "Mittags", text: "Messpunkte sichern, Daten kontrollieren, kurz die Finger waermen." },
      { time: "Nachmittags", text: "Zurueck uebertragen, Abweichung suchen, nochmal rechnen." },
      { time: "Vor Schluss", text: "Daten ablegen, damit morgen niemand am falschen Punkt beginnt." },
    ],
  },
  {
    slug: "forstwirt",
    title: "Forstwirt",
    searchKeywords: ["wald", "forst", "natur", "draussen"],
    short:
      "Fuer Leute, die Natur moegen, aber wissen wollen, wie Arbeit dort wirklich riecht, wiegt und klingt.",
    atmosphere:
      "Nasser Waldboden, Motorsaege, Schutzkleidung, Wege, Holz, Wetter und Entscheidungen, die erst spaeter sichtbar werden.",
    secretlyLike:
      "Wenn du siehst, dass ein Stueck Wald wieder Platz, Licht oder Ordnung bekommt.",
    annoys:
      "Kaelte, Regen, schwere Arbeit, Gefahr und romantische Saetze von Menschen, die den Wald nur sonntags sehen.",
    comfortableFor:
      "Menschen, die draussen nicht sofort weich werden und mit Werkzeug respektvoll umgehen.",
    color: "from-[#8faa82]/28 to-[#24221b]/30",
    tags: ["draussen", "koerperlich", "natur"],
    discoveryNote:
      "Naturarbeit ohne Postkartenfilter. Viel Koerper, viel Vorsicht, viel Wetter.",
    discoveryGroup: "Wenn Natur echte Arbeit sein darf",
    observations: [
      "Du lernst, Wetter nicht als Hintergrund zu sehen.",
      "Ein Baum ist nicht einfach nur gross. Er hat Richtung, Spannung, Gewicht.",
      "Nach manchen Tagen riecht alles nach Wald und Maschine.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran die Natur gefaellt",
        note: "Auch draussen, aber technischer und staedtischer.",
        slugs: ["umwelttechnologe-abwasser", "vermessungstechniker"],
      },
      {
        prompt: "Wenn du mehr Tiere und Routine willst",
        note: "Leiser, aber nicht weniger koerperlich.",
        slugs: ["tierpfleger"],
      },
      {
        prompt: "Wenn dir Materialarbeit gefaellt",
        note: "Mehr Werkstatt, weniger Wetter.",
        slugs: ["tischler", "werkzeugmechaniker"],
      },
    ],
    whyItMightFit:
      "Wenn du echte Natur naeher findest als saubere Naturbilder und mit anstrengenden Tagen leben kannst.",
    typicalTuesday: [
      { time: "Frueh", text: "Wetter checken, Ausruestung an, raus." },
      { time: "Im Bestand", text: "Schauen, was stehen bleibt und was nicht." },
      { time: "Vormittags", text: "Saegen, ziehen, sichern, Abstand halten." },
      { time: "Nachmittags", text: "Wege freimachen, Werkzeug pruefen, Holz sortieren." },
      { time: "Am Ende", text: "Muede Beine, dreckige Kleidung, ein Waldstueck wirkt anders." },
    ],
  },
  {
    slug: "hoerakustiker",
    title: "Hoerakustiker",
    searchKeywords: ["hoeren", "akustik", "gesundheit", "technik"],
    short:
      "Fuer Leute, die Technik moegen, aber merken wollen, was sie im Leben eines Menschen veraendert.",
    atmosphere:
      "Kleine Geraete, ruhige Gespraeche, Hoertests, feine Einstellungen und der Moment, wenn jemand etwas wieder wahrnimmt.",
    secretlyLike:
      "Wenn Technik ploetzlich nicht technisch wirkt, sondern wie Erleichterung.",
    annoys:
      "Fummelige Teile, Geduldsschleifen, schwierige Erwartungen und Menschen, denen Hoeren peinlich ist.",
    comfortableFor:
      "Menschen, die genau arbeiten koennen und mit Unsicherheit freundlich umgehen.",
    color: "from-[#a7b9aa]/28 to-[#24221b]/30",
    tags: ["technisch", "nah", "praezise"],
    discoveryNote:
      "Gesundheitsnah, aber nicht Klinik. Handwerklich, aber sehr fein.",
    discoveryGroup: "Wenn kleine Technik viel veraendert",
    observations: [
      "Du lernst, dass ein winziges Geraet einen Raum veraendern kann.",
      "Viele Gespraeche gehen nicht nur ums Hoeren, sondern ums Aelterwerden.",
      "Feine Einstellungen brauchen mehr Geduld als grosse Gesten.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran Technik und Menschen gefallen",
        note: "Aehnlich nah, aber mehr Werkstatt und Koerper.",
        slugs: ["orthopaedietechnik-mechaniker", "zahntechniker"],
      },
      {
        prompt: "Wenn du mehr Praxisalltag willst",
        note: "Mehr Taktung, mehr Telefon, mehr Wartezimmer.",
        slugs: ["medizinische-fachangestellte"],
      },
      {
        prompt: "Wenn du lieber ganz fein arbeitest",
        note: "Mehr Material, weniger Beratung.",
        slugs: ["zahntechniker"],
      },
    ],
    whyItMightFit:
      "Wenn du technische Genauigkeit magst und trotzdem nicht vergessen willst, fuer wen du sie einstellst.",
    typicalTuesday: [
      { time: "Morgens", text: "Geraete pruefen, Termine ansehen, Ohrpassstuecke sortieren." },
      { time: "Vormittags", text: "Hoertest, leise Erklaerung, nochmal nachfragen." },
      { time: "Mittags", text: "Ein kleines Teil passt nicht ganz." },
      { time: "Nachmittags", text: "Feineinstellung. Ein Klick macht den Raum anders." },
      { time: "Vor Schluss", text: "Dokumentieren, reinigen, fuer morgen bereitlegen." },
    ],
  },
  {
    slug: "orthopaedietechnik-mechaniker",
    title: "Orthopaedietechnik-Mechaniker",
    searchKeywords: ["orthopaedie", "prothese", "technik", "gesundheit", "handwerk"],
    short:
      "Fuer Leute, die mit Material arbeiten wollen und dabei nie vergessen, dass es an einem Menschen landet.",
    atmosphere:
      "Werkstatt, Gips, Kunststoff, Leder, Metall, Anproben und Saetze, die zwischen Technik und Koerper stehen.",
    secretlyLike:
      "Wenn etwas endlich sitzt und eine Bewegung wieder moeglicher wird.",
    annoys:
      "Nacharbeiten, Druckstellen, unklare Beschwerden und der Anspruch, dass ein Teil technisch und menschlich passen muss.",
    comfortableFor:
      "Menschen, die handwerklich genau sind und Naehe nicht sofort unangenehm finden.",
    color: "from-[#b2aa96]/28 to-[#24221b]/30",
    tags: ["handwerk", "gesundheit", "genau"],
    discoveryNote:
      "Kein normales Basteln. Material, Koerper und Alltag muessen zusammenkommen.",
    discoveryGroup: "Wenn Handwerk direkt am Menschen landet",
    observations: [
      "Du merkst, dass ein Millimeter am Koerper anders zaehlt.",
      "Nicht jede Loesung sieht gross aus. Manche laufen einfach besser mit.",
      "Werkstattarbeit wird ploetzlich sehr persoenlich.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir daran das Gesundheitliche gefaellt",
        note: "Mehr Praxis, weniger Werkstatt.",
        slugs: ["hoerakustiker", "medizinische-fachangestellte"],
      },
      {
        prompt: "Wenn du lieber fein im Labor arbeitest",
        note: "Auch Koerperbezug, aber kleiner und stiller.",
        slugs: ["zahntechniker"],
      },
      {
        prompt: "Wenn du Material ohne Menschennaehe willst",
        note: "Praezision bleibt, Abstand wird groesser.",
        slugs: ["werkzeugmechaniker", "tischler"],
      },
    ],
    whyItMightFit:
      "Wenn du etwas bauen willst, das nicht nur fertig aussieht, sondern sich fuer jemanden anders anfuehlt.",
    typicalTuesday: [
      { time: "Morgens", text: "Auftrag lesen, Masse pruefen, Material holen." },
      { time: "Werkstatt", text: "Schleifen, anpassen, nochmal anhalten." },
      { time: "Anprobe", text: "Ein Druckpunkt veraendert den ganzen Plan." },
      { time: "Nachmittags", text: "Nacharbeiten, Kante weicher machen, Gurt neu setzen." },
      { time: "Am Ende", text: "Das Teil sieht unspektakulaer aus. Fuer jemanden ist es viel." },
    ],
  },
  {
    slug: "chemielaborant",
    title: "Chemielaborant",
    searchKeywords: ["chemie", "labor", "analyse", "wissenschaft"],
    short:
      "Fuer Leute, die ruhig genau bleiben koennen, waehrend kleine Abweichungen alles veraendern.",
    atmosphere:
      "Pipetten, Glas, Etiketten, Schutzbrille, Protokolle, Gerueche und der Respekt vor Dingen, die man nicht einfach anfassen sollte.",
    secretlyLike:
      "Wenn ein Ergebnis endlich sauber aussieht und nicht nur ungefaehr stimmt.",
    annoys:
      "Wartezeiten, Wiederholungen, strenge Vorschriften und Fehler, die man erst spaet bemerkt.",
    comfortableFor:
      "Menschen, die Genauigkeit nicht langweilig finden und mit Routine sorgfaeltig bleiben.",
    color: "from-[#9fb6b2]/28 to-[#24221b]/30",
    tags: ["labor", "genau", "ruhig"],
    discoveryNote:
      "Viel weniger Explosion, viel mehr Konzentration, Protokoll und sauberes Arbeiten.",
    discoveryGroup: "Wenn kleine Abweichungen zaehlen",
    observations: [
      "Du lernst, dass sauber arbeiten nicht nur ordentlich aussieht.",
      "Manchmal besteht der Tag aus Warten auf ein Ergebnis, das sehr wichtig ist.",
      "Ein falsch beschriftetes Gefaess macht sofort alles anders.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Labor gefaellt",
        note: "Aehnlich genau, aber naeher an Medizin.",
        slugs: ["medizinischer-technologe-laboratorium", "pharmakant"],
      },
      {
        prompt: "Wenn du mehr Produktion willst",
        note: "Weniger Einzelprobe, mehr Prozess.",
        slugs: ["pharmakant", "umwelttechnologe-abwasser"],
      },
      {
        prompt: "Wenn du lieber Technik reparierst",
        note: "Mehr Maschine, weniger Probe.",
        slugs: ["mechatroniker"],
      },
    ],
    whyItMightFit:
      "Wenn du Genauigkeit magst, ohne daraus eine grosse Show zu machen.",
    typicalTuesday: [
      { time: "Morgens", text: "Proben annehmen, Etiketten pruefen, nichts verwechseln." },
      { time: "Vormittags", text: "Pipettieren, warten, protokollieren." },
      { time: "Mittags", text: "Ein Wert sieht komisch aus. Nochmal." },
      { time: "Nachmittags", text: "Geraet reinigen, Ergebnis vergleichen, Abweichung suchen." },
      { time: "Vor Schluss", text: "Alles dokumentieren, damit morgen noch klar ist, was heute war." },
    ],
  },
  {
    slug: "lokfuehrer",
    title: "Lokfuehrer",
    searchKeywords: ["bahn", "zug", "transport", "sicherheit"],
    short:
      "Fuer Leute, die lange konzentriert bleiben koennen, waehrend Verantwortung leise mitfaehrt.",
    atmosphere:
      "Fuehrerstand, Signale, Fahrplan, Strecke, Funk, Dunkelheit morgens und der Blick, der immer wieder nach vorne geht.",
    secretlyLike:
      "Wenn ein schwerer Zug ruhig durch den Tag kommt.",
    annoys:
      "Schichten, Stoerungen, Verspaetungen, monotone Phasen und Verantwortung, die kaum jemand sieht.",
    comfortableFor:
      "Menschen, die allein arbeiten koennen und dabei nicht abschalten.",
    color: "from-[#9aa5ad]/28 to-[#24221b]/30",
    tags: ["transport", "verantwortung", "fokus"],
    discoveryNote:
      "Nicht nur Zug fahren. Eher lange Konzentration mit Menschen im Hintergrund.",
    discoveryGroup: "Wenn Verantwortung leise mitfaehrt",
    observations: [
      "Du bist oft allein, aber nie ohne Verantwortung.",
      "Routine darf hier nicht einschlaefern.",
      "Ein Signal ist ein kleiner Moment mit grosser Bedeutung.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Transport gefaellt",
        note: "Mehr Kontakt, weniger allein.",
        slugs: ["zugbegleiter", "fachkraft-schutz-sicherheit"],
      },
      {
        prompt: "Wenn dir Verantwortung fuer Systeme liegt",
        note: "Mehr Technik, weniger Strecke.",
        slugs: ["fachinformatiker-systemintegration", "mechatroniker"],
      },
      {
        prompt: "Wenn du lieber draussen beweglich bist",
        note: "Mehr Wetter, weniger Fuehrerstand.",
        slugs: ["vermessungstechniker", "forstwirt"],
      },
    ],
    whyItMightFit:
      "Wenn du Ruhe nicht mit Unaufmerksamkeit verwechselst und Verantwortung auch ohne Publikum ernst nimmst.",
    typicalTuesday: [
      { time: "Frueh", text: "Dienstbeginn, Strecke, Fahrzeug, Unterlagen." },
      { time: "Abfahrt", text: "Signal, Tuer, Funk, Blick nach vorn." },
      { time: "Unterwegs", text: "Kilometer, Konzentration, nichts Dramatisches und genau deshalb wach bleiben." },
      { time: "Bei Stoerung", text: "Ruhig bleiben, melden, warten, weiterdenken." },
      { time: "Nach Dienst", text: "Der Zug steht. Die Anspannung merkt man erst spaeter." },
    ],
  },
  {
    slug: "bestattungsfachkraft",
    title: "Bestattungsfachkraft",
    searchKeywords: ["bestattung", "trauer", "organisation", "menschen"],
    short:
      "Fuer Leute, die ruhig bleiben koennen, wenn ein Tag fuer andere gerade sehr schwer ist.",
    atmosphere:
      "Leise Raeume, Formulare, Anrufe, Blumen, Termine, Trauerfamilien und praktische Dinge, die trotzdem erledigt werden muessen.",
    secretlyLike:
      "Wenn Ordnung ein bisschen Halt gibt, ohne laut zu werden.",
    annoys:
      "Schwere Stimmungen, spontane Aenderungen, Tabus und dass manche Arbeit unsichtbar bleiben soll.",
    comfortableFor:
      "Menschen, die respektvoll praktisch sein koennen und schwierige Naehe aushalten.",
    color: "from-[#9d9a90]/28 to-[#24221b]/30",
    tags: ["ruhig", "menschen", "wuerdevoll"],
    discoveryNote:
      "Kein dramatischer Beruf. Eher leise Verantwortung in sehr echten Momenten.",
    discoveryGroup: "Wenn Ruhe anderen Halt geben kann",
    observations: [
      "Du lernst, dass praktische Fragen auch in Trauer wichtig sind.",
      "Manche Saetze sagt man sehr langsam.",
      "Wuerde entsteht oft durch Details, die kaum jemand benennt.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir ruhiger Dienst an Menschen liegt",
        note: "Mehr Alltag, weniger Abschied.",
        slugs: ["medizinische-fachangestellte", "justizfachangestellter"],
      },
      {
        prompt: "Wenn dir Gestaltung in Anlaessen gefaellt",
        note: "Mehr Farbe, weniger schwere Stille.",
        slugs: ["florist"],
      },
      {
        prompt: "Wenn dir Krise zu nah wird",
        note: "Mehr klare Regeln und Abstand.",
        slugs: ["kaufmann-bueromanagement"],
      },
    ],
    whyItMightFit:
      "Wenn du in schweren Momenten weder fluechten noch gross auftreten musst.",
    typicalTuesday: [
      { time: "Morgens", text: "Anrufe, Termine, Unterlagen, leise Stimmen." },
      { time: "Vormittags", text: "Ein Gespraech, in dem jemand nicht weiss, was als Naechstes kommt." },
      { time: "Mittags", text: "Organisation, Wege, Abstimmungen." },
      { time: "Nachmittags", text: "Ein Detail muss stimmen, gerade weil niemand viel sagt." },
      { time: "Am Ende", text: "Der Tag war ruhig. Nicht leicht." },
    ],
  },
  {
    slug: "geomatiker",
    title: "Geomatiker",
    searchKeywords: ["gis", "karten", "geodaten", "mapping"],
    short:
      "Fuer Leute, die Karten nicht nur anschauen, sondern verstehen wollen, wie aus Daten Orientierung wird.",
    atmosphere:
      "Bildschirme, Luftbilder, Koordinaten, Layer, Datenfehler und der Moment, wenn ein Raum ploetzlich lesbar wird.",
    secretlyLike:
      "Wenn viele unklare Punkte auf einer Karte endlich Sinn ergeben.",
    annoys:
      "Schlechte Daten, falsche Koordinaten, Versionschaos und Karten, die schoen aussehen, aber nicht stimmen.",
    comfortableFor:
      "Menschen, die visuell denken und dabei technisch genau bleiben.",
    color: "from-[#96aeb4]/28 to-[#24221b]/30",
    tags: ["karten", "daten", "genau"],
    discoveryNote:
      "Ruhiger als Vermessung draussen, aber nicht weniger raeumlich.",
    discoveryGroup: "Wenn Orte zu Daten werden",
    observations: [
      "Du merkst, dass eine Karte auch falsch beruhigen kann.",
      "Ein Layer zu viel kann mehr verwirren als helfen.",
      "Raum wird hier nicht gefuehlt, sondern sortiert.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Raum und Genauigkeit gefallen",
        note: "Mehr draussen, mehr Geraet.",
        slugs: ["vermessungstechniker", "bauzeichner"],
      },
      {
        prompt: "Wenn du lieber visuell gestaltest",
        note: "Mehr Wirkung, weniger Koordinaten.",
        slugs: ["mediengestalter"],
      },
      {
        prompt: "Wenn du Daten mit Systemen magst",
        note: "Mehr IT, weniger Karten.",
        slugs: ["fachinformatiker-systemintegration"],
      },
    ],
    whyItMightFit:
      "Wenn du gern verstehst, wo Dinge liegen, und es dich stoert, wenn Daten die Welt ungenau machen.",
    typicalTuesday: [
      { time: "Morgens", text: "Daten laden, Layer pruefen, Projekt oeffnen." },
      { time: "Vormittags", text: "Eine Flaeche passt nicht zu den Koordinaten." },
      { time: "Mittags", text: "Luftbild, Tabelle, Karte. Irgendwo widerspricht sich etwas." },
      { time: "Nachmittags", text: "Korrigieren, exportieren, nochmal pruefen." },
      { time: "Vor Schluss", text: "Eine Karte sieht ruhig aus, weil du lange sortiert hast." },
    ],
  },
  {
    slug: "werkzeugmechaniker",
    title: "Werkzeugmechaniker",
    searchKeywords: ["werkzeug", "metall", "praezision", "industrie"],
    short:
      "Fuer Leute, die verstehen, dass ein Werkzeug nicht einfach da ist, sondern sehr genau entstehen muss.",
    atmosphere:
      "Metall, Maschinen, Messmittel, enge Toleranzen, Kanten, Formen und Teile, die spaeter viele andere Teile moeglich machen.",
    secretlyLike:
      "Wenn ein Werkzeug endlich sauber passt und danach wiederholbar arbeitet.",
    annoys:
      "Winzige Abweichungen, lange Nacharbeit, harte Materialien und der Satz: fast reicht.",
    comfortableFor:
      "Menschen, die Praezision ernst nehmen und nicht jeden Erfolg sofort sehen muessen.",
    color: "from-[#a6a28e]/28 to-[#24221b]/30",
    tags: ["metall", "praezise", "werkstatt"],
    discoveryNote:
      "Nicht das Produkt selbst. Eher das Ding, das Produkte erst moeglich macht.",
    discoveryGroup: "Wenn Praezision wiederholbar werden muss",
    observations: [
      "Du arbeitest oft an etwas, das andere spaeter nur benutzen.",
      "Ein kleines Mass entscheidet, ob vieles danach passt.",
      "Material hat hier Widerstand und Geduld.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Metall und Genauigkeit gefallen",
        note: "Mehr Anlage, mehr laufender Betrieb.",
        slugs: ["industriemechaniker", "mechatroniker"],
      },
      {
        prompt: "Wenn du mehr sichtbares Einzelstueck willst",
        note: "Mehr Holz, Raum und Oberflaeche.",
        slugs: ["tischler"],
      },
      {
        prompt: "Wenn du feiner am Koerper arbeiten willst",
        note: "Noch kleiner, gesundheitsnah.",
        slugs: ["zahntechniker"],
      },
    ],
    whyItMightFit:
      "Wenn du gern an Dingen arbeitest, deren Bedeutung erst spaeter im Prozess sichtbar wird.",
    typicalTuesday: [
      { time: "Morgens", text: "Zeichnung lesen, Material holen, Maschine vorbereiten." },
      { time: "Vormittags", text: "Fraesen, messen, nochmal messen." },
      { time: "Mittags", text: "Eine Kante stimmt fast. Fast reicht nicht." },
      { time: "Nachmittags", text: "Nacharbeiten, pruefen, einsetzen." },
      { time: "Am Ende", text: "Das Werkzeug sieht ruhig aus. Darin steckt der Tag." },
    ],
  },
  {
    slug: "anlagenmechaniker-shk",
    title: "Anlagenmechaniker SHK",
    searchKeywords: ["shk", "sanitaer", "heizung", "klima", "handwerk"],
    short:
      "Fuer Leute, die praktische Technik moegen und kein Problem damit haben, wenn Arbeit nah am Alltag anderer passiert.",
    atmosphere:
      "Keller, Baeder, Rohre, Wasser, Waerme, enge Stellen, Kundentermine und der Satz: seit gestern ist es kalt.",
    secretlyLike:
      "Wenn Wasser, Waerme oder Luft wieder dort sind, wo sie hingehoeren.",
    annoys:
      "Enge Schaechte, alte Leitungen, Dreck, Notdienste und Ueberraschungen hinter Verkleidungen.",
    comfortableFor:
      "Menschen, die unterwegs praktisch loesen und mit echten Haushalten umgehen koennen.",
    color: "from-[#9fb3ad]/28 to-[#24221b]/30",
    tags: ["handwerk", "unterwegs", "versorgung"],
    discoveryNote:
      "Technik, die sofort fehlt, wenn sie nicht funktioniert.",
    discoveryGroup: "Wenn Alltag wieder laufen soll",
    observations: [
      "Du merkst, wie wichtig Dinge sind, ueber die sonst niemand nachdenkt.",
      "Ein Rohr kann einen ganzen Vormittag bestimmen.",
      "Praktische Hilfe ist hier oft sehr direkt.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir technische Fehlersuche gefaellt",
        note: "Mehr Strom oder Maschine, weniger Bad und Keller.",
        slugs: ["elektroniker", "mechatroniker"],
      },
      {
        prompt: "Wenn du Versorgungssysteme spannend findest",
        note: "Mehr oeffentliche Infrastruktur.",
        slugs: ["umwelttechnologe-abwasser"],
      },
      {
        prompt: "Wenn dir Kundenkontakt zu viel wird",
        note: "Mehr Werkstatt, weniger Wohnungen.",
        slugs: ["industriemechaniker"],
      },
    ],
    whyItMightFit:
      "Wenn du gern praktisch hilfst und es dich nicht stoert, wenn Technik mitten im Alltag anderer Menschen liegt.",
    typicalTuesday: [
      { time: "Morgens", text: "Material einladen, Adresse checken, los." },
      { time: "Vor Ort", text: "Keller, Bad, Rohr. Erstmal schauen." },
      { time: "Vormittags", text: "Absperren, loesen, Teil passt nicht ganz." },
      { time: "Nachmittags", text: "Druck pruefen, Wasser auf, kurz warten." },
      { time: "Am Ende", text: "Es wird wieder warm. Jemand sagt nicht viel, ist aber erleichtert." },
    ],
  },
  {
    slug: "fahrzeuglackierer",
    title: "Fahrzeuglackierer",
    searchKeywords: ["lack", "auto", "farbe", "oberflaeche"],
    short:
      "Fuer Leute, die Oberflaechen ernst nehmen und sehen, wenn etwas fast gleich, aber nicht gleich ist.",
    atmosphere:
      "Schleifen, Abkleben, Farbton, Kabine, Staub, Licht und die Frage, ob man den Uebergang spaeter sieht.",
    secretlyLike:
      "Wenn eine Stelle wieder so wirkt, als waere nie etwas gewesen.",
    annoys:
      "Staub, Zeitdruck, Farbunterschiede, schlechte Vorarbeit und Macken, die erst im Licht auftauchen.",
    comfortableFor:
      "Menschen, die mit Haenden und Auge arbeiten und Geduld fuer Vorbereitung haben.",
    color: "from-[#b0a79a]/28 to-[#24221b]/30",
    tags: ["farbe", "oberflaeche", "genau"],
    discoveryNote:
      "Nicht nur Farbe drauf. Viel Vorbereitung, Licht und feine Uebergaenge.",
    discoveryGroup: "Wenn Oberflaechen ehrlich sind",
    observations: [
      "Du siehst Kratzer, die andere erst nach deinem Hinweis sehen.",
      "Der eigentliche Lackmoment ist kurz. Davor passiert viel.",
      "Farbe stimmt nicht nur im Eimer, sondern im Licht.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir sichtbare Veraenderung gefaellt",
        note: "Mehr Mensch, weniger Kabine.",
        slugs: ["friseur", "florist"],
      },
      {
        prompt: "Wenn du lieber Material baust",
        note: "Mehr Form, weniger Farbe.",
        slugs: ["tischler", "werkzeugmechaniker"],
      },
      {
        prompt: "Wenn du technische Fahrzeuge magst",
        note: "Mehr Mechanik, weniger Oberflaeche.",
        slugs: ["mechatroniker"],
      },
    ],
    whyItMightFit:
      "Wenn du gern sichtbar arbeitest und dich kleine Fehler in Oberflaechen nicht loslassen.",
    typicalTuesday: [
      { time: "Morgens", text: "Schaden ansehen, Flaeche vorbereiten, Licht pruefen." },
      { time: "Vormittags", text: "Schleifen, abkleben, nochmal reinigen." },
      { time: "Mittags", text: "Farbton wirkt fast richtig. Fast ist gefaehrlich." },
      { time: "Nachmittags", text: "Lackieren, warten, schauen." },
      { time: "Vor Schluss", text: "Ein Uebergang verschwindet. Genau darum ging es." },
    ],
  },
  {
    slug: "zahntechniker",
    title: "Zahntechniker",
    searchKeywords: ["zahn", "labor", "prothese", "keramik", "gesundheit"],
    short:
      "Fuer Leute, die extrem fein arbeiten wollen, ohne staendig direkt im Gespraech zu stehen.",
    atmosphere:
      "Labor, Modelle, Keramik, Wachs, kleine Werkzeuge, Farben und Formen, die spaeter in einem Mund funktionieren muessen.",
    secretlyLike:
      "Wenn etwas winziges ploetzlich natuerlich wirkt.",
    annoys:
      "Fummelige Korrekturen, enge Termine, kleine Fehler und dass kaum jemand sieht, wie viel Arbeit drinsteckt.",
    comfortableFor:
      "Menschen, die sehr genau mit Haenden arbeiten und stille Konzentration moegen.",
    color: "from-[#b6b0a2]/28 to-[#24221b]/30",
    tags: ["fein", "labor", "handwerk"],
    discoveryNote:
      "Gesundheitsnah, aber eher Labor als Behandlungszimmer.",
    discoveryGroup: "Wenn klein sehr genau sein muss",
    observations: [
      "Du arbeitest an etwas, das spaeter niemand als Arbeit sehen soll.",
      "Natuerlich aussehen ist oft das Schwierigste.",
      "Feines Handwerk kann sehr still sein.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir feines Gesundheits-Handwerk gefaellt",
        note: "Mehr Menschenkontakt, aehnliche Genauigkeit.",
        slugs: ["hoerakustiker", "orthopaedietechnik-mechaniker"],
      },
      {
        prompt: "Wenn du lieber Industrie-Praezision willst",
        note: "Groesser, metallischer, weniger Koerperbezug.",
        slugs: ["werkzeugmechaniker"],
      },
      {
        prompt: "Wenn du Labor magst",
        note: "Mehr Analyse, weniger Modellieren.",
        slugs: ["chemielaborant", "medizinischer-technologe-laboratorium"],
      },
    ],
    whyItMightFit:
      "Wenn du Geduld fuer kleine Dinge hast und sichtbares Ergebnis nicht laut sein muss.",
    typicalTuesday: [
      { time: "Morgens", text: "Modell ansehen, Auftrag lesen, Farbe vergleichen." },
      { time: "Vormittags", text: "Schichten, formen, pruefen." },
      { time: "Mittags", text: "Eine Kante wirkt nicht natuerlich." },
      { time: "Nachmittags", text: "Nacharbeiten unter Licht, nochmal anpassen." },
      { time: "Am Ende", text: "Wenn es gut ist, faellt es spaeter kaum auf." },
    ],
  },
  {
    slug: "operationstechnischer-assistent",
    title: "Operationstechnischer Assistent",
    searchKeywords: ["op", "operation", "medizin", "assistenz", "steril"],
    short:
      "Fuer Leute, die in sehr klaren Ablaeufen ruhig bleiben koennen, wenn es ernst wird.",
    atmosphere:
      "OP-Saal, sterile Tische, Instrumente, leise Ansagen, Konzentration und das Gefuehl, dass Reihenfolge zaehlt.",
    secretlyLike:
      "Wenn alles vorbereitet ist und im richtigen Moment da liegt.",
    annoys:
      "Druck, lange Konzentration, Stehen, Notfaelle und dass Fehler hier wenig Raum haben.",
    comfortableFor:
      "Menschen, die Struktur brauchen und mit medizinischer Naehe umgehen koennen.",
    color: "from-[#9fb7b1]/28 to-[#24221b]/30",
    tags: ["medizin", "struktur", "konzentration"],
    discoveryNote:
      "Nah an Medizin, aber mit viel Vorbereitung, Sterilitaet und genauer Reihenfolge.",
    discoveryGroup: "Wenn im ernsten Moment alles bereit sein muss",
    observations: [
      "Du merkst, wie viel Ruhe aus Vorbereitung entsteht.",
      "Nicht laut werden ist hier oft Teil der Arbeit.",
      "Ein Instrument zur richtigen Zeit kann den ganzen Ablauf leichter machen.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir medizinische Naehe gefaellt",
        note: "Mehr Patientenkontakt im Alltag.",
        slugs: ["pflegefachkraft", "medizinische-fachangestellte"],
      },
      {
        prompt: "Wenn dir Labor und Ordnung mehr liegen",
        note: "Weniger OP, mehr Probe.",
        slugs: ["medizinischer-technologe-laboratorium"],
      },
      {
        prompt: "Wenn dir akute Momente liegen",
        note: "Mehr draussen, mehr Unvorhersehbarkeit.",
        slugs: ["notfallsanitaeter"],
      },
    ],
    whyItMightFit:
      "Wenn du ernste Situationen nicht dramatisieren musst und dich klare Ablaeufe eher stabil machen.",
    typicalTuesday: [
      { time: "Morgens", text: "Plan lesen, Saal vorbereiten, Instrumente zaehlen." },
      { time: "Vor OP", text: "Steril arbeiten, alles an seinen Platz." },
      { time: "Mittags", text: "Ein Griff muss sitzen, ohne lange Worte." },
      { time: "Nachmittags", text: "Dokumentieren, aufbereiten, naechsten Ablauf vorbereiten." },
      { time: "Am Ende", text: "Der Tag war ruhig im Ton, aber nicht leicht." },
    ],
  },
  {
    slug: "pharmakant",
    title: "Pharmakant",
    searchKeywords: ["pharma", "produktion", "anlage", "medizin", "industrie"],
    short:
      "Fuer Leute, die saubere Prozesse moegen und Verantwortung lieber in Regeln, Anlagen und Chargen sehen.",
    atmosphere:
      "Produktionsraeume, Schutzkleidung, Anlagen, Chargenprotokolle, Kontrollen und ein Ablauf, der nicht ungefaehr sein darf.",
    secretlyLike:
      "Wenn ein Prozess sauber durchlaeuft und alles nachvollziehbar bleibt.",
    annoys:
      "Strenge Vorgaben, Dokumentation, Wiederholung und Stillstand, wenn eine Abweichung auftaucht.",
    comfortableFor:
      "Menschen, die Routine ernst nehmen und mit Technik plus Verantwortung umgehen koennen.",
    color: "from-[#9db4ad]/28 to-[#24221b]/30",
    tags: ["produktion", "pharma", "prozess"],
    discoveryNote:
      "Nicht Apotheke. Eher Industrie, Hygiene, Anlage und sehr genaue Abläufe.",
    discoveryGroup: "Wenn Prozesse sauber laufen muessen",
    observations: [
      "Du lernst, dass Dokumentation hier nicht Nebensache ist.",
      "Eine Charge ist ein ganzer Tag mit Verantwortung.",
      "Routine ist hier kein Autopilot.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Labor und Stoffe gefallen",
        note: "Mehr Einzelanalyse, weniger Produktion.",
        slugs: ["chemielaborant"],
      },
      {
        prompt: "Wenn du mehr Anlage willst",
        note: "Mehr Mechanik, weniger Pharma-Regeln.",
        slugs: ["industriemechaniker", "mechatroniker"],
      },
      {
        prompt: "Wenn du Medizin naeher willst",
        note: "Mehr Probe oder Patientennähe.",
        slugs: ["medizinischer-technologe-laboratorium"],
      },
    ],
    whyItMightFit:
      "Wenn du es beruhigend findest, wenn Verantwortung in klaren Schritten liegt.",
    typicalTuesday: [
      { time: "Morgens", text: "Umziehen, Hygiene, Anlage checken." },
      { time: "Vormittags", text: "Charge starten, Werte beobachten." },
      { time: "Mittags", text: "Eine Abweichung. Erst stoppen, dann klaeren." },
      { time: "Nachmittags", text: "Protokoll, Probe, Freigabe abwarten." },
      { time: "Vor Schluss", text: "Reinigen, dokumentieren, nichts offen lassen." },
    ],
  },
  {
    slug: "umwelttechnologe-abwasser",
    title: "Umwelttechnologe Abwasser",
    searchKeywords: ["abwasser", "umwelt", "klaeranlage", "technik", "wasser"],
    short:
      "Fuer Leute, die Infrastruktur spannend finden, auch wenn sie nicht sauber und sichtbar daherkommt.",
    atmosphere:
      "Klaerbecken, Pumpen, Geruch, Wasserproben, Kontrollgaenge, Geraeusche und Technik, die eine Stadt still am Laufen haelt.",
    secretlyLike:
      "Wenn Werte stimmen und man merkt: das System arbeitet.",
    annoys:
      "Geruch, Wetter, Stoerungen, Dreck und dass kaum jemand diese Arbeit bemerkt.",
    comfortableFor:
      "Menschen, die technische Verantwortung draussen und drinnen aushalten.",
    color: "from-[#8fb2ad]/28 to-[#24221b]/30",
    tags: ["umwelt", "technik", "systeme"],
    discoveryNote:
      "Umweltarbeit ohne romantischen Filter: Wasser, Anlage, Probe, Stoerung.",
    discoveryGroup: "Wenn unsichtbare Infrastruktur wichtig ist",
    observations: [
      "Du merkst, wie viel Alltag unter der Oberflaeche passiert.",
      "Ein Wert auf dem Display kann wichtiger sein als ein voller Kalender.",
      "Saubere Umweltarbeit kann ziemlich dreckig anfangen.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Umwelt und draussen gefallen",
        note: "Mehr Wald, weniger Anlage.",
        slugs: ["forstwirt", "vermessungstechniker"],
      },
      {
        prompt: "Wenn dir Versorgungstechnik liegt",
        note: "Mehr Kundenkontakt und Gebaeudetechnik.",
        slugs: ["anlagenmechaniker-shk"],
      },
      {
        prompt: "Wenn du lieber im Labor pruefst",
        note: "Mehr Probe, weniger Anlage.",
        slugs: ["chemielaborant"],
      },
    ],
    whyItMightFit:
      "Wenn du Systeme ernst nimmst, die niemand sieht, solange sie funktionieren.",
    typicalTuesday: [
      { time: "Morgens", text: "Rundgang, Werte, Geraeusche, Geruch." },
      { time: "Vormittags", text: "Probe nehmen, Pumpe pruefen, etwas klingt anders." },
      { time: "Mittags", text: "Laborwert passt nicht. Nochmal schauen." },
      { time: "Nachmittags", text: "Stoerung beheben, Anlage reinigen, Daten eintragen." },
      { time: "Am Ende", text: "Das Wasser laeuft weiter. Genau darum ging es." },
    ],
  },
  {
    slug: "technischer-produktdesigner",
    title: "Technischer Produktdesigner",
    searchKeywords: ["cad", "produktdesign", "konstruktion", "technik"],
    short:
      "Fuer Leute, die Ideen nicht nur schoen finden, sondern baubar machen wollen.",
    atmosphere:
      "CAD, Skizzen, Masse, Bauteile, Varianten, Rueckfragen und der Moment, in dem eine Form ploetzlich technisch Sinn ergibt.",
    secretlyLike:
      "Wenn ein Entwurf nicht nur gut aussieht, sondern auch funktionieren koennte.",
    annoys:
      "Aenderungen, unklare Vorgaben, Normen, Kollisionen im Modell und Ideen, die technisch nicht halten.",
    comfortableFor:
      "Menschen, die kreativ denken und trotzdem gern in Regeln, Massen und Material bleiben.",
    color: "from-[#aaa793]/28 to-[#24221b]/30",
    tags: ["cad", "kreativ", "technisch"],
    discoveryNote:
      "Gestaltung mit technischer Schwerkraft. Nicht frei malen, sondern baubar denken.",
    discoveryGroup: "Wenn Ideen funktionieren muessen",
    observations: [
      "Du merkst, dass eine gute Form auch montierbar sein muss.",
      "Ein Modell kann gut aussehen und trotzdem falsch sein.",
      "Kreativitaet hat hier Schrauben, Masse und Material.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir CAD und Genauigkeit gefallen",
        note: "Mehr Bau, weniger Produkt.",
        slugs: ["bauzeichner", "geomatiker"],
      },
      {
        prompt: "Wenn du mehr Material in der Hand willst",
        note: "Raus aus dem Modell, rein in Werkstatt.",
        slugs: ["werkzeugmechaniker", "tischler"],
      },
      {
        prompt: "Wenn dir visuelle Wirkung wichtiger ist",
        note: "Mehr Gestaltung, weniger technische Norm.",
        slugs: ["mediengestalter"],
      },
    ],
    whyItMightFit:
      "Wenn du gern zwischen Idee und Realitaet sitzt und beide Seiten ernst nimmst.",
    typicalTuesday: [
      { time: "Morgens", text: "Modell oeffnen, Aenderung lesen, kurz seufzen." },
      { time: "Vormittags", text: "Kante verschieben, Mass pruefen, Kollision finden." },
      { time: "Mittags", text: "Das Teil sieht gut aus. Passt aber nicht." },
      { time: "Nachmittags", text: "Variante bauen, exportieren, Rueckfrage beantworten." },
      { time: "Vor Schluss", text: "Ein Entwurf wird leiser, weil er endlich Sinn macht." },
    ],
  },
  {
    slug: "justizfachangestellter",
    title: "Justizfachangestellter",
    searchKeywords: ["gericht", "justiz", "verwaltung", "akten", "oeffentlicher dienst"],
    short:
      "Fuer Leute, die Ordnung, Fristen und Menschenkontakt in einem ernsten Rahmen aushalten.",
    atmosphere:
      "Akten, Fristen, Schreiben, Flure im Gericht, wartende Menschen, klare Regeln und Sachverhalte, die nicht privat werden duerfen.",
    secretlyLike:
      "Wenn ein komplizierter Vorgang endlich sauber im Ablauf liegt.",
    annoys:
      "Fristdruck, schwierige Besucher, Papier, Vorschriften und Themen, die schwer sein koennen.",
    comfortableFor:
      "Menschen, die freundlich sachlich bleiben und Verantwortung in Ordnung sehen.",
    color: "from-[#a5a194]/28 to-[#24221b]/30",
    tags: ["oeffentlich", "struktur", "akten"],
    discoveryNote:
      "Oeffentlicher Dienst, aber nicht beliebig. Regeln, Menschen und ernste Themen.",
    discoveryGroup: "Wenn Ordnung offiziell wird",
    observations: [
      "Du lernst, dass ein falsches Datum echten Aerger machen kann.",
      "Menschen kommen oft angespannt, auch wenn es nur um ein Schreiben geht.",
      "Sachlich bleiben ist manchmal Arbeit.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Verwaltung und Ordnung gefallen",
        note: "Weniger Gericht, mehr Betrieb.",
        slugs: ["kaufmann-bueromanagement"],
      },
      {
        prompt: "Wenn dir oeffentliche Verantwortung liegt",
        note: "Mehr Draussen, mehr Sicherheit.",
        slugs: ["fachkraft-schutz-sicherheit"],
      },
      {
        prompt: "Wenn dir Menschenkontakt zu angespannt ist",
        note: "Ruhiger, technischer, weniger Publikum.",
        slugs: ["bauzeichner"],
      },
    ],
    whyItMightFit:
      "Wenn du klare Abläufe magst und ernstere Themen nicht sofort von dir wegschieben musst.",
    typicalTuesday: [
      { time: "Morgens", text: "Post, Akten, Fristen pruefen." },
      { time: "Vormittags", text: "Ein Anruf ist unruhig. Du bleibst sachlich." },
      { time: "Mittags", text: "Ein Datum passt nicht. Nochmal Akte." },
      { time: "Nachmittags", text: "Schreiben raus, Vorgang weiter, naechste Frist." },
      { time: "Am Ende", text: "Der Stapel ist kleiner. Nicht alles fuehlt sich leicht an." },
    ],
  },
  {
    slug: "gebaeudereiniger",
    title: "Gebaeudereiniger",
    searchKeywords: ["reinigung", "gebaeude", "sauberkeit", "glas"],
    short:
      "Fuer Leute, die sichtbare Arbeit moegen und damit leben koennen, dass andere sie oft erst bemerken, wenn sie fehlt.",
    atmosphere:
      "Eimer, Maschinen, Glas, Boeden, fruehe Zeiten, leere Raeume und Schmutz, der sehr konkret zeigt, was getan wurde.",
    secretlyLike:
      "Wenn ein Raum danach anders wirkt, ohne dass jemand lange darueber redet.",
    annoys:
      "Koerperliche Belastung, Zeitdruck, wenig Anerkennung und Orte, die sofort wieder schmutzig werden.",
    comfortableFor:
      "Menschen, die praktisch arbeiten und sichtbare Veraenderung ohne viel Publikum moegen.",
    color: "from-[#aeb7aa]/28 to-[#24221b]/30",
    tags: ["sichtbar", "koerperlich", "routine"],
    discoveryNote:
      "Direkte sichtbare Arbeit. Weniger romantisch, aber sehr konkret.",
    discoveryGroup: "Wenn man sehen soll, was getan wurde",
    observations: [
      "Du siehst sofort, wo jemand achtlos war.",
      "Sauberkeit wirkt oft erst dann wichtig, wenn sie fehlt.",
      "Ein leerer Raum kann sich nach deiner Arbeit anders anfuehlen.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir sichtbare Arbeit gefaellt",
        note: "Mehr Handwerk, mehr Material.",
        slugs: ["tischler", "fachkraft-lagerlogistik"],
      },
      {
        prompt: "Wenn du mehr Technik willst",
        note: "Mehr Anlage, weniger Flaeche.",
        slugs: ["anlagenmechaniker-shk"],
      },
      {
        prompt: "Wenn du mehr Menschenkontakt willst",
        note: "Mehr Laden, mehr kurze Gespräche.",
        slugs: ["verkaeufer"],
      },
    ],
    whyItMightFit:
      "Wenn du gern siehst, dass ein Ort nach dir anders ist, ohne daraus eine grosse Sache zu machen.",
    typicalTuesday: [
      { time: "Frueh", text: "Schluessel, Wagen, Plan, los." },
      { time: "Vormittags", text: "Boeden, Glas, Ecken, die niemand sieht." },
      { time: "Mittags", text: "Eine Maschine macht ein komisches Geraeusch." },
      { time: "Nachmittags", text: "Noch ein Raum, noch ein Fleck, nochmal Wasser." },
      { time: "Am Ende", text: "Der Raum ist leerer im Kopf, weil er sauberer ist." },
    ],
  },
  {
    slug: "fachkraft-schutz-sicherheit",
    title: "Fachkraft fuer Schutz und Sicherheit",
    searchKeywords: ["sicherheit", "schutz", "security", "kontrolle"],
    short:
      "Fuer Leute, die ruhig beobachten koennen, bevor eine Situation gross wird.",
    atmosphere:
      "Eingaenge, Rundgaenge, Kameras, Veranstaltungen, Schluessel, klare Regeln und Menschen, die Grenzen nicht immer moegen.",
    secretlyLike:
      "Wenn deine Anwesenheit reicht, damit etwas ruhig bleibt.",
    annoys:
      "Lange Stehzeiten, Konflikte, Schichten, aggressive Stimmung und Verantwortung ohne viel Dank.",
    comfortableFor:
      "Menschen, die freundlich klar bleiben und Aufmerksamkeit nicht nur in Action suchen.",
    color: "from-[#9ca6a0]/28 to-[#24221b]/30",
    tags: ["sicherheit", "wach", "klar"],
    discoveryNote:
      "Nicht nur eingreifen. Viel beobachten, einschätzen, ruhig bleiben.",
    discoveryGroup: "Wenn Ruhe Grenzen halten kann",
    observations: [
      "Du lernst, Raeume zu lesen, bevor etwas passiert.",
      "Manchmal ist der beste Moment der, der klein bleibt.",
      "Freundlich klar sein kann sehr anstrengend sein.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir oeffentliche Verantwortung gefaellt",
        note: "Mehr Akten, weniger Rundgang.",
        slugs: ["justizfachangestellter"],
      },
      {
        prompt: "Wenn du unterwegs mit Menschen klarkommst",
        note: "Mehr Bewegung im Verkehr.",
        slugs: ["zugbegleiter"],
      },
      {
        prompt: "Wenn dir akute Situationen liegen",
        note: "Mehr medizinisch, schneller.",
        slugs: ["notfallsanitaeter"],
      },
    ],
    whyItMightFit:
      "Wenn du Situationen frueh wahrnimmst und Grenzen setzen kannst, ohne sofort hart zu werden.",
    typicalTuesday: [
      { time: "Morgens", text: "Uebergabe, Schluessel, Rundgang." },
      { time: "Vormittags", text: "Ein Blick bleibt zu lange an der Tuer." },
      { time: "Mittags", text: "Kontrolle, kurzer Satz, weitergehen." },
      { time: "Abends", text: "Mehr Menschen, mehr Stimmung, gleicher Blick." },
      { time: "Nach Dienst", text: "Du merkst erst zuhause, wie wach du warst." },
    ],
  },
  {
    slug: "medizinischer-technologe-laboratorium",
    title: "Medizinischer Technologe Laboratorium",
    searchKeywords: ["mtl", "medizin", "labor", "diagnostik", "blut"],
    short:
      "Fuer Leute, die medizinische Verantwortung tragen wollen, ohne staendig am Bett zu stehen.",
    atmosphere:
      "Proben, Geraete, Blut, Werte, Kontrollen, Hygiene und die stille Frage, ob ein Ergebnis zu einem Menschen passt.",
    secretlyLike:
      "Wenn ein Wert endlich erklaert, warum etwas nicht stimmt.",
    annoys:
      "Zeitdruck, heikle Proben, strenge Abläufe, Nachkontrollen und Verantwortung, die kaum sichtbar ist.",
    comfortableFor:
      "Menschen, die konzentriert im Labor arbeiten und den Menschen hinter der Probe nicht vergessen.",
    color: "from-[#9fb4b4]/28 to-[#24221b]/30",
    tags: ["labor", "medizin", "diagnostik"],
    discoveryNote:
      "Medizinisch wichtig, aber oft hinter der Tuer: Probe, Wert, Kontrolle.",
    discoveryGroup: "Wenn Werte zu Menschen gehoeren",
    observations: [
      "Du siehst selten den Menschen, aber die Probe gehoert zu jemandem.",
      "Ein Wert kann einen ganzen weiteren Weg veraendern.",
      "Schnell sein darf hier nicht ungenau werden.",
    ],
    emotionalPathways: [
      {
        prompt: "Wenn dir Labor und Medizin gefallen",
        note: "Mehr Chemie, weniger direkter Gesundheitsbezug.",
        slugs: ["chemielaborant"],
      },
      {
        prompt: "Wenn du naeher an den OP willst",
        note: "Mehr Raum, mehr Ablauf, mehr direkte Situation.",
        slugs: ["operationstechnischer-assistent"],
      },
      {
        prompt: "Wenn du mehr Patientenkontakt willst",
        note: "Mehr Praxis oder Pflegealltag.",
        slugs: ["medizinische-fachangestellte", "pflegefachkraft"],
      },
    ],
    whyItMightFit:
      "Wenn du medizinische Bedeutung ernst nimmst, aber in konzentrierter Laborarbeit klarer wirst.",
    typicalTuesday: [
      { time: "Morgens", text: "Proben kommen rein. Erst Identitaet, dann Analyse." },
      { time: "Vormittags", text: "Geraet laeuft, Kontrolle daneben." },
      { time: "Mittags", text: "Ein Wert passt nicht. Wiederholen." },
      { time: "Nachmittags", text: "Befund raus, naechste Probe, Handschuhe wechseln." },
      { time: "Am Ende", text: "Viele Menschen waren heute nur als Roehrchen da." },
    ],
  },
];

export const careerExpansionLifeIndicators: Record<string, LifeIndicators> = {
  vermessungstechniker: { ruhe: "medium", menschen: "low", bewegung: "high", struktur: "high", sichtbaresErgebnis: "medium" },
  forstwirt: { ruhe: "medium", menschen: "low", bewegung: "high", struktur: "medium", sichtbaresErgebnis: "high" },
  hoerakustiker: { ruhe: "medium", menschen: "high", bewegung: "low", struktur: "medium", sichtbaresErgebnis: "medium" },
  "orthopaedietechnik-mechaniker": { ruhe: "medium", menschen: "medium", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "high" },
  chemielaborant: { ruhe: "high", menschen: "low", bewegung: "low", struktur: "high", sichtbaresErgebnis: "medium" },
  lokfuehrer: { ruhe: "high", menschen: "low", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "low" },
  bestattungsfachkraft: { ruhe: "high", menschen: "high", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "medium" },
  geomatiker: { ruhe: "high", menschen: "low", bewegung: "low", struktur: "high", sichtbaresErgebnis: "medium" },
  werkzeugmechaniker: { ruhe: "medium", menschen: "low", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "high" },
  "anlagenmechaniker-shk": { ruhe: "medium", menschen: "medium", bewegung: "high", struktur: "medium", sichtbaresErgebnis: "high" },
  fahrzeuglackierer: { ruhe: "medium", menschen: "low", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "high" },
  zahntechniker: { ruhe: "high", menschen: "low", bewegung: "low", struktur: "high", sichtbaresErgebnis: "high" },
  "operationstechnischer-assistent": { ruhe: "medium", menschen: "medium", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "medium" },
  pharmakant: { ruhe: "medium", menschen: "low", bewegung: "medium", struktur: "high", sichtbaresErgebnis: "medium" },
  "umwelttechnologe-abwasser": { ruhe: "medium", menschen: "low", bewegung: "high", struktur: "high", sichtbaresErgebnis: "medium" },
  "technischer-produktdesigner": { ruhe: "high", menschen: "medium", bewegung: "low", struktur: "high", sichtbaresErgebnis: "high" },
  justizfachangestellter: { ruhe: "medium", menschen: "medium", bewegung: "low", struktur: "high", sichtbaresErgebnis: "low" },
  gebaeudereiniger: { ruhe: "medium", menschen: "low", bewegung: "high", struktur: "medium", sichtbaresErgebnis: "high" },
  "fachkraft-schutz-sicherheit": { ruhe: "medium", menschen: "high", bewegung: "high", struktur: "medium", sichtbaresErgebnis: "low" },
  "medizinischer-technologe-laboratorium": { ruhe: "high", menschen: "low", bewegung: "low", struktur: "high", sichtbaresErgebnis: "medium" },
};

export const careerExpansionSignalWeights: Record<string, SignalWeights> = {
  vermessungstechniker: { movement: 3, technical: 3, focus: 3, structure: 3, responsibility_for_systems: 3, problem_solving: 2, hands_on: 2, solitude: 2, visible_results: 1, long_projects: 1 },
  forstwirt: { movement: 3, hands_on: 3, solitude: 3, routine: 2, visible_results: 3, responsibility_for_systems: 2, chaos_tolerance: 2, focus: 2, technical: 1, people: 1 },
  hoerakustiker: { people: 3, service: 3, technical: 3, focus: 2, responsibility_for_people: 3, hands_on: 1, visible_results: 1, structure: 2, short_tasks: 2, routine: 1 },
  "orthopaedietechnik-mechaniker": { hands_on: 3, technical: 3, responsibility_for_people: 3, visible_results: 3, focus: 3, creative: 2, movement: 2, people: 1, structure: 2, long_projects: 2, service: 1 },
  chemielaborant: { focus: 3, routine: 3, technical: 2, structure: 2, responsibility_for_systems: 2, problem_solving: 2, solitude: 2, short_tasks: 2, hands_on: 2, people: 0 },
  lokfuehrer: { solitude: 3, focus: 3, routine: 3, structure: 3, responsibility_for_people: 3, responsibility_for_systems: 3, technical: 2, movement: 1, chaos_tolerance: 1, people: 0 },
  bestattungsfachkraft: { people: 3, service: 3, structure: 3, responsibility_for_people: 3, focus: 2, routine: 2, visible_results: 2, chaos_tolerance: 1, movement: 1, solitude: 1 },
  geomatiker: { technical: 2, focus: 2, structure: 3, solitude: 2, long_projects: 3, problem_solving: 2, creative: 3, responsibility_for_systems: 2, visible_results: 3, people: 0 },
  werkzeugmechaniker: { hands_on: 3, technical: 3, focus: 3, structure: 3, visible_results: 2, routine: 3, long_projects: 3, responsibility_for_systems: 3, problem_solving: 1, people: 0, solitude: 2 },
  "anlagenmechaniker-shk": { hands_on: 3, technical: 3, movement: 3, service: 3, visible_results: 3, problem_solving: 2, people: 2, responsibility_for_systems: 2, short_tasks: 2, variety: 2 },
  fahrzeuglackierer: { hands_on: 3, creative: 3, focus: 2, visible_results: 3, structure: 2, routine: 3, technical: 1, movement: 2, short_tasks: 2, people: 0 },
  zahntechniker: { hands_on: 3, focus: 3, technical: 3, creative: 2, visible_results: 3, solitude: 3, structure: 3, routine: 2, responsibility_for_people: 2, long_projects: 2, people: 0 },
  "operationstechnischer-assistent": { structure: 3, focus: 3, service: 3, responsibility_for_people: 3, routine: 3, chaos_tolerance: 2, technical: 2, hands_on: 2, people: 2, short_tasks: 1 },
  pharmakant: { routine: 3, structure: 2, technical: 1, responsibility_for_systems: 3, focus: 1, hands_on: 1, long_projects: 3, short_tasks: 2, movement: 2, service: 1 },
  "umwelttechnologe-abwasser": { technical: 3, movement: 3, routine: 3, responsibility_for_systems: 3, problem_solving: 2, hands_on: 2, structure: 3, solitude: 2, chaos_tolerance: 1, service: 1 },
  "technischer-produktdesigner": { creative: 3, technical: 3, focus: 2, structure: 2, long_projects: 3, visible_results: 3, problem_solving: 2, people: 2, service: 1, responsibility_for_systems: 1 },
  justizfachangestellter: { structure: 3, routine: 3, responsibility_for_systems: 3, service: 2, people: 2, focus: 3, long_projects: 2, short_tasks: 1, chaos_tolerance: 1, movement: 0 },
  gebaeudereiniger: { movement: 3, routine: 3, visible_results: 3, hands_on: 3, solitude: 2, structure: 2, short_tasks: 2, service: 1, people: 1, technical: 1 },
  "fachkraft-schutz-sicherheit": { people: 3, movement: 3, chaos_tolerance: 3, responsibility_for_people: 3, variety: 3, focus: 3, short_tasks: 2, structure: 1, service: 1, technical: 1 },
  "medizinischer-technologe-laboratorium": { technical: 3, focus: 3, routine: 3, structure: 3, responsibility_for_people: 3, solitude: 3, service: 2, problem_solving: 2, hands_on: 1, people: 0 },
};

export const careerExpansionOftenConfusedWith: Record<string, string[]> = {
  vermessungstechniker: ["geomatiker"],
  forstwirt: ["tierpfleger"],
  hoerakustiker: ["medizinische-fachangestellte", "zahntechniker"],
  "orthopaedietechnik-mechaniker": ["zahntechniker"],
  chemielaborant: ["medizinischer-technologe-laboratorium", "pharmakant"],
  lokfuehrer: ["zugbegleiter"],
  bestattungsfachkraft: ["florist"],
  geomatiker: ["vermessungstechniker"],
  werkzeugmechaniker: ["industriemechaniker"],
  "anlagenmechaniker-shk": ["elektroniker", "umwelttechnologe-abwasser"],
  fahrzeuglackierer: ["mediengestalter"],
  zahntechniker: ["hoerakustiker", "orthopaedietechnik-mechaniker"],
  "operationstechnischer-assistent": ["pflegefachkraft"],
  pharmakant: ["chemielaborant"],
  "umwelttechnologe-abwasser": ["anlagenmechaniker-shk"],
  "technischer-produktdesigner": ["bauzeichner"],
  justizfachangestellter: ["kaufmann-bueromanagement"],
  gebaeudereiniger: ["fachkraft-lagerlogistik"],
  "fachkraft-schutz-sicherheit": ["zugbegleiter"],
  "medizinischer-technologe-laboratorium": ["chemielaborant"],
};

export const careerExpansionRealDifferences: Record<string, string[]> = {
  vermessungstechniker: ["Draussen wird Genauigkeit zu Koordinaten.", "Ein kleiner Punkt kann spaeter eine Grenze sein.", "Wetter und Millimeter gehoeren hier zusammen."],
  forstwirt: ["Natur ist hier schwer, nass und manchmal gefaehrlich.", "Man entscheidet mit Werkzeug, nicht nur mit Gefuehl.", "Das Ergebnis sieht oft erst spaeter nach Pflege aus."],
  hoerakustiker: ["Technik wird hier sehr persoenlich.", "Ein kleiner Klick kann einen Raum anders machen.", "Beratung und Praezision passieren im selben Moment."],
  "orthopaedietechnik-mechaniker": ["Material muss an einem Koerper funktionieren.", "Ein Druckpunkt kann den ganzen Plan veraendern.", "Handwerk wird hier direkt alltagstauglich."],
  chemielaborant: ["Kleine Abweichungen zaehlen mehr als grosse Gesten.", "Routine schuetzt vor Fehlern.", "Das Ergebnis ist oft eine Zahl, nicht ein fertiges Ding."],
  lokfuehrer: ["Man ist oft allein und trotzdem fuer viele verantwortlich.", "Routine darf nicht einschlaefern.", "Der wichtigste Blick geht immer wieder nach vorn."],
  bestattungsfachkraft: ["Praktische Ordnung kann in schweren Momenten Halt geben.", "Viele Saetze werden langsamer gesagt.", "Wuerde entsteht oft in leisen Details."],
  geomatiker: ["Orte werden hier zu Daten, Layern und Entscheidungen.", "Eine Karte kann gut aussehen und trotzdem falsch sein.", "Raum wird sortiert, nicht nur angesehen."],
  werkzeugmechaniker: ["Du baust oft das Werkzeug, nicht das sichtbare Endprodukt.", "Fast passend ist hier noch nicht passend.", "Praezision muss wiederholbar werden."],
  "anlagenmechaniker-shk": ["Technik liegt mitten im Alltag anderer Menschen.", "Wasser oder Waerme fehlen sofort, wenn etwas nicht laeuft.", "Viele Loesungen beginnen in engen Kellern."],
  fahrzeuglackierer: ["Der eigentliche Lackmoment ist kurz; Vorbereitung traegt den Tag.", "Farbe stimmt erst im Licht.", "Eine gute Stelle soll spaeter unauffaellig wirken."],
  zahntechniker: ["Feines Handwerk soll spaeter natuerlich wirken.", "Man arbeitet nah am Koerper, aber meist ohne Gespraech.", "Winzige Formen koennen sehr viel Geduld brauchen."],
  "operationstechnischer-assistent": ["Vorbereitung wird hier zu Ruhe im ernsten Moment.", "Ein Griff zur richtigen Zeit zaehlt.", "Der Ton bleibt oft leise, obwohl viel auf dem Spiel steht."],
  pharmakant: ["Verantwortung liegt in Charge, Anlage und Protokoll.", "Routine ist hier kein Autopilot.", "Eine Abweichung kann den ganzen Prozess stoppen."],
  "umwelttechnologe-abwasser": ["Umweltarbeit beginnt hier oft dreckig.", "Unsichtbare Infrastruktur bestimmt den Tag.", "Ein Wert am Display kann wichtiger sein als ein voller Kalender."],
  "technischer-produktdesigner": ["Ideen muessen hier baubar werden.", "Eine schoene Form kann technisch falsch sein.", "Kreativitaet hat Masse, Normen und Material."],
  justizfachangestellter: ["Ordnung wird hier offiziell.", "Ein Datum kann echte Folgen haben.", "Sachlich bleiben ist manchmal die eigentliche Arbeit."],
  gebaeudereiniger: ["Das Ergebnis ist sofort sichtbar und oft schnell wieder gefaehrdet.", "Viele merken die Arbeit erst, wenn sie fehlt.", "Leere Raeume koennen nach dir anders wirken."],
  "fachkraft-schutz-sicherheit": ["Aufmerksamkeit ist oft wichtiger als Eingreifen.", "Der beste Moment bleibt manchmal klein.", "Grenzen setzen kann freundlich und anstrengend zugleich sein."],
  "medizinischer-technologe-laboratorium": ["Der Mensch ist oft nur als Probe im Raum.", "Ein Wert kann den naechsten medizinischen Schritt veraendern.", "Schnell sein darf nicht ungenau werden."],
};

export const careerExpansionPracticalSignals: Record<string, string[]> = {
  vermessungstechniker: ["Ausbildung", "draussen und CAD", "viel Genauigkeit"],
  forstwirt: ["Ausbildung", "draussen", "koerperlich"],
  hoerakustiker: ["Ausbildung", "Gesundheitstechnik", "Beratung"],
  "orthopaedietechnik-mechaniker": ["Ausbildung", "Werkstatt", "gesundheitsnah"],
  chemielaborant: ["Ausbildung", "Labor", "sehr genau"],
  lokfuehrer: ["Ausbildung", "Schicht moeglich", "hohe Verantwortung"],
  bestattungsfachkraft: ["Ausbildung", "ruhiger Kontakt", "Organisation"],
  geomatiker: ["Ausbildung", "Geodaten", "viel Bildschirm"],
  werkzeugmechaniker: ["Ausbildung", "Metall", "Praezision"],
  "anlagenmechaniker-shk": ["Ausbildung", "unterwegs", "Versorgungstechnik"],
  fahrzeuglackierer: ["Ausbildung", "Oberflaeche", "sichtbare Arbeit"],
  zahntechniker: ["Ausbildung", "Labor", "feine Handarbeit"],
  "operationstechnischer-assistent": ["Ausbildung", "OP", "klare Ablaeufe"],
  pharmakant: ["Ausbildung", "Produktion", "strenge Vorgaben"],
  "umwelttechnologe-abwasser": ["Ausbildung", "Infrastruktur", "Technik draussen"],
  "technischer-produktdesigner": ["Ausbildung", "CAD", "technische Gestaltung"],
  justizfachangestellter: ["Ausbildung", "oeffentlicher Dienst", "Fristen"],
  gebaeudereiniger: ["Ausbildung", "sichtbare Arbeit", "koerperlich"],
  "fachkraft-schutz-sicherheit": ["Ausbildung", "Schicht moeglich", "Konflikte"],
  "medizinischer-technologe-laboratorium": ["Ausbildung", "Labor", "medizinische Werte"],
};

export const careerExpansionLaterNotices: Record<string, string[]> = {
  vermessungstechniker: ["Du siehst Punkte, wo andere nur Flaeche sehen.", "Eine Grenze wirkt ploetzlich weniger abstrakt.", "Wetter wird Teil deiner Planung."],
  forstwirt: ["Du liest Baeume anders.", "Romantische Waldbilder werden ungenauer.", "Du merkst, wie viel Arbeit in Wegen steckt."],
  hoerakustiker: ["Leise Raeume fallen dir mehr auf.", "Technik wirkt weniger kalt.", "Du hoerst Unsicherheit in Pausen."],
  "orthopaedietechnik-mechaniker": ["Du achtest auf Bewegungen.", "Material fuehlt sich persoenlicher an.", "Ein Druckpunkt klingt nicht mehr klein."],
  chemielaborant: ["Etiketten werden wichtiger.", "Sauberkeit meint ploetzlich Sicherheit.", "Warten kann Teil von Genauigkeit sein."],
  lokfuehrer: ["Signale wirken groesser.", "Alleinsein fuehlt sich nicht leer an.", "Routine und Wachheit gehoeren zusammen."],
  bestattungsfachkraft: ["Leise Details bekommen Gewicht.", "Praktische Fragen wirken weniger kalt.", "Du merkst, wie unterschiedlich Menschen trauern."],
  geomatiker: ["Karten wirken weniger neutral.", "Datenfehler springen dir schneller ins Auge.", "Orte bekommen Layer."],
  werkzeugmechaniker: ["Du siehst Werkzeuge hinter Produkten.", "Fast passend stoert dich mehr.", "Metall klingt nach Geduld."],
  "anlagenmechaniker-shk": ["Waerme wirkt weniger selbstverstaendlich.", "Keller werden interessanter.", "Ein Rohr ist selten nur ein Rohr."],
  fahrzeuglackierer: ["Licht wird zum Pruefgeraet.", "Farbunterschiede verfolgen dich.", "Vorbereitung wirkt groesser als der letzte Spruehgang."],
  zahntechniker: ["Natuerlich aussehen wirkt schwieriger.", "Kleine Formen werden ernst.", "Stille Arbeit kann sehr nah am Menschen sein."],
  "operationstechnischer-assistent": ["Reihenfolge beruhigt dich.", "Leise Ansagen wirken wichtiger.", "Vorbereitung bekommt Gewicht."],
  pharmakant: ["Protokolle wirken weniger langweilig.", "Eine Charge klingt nach Verantwortung.", "Saubere Prozesse fallen dir auf."],
  "umwelttechnologe-abwasser": ["Abfluesse wirken weniger unsichtbar.", "Geruch sagt manchmal etwas Technisches.", "Infrastruktur wird konkreter."],
  "technischer-produktdesigner": ["Du fragst schneller: laesst sich das bauen?", "Schoene Formen wirken nicht automatisch richtig.", "Masse werden kreativ."],
  justizfachangestellter: ["Fristen wirken realer.", "Sachlichkeit bekommt einen anderen Wert.", "Akten sind weniger papierhaft."],
  gebaeudereiniger: ["Saubere Raeume wirken weniger zufaellig.", "Ecken fallen dir auf.", "Unsichtbare Arbeit wird sichtbarer."],
  "fachkraft-schutz-sicherheit": ["Du liest Raeume genauer.", "Kleine Unruhe faellt frueher auf.", "Grenzen wirken weniger theoretisch."],
  "medizinischer-technologe-laboratorium": ["Proben wirken weniger anonym.", "Werte bekommen Gesichter im Kopf.", "Kontrolle klingt nach Verantwortung."],
};

export const careerExpansionDayMoments: Record<
  string,
  { timeLabel: string; text: string; realSentence?: string }[]
> = {
  vermessungstechniker: [
    { timeLabel: "07:48", text: "Stativ raus. Der Boden ist weich.", realSentence: "Der Punkt muss hier hin." },
    { timeLabel: "09:15", text: "Da steht ein Auto genau falsch." },
    { timeLabel: "10:40", text: "Noch ein Zentimeter. Nicht ungefaehr." },
    { timeLabel: "12:25", text: "Die Koordinate passt nicht zum Plan." },
    { timeLabel: "14:10", text: "Nochmal messen, bevor jemand baut." },
    { timeLabel: "16:05", text: "Der Punkt ist klein. Morgen haengt viel daran." },
  ],
  forstwirt: [
    { timeLabel: "06:50", text: "Regenjacke zu. Säge pruefen.", realSentence: "Der haengt unter Spannung." },
    { timeLabel: "08:30", text: "Der Baum faellt nicht einfach irgendwohin." },
    { timeLabel: "10:45", text: "Weg frei machen. Schlamm bis zum Knie." },
    { timeLabel: "12:20", text: "Kurz Brot. Handschuhe bleiben an." },
    { timeLabel: "14:35", text: "Noch ein Stamm. Nochmal Abstand." },
    { timeLabel: "16:10", text: "Der Wald sieht ruhig aus. Du nicht ganz." },
  ],
  hoerakustiker: [
    { timeLabel: "09:05", text: "Bitte einmal den Knopf druecken, wenn Sie etwas hoeren.", realSentence: "War das schon ein Ton?" },
    { timeLabel: "10:25", text: "Das Geraet ist klein. Die Erwartung nicht." },
    { timeLabel: "11:50", text: "Ein Klick lauter. Zu viel." },
    { timeLabel: "13:40", text: "Jetzt klingt die Stimme anders." },
    { timeLabel: "15:15", text: "Das Ohrpassstueck drueckt." },
    { timeLabel: "16:20", text: "Jemand laechelt, weil die Tuer wieder klingt." },
  ],
  "orthopaedietechnik-mechaniker": [
    { timeLabel: "08:10", text: "Gipsstaub auf dem Tisch.", realSentence: "Da drueckt es noch." },
    { timeLabel: "09:45", text: "Ein Riemen sitzt fast." },
    { timeLabel: "11:20", text: "Nochmal warm machen, nochmal formen." },
    { timeLabel: "13:05", text: "Ein Schritt wirkt anders." },
    { timeLabel: "15:10", text: "Die Kante muss weicher." },
    { timeLabel: "16:30", text: "Das Teil ist fertig. Der Alltag testet weiter." },
  ],
  chemielaborant: [
    { timeLabel: "08:00", text: "Etikett zuerst. Immer.", realSentence: "Welche Probe war das?" },
    { timeLabel: "09:35", text: "Pipette ruhig halten." },
    { timeLabel: "11:10", text: "Der Wert passt nicht." },
    { timeLabel: "12:55", text: "Nochmal ansetzen. Nicht diskutieren." },
    { timeLabel: "14:40", text: "Das Geraet piept." },
    { timeLabel: "16:05", text: "Protokoll fertig. Erst dann ist es fertig." },
  ],
  lokfuehrer: [
    { timeLabel: "04:58", text: "Dienstbeginn. Kaffee zu heiss.", realSentence: "Signal steht." },
    { timeLabel: "06:12", text: "Blick nach vorn. Wieder." },
    { timeLabel: "09:30", text: "Funk knackt. Kurz nichts." },
    { timeLabel: "12:05", text: "Verspaetung. Ruhig bleiben." },
    { timeLabel: "14:44", text: "Die Strecke kennt dich nicht." },
    { timeLabel: "16:18", text: "Zug steht. Schultern erst jetzt runter." },
  ],
  bestattungsfachkraft: [
    { timeLabel: "08:20", text: "Leise Stimme am Telefon.", realSentence: "Was muessen wir jetzt tun?" },
    { timeLabel: "09:50", text: "Formular, Taschentuch, Pause." },
    { timeLabel: "11:30", text: "Blumen sollen schlicht sein." },
    { timeLabel: "13:45", text: "Ein Termin verschiebt sich. Vorsichtig sagen." },
    { timeLabel: "15:10", text: "Der Raum muss ruhig wirken." },
    { timeLabel: "17:00", text: "Nicht schwer reden. Schwer genug ist es." },
  ],
  geomatiker: [
    { timeLabel: "09:10", text: "Layer an. Layer aus.", realSentence: "Die Koordinate passt nicht." },
    { timeLabel: "10:35", text: "Das Luftbild sagt etwas anderes." },
    { timeLabel: "12:15", text: "Eine Flaeche verschwindet im falschen Datensatz." },
    { timeLabel: "14:00", text: "Export. Fehlermeldung." },
    { timeLabel: "15:30", text: "Jetzt liegt der Ort richtig." },
    { timeLabel: "16:25", text: "Die Karte wirkt ruhig. Endlich." },
  ],
  werkzeugmechaniker: [
    { timeLabel: "07:30", text: "Zeichnung auf. Mass im Kopf.", realSentence: "Fast reicht nicht." },
    { timeLabel: "09:05", text: "Fraeser laeuft. Nicht zu schnell." },
    { timeLabel: "11:40", text: "Nochmal messen." },
    { timeLabel: "13:20", text: "Die Kante ist noch nicht sauber." },
    { timeLabel: "15:00", text: "Einsetzen. Kurz warten." },
    { timeLabel: "16:10", text: "Das Werkzeug tut, was es soll." },
  ],
  "anlagenmechaniker-shk": [
    { timeLabel: "07:45", text: "Kellerlicht flackert.", realSentence: "Seit gestern bleibt es kalt." },
    { timeLabel: "09:10", text: "Absperren. Erst dann loesen." },
    { timeLabel: "11:05", text: "Das Teil passt nicht ganz." },
    { timeLabel: "13:30", text: "Wasser auf. Kurz nichts sagen." },
    { timeLabel: "15:25", text: "Druck haelt." },
    { timeLabel: "16:40", text: "Im Bad sieht niemand, wie eng es war." },
  ],
  fahrzeuglackierer: [
    { timeLabel: "08:15", text: "Schleifen, bis die Stelle ehrlich ist.", realSentence: "Man sieht es im Licht." },
    { timeLabel: "10:20", text: "Abkleben dauert laenger als gedacht." },
    { timeLabel: "12:05", text: "Der Farbton ist fast richtig." },
    { timeLabel: "13:50", text: "Kabine zu." },
    { timeLabel: "15:35", text: "Ein Staubkorn. Natuerlich." },
    { timeLabel: "17:00", text: "Der Uebergang verschwindet." },
  ],
  zahntechniker: [
    { timeLabel: "08:35", text: "Das Modell liegt kleiner da, als der Tag wird.", realSentence: "Die Farbe stimmt noch nicht." },
    { timeLabel: "10:15", text: "Keramik schichten. Ruhig atmen." },
    { timeLabel: "11:55", text: "Eine Kante wirkt zu hart." },
    { timeLabel: "13:40", text: "Nochmal unter Licht." },
    { timeLabel: "15:20", text: "Jetzt sieht es weniger gemacht aus." },
    { timeLabel: "16:30", text: "Wenn es gut ist, faellt es kaum auf." },
  ],
  "operationstechnischer-assistent": [
    { timeLabel: "07:05", text: "Saal vorbereiten. Zaehlen.", realSentence: "Hast du das Sieb komplett?" },
    { timeLabel: "08:30", text: "Steril bleiben. Auch im Kopf." },
    { timeLabel: "10:50", text: "Ein Griff, bevor jemand fragt." },
    { timeLabel: "12:20", text: "Kurz trinken. Dann naechster Plan." },
    { timeLabel: "14:35", text: "Instrument fehlt nicht. Es liegt nur falsch." },
    { timeLabel: "16:10", text: "Alles raus, alles dokumentiert." },
  ],
  pharmakant: [
    { timeLabel: "06:40", text: "Umziehen. Schleuse. Anlage.", realSentence: "Welche Charge ist das?" },
    { timeLabel: "08:15", text: "Wert pruefen. Protokoll daneben." },
    { timeLabel: "10:30", text: "Abweichung. Stopp." },
    { timeLabel: "12:45", text: "Freigabe abwarten." },
    { timeLabel: "14:20", text: "Reinigen dauert." },
    { timeLabel: "16:00", text: "Erst unterschreiben, dann fertig." },
  ],
  "umwelttechnologe-abwasser": [
    { timeLabel: "07:20", text: "Rundgang. Es riecht anders.", realSentence: "Der Wert ist zu hoch." },
    { timeLabel: "09:00", text: "Probe nehmen. Deckel zu." },
    { timeLabel: "11:35", text: "Pumpe klingt nicht gut." },
    { timeLabel: "13:10", text: "Handschuhe wechseln." },
    { timeLabel: "15:00", text: "Stoerung weg. Wasser laeuft." },
    { timeLabel: "16:25", text: "Niemand merkt, dass es heute knapp war." },
  ],
  "technischer-produktdesigner": [
    { timeLabel: "09:05", text: "Modell auf. Aenderung rot markiert.", realSentence: "Das passt so nicht rein." },
    { timeLabel: "10:40", text: "Kante verschieben. Mass springt mit." },
    { timeLabel: "12:10", text: "Sieht gut aus. Funktioniert nicht." },
    { timeLabel: "14:30", text: "Neue Variante." },
    { timeLabel: "15:50", text: "Export fuer Rueckfrage." },
    { timeLabel: "16:35", text: "Jetzt wirkt die Form weniger gelogen." },
  ],
  justizfachangestellter: [
    { timeLabel: "08:00", text: "Post auf. Frist im Blick.", realSentence: "Die Akte fehlt." },
    { timeLabel: "09:45", text: "Ein Anruf wird lauter." },
    { timeLabel: "11:20", text: "Sachlich bleiben." },
    { timeLabel: "13:05", text: "Datum pruefen. Nochmal." },
    { timeLabel: "15:10", text: "Schreiben raus." },
    { timeLabel: "16:30", text: "Der Stapel ist kleiner. Nicht leichter." },
  ],
  gebaeudereiniger: [
    { timeLabel: "06:10", text: "Schluessel klappert. Flur leer.", realSentence: "Wo ist der Wagen?" },
    { timeLabel: "07:35", text: "Der Fleck geht nicht sofort." },
    { timeLabel: "09:50", text: "Glas zeigt alles." },
    { timeLabel: "12:15", text: "Maschine klingt anders." },
    { timeLabel: "14:40", text: "Noch ein Raum." },
    { timeLabel: "16:05", text: "Sauber. Bis gleich jemand reinkommt." },
  ],
  "fachkraft-schutz-sicherheit": [
    { timeLabel: "08:30", text: "Rundgang. Blick in die Ecken.", realSentence: "Einmal den Ausweis bitte." },
    { timeLabel: "10:10", text: "Jemand bleibt zu lange stehen." },
    { timeLabel: "12:45", text: "Kurz klar sagen. Nicht lauter." },
    { timeLabel: "16:20", text: "Mehr Menschen. Gleicher Blick." },
    { timeLabel: "19:05", text: "Die Stimmung kippt fast." },
    { timeLabel: "22:10", text: "Nichts passiert. Genau das war Arbeit." },
  ],
  "medizinischer-technologe-laboratorium": [
    { timeLabel: "07:55", text: "Probe rein. Name pruefen.", realSentence: "Der Wert passt nicht." },
    { timeLabel: "09:25", text: "Geraet laeuft. Kontrolle daneben." },
    { timeLabel: "11:10", text: "Nochmal messen." },
    { timeLabel: "13:40", text: "Telefon aus der Station." },
    { timeLabel: "15:05", text: "Befund raus." },
    { timeLabel: "16:20", text: "Viele Menschen waren heute Roehrchen." },
  ],
};

export const careerExpansionRealSentences: Record<string, string[]> = {
  vermessungstechniker: ["Der Punkt muss hier hin.", "Noch ein Zentimeter.", "Das passt nicht zum Plan.", "Stativ steht.", "Nochmal messen."],
  forstwirt: ["Der haengt unter Spannung.", "Abstand halten.", "Saege aus.", "Der Weg muss frei.", "Wetter wird nicht besser."],
  hoerakustiker: ["War das schon ein Ton?", "Ein Klick leiser.", "Drueckt das?", "So klingt es besser?", "Wir probieren es nochmal."],
  "orthopaedietechnik-mechaniker": ["Da drueckt es noch.", "Einmal gehen bitte.", "Die Kante muss weicher.", "Das sitzt fast.", "Wir passen es an."],
  chemielaborant: ["Welche Probe war das?", "Nochmal ansetzen.", "Der Wert passt nicht.", "Etikett zuerst.", "Das Geraet piept."],
  lokfuehrer: ["Signal steht.", "Funk bitte wiederholen.", "Abfahrt.", "Stoerung auf der Strecke.", "Blick nach vorn."],
  bestattungsfachkraft: ["Was muessen wir jetzt tun?", "Ganz in Ruhe.", "Der Termin steht.", "Schlicht bitte.", "Ich kuemmere mich darum."],
  geomatiker: ["Die Koordinate passt nicht.", "Layer aus.", "Das Luftbild ist aelter.", "Export laeuft.", "Die Flaeche fehlt."],
  werkzeugmechaniker: ["Fast reicht nicht.", "Nochmal messen.", "Die Kante ist zu hart.", "Das Werkzeug sitzt.", "Maschine laeuft."],
  "anlagenmechaniker-shk": ["Seit gestern bleibt es kalt.", "Wasser ist abgestellt.", "Das Teil passt nicht.", "Druck haelt.", "Kurz warten."],
  fahrzeuglackierer: ["Man sieht es im Licht.", "Der Farbton ist fast richtig.", "Nochmal schleifen.", "Kabine zu.", "Da ist Staub drin."],
  zahntechniker: ["Die Farbe stimmt noch nicht.", "Die Kante ist zu hart.", "Nochmal brennen.", "Das wirkt natuerlicher.", "Modell ist da."],
  "operationstechnischer-assistent": ["Hast du das Sieb komplett?", "Steril bleiben.", "Instrument bitte.", "Zaehlen wir nochmal.", "Saal ist bereit."],
  pharmakant: ["Welche Charge ist das?", "Abweichung stoppen.", "Freigabe fehlt.", "Wert eintragen.", "Erst reinigen."],
  "umwelttechnologe-abwasser": ["Der Wert ist zu hoch.", "Pumpe zwei klingt anders.", "Probe ist raus.", "Deckel zu.", "Stoerung ist weg."],
  "technischer-produktdesigner": ["Das passt so nicht rein.", "Kante verschieben.", "Welche Version?", "Export ist fertig.", "Die Bohrung kollidiert."],
  justizfachangestellter: ["Die Akte fehlt.", "Frist ist morgen.", "Ich verbinde Sie.", "Das muss schriftlich rein.", "Datum pruefen."],
  gebaeudereiniger: ["Wo ist der Wagen?", "Glas zeigt alles.", "Der Fleck bleibt.", "Noch ein Raum.", "Maschine ist leer."],
  "fachkraft-schutz-sicherheit": ["Einmal den Ausweis bitte.", "Bitte hier warten.", "Rundgang ist frei.", "Nicht durch diese Tuer.", "Ich klaere das."],
  "medizinischer-technologe-laboratorium": ["Der Wert passt nicht.", "Probe wiederholen.", "Name pruefen.", "Befund ist raus.", "Kontrolle zuerst."],
};

export const careerExpansionDifferenceMoments: Record<string, CareerDifferenceMoment[]> = {
  "geomatiker__vermessungstechniker": [
    { time: "09:15", setup: "Ein Punkt stimmt nicht.", lines: { vermessungstechniker: "Du stehst draussen am echten Ort.", geomatiker: "Du suchst den Fehler im Datensatz." } },
    { time: "12:20", setup: "Die Karte wirkt ruhig.", lines: { vermessungstechniker: "Vorher war da Matsch, Stativ und Wind.", geomatiker: "Vorher waren da Layer, Koordinaten und Exportfehler." } },
    { time: "15:40", setup: "Jemand baut spaeter damit.", lines: { vermessungstechniker: "Dein Punkt liegt im Boden.", geomatiker: "Dein Punkt liegt im System." } },
  ],
  "forstwirt__tierpfleger": [
    { time: "07:10", setup: "Etwas Lebendiges braucht Aufmerksamkeit.", lines: { forstwirt: "Du liest Baum, Boden, Wetter.", tierpfleger: "Du liest Verhalten, Futter, Blick." } },
    { time: "11:25", setup: "Es wird koerperlich.", lines: { forstwirt: "Gewicht kommt als Holz.", tierpfleger: "Gewicht kommt als Eimer, Stall, Routine." } },
    { time: "16:00", setup: "Pflege sieht nicht weich aus.", lines: { forstwirt: "Der Wald wirkt spaeter anders.", tierpfleger: "Das Tier wirkt vielleicht nur ein bisschen ruhiger." } },
  ],
  "hoerakustiker__medizinische-fachangestellte": [
    { time: "09:05", setup: "Jemand ist unsicher.", lines: { hoerakustiker: "Du gehst in Klang, Geraet, Einstellung.", "medizinische-fachangestellte": "Du haeltst Termin, Telefon, Wartezimmer." } },
    { time: "11:40", setup: "Es geht um Gesundheit.", lines: { hoerakustiker: "Technik wird sehr persoenlich.", "medizinische-fachangestellte": "Organisation wird sehr menschlich." } },
    { time: "15:15", setup: "Ein kleiner Satz bleibt.", lines: { hoerakustiker: "Jetzt klingt es anders.", "medizinische-fachangestellte": "Wir finden noch einen Termin." } },
  ],
  "hoerakustiker__zahntechniker": [
    { time: "10:10", setup: "Etwas Kleines muss passen.", lines: { hoerakustiker: "Du pruefst es direkt mit der Person.", zahntechniker: "Du pruefst es still am Modell." } },
    { time: "13:30", setup: "Farbe oder Klang stimmt fast.", lines: { hoerakustiker: "Fast klingt im Raum falsch.", zahntechniker: "Fast sieht im Mund falsch aus." } },
    { time: "16:00", setup: "Technik soll verschwinden.", lines: { hoerakustiker: "Sie soll wieder Hoeren ermoeglichen.", zahntechniker: "Sie soll natuerlich wirken." } },
  ],
  "orthopaedietechnik-mechaniker__zahntechniker": [
    { time: "08:35", setup: "Ein Modell liegt auf dem Tisch.", lines: { "orthopaedietechnik-mechaniker": "Am Ende muss ein Koerper damit gehen.", zahntechniker: "Am Ende muss ein Mund damit leben." } },
    { time: "11:20", setup: "Eine Kante stoert.", lines: { "orthopaedietechnik-mechaniker": "Sie drueckt beim Schritt.", zahntechniker: "Sie wirkt beim Biss." } },
    { time: "15:10", setup: "Nacharbeit.", lines: { "orthopaedietechnik-mechaniker": "Groesser, koerperlicher, naeher in der Anprobe.", zahntechniker: "Kleiner, stiller, naeher am Detail." } },
  ],
  "chemielaborant__medizinischer-technologe-laboratorium": [
    { time: "08:00", setup: "Eine Probe kommt rein.", lines: { chemielaborant: "Die Frage ist chemisch sauber.", "medizinischer-technologe-laboratorium": "Die Frage gehoert zu einem Menschen." } },
    { time: "11:10", setup: "Ein Wert passt nicht.", lines: { chemielaborant: "Du pruefst Methode und Stoff.", "medizinischer-technologe-laboratorium": "Du pruefst Methode und medizinische Folge." } },
    { time: "16:05", setup: "Protokoll fertig.", lines: { chemielaborant: "Das Ergebnis steht fuer den Versuch.", "medizinischer-technologe-laboratorium": "Das Ergebnis geht weiter in Behandlung." } },
  ],
  "chemielaborant__pharmakant": [
    { time: "09:35", setup: "Ein Stoff wird genau.", lines: { chemielaborant: "Du arbeitest an Analyse und Probe.", pharmakant: "Du arbeitest an Charge und Prozess." } },
    { time: "12:45", setup: "Eine Abweichung taucht auf.", lines: { chemielaborant: "Nochmal messen.", pharmakant: "Anlage stoppen." } },
    { time: "15:30", setup: "Alles ist dokumentiert.", lines: { chemielaborant: "Damit das Ergebnis stimmt.", pharmakant: "Damit der Prozess nachvollziehbar bleibt." } },
  ],
  "lokfuehrer__zugbegleiter": [
    { time: "07:42", setup: "Der Zug faehrt.", lines: { lokfuehrer: "Du bist vorne allein mit Strecke und Signal.", zugbegleiter: "Du bist hinten mit Menschen und Stimmung." } },
    { time: "13:18", setup: "Verspaetung.", lines: { lokfuehrer: "Du haeltst Ablauf und Sicherheit.", zugbegleiter: "Du haeltst Fragen und Frust." } },
    { time: "16:18", setup: "Ankommen.", lines: { lokfuehrer: "Die Verantwortung war leise.", zugbegleiter: "Die Verantwortung hatte Gesichter." } },
  ],
  "bestattungsfachkraft__florist": [
    { time: "09:50", setup: "Ein Anlass ist schwer.", lines: { bestattungsfachkraft: "Du ordnest den Abschied.", florist: "Du suchst den Ton in Blumen." } },
    { time: "12:05", setup: "Schlicht bitte.", lines: { bestattungsfachkraft: "Schlicht heisst wuerdevoll im Ablauf.", florist: "Schlicht heisst wuerdevoll im Strauß." } },
    { time: "15:10", setup: "Der Raum soll stimmen.", lines: { bestattungsfachkraft: "Damit Menschen Halt finden.", florist: "Damit etwas unausgesprochenes sichtbar wird." } },
  ],
  "industriemechaniker__werkzeugmechaniker": [
    { time: "08:00", setup: "Metall stimmt fast.", lines: { industriemechaniker: "Die Anlage soll wieder laufen.", werkzeugmechaniker: "Das Werkzeug soll wiederholbar passen." } },
    { time: "11:40", setup: "Nochmal messen.", lines: { industriemechaniker: "Damit Bewegung sauber bleibt.", werkzeugmechaniker: "Damit spaeter viele Teile sauber werden." } },
    { time: "15:30", setup: "Es funktioniert.", lines: { industriemechaniker: "Man hoert es in der Halle.", werkzeugmechaniker: "Man merkt es im naechsten Prozess." } },
  ],
  "anlagenmechaniker-shk__elektroniker": [
    { time: "08:40", setup: "Technik im Haus streikt.", lines: { "anlagenmechaniker-shk": "Du denkst an Wasser, Waerme, Druck.", elektroniker: "Du denkst an Leitung, Spannung, Sicherung." } },
    { time: "12:10", setup: "Der Plan passt nicht.", lines: { "anlagenmechaniker-shk": "Vielleicht liegt ein Rohr anders.", elektroniker: "Vielleicht laeuft ein Kabel anders." } },
    { time: "16:00", setup: "Es laeuft wieder.", lines: { "anlagenmechaniker-shk": "Jemand hat wieder Waerme oder Wasser.", elektroniker: "Jemand hat wieder Strom oder Licht." } },
  ],
  "fahrzeuglackierer__mediengestalter": [
    { time: "09:25", setup: "Farbe stimmt fast.", lines: { fahrzeuglackierer: "Das Licht auf Blech entscheidet.", mediengestalter: "Der Bildschirm und Eindruck entscheiden." } },
    { time: "13:05", setup: "Vorbereitung dauert.", lines: { fahrzeuglackierer: "Schleifen und Abkleben tragen den Moment.", mediengestalter: "Layout und Dateiordnung tragen den Moment." } },
    { time: "16:45", setup: "Es soll unauffaellig wirken.", lines: { fahrzeuglackierer: "Damit der Schaden verschwindet.", mediengestalter: "Damit die Gestaltung nicht stoert." } },
  ],
  "operationstechnischer-assistent__pflegefachkraft": [
    { time: "07:20", setup: "Medizinische Naehe.", lines: { "operationstechnischer-assistent": "Du bereitest den ernsten Ablauf vor.", pflegefachkraft: "Du bleibst im laufenden Alltag nah dran." } },
    { time: "10:50", setup: "Es muss ruhig bleiben.", lines: { "operationstechnischer-assistent": "Ruhe kommt aus Sterilitaet und Reihenfolge.", pflegefachkraft: "Ruhe kommt aus Beobachtung und Beziehung." } },
    { time: "16:30", setup: "Der Tag bleibt im Koerper.", lines: { "operationstechnischer-assistent": "Vom Stehen und der Konzentration.", pflegefachkraft: "Von Naehe, Wegen und vielen kleinen Hilfen." } },
  ],
  "anlagenmechaniker-shk__umwelttechnologe-abwasser": [
    { time: "09:00", setup: "Wasser ist das Problem.", lines: { "anlagenmechaniker-shk": "Du stehst im Haus eines Menschen.", "umwelttechnologe-abwasser": "Du stehst an einem System fuer viele." } },
    { time: "13:10", setup: "Es riecht, tropft oder laeuft falsch.", lines: { "anlagenmechaniker-shk": "Die Loesung ist nah am Kunden.", "umwelttechnologe-abwasser": "Die Loesung ist nah an Infrastruktur." } },
    { time: "16:25", setup: "Es funktioniert wieder.", lines: { "anlagenmechaniker-shk": "Der Haushalt merkt es sofort.", "umwelttechnologe-abwasser": "Die Stadt merkt es eher nicht." } },
  ],
  "bauzeichner__technischer-produktdesigner": [
    { time: "09:10", setup: "Ein Modell stimmt nicht.", lines: { bauzeichner: "Spaeter koennte ein Raum falsch werden.", "technischer-produktdesigner": "Spaeter koennte ein Produkt nicht funktionieren." } },
    { time: "12:10", setup: "Sieht gut aus.", lines: { bauzeichner: "Aber das Mass muss zum Bau passen.", "technischer-produktdesigner": "Aber die Form muss zur Funktion passen." } },
    { time: "15:35", setup: "Aenderung kommt rein.", lines: { bauzeichner: "Wand, Schnitt, Version.", "technischer-produktdesigner": "Kante, Bohrung, Variante." } },
  ],
  "justizfachangestellter__kaufmann-bueromanagement": [
    { time: "09:00", setup: "Ein Vorgang ist offen.", lines: { justizfachangestellter: "Frist und Akte haben offiziellen Druck.", "kaufmann-bueromanagement": "Mail und Kalender haben organisatorischen Druck." } },
    { time: "11:30", setup: "Ordnung verhindert Aerger.", lines: { justizfachangestellter: "Sonst kann es rechtlich ernst werden.", "kaufmann-bueromanagement": "Sonst sucht morgen das ganze Buero." } },
    { time: "15:55", setup: "Ein Schreiben geht raus.", lines: { justizfachangestellter: "Es klingt sachlich, weil es muss.", "kaufmann-bueromanagement": "Es klingt sachlich, weil es helfen soll." } },
  ],
  "fachkraft-lagerlogistik__gebaeudereiniger": [
    { time: "08:05", setup: "Der Ort muss funktionieren.", lines: { "fachkraft-lagerlogistik": "Ware muss auffindbar sein.", gebaeudereiniger: "Raum muss nutzbar wirken." } },
    { time: "12:15", setup: "Koerperliche Routine.", lines: { "fachkraft-lagerlogistik": "Scanner, Palette, Gang.", gebaeudereiniger: "Wagen, Boden, Glas." } },
    { time: "16:05", setup: "Danach ist es anders.", lines: { "fachkraft-lagerlogistik": "Niemand sucht lange.", gebaeudereiniger: "Niemand merkt den Raum negativ." } },
  ],
  "fachkraft-schutz-sicherheit__zugbegleiter": [
    { time: "10:10", setup: "Menschen werden unruhig.", lines: { "fachkraft-schutz-sicherheit": "Du beobachtest Grenzen im Raum.", zugbegleiter: "Du haeltst Stimmung unterwegs." } },
    { time: "13:18", setup: "Ein Satz muss klar sein.", lines: { "fachkraft-schutz-sicherheit": "Bitte hier warten.", zugbegleiter: "Der Anschluss wartet nicht." } },
    { time: "19:05", setup: "Nichts eskaliert.", lines: { "fachkraft-schutz-sicherheit": "Vielleicht war genau das die Arbeit.", zugbegleiter: "Vielleicht war genau das der Ton." } },
  ],
};
