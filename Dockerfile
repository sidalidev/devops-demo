FROM node:22-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production

# Copier le code
COPY . .

# Port exposé
EXPOSE 3000

# Démarrer l'app
CMD ["npm", "start"]
