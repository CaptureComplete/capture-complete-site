CAPTURE COMPLETE — WEBSITE
==========================
Van klik tot compleet.

Deze map bevat de complete site: 7 losse HTML-bestanden, gedeelde CSS/JS,
en een map voor je eigen media. Alles is al gebouwd en gestyled — jij hoeft
alleen nog de placeholders te vervangen door je eigen materiaal.


INHOUD VAN DE MAP
------------------
index.html            Home
binnenvliegen.html     Binnen vliegen (je USP)
bouwprojecten.html     Voor/na-slider per bouwproject
werk.html              One-takes, vastgoed, bruiloft/portretten
kunst.html             Prints / kunst (met watermerk + koop-CTA)
contact.html           Over mij + contactformulier
privacy.html           Privacyverklaring (AVG)
css/style.css          Alle styling (kleuren, type, componenten)
js/main.js             Menu, scroll-animaties, before/after-slider, formulier
assets/                Zet hier je eigen video's/foto's/logo's neer


HOE ALLES NU VERVANGEN MOET WORDEN
-----------------------------------
Elke plek waar nog placeholder-content staat, is gemarkeerd met de class
"replace-me" — je ziet dit terug als een dun kader (stippellijn) om de tekst
of het vlak wanneer je de site opent. Zoek in een teksteditor (bijv. VS Code,
Notepad++, Sublime) op "PLACEHOLDER" of "replace-me" om alles snel te vinden.

Zodra je een stuk hebt vervangen, mag je de tekst " replace-me" (met spatie
ervoor) weghalen uit dat class-attribuut — dan verdwijnt het stippelkader.
Dit is puur cosmetisch tijdens het bewerken; het breekt niets als je het
laat staan.

1) VIDEO'S EN FOTO'S (in elke pagina een blok met de klasse "media-placeholder")
   Zoek in de HTML naar <div class="media-placeholder"></div> — dat is een
   blauw geanimeerd vlak dat een foto/video moet worden.

   Voor een FOTO: vervang
       <div class="media-placeholder"></div>
   door
       <img src="assets/jouw-foto.jpg" alt="omschrijving" style="width:100%;height:100%;object-fit:cover;">

   Voor een VIDEO (bijv. de hero op de homepage of de indoor-vlucht): vervang
       <div class="media-placeholder"></div>
       <div class="media-placeholder-label">...</div>
   door
       <video src="assets/hero.mp4" autoplay muted loop playsinline
              style="width:100%;height:100%;object-fit:cover;"></video>
   (verwijder de "media-placeholder-label"-regel eronder, dat was alleen de
   gele hint-tekst)

   COMPRIMEREN — DIT IS BELANGRIJK, sla dit niet over:
   - Video: comprimeer naar mp4 (H.264), max ~1080p, bitrate rond 4-6 Mbps
     voor hero-video's van een paar seconden tot een minuut. Gratis tools:
     HandBrake (handbrake.fr) of Squoosh Video / CloudConvert online.
     Richtlijn: een hero-video van 20-30 sec zou onder de 8-10 MB moeten
     blijven, anders laadt de site traag op mobiel.
   - Foto's: comprimeer naar .jpg of .webp, max ~2000px breed, kwaliteit
     75-85%. Gratis tool: squoosh.app (sleep je foto erin, download het
     gecomprimeerde bestand). Richtlijn: onder de 300-500 KB per foto.

2) KLANTLOGO'S (homepage, "Vertrouwd door"-balk)
   Zoek in index.html naar:
       <div class="logo-slot replace-me">LOGO 1</div>
   Vervang door:
       <div class="logo-slot"><img src="assets/logo-klant-1.png" alt="Naam klant"></div>
   Gebruik het liefst PNG's met transparante achtergrond. Heb je minder dan
   6 logo's? Verwijder dan gewoon de overtollige logo-slot-blokken.
   Wil je deze balk ook op een andere pagina (bijv. contact.html)? Kopieer
   het hele blok met class="logo-strip" van index.html naar de gewenste
   pagina, direct na de header.

3) FORMULIER — FORMSPREE (in contact.html)
   Zonder deze stap komt je offerte-formulier NIET aan!
   a. Ga naar formspree.io en maak een gratis account (tot 50 verzendingen/mnd).
   b. Klik "New Form", geef het een naam (bijv. "Capture Complete offerte"),
      vul je eigen e-mailadres in.
   c. Formspree geeft je een endpoint-URL zoals:
      https://formspree.io/f/abcdwxyz
   d. Open contact.html, zoek de regel:
      <form id="offerte-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
      en vervang YOUR_FORM_ID door jouw eigen ID (bijv. abcdwxyz).
   e. Verstuur een testaanvraag via de site om te checken of hij aankomt
      (Formspree vraagt de eerste keer om een bevestiging per e-mail).

4) WHATSAPP-NUMMER
   Zoek in ALLE bestanden naar: wa.me/31600000000
   Vervang 31600000000 door je eigen nummer in internationaal formaat
   zonder + of 00 (dus 06-12345678 wordt 31612345678).
   Tip: gebruik "zoeken en vervangen in meerdere bestanden" in je
   teksteditor om dit in één keer overal te doen.

5) TELEFOONNUMMER EN E-MAILADRES
   Zoek naar 06 00 00 00 00 en info@capturecomplete.nl (komt op meerdere
   plekken voor: header/footer van elke pagina, contactpagina).

6) KVK-NUMMER (verplicht, staat nu als 00000000 in elke footer + privacy.html)
   Zoek naar "KVK: 00000000" in elk bestand en vul je echte KVK-nummer in.

7) TESTIMONIAL (homepage, sectie met de quote)
   Zoek in index.html naar de blockquote met "Plaats hier een quote..." en
   vervang door een echte quote + naam/bedrijf van een tevreden klant
   (bijvoorbeeld de notaris-klus).

8) PRIVACYVERKLARING (privacy.html)
   - Vul de datum in bij "Laatst bijgewerkt"
   - Vul je KVK-nummer en e-mailadres in
   - Lees de gele waarschuwingsbox bovenaan: dit is een sjabloon, geen
     juridisch advies. Prima als startpunt, maar laat het gerust een keer
     nalezen (bijv. via de Autoriteit Persoonsgegevens) zeker als je later
     dingen toevoegt zoals Google Analytics of cookies.

9) LOGO (dronesymbool + wordmark)
   Het huidige logo is een simpele SVG-tekening (cirkel + 4 propellers) plus
   de tekst "CAPTURE COMPLETE" — die staat al overal goed ingebouwd. Wil je
   een eigen logo-ontwerp, vervang dan het <svg>...</svg>-blok in de header
   en footer van elke pagina door je eigen SVG- of PNG-logo.


LOKAAL BEKIJKEN VOORDAT JE LIVE GAAT
--------------------------------------
Dubbelklik op index.html om de site direct in je browser te openen, of
gebruik voor de beste testervaring een simpele lokale server:
- Met Python geïnstalleerd: open een terminal in deze map en typ:
      python3 -m http.server 8000
  Ga dan naar http://localhost:8000 in je browser.
- Of installeer de VS Code-extensie "Live Server" en klik "Go Live".


DEPLOYEN NAAR NETLIFY (capturecomplete.nl)
---------------------------------------------
1. Ga naar app.netlify.com en log in (of maak een gratis account).
2. Sleep deze hele map (met alle bestanden erin) op het "Deploy manually"
   vak op je Netlify-dashboard.
3. Netlify geeft je direct een tijdelijke *.netlify.app-link — check de site.
4. Ga naar "Domain settings" → "Add a domain" → vul capturecomplete.nl in.
5. Volg de instructies van Netlify om je DNS-instellingen bij je
   domeinregistrar aan te passen (meestal een paar CNAME/A-records).
6. Na elke wijziging aan de bestanden: sleep de map gewoon opnieuw naar
   Netlify om de site bij te werken (of koppel een Git-repository voor
   automatische deploys als je dat op termijn wilt).


CHECKLIST VOOR JE LIVE GAAT
------------------------------
[ ] Alle video's/foto's vervangen en gecomprimeerd
[ ] Klantlogo's toegevoegd (of overtollige slots verwijderd)
[ ] Formspree form-ID ingevuld en getest
[ ] WhatsApp-nummer overal vervangen
[ ] Telefoonnummer en e-mailadres overal vervangen
[ ] KVK-nummer overal ingevuld
[ ] Testimonial toegevoegd
[ ] Privacyverklaring gecontroleerd (datum, gegevens, eventueel laten nalezen)
[ ] Site getest op mobiel (menu, formulier, slider)
[ ] Gedeployed naar Netlify + domein gekoppeld
