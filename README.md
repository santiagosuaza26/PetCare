# PetCare

## Nombre del estudiante
Santiago Suaza Cardona

## Descripción del proyecto
PetCare es una aplicación móvil desarrollada con **React Native CLI** para gestionar mascotas. Permite registrar mascotas nuevas, ver la lista completa con sus datos, consultar el detalle individual de cada una, y leer consejos de cuidado que rotan automáticamente.

El proyecto fue creado como práctica de:
- Navegación con **Stack Navigator** y **Bottom Tab Navigator** (anidados).
- Manejo de estado global con la **Context API** de React.
- React Hooks: `useState`, `useEffect`, `useRef`, `useMemo` y hooks personalizados.
- Animaciones con la API `Animated` de React Native.
- Validaciones de formulario en tiempo real.

## Tecnologías utilizadas
- **React Native CLI** 0.84
- **React** 19
- **React Navigation** 7 (Stack y Bottom Tabs)
- **react-native-safe-area-context** — manejo de áreas seguras del dispositivo
- **react-native-screens** — optimización nativa de la navegación
- **StyleSheet** de React Native
- **React Hooks** (`useState`, `useEffect`, `useRef`, `useMemo`)
- **Context API** — estado global de mascotas

## Pantallas de la aplicación

| Pantalla | Descripción |
|---|---|
| **Lista de mascotas** | Muestra todas las mascotas registradas en tarjetas con animación de entrada |
| **Detalle de mascota** | Información completa, contador de visitas y opción de marcar como favorita |
| **Registrar mascota** | Formulario con validación en tiempo real y teclados numéricos adaptados |
| **Consejos de cuidado** | 10 consejos que rotan cada 5 segundos con avance manual disponible |

## Instrucciones de instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/santiagosuaza26/PetCare.git
cd PetCare
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar la aplicación en Android
```bash
npx react-native run-android
```

### 4. Ejecutar la aplicación en iOS
```bash
npx react-native run-ios
```

### 5. Ejecutar las pruebas
```bash
npm test
```

## Estructura del proyecto

```
PetCare/
├── App.js              → Navegación principal (Tab + Stack)
├── context/
│   └── PetContext.js   → Estado global de mascotas
├── screens/            → Cuatro pantallas de la aplicación
├── styles/             → Estilos separados por pantalla
└── data/
    └── tipsData.js     → Datos de los consejos de cuidado
```

> Para una explicación técnica detallada del proyecto (arquitectura, hooks, conceptos clave y preguntas frecuentes) ver el archivo [EXPLICACION.md](./EXPLICACION.md).
