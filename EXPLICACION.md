# Guía de exposición y sustentación — PetCare

Esta guía explica el proyecto **PetCare** de forma detallada para que puedas presentarlo y defenderlo con seguridad.

---

## 1. ¿Qué es PetCare y para qué sirve?

**PetCare** es una aplicación móvil construida con **React Native CLI** que permite gestionar mascotas de forma sencilla. Con ella el usuario puede:

- **Ver la lista** de mascotas registradas con su nombre, especie, raza, edad y peso.
- **Ver el detalle** de cada mascota (incluyendo un contador de visitas y la opción de marcarla como favorita).
- **Registrar** una nueva mascota completando un formulario con validaciones en tiempo real.
- **Leer consejos** de cuidado que rotan automáticamente cada 5 segundos.

La app funciona tanto en **Android** como en **iOS** porque React Native compila a código nativo para ambas plataformas.

---

## 2. Tecnologías utilizadas y por qué se eligieron

| Tecnología | Versión | Motivo de uso |
|---|---|---|
| **React Native CLI** | 0.84 | Genera código nativo real; ofrece mejor rendimiento que Expo en producción. |
| **React** | 19 | Base de React Native; permite construir interfaces con componentes reutilizables. |
| **React Navigation** | 7 | Librería estándar para navegación en React Native (Stack + Bottom Tabs). |
| **react-native-safe-area-context** | 5 | Evita que el contenido quede tapado por el notch o la barra de inicio del teléfono. |
| **react-native-screens** | 4 | Optimiza la memoria usando pantallas nativas en vez de vistas JS para la navegación. |
| **React Context API** | — | Manejo de estado global sin librerías externas, suficiente para esta escala. |
| **StyleSheet de React Native** | — | Estilos inline eficientes; se procesan una sola vez al arrancar la app. |

---

## 3. Estructura de carpetas

```
PetCare/
├── App.js              → Punto de entrada: define toda la navegación
├── index.js            → Registra el componente raíz en React Native
├── context/
│   └── PetContext.js   → Estado global de mascotas (Context + hooks)
├── screens/
│   ├── PetListScreen.js     → Pantalla con lista de mascotas
│   ├── PetDetailScreen.js   → Pantalla de detalle de una mascota
│   ├── RegisterPetScreen.js → Formulario para registrar mascota
│   └── TipsScreen.js        → Consejos de cuidado con rotación automática
├── styles/
│   ├── AppStyles.js          → Estilos de la barra de navegación inferior
│   ├── PetListStyles.js      → Estilos de la pantalla de lista
│   ├── PetDetailStyles.js    → Estilos de la pantalla de detalle
│   ├── RegisterPetStyles.js  → Estilos del formulario de registro
│   └── TipsStyles.js         → Estilos de la pantalla de consejos
└── data/
    └── tipsData.js     → Arreglo con los 10 consejos de cuidado
```

---

## 4. Arquitectura y navegación (`App.js`)

La aplicación usa **dos capas de navegación anidadas**:

```
PetProvider (estado global)
└── SafeAreaProvider
    └── NavigationContainer
        └── BottomTabNavigator  ← barra inferior con 3 pestañas
            ├── PetsTab
            │   └── StackNavigator  ← permite ir al detalle de una mascota
            │       ├── PetList
            │       └── PetDetail
            ├── RegisterTab → RegisterPetScreen
            └── TipsTab     → TipsScreen
```

**¿Por qué Stack dentro de Tab?**
La pestaña "Mascotas" necesita navegar desde la lista al detalle. Un `StackNavigator` guarda un historial y permite volver atrás con el botón de retroceso. El `BottomTabNavigator` no permite eso por sí solo, por eso se anidan.

**Íconos de pestañas** — se usan emojis (`🐾`, `➕`, `💡`) renderizados con `Text` en lugar de una librería de íconos, lo que reduce dependencias externas.

---

## 5. Manejo de estado global — `context/PetContext.js`

Se usa la **Context API de React** para compartir la lista de mascotas entre pantallas sin tener que pasar `props` de padre a hijo en cada nivel.

### Piezas clave

```js
const PetContext = createContext(undefined);
```
Crea el contexto. Se inicializa con `undefined` para detectar si se usa fuera del proveedor.

```js
function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const addPet = (petData) => setPets(prev => [petData, ...prev]);
  const updatePet = (petId, updatedFields) => setPets(prev =>
    prev.map(pet => pet.id !== petId ? pet : { ...pet, ...updatedFields })
  );
  // ...
}
```

| Valor expuesto | Tipo | Para qué sirve |
|---|---|---|
| `pets` | Array | Lista actual de mascotas |
| `setPets` | Función | Reemplazar la lista completa (usado para cargar datos iniciales) |
| `addPet` | Función | Agregar una mascota al inicio de la lista |
| `updatePet` | Función | Editar campos de una mascota existente por su `id` |

```js
function usePetContext() {
  const value = useContext(PetContext);
  if (!value) throw new Error('usePetContext must be used inside PetProvider.');
  return value;
}
```
`usePetContext` es un **hook personalizado**; simplifica el uso del contexto en cualquier pantalla y lanza un error claro si se usa fuera del `PetProvider`.

---

## 6. Pantalla por pantalla

### 6.1 `PetListScreen.js` — Lista de mascotas

**¿Qué hace?**
- Carga tres mascotas de ejemplo (`Luna`, `Milo`, `Nala`) la primera vez que se monta (solo si la lista está vacía, para no pisar mascotas registradas por el usuario).
- Muestra cada mascota en una tarjeta (`Pressable`) con feedback visual al presionar (escala y opacidad).
- Al tocar una tarjeta, navega a `PetDetailScreen` pasando el objeto `pet` como parámetro de ruta.
- Muestra un emoji diferente según la especie: 🐶 perro, 🐱 gato, 🐾 cualquier otra.
- Tiene animaciones de entrada con `Animated.sequence`: primero aparece el título y luego la lista.

**Hooks usados:**

| Hook | Motivo |
|---|---|
| `useEffect` (carga inicial) | Ejecuta la carga de mascotas de ejemplo una sola vez al montar |
| `useEffect` (sincroniza lista) | Mantiene el estado local `petList` actualizado con el contexto |
| `useEffect` (animaciones) | Lanza las animaciones de entrada después del primer render |
| `useRef` | Guarda los valores de `Animated.Value` sin provocar re-renders |
| `useState` | Mantiene la copia local de la lista para renderizar |

---

### 6.2 `PetDetailScreen.js` — Detalle de mascota

**¿Qué hace?**
- Recibe la mascota seleccionada a través de `route.params.pet`.
- Busca en el contexto la versión más actualizada de esa mascota por `id` (por si fue editada).
- Actualiza dinámicamente el título del encabezado con el nombre de la mascota usando `navigation.setOptions`.
- Lleva un **contador de visitas** local (`viewCounter`) que sube cada vez que cambia el `petId`.
- Permite **marcar/desmarcar como favorita** con un botón que alterna el estado `isFavorite`.
- Muestra "No disponible" cuando algún campo no existe.

**Hooks usados:**

| Hook | Motivo |
|---|---|
| `useMemo` | Calcula `petData` solo cuando cambia `petId` o la lista del contexto; evita recálculos innecesarios |
| `useState` | Guarda `isFavorite` y `viewCounter` como estado local de la pantalla |
| `useEffect` (contador) | Incrementa `viewCounter` cada vez que se navega a un `petId` distinto |
| `useEffect` (título) | Sincroniza el título del header de navegación con el nombre de la mascota |

---

### 6.3 `RegisterPetScreen.js` — Registrar mascota

**¿Qué hace?**
- Muestra un formulario con cinco campos: nombre, especie, raza, edad y peso.
- **Validaciones en tiempo real**: el botón "Registrar mascota" sólo se habilita cuando:
  - Nombre, especie y raza no están vacíos.
  - Edad es un entero positivo.
  - Peso es un número decimal positivo.
- Al registrar, crea un objeto mascota con `id = Date.now().toString()` (identificador único basado en timestamp), llama a `addPet` del contexto y muestra una alerta con el resumen.
- El campo de **edad** usa `keyboardType="number-pad"` y el de **peso** usa `keyboardType="decimal-pad"` para mostrar el teclado correcto en el teléfono.
- Usa `KeyboardAvoidingView` + `ScrollView` para que el teclado no tape los campos en iOS.
- El input activo resalta su borde con `inputFocused` al recibir el foco (`onFocus`/`onBlur`).

**Hooks usados:**

| Hook | Motivo |
|---|---|
| `useState` (x5) | Controla el valor de cada campo del formulario individualmente |
| `useState` (isSubmitEnabled) | Refleja si el formulario es válido para habilitar el botón |
| `useState` (focusedInput) | Sabe qué campo está activo para aplicar el estilo de foco |
| `useEffect` (validación) | Re-evalúa si el formulario es válido cada vez que cambia cualquier campo |
| `useEffect` (animación) | Lanza la animación de entrada del formulario al montarse |
| `useRef` | Guarda `Animated.Value` sin causar re-renders |

---

### 6.4 `TipsScreen.js` — Consejos de cuidado

**¿Qué hace?**
- Carga los 10 consejos definidos en `data/tipsData.js`.
- Avanza automáticamente al siguiente consejo cada **5 segundos** usando `setInterval`.
- El botón "Siguiente" permite avanzar manualmente.
- El índice avanza de forma circular: cuando llega al último consejo vuelve al primero con `% tipsData.length`.
- Muestra un contador "X de 10" para saber en qué consejo está el usuario.
- Al desmontar la pantalla, el `useEffect` limpia el intervalo (`clearInterval`) para evitar memory leaks.

**Hooks usados:**

| Hook | Motivo |
|---|---|
| `useState` (tipsList) | Guarda el arreglo de consejos en el estado local |
| `useState` (currentIndex) | Índice actual del consejo visible |
| `useState` (currentTip) | Objeto del consejo actual para mostrar en pantalla |
| `useEffect` (carga + intervalo) | Carga los consejos y arranca el temporizador; retorna cleanup |
| `useEffect` (sincroniza tip) | Actualiza `currentTip` cuando cambia el índice |

---

## 7. Datos estáticos — `data/tipsData.js`

Es un arreglo de objetos con tres campos cada uno:

```js
{ id: '1', title: 'Vacunas al dia', content: '...' }
```

Se mantiene separado de la lógica de la pantalla para que sea fácil de actualizar o reemplazar por una llamada a una API en el futuro.

---

## 8. Estilos — carpeta `styles/`

- Cada pantalla tiene su propio archivo de estilos creado con `StyleSheet.create({})`.
- `StyleSheet.create` valida los estilos en tiempo de desarrollo y los optimiza internamente.
- La paleta de colores es minimalista: fondo gris claro `#F3F4F6`, texto negro `#111111`, gris para info secundaria `#4B5563`, bordes `#D1D5DB`.
- Se usa `elevation` (Android) y `shadow*` (iOS) para tarjetas con sombra.
- Los botones tienen feedback de presión con `transform: [{ scale: 0.99 }]` y `opacity`.

---

## 9. Flujo completo de la aplicación

```
1. Usuario abre la app
   → PetListScreen muestra Luna, Milo y Nala (datos de ejemplo)

2. Toca una tarjeta (ej. Luna)
   → Navega a PetDetailScreen con los datos de Luna
   → El contador de visitas sube a 1
   → El título del header cambia a "Detalle: Luna"
   → El usuario puede marcarla como favorita

3. Vuelve atrás (botón "Volver" o botón nativo)
   → Regresa a PetListScreen

4. Toca la pestaña "Registrar" (➕)
   → RegisterPetScreen muestra el formulario vacío
   → El botón está deshabilitado hasta completar todos los campos
   → Al completarlos y tocar "Registrar mascota", se muestra alerta y
     la nueva mascota aparece en PetListScreen al volver a esa pestaña

5. Toca la pestaña "Consejos" (💡)
   → TipsScreen muestra el primer consejo
   → Cada 5 segundos avanza solo al siguiente
   → El usuario puede pulsar "Siguiente" para avanzar manualmente
```

---

## 10. Conceptos técnicos clave para defender

### ¿Qué es React Native CLI vs Expo?
React Native CLI genera el proyecto con carpetas `android/` e `ios/` nativas, lo que da control total sobre las dependencias nativas. Expo abstrae eso, lo que es más sencillo al inicio pero limita ciertos usos avanzados.

### ¿Qué es el Context API y cuándo usarlo?
Es el sistema de estado global de React. Se usa cuando varios componentes no relacionados jerárquicamente necesitan el mismo dato. Alternativas más robustas son Redux o Zustand, pero para una app de esta escala el Context es suficiente.

### ¿Por qué `useMemo` en `PetDetailScreen`?
Porque el cálculo de `petData` (buscar la mascota en la lista del contexto) no necesita ejecutarse en cada render. `useMemo` lo memoriza y solo recalcula cuando cambia `petId` o la lista `pets`, lo que mejora el rendimiento.

### ¿Por qué `useRef` para `Animated.Value`?
`useRef` devuelve un objeto cuya propiedad `.current` persiste entre renders sin provocar uno nuevo. `Animated.Value` es un objeto mutable que no debe recrearse en cada render, por eso se guarda con `useRef` en lugar de `useState`.

### ¿Por qué `clearInterval` en el cleanup de `TipsScreen`?
Cuando el usuario cambia de pestaña, el componente puede desmontarse. Si no se limpia el intervalo, seguirá ejecutándose en segundo plano intentando actualizar el estado de un componente que ya no existe, lo que causa un memory leak y errores en consola.

### ¿Por qué el `id` de una nueva mascota es `Date.now().toString()`?
`Date.now()` devuelve los milisegundos transcurridos desde el 1 de enero de 1970. Es un número único en la práctica porque dos mascotas no se registran exactamente en el mismo milisegundo. En producción se usaría un UUID o un ID generado por el servidor.

### ¿Qué hace `SafeAreaView`?
Asegura que el contenido se muestre dentro del área visible del teléfono, respetando el notch, la barra de estado, la barra de inicio y las esquinas redondeadas del dispositivo.

### ¿Por qué `KeyboardAvoidingView` en el formulario?
En iOS el teclado virtual tapa los campos inferiores. `KeyboardAvoidingView` con `behavior="padding"` empuja el contenido hacia arriba cuando el teclado aparece, permitiendo al usuario ver el campo que está editando.

---

## 11. Posibles preguntas del evaluador y respuestas sugeridas

**P: ¿Qué pasaría si cierras la app y la vuelves a abrir?**
R: Se pierden las mascotas registradas porque el estado vive en memoria (Context + useState). Para persistir los datos habría que usar `AsyncStorage` de React Native o una base de datos local como SQLite.

**P: ¿Cómo escalarías este proyecto?**
R: Agregaría persistencia con `AsyncStorage`, un servidor backend con API REST, autenticación de usuarios, y reemplazaría el Context por Zustand o Redux Toolkit si el estado global creciera mucho.

**P: ¿Por qué separaste los estilos en archivos distintos?**
R: Para mantener el principio de responsabilidad única: cada archivo de estilos es responsable solo de los estilos de su pantalla correspondiente. Esto facilita el mantenimiento y la lectura del código.

**P: ¿Qué es `Animated.sequence`?**
R: Es una función de la API `Animated` de React Native que ejecuta varias animaciones en orden, una tras otra. En `PetListScreen` se usa para que el título aparezca primero y luego la lista de mascotas.

**P: ¿Qué diferencia hay entre `navigation.navigate` y `navigation.goBack`?**
R: `navigate` lleva a una pantalla concreta (puede ser nueva o ya existente en el stack). `goBack` simplemente retrocede al elemento anterior del stack de navegación, igual que el botón "atrás" del dispositivo.
