# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variable de entorno
3. Ejecutar el comando ``ǹpm install`
4. Levatar las bases de datos con el comando

```
docker-compose up -d
```

5. Ejecutar el comado
   `npx prisma migrate dev`
6. Ejecutar `npm run dev`
