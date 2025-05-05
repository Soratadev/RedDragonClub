# Usa la imagen oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli@19

# Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto por el que sirve Angular
EXPOSE 4200

# Comando para iniciar el servidor Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
