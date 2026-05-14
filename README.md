# INCLAVATUS — Site web du roman

Site statique prêt à déployer sur Vercel.

## Fichiers

```
inclavatus/
├── index.html      ← page principale (tout le contenu)
├── style.css       ← styles (palette orange/noir/or)
├── main.js         ← animations, curseur, interactions
├── vercel.json     ← config de déploiement Vercel
└── README.md
```

---

## Déploiement sur Vercel

### Option 1 — Via l'interface Vercel (recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Poussez ce dossier sur GitHub / GitLab / Bitbucket
3. Sur Vercel → **New Project** → importez votre dépôt
4. Framework Preset : **Other** (site statique)
5. Cliquez **Deploy** ✦

### Option 2 — Via Vercel CLI

```bash
npm install -g vercel
cd inclavatus/
vercel
```

---

## Personnalisation

### Ajouter votre couverture
Dans `index.html`, cherchez `cover-slot`.
Remplacez le bloc `cover-frame` par :
```html
<img src="couverture.jpg" class="cover-img" alt="Couverture INCLAVATUS" />
```
Ajoutez votre fichier `couverture.jpg` dans le même dossier.

### Remplacer l'extrait
Cherchez la balise `<div class="extrait-body" id="extrait-body">` dans `index.html`
et modifiez les paragraphes librement.

### Ajouter votre photo (section Auteur)
Dans `.auteur-photo-slot`, remplacez le SVG placeholder par :
```html
<img src="auteur.jpg" class="auteur-photo" alt="Inclavatus" />
```

### Activer le formulaire de contact
Créez un compte gratuit sur [Formspree](https://formspree.io) et
modifiez la balise `<form>` :
```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
  <!-- supprimez le id="contact-form" et le JS associé -->
```

### Couleurs
Toutes les couleurs sont dans `:root` au début de `style.css`.
Les variables clés :
- `--orange` : couleur principale
- `--gold`   : accents dorés
- `--noir`   : fond sombre

---

## Domaine personnalisé

Dans Vercel → votre projet → **Settings → Domains**
Ajoutez votre domaine et suivez les instructions DNS.
