# 🏈 Playbook Flag App – Development Setup

Willkommen zum **Playbook WebApp** Projekt!  
Dieses Setup beschreibt, wie du das Backend (Node.js + Express + MongoDB) sowie das Frontend (React + Vite) für die lokale Entwicklung startest.

---

## 🚀 Projektstruktur

´´´yaml
/project-root ├── client/ # Frontend (React + Vite) ├── server/ # Backend (Node + Express) └── README.md

´´´


---

## 📦 Voraussetzungen

- **Node.js** (v18+ empfohlen)
- **Docker + Docker Compose** (für MongoDB Container)
- **npm** (wird mit Node installiert)

---

## ⚙️ Setup-Schritte

### 1️⃣ MongoDB Container starten

Das Projekt nutzt MongoDB in einem Docker Container für die lokale Entwicklung.  
Starte einfach:

```bash
docker run -d \
  --name playbook-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo:latest
```


Mongo DB läuft dann unter:

```perl
mongodb://admin:admin123@localhost:27017
```

### Backend starten (Express Server)
Wechsle in den server-Ordner:

```bash
cd server
npm install
npm run dev
```

Server läuft standardmäßig unter:
http://localhost:8080

### Frontend starten (React + Vite)
Wechsle in den client-Ordner:

```bash
cd client
npm install
npm run dev
```

Frontend erreichbar unter:
http://localhost:5173
🌱 Entwicklungs-Workflow
MongoDB Container muss einmalig gestartet sein (bleibt laufen).
Starte Backend & Frontend mit npm run dev jeweils in server & client.
Änderungen werden automatisch neu geladen (Hot Reload via Vite & Nodemon).
Backend-API läuft auf Port 8080, Frontend kommuniziert lokal darauf.

### Nützliche Befehle
Befehl	Beschreibung
docker ps	Prüfen ob MongoDB Container läuft
docker stop playbook-mongo	MongoDB Container stoppen
npm run dev (im /server)	Backend starten mit Hot Reload
npm run dev (im /client)	Frontend starten mit Vite
npm run build (im /client)	Frontend für Produktion builden
### API & DB Info
API Base URL: http://localhost:8080/api/
MongoDB URI: mongodb://admin:admin123@localhost:27017

### Optional: MongoDB GUI
Du kannst auch ein MongoDB GUI Tool (z.B. MongoDB Compass) verwenden, um die Datenbank lokal zu inspizieren:

Verbindungs-URI:

```perl
mongodb://admin:admin123@localhost:27017
```