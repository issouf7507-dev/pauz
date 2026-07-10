# Déploiement — PAUZ

Site statique **Vite/React (SPA)**. À chaque `push` sur `main`, GitHub Actions build
le site et copie `dist/` sur le VPS via SSH. nginx sert les fichiers.

- **Domaine** : `pauz.willyaccessoire.com`
- **Dossier web sur le VPS** : `/home/dev-issouf/apps/willy-accesoire`
- **Workflow** : `.github/workflows/deploy.yml`

---

## Configuration initiale (à faire une seule fois)

### 1. Clé SSH dédiée au déploiement

Sur ta machine locale — ne pas réutiliser ta clé personnelle :

```bash
ssh-keygen -t ed25519 -f ~/.ssh/deploy_pauz -C "ci-deploy-pauz" -N ""
```

Puis autoriser la clé **publique** sur le VPS :

```bash
ssh-copy-id -i ~/.ssh/deploy_pauz.pub -p <PORT> dev-issouf@<IP_DU_VPS>
```

### 2. Préparer le dossier web

```bash
mkdir -p /home/dev-issouf/apps/willy-accesoire
```

### 3. Permissions de traversée pour nginx

nginx tourne en `www-data` et doit pouvoir traverser le home. Les dossiers home
sont souvent en `700`/`750` → sinon **403**. Corriger :

```bash
sudo chmod o+x /home/dev-issouf /home/dev-issouf/apps /home/dev-issouf/apps/willy-accesoire
```

### 4. Config nginx

Fichier `/etc/nginx/sites-available/pauz` :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name pauz.willyaccessoire.com;

    root /home/dev-issouf/apps/pauz;
    index index.html;

    # SPA React Router : toute URL inconnue renvoie index.html
    # (sinon 404 sur /page en accès direct ou refresh)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Assets versionnés par Vite (hash dans le nom) → cache long
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # index.html jamais en cache (pour récupérer les nouveaux déploiements)
    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
```

Activer :

```bash
sudo ln -s /etc/nginx/sites-available/pauz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 5. HTTPS (Let's Encrypt)

```bash
sudo certbot --nginx -d pauz.willyaccessoire.com
```

Certbot ajoute automatiquement le bloc `listen 443 ssl` et la redirection HTTP→HTTPS.

### 6. Secrets GitHub

Repo **Settings → Secrets and variables → Actions** :

| Secret           | Valeur                                                         |
| ---------------- | -------------------------------------------------------------- |
| `VPS_HOST`       | IP ou hostname du VPS                                          |
| `VPS_USER`       | `dev-issouf`                                                   |
| `VPS_SSH_KEY`    | Contenu de `~/.ssh/deploy_pauz` (clé privée, lignes BEGIN/END) |
| `SSH_PASSPHRASE` | Passphrase de la clé (vide si générée avec `-N ""`)            |
| `VPS_SSH_PORT`   | Port SSH                                                       |

---

## DNS

Un enregistrement **A** `pauz` → IP du VPS, sur la zone de `willyaccessoire.com` :

| Type | Nom    | Valeur        |
| ---- | ------ | ------------- |
| A    | `pauz` | `<IP_DU_VPS>` |

---

## Utilisation au quotidien

- **Déployer** : push sur `main` → déploiement automatique.
- **Suivre** : onglet **Actions** du repo.

## Dépannage

- **Permission denied (publickey)** → clé du secret ≠ clé dans `authorized_keys`,
  ou mauvais copier-coller (lignes BEGIN/END).
- **403 nginx** → permissions de traversée du home (étape 3) ou droits de lecture
  des fichiers (étape « Fix permissions » du workflow).
- **404 sur une URL profonde / au refresh** → le `try_files ... /index.html` manque.
