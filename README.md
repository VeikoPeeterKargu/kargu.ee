# kargu.ee

Isiklik veebisait — [kargu.ee](https://kargu.ee)

## Failid

```
index.html   — leht
index.css    — stiilid  
main.js      — loogika
images/      — pildid
deploy.py    — FTP deploy skript
```

## Deploy

Iga `git push main` käivitab automaatse deploy Zone.ee FTP kaudu (GitHub Actions).

**FTP Secrets** (GitHub → Settings → Secrets → Actions):
- `FTP_HOST` — `kargu.ee`
- `FTP_USERNAME` — FTP kasutajanimi Zone.ee's
- `FTP_PASSWORD` — FTP parool Zone.ee's

## Käsitsi deploy

```bash
FTP_HOST=kargu.ee FTP_USER=<user> FTP_PASS=<pass> python3 deploy.py
```
