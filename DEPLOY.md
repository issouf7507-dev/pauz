# Déploiement — PAUZ

Site statique **Vite/React (SPA)**. À chaque `push` sur `main`, GitHub Actions build
le site et copie `dist/` sur le VPS via SSH. nginx sert les fichiers.

Workflow : [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

---

## Configuration initiale (à faire une seule fois)

### 1. Créer une clé SSH dédiée au déploiement

Sur ta machine locale — **ne pas réutiliser ta clé personnelle** :

```bash
ssh-keygen -t ed25519 -f ~/.ssh/deploy_pauz -C "ci-deploy-pauz" -N ""
```

Ça crée `~/.ssh/deploy_pauz` (privée) et `~/.ssh/deploy_pauz.pub` (publique).

### 2. Autoriser la clé sur le VPS

Copie la clé **publique** dans `authorized_keys` du user de déploiement sur le VPS :

```bash
ssh-copy-id -i ~/.ssh/deploy_pauz.pub -p <PORT> <USER>@<IP_DU_VPS>
# ou manuellement : ajouter le contenu de deploy_pauz.pub dans ~/.ssh/authorized_keys sur le VPS
```

### 3. Préparer le dossier web sur le VPS

```bash
sudo mkdir -p /var/www/pauz
sudo chown -R www-data:www-data /var/www/pauz
```

Le user SSH de déploiement doit pouvoir écrire dans ce dossier et lancer les
`sudo chown/chmod` de l'étape « Fix permissions » sans mot de passe. Ajoute dans
`sudo visudo` (adapte `<USER>`) :

```
<USER> ALL=(ALL) NOPASSWD: /usr/bin/chown, /usr/bin/find
```

### 4. Configurer nginx (routing SPA)

Fichier `/etc/nginx/sites-available/pauz` :

```nginx
server {
    listen 80;
    server_name pauz.example.com;   # ← ton domaine

    root /var/www/pauz;
    index index.html;

    # Indispensable pour une SPA React Router : toute URL inconnue renvoie
    # index.html pour que le routing côté client fonctionne (pas de 404 sur /page).
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache long pour les assets versionnés (Vite ajoute un hash aux noms de fichiers)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Activer + HTTPS :

```bash
sudo ln -s /etc/nginx/sites-available/pauz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d pauz.example.com   # HTTPS gratuit via Let's Encrypt
```

### 5. Ajouter les secrets sur GitHub

Repo **Settings → Secrets and variables → Actions → New repository secret** :

| Secret            | Valeur                                                            |
| ----------------- | ---------------------------------------------------------------- |
| `SSH_PRIVATE_KEY` | Contenu complet de `~/.ssh/deploy_pauz` (avec les lignes BEGIN/END) |
| `SSH_HOST`        | IP ou hostname du VPS                                             |
| `SSH_USER`        | User SSH de déploiement                                           |
| `SSH_PORT`        | Port SSH (souvent `22`)                                           |
| `DEPLOY_PATH`     | Dossier web, ex. `/var/www/pauz`                                 |

---

## Utilisation au quotidien

- **Déployer** : merge/push sur `main` → le déploiement se lance automatiquement.
- **Déclencher à la main** : onglet **Actions → Build & Deploy → Run workflow**.
- **Suivre un déploiement** : onglet **Actions** du repo.

## Dépannage

- **Permission denied (publickey)** → la clé du secret `SSH_PRIVATE_KEY` ne correspond
  pas à celle dans `authorized_keys`, ou mauvais copier-coller (lignes BEGIN/END manquantes).
- **Page blanche / 404 sur une URL profonde** → le `try_files ... /index.html` manque
  dans nginx (routing SPA).
- **403 nginx** → permissions des fichiers : vérifier que l'étape « Fix permissions »
  s'exécute (droits sudo du user).
