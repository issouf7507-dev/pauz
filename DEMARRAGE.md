# Lancer le back-office PAUZ

> ⚠️ Ce document décrit la structure monorepo **cible**, avec `server/` et
> `admin/` à l'intérieur de ce dossier. Sur cette machine ils sont à côté de
> `pauz2/`, donc les raccourcis `pnpm dev:api`, `pnpm db:seed`… ne fonctionnent
> pas. Le guide à jour est **`../DEMARRAGE.md`**, à la racine de `PAUZ/`.

Tout se pilote depuis la racine du dépôt. Le projet est un monorepo pnpm avec
trois paquets :

| Dossier | Rôle | Port en dev |
| --- | --- | --- |
| `/` (racine) | Le site public (Vite + React) | 5173 |
| `server/` | L'API : commandes, jeu QR, authentification | 4000 |
| `admin/` | Le back-office | 5174 |

Le back-office a besoin de l'API, et l'API a besoin de MySQL. C'est l'ordre
d'installation ci-dessous.

---

## Prérequis

- **Node 22 ou plus** — `node -v`
- **pnpm 11** — `pnpm -v` (sinon `corepack enable`)
- **MySQL ou MariaDB** qui tourne

## 1. Installer les dépendances

Une seule fois, à la racine — pnpm installe les trois paquets d'un coup :

```bash
pnpm install
```

## 2. Créer la base

```bash
mysql -u root -p -e "CREATE DATABASE db_pauz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## 3. Configurer le serveur

```bash
cp server/.env.example server/.env
```

Puis ouvre `server/.env` et renseigne trois choses :

**`DATABASE_URL`** — l'accès à la base créée à l'étape 2 :

```
DATABASE_URL="mysql://root:motdepasse@localhost:3306/db_pauz"
```

> Si ton mot de passe contient `@`, `#`, `/` ou `?`, encode-le : `@` devient
> `%40`, `#` devient `%23`. Sans ça, l'URL est coupée au mauvais endroit.

**Les deux secrets JWT** — génère-les, ne les invente pas :

```bash
openssl rand -base64 48    # à coller dans JWT_ACCESS_SECRET
openssl rand -base64 48    # à coller dans JWT_REFRESH_SECRET
```

Le serveur refuse de démarrer si un secret fait moins de 32 caractères, avec le
nom de la variable fautive.

## 4. Préparer la base

```bash
pnpm db:generate    # génère le client Prisma (obligatoire après un clone)
pnpm db:deploy      # crée les tables
pnpm db:seed        # crée le compte propriétaire + le produit
```

`db:seed` affiche l'email du compte créé. Il ne crée un compte **que si aucun
n'existe** : le relancer plus tard ne réinitialise jamais un mot de passe réel.

Identifiants par défaut (modifiables dans `server/.env` avant le seed) :

```
admin@pauz.ci
ChangeMoi123!
```

**Change ce mot de passe à la première connexion**, depuis « Mon compte ».

## 5. Démarrer

Deux terminaux, l'API d'abord :

```bash
# terminal 1
pnpm dev:api      # → http://localhost:4000
```

```bash
# terminal 2
pnpm dev:admin    # → http://localhost:5174
```

Ouvre **http://localhost:5174** et connecte-toi.

En développement, Vite proxifie `/api` vers le port 4000 : le back-office et
l'API sont donc en même origine et les cookies de session passent sans réglage
CORS particulier.

---

## Données de démonstration

Pour explorer une interface remplie plutôt que vide — 5 clients, 10 commandes
sur tous les statuts, une campagne avec 4 lots, 400 codes et 10 scans joués :

```bash
pnpm seed:demo             # créer
pnpm seed:demo --clean     # tout retirer
```

Le script ne touche qu'à ce qu'il a créé (slugs préfixés `demo-` et cinq numéros
de téléphone marqués). Tes vraies données ne risquent rien.

## Vérifier que tout fonctionne

```bash
pnpm smoke
```

Parcourt l'API de bout en bout : connexion, commande, lien de commande et sa
confirmation, cycle de vie complet, campagne gagnante et perdante, rejeu d'un
code, plafond de scans, remise d'un lot, export CSV, cloisonnement des routes
admin. Le script nettoie derrière lui — à réserver à une base de développement.

Autres commandes utiles :

```bash
pnpm db:studio     # explorer la base dans le navigateur
pnpm build:api     # compiler l'API
pnpm build:admin   # compiler le back-office
```

---

## Si ça ne démarre pas

**« Configuration invalide »** au lancement de l'API — une variable de
`server/.env` manque ou est mal formée. Le message nomme laquelle.

**« Impossible de joindre la base de données »** — MySQL n'est pas démarré, ou
`DATABASE_URL` est faux. Teste l'accès à part :
`mysql -u root -p db_pauz -e "SELECT 1;"`

**Le back-office affiche une erreur de chargement** — l'API n'est pas lancée.
Vérifie : `curl http://localhost:4000/health`

**`Cannot find module '../generated/prisma/client'`** — le client Prisma n'a pas
été généré. Le dossier est volontairement hors du dépôt : `pnpm db:generate`.

**Migration déjà appliquée / schéma désynchronisé** — regarde l'état réel :
`pnpm --filter @pauz/server exec prisma migrate status`

---

## Mise en production

```bash
pnpm build:api        # server/dist
pnpm build:admin      # admin/dist  (fichiers statiques à servir)
```

Sur le serveur :

```bash
pnpm db:deploy                              # applique les migrations
pm2 start server/dist/index.js --name pauz-api
```

Dans `server/.env` en production :

| Variable | Valeur |
| --- | --- |
| `NODE_ENV` | `production` |
| `COOKIE_SECURE` | `true` |
| `COOKIE_SAMESITE` | `none` si le back-office est sur un autre domaine que l'API, sinon `lax` |
| `CORS_ORIGINS` | les origines exactes du site et du back-office |
| `PUBLIC_SITE_URL` | l'URL publique du site (elle construit les liens de commande) |

Et dans `admin/.env`, `VITE_API_URL` avec l'origine complète de l'API — le proxy
Vite n'existe qu'en développement.

Détails d'implémentation : `server/README.md` et `admin/README.md`.
