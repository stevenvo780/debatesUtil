# Imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Servir la aplicación con una imagen ligera de servidor web
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar el servidor
CMD ["nginx", "-g", "daemon off;"]
