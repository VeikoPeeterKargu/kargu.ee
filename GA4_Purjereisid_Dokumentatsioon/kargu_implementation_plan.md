# R.A.P.S Testimine: Kargu.ee Alamlehtede GA4 Uuendus

Selle plaani eesmärk on rakendada **R.A.P.S (Role-Aligned Parallel Strategy)** ja käivitada meie `/orchestrator` workflow esimese testprojekti, `kargu.ee/purjereisid` peal.

## Eesmärk
Ühtlustada ja optimeerida Google Analytics 4 (GA4) jälgimine üle kogu veebistruktuuri (alustades `/purjereisid` lehest), seadistades dünaamilise *Content Grouping*'u (sisugruppide) loogika ning lahendades varasemalt levinud "Hang/Freeze" probleemid Squarespace'is ja teistes stackides (staatiline HTML / Next.js).

## R.A.P.S. Rollide Jaotus
Strateegia näeb ette ülesande jagamist spetsialiseeritud rollide vahel:

### 1. Design Lead (Analüütika Arhitekt)
* **Ülesanne**: Defineerib GA4 *Content Grouping* struktuuri ja mõõdikud.
* **Fookus**: Milliseid evente ja kategooriaid trackida (nt `content_group: "purjereisid"`, `destination: "kreeka"`).
* **Väljund**: GA4 andmemudel ja parameetrid.

### 2. Builder (Koodi Kirjutaja)
* **Ülesanne**: Implementeerida "Unified Injection Block Pattern" (määratletud meie teadmusbaasis) Squarespace'i või staatilise HTML'i jaoks.
* **Fookus**: Optimeeritud, ilma rippuvate `<script>` tagideta sisu, et vältida brauseri kokkujooksmist.
* **Väljund**: Valmis HTML/JS koodiplokk, mida süstida faili või Squarespace'i CMS-i.

### 3. QA (Kvaliteedikontroll)
* **Ülesanne**: Valideerida skriptide õige laadimine ja tagasisidestada.
* **Fookus**: Käivitab teste (nt `curl -s https://kargu.ee/purjereisid | grep -E 'G-XXXXX'`) ja teeb brauseri QA-d.
* **Väljund**: Raport ja kinnitus, et integratsioon töötab vigadeta.

---

> [!IMPORTANT]
> ## User Review Required
> 
> Kuna `kargu.ee/purjereisid` lähtekoodi/koodibaasi pole otseselt praeguses lokaalses repositooriumis (`/Users/vpk/Documents/Antigravity/AG` on tühi):
> 
> Ootan sinult kinnitust **kahes küsimuses**:
> 1. Kas ma koodin GA4 tagid valmis **skriptifailidena/snippetitena** ja esitan need sulle Squarespace'i kopeerimiseks, VÕI tõmbad sa vahepeal arenduskausta (kuhu?) nende staatilised HTML / Next.js versioonid?
> 2. Kas oled nõus, et jooksen kohe läbi `/orchestrator` esimesed faasid (Research -> Implement), alustades Design Lead rollist?

## Lahenduse Arhitektuur
Kasutame meie andmebaasi teadmisi ja koostame Unified Technical Injection bloki:

```html
<!-- Unified Technical Injection -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SINUID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Custom Content Grouping & Config
  gtag('config', 'G-SINUID', {
    'content_group': 'purjereisid',
    'region': 'EE'
  });
</script>
<!-- End Injection -->
```

Ootan sinu tagasisidet ja formaalset heakskiitu (võid lihtsalt kinnitada, kuidas soovid koodi kätte saada), et asuda täitma Builder ja QA rolle!
