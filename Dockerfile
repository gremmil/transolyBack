# Establecer la imagen base
FROM node:14-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto en el que se ejecuta tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]