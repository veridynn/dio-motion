# dio motion. — Recherche und GitHub-Tickets

Zielprojekt: https://github.com/users/veridynn/projects/4/views/1

Die Recherche kommt vor den technischen Umsetzungstickets. Portrait, Motivabstimmung und Rechtstexte können parallel vorbereitet werden. Die Empfehlungen beziehen sich auf den aktuellen Stand: zwei Astro-Seiten ohne Svelte und ohne Versand-Backend.

## Vergleich und Empfehlung

| Bereich | Option | Vorteil | Zusätzlicher Aufwand | Empfehlung für dio motion. |
| --- | --- | --- | --- | --- |
| UI | Astro + HTML/CSS | Vorhandener Stack; statische Bereiche benötigen kein Framework-JavaScript | Eigene Interaktionen bei Bedarf | Beibehalten, solange keine komplexen Widgets benötigt werden |
| UI | Svelte + Bits UI | Ungestylte Komponenten mit Fokus auf Tastaturbedienung und Barrierefreiheit | Svelte-Integration, Hydration und eigenes Styling | Bei konkretem Bedarf an Dialogen, Comboboxen oder ähnlichen Komponenten |
| UI | Svelte + shadcn-svelte | Anpassbarer Komponentencode auf Basis von Bits UI und Tailwind | Svelte, Tailwind und Anpassung an das bestehende Design | Wenn eine größere gemeinsame Komponentenbasis geplant ist |
| Reaktivität | Runed | Utilities für Svelte 5 | Setzt Svelte und einen tatsächlichen Anwendungsfall voraus | Erst mit einem passenden Svelte-Feature auswählen |
| Validierung | Native HTML-Validierung + Prüfung am Empfänger | Browserprüfung bereits vorhanden | Vertrauenswürdige Prüfung beim Versanddienst oder eigenen Server erforderlich | Für das kleine Formular der Ausgangspunkt |
| Validierung | Zod über Astro Actions | Astro integriert Schema- und Formularvalidierung | Server-Runtime und Deployment-Konfiguration | Bevorzugt prüfen, wenn eigener Versand über Astro Actions gewählt wird |
| Validierung | ArkType | TypeScript-orientierte Laufzeitvalidierung | Zusätzliche Integration; Nutzen gegenüber vorhandener Astro-Lösung prüfen | Bei konkreten Typisierungsanforderungen vergleichen |
| Versand | Formspree | Verwaltet Formularannahme, Speicherung, Versand und Spamschutz | Externer Dienst; Tarif, Datenverarbeitung und Verhalten bei Fehlern prüfen | Erste Wahl zum Prüfen für minimalen Betriebsaufwand |
| Versand | Eigener Endpoint / Astro Action + Resend | Eigene Kontrolle über Validierung und Versandablauf | Server, verifizierte Domain, API-Schlüssel, Spamschutz und Fehlerbehandlung | Bei eigenen Workflows oder größerem Kontrollbedarf |

Quellen (geprüft am 28.09.2026):

- [Astro Framework-Komponenten](https://docs.astro.build/en/guides/framework-components/)
- [Astro Actions und Zod](https://docs.astro.build/en/guides/actions/)
- [Bits UI](https://bits-ui.com/docs/introduction)
- [shadcn-svelte](https://www.shadcn-svelte.com/docs)
- [Runed](https://runed.dev/docs)
- [ArkType Setup](https://arktype.io/docs/intro/setup)
- [Formspree](https://formspree.io/)
- [Resend](https://resend.com/docs/introduction)

Preise, Kontingente, Aufbewahrung, Datenstandorte und Vertragsbedingungen sind offene Auswahlkriterien; diese Übersicht trifft hierzu keine Zusagen.

## Ticket 1: Technische Optionen für Kontaktformular und UI recherchieren

Vor der Implementierung den tatsächlichen Bedarf und den einfachsten geeigneten Stack festlegen. Die obige Vergleichstabelle dient als Ausgangspunkt.

- [ ] Benötigte Interaktionen und erwartetes Anfragevolumen festhalten.
- [ ] Hosting und Möglichkeit einer Server-Runtime klären.
- [ ] Formspree und eigenen Endpoint mit Resend anhand von Betrieb, Fehlerbehandlung, aktuellen Kosten und Kontingenten vergleichen.
- [ ] Datenverarbeitung, Aufbewahrung, Löschmöglichkeiten und erforderliche Vertragsunterlagen der Anbieter prüfen.
- [ ] Native Validierung, Zod/Astro Actions und ArkType anhand desselben Kontaktformulars vergleichen.
- [ ] Konkreten Bedarf für Svelte, Bits UI/shadcn-svelte und Runed benennen.
- [ ] Entscheidung mit kurzer Begründung dokumentieren; nicht benötigte Umsetzungstickets schließen oder zurückstellen.

## Ticket 2: Formularvalidierung gemäß Rechercheentscheidung ergänzen

Abhängig von Ticket 1. Name, E-Mail und Nachricht zuverlässig prüfen. ArkType oder eine geeignete Alternative nur entsprechend der dokumentierten Entscheidung einsetzen.

- [ ] Pflichtfelder, E-Mail-Format und sinnvolle Längenlimits festlegen.
- [ ] Native Browservalidierung beibehalten und zugängliche Fehlermeldungen ergänzen.
- [ ] Serverseitige beziehungsweise anbieterseitige Validierung mit dem Versandweg sicherstellen.
- [ ] Ungültige Eingaben und Grenzfälle testen.

## Ticket 3: Bits UI oder shadcn-svelte bei bestätigtem Bedarf integrieren

Abhängig von Ticket 1. Bits UI liefert ungestylte Svelte-Komponenten; shadcn-svelte baut mit Tailwind darauf auf. Zunächst die passende Variante auswählen.

- [ ] Konkrete benötigte UI-Komponenten festlegen.
- [ ] Svelte in Astro integrieren und nur interaktive Komponenten hydratisieren.
- [ ] Bestehendes Design und statische Astro-Seitenbereiche erhalten.
- [ ] Tastaturbedienung, Fokusführung und mobile Darstellung prüfen.

## Ticket 4: Runed für einen konkreten Svelte-Anwendungsfall einsetzen

Abhängig von Ticket 1 und einer Entscheidung für Svelte. Keine Installation ohne benötigte Funktion.

- [ ] Einen tatsächlichen Anwendungsfall für eine Runed-Utility dokumentieren.
- [ ] Utility integrieren und dadurch ersetzte eigene Logik entfernen.
- [ ] Verhalten und Aufräumen von Event-Listenern beziehungsweise Effekten prüfen.
- [ ] Ticket zurückstellen, falls aktuell kein geeigneter Anwendungsfall besteht.

## Ticket 5: Finales Portrait bereitstellen und einbauen

Den Platzhalter in `src/components/home/About.astro` ersetzen.

- [ ] Finales Foto auswählen und Nutzungsrechte klären.
- [ ] Bild optimieren, Abmessungen angeben und passenden Alternativtext ergänzen.
- [ ] Bildausschnitt auf Desktop und Mobilgeräten prüfen.

## Ticket 6: Hero-Konturmotiv abstimmen und optional ergänzen

Entscheiden, ob die vorgesehene Konturzeichnung verwendet wird. Bis dahin bleibt der vorhandene CSS-Glow.

- [ ] Entscheidung und bei Bedarf finales Motiv bereitstellen.
- [ ] Motiv in `src/components/home/Hero.astro` integrieren.
- [ ] Lesbarkeit von Überschrift und CTA auf allen Bildschirmgrößen prüfen.
- [ ] Dekoratives Motiv vor Screenreadern verbergen.

## Ticket 7: Impressum und Datenschutzerklärung bereitstellen und verlinken

Finale, freigegebene Rechtstexte beschaffen. Datenschutzhinweise auf die tatsächlich eingesetzten Dienste abstimmen.

- [ ] Angaben und Texte für beide Seiten bereitstellen.
- [ ] Verwendete Dienste einschließlich Schriftanbieter und Kontaktformular berücksichtigen.
- [ ] Eigene Seiten erstellen und die Textlabels im Footer durch Links ersetzen.
- [ ] Erreichbarkeit von beiden Seiten und mobile Darstellung prüfen.

## Ticket 8: Direkten Kontaktformularversand einrichten

Abhängig von Ticket 1; mit Ticket 2 und Ticket 7 abstimmen. Den bisherigen E-Mail-Entwurf durch den gewählten Versandweg ersetzen.

- [ ] Dienst und Empfängerpostfach konfigurieren; falls erforderlich Domain verifizieren.
- [ ] Zugangsdaten ausschließlich serverseitig speichern.
- [ ] Eingabevalidierung und Spamschutz einrichten.
- [ ] Erfolgs- und Fehlerzustände anzeigen; Eingaben bei Fehlern erhalten.
- [ ] Versand, Anbieterfehler und ungültige Eingaben testen.
- [ ] Dokumentieren, wie fehlgeschlagene Anfragen erkannt und bearbeitet werden.
