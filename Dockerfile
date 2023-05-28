# Establece la imagen base con Node.js 18.16.0
FROM node:18.16.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que tu aplicación Express está escuchando
EXPOSE 3001

# Comando para iniciar tu aplicación cuando el contenedor se inicie
CMD ["npm", "start"]
