# Gunakan image Node.js versi 18 sebagai base image
FROM node:18

# Tentukan working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke working directory di container
COPY . .

# Install Prisma CLI secara global
RUN npm install -g prisma

# Jalankan Prisma untuk membangun schema (misalnya, setelah migrasi)
RUN npx prisma generate

# Kompilasi TypeScript ke JavaScript
RUN npm run build

# Expose port aplikasi (misalnya, 3000)
EXPOSE 8800

# Jalankan aplikasi saat container dimulai
CMD ["npm", "run", "start:prod"]
