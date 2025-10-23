# 🚀 Guía de Despliegue - ¡Qué Chulito!

## Prerrequisitos

1. Node.js 20+
2. Cuenta de Firebase
3. Firebase CLI instalado: `npm install -g firebase-tools`

## Pasos de Configuración

### 1. Configurar Firebase

```bash
firebase login
firebase init
```

Selecciona:
- ✅ Hosting
- ✅ Functions
- ✅ Firestore

### 2. Configurar Variables de Entorno

Copia `env.example` a `.env.local` y completa con tus credenciales de Firebase:

```bash
cp env.example .env.local
```

Obtén las credenciales de:
- **Firebase Console** → Project Settings → General
- **Firebase Console** → Project Settings → Service Accounts

### 3. Configurar Firebase Admin SDK

Crea un archivo `firebase-adminsdk.json` en la raíz con tus credenciales de servicio:

```json
{
  "type": "service_account",
  "project_id": "tu-proyecto",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### 4. Poblar Firestore con Datos Iniciales

```bash
npm run seed
```

### 5. Desplegar Reglas de Firestore

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 6. Build y Deploy

```bash
npm run build
firebase deploy
```

## Estructura de Despliegue

```
Firebase Hosting
├── .next/              # Build de Next.js
└── Functions
    └── nextjs          # SSR Handler
```

## Verificación Post-Deploy

1. Verifica que el sitio carga: `https://tu-proyecto.web.app`
2. Prueba navegación entre páginas
3. Verifica que el carrito persiste (redux-persist)
4. Prueba modo oscuro/claro
5. Verifica responsive en móvil

## Troubleshooting

### Error: "Function failed to initialize"
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs: `firebase functions:log`

### Error: "Firestore permission denied"
- Verifica las reglas de Firestore
- Ejecuta: `firebase deploy --only firestore:rules`

### Build falla
- Limpia cache: `rm -rf .next node_modules`
- Reinstala: `npm install`
- Build: `npm run build`

## Monitoreo

```bash
# Ver logs de Functions
firebase functions:log

# Ver estadísticas de hosting
firebase hosting:channel:list
```

## Actualización de Contenido

Para actualizar productos/categorías:
1. Edita en Firebase Console
2. O ejecuta el seed nuevamente

---

¡Listo! Tu ecommerce está desplegado en Firebase 🎉

