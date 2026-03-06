FROM node:22-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Port exposé
EXPOSE 3000

# Migrer la BDD et démarrer l'app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
