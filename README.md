# ⚛️ Tabla Periódica 3D Interactiva

Una visualización inmersiva y en 3D de los 118 elementos químicos de la tabla periódica. Este proyecto permite explorar los elementos a través de diferentes formaciones geométricas e incluye un buscador integrado y soporte para modo claro/oscuro.

🚀 **[Ver Demo en Vivo](https://michaelarc-ni.github.io/Periodic-table/)** 
## ✨ Características Principales

* **Visualizaciones Múltiples:** Transiciones fluidas entre 4 vistas diferentes:
  * 🔲 **Tabla:** La disposición periódica tradicional.
  * 🌐 **Esfera:** Todos los elementos orbitando en un globo tridimensional.
  * 🧬 **Hélice:** Formación en espiral continua.
  * 🗄️ **Rejilla:** Disposición en cuadrícula profunda.
* **Motor de Búsqueda:** Filtrado en tiempo real de elementos por símbolo o nombre.
* **Panel de Detalles:** Información interactiva al hacer clic en cualquier elemento (Masa atómica, categoría, etc.).
* **Temas Personalizables:** Soporte para modo oscuro (por defecto) y modo claro, con persistencia en `localStorage`.
* **Diseño Responsivo:** Interfaz adaptada tanto para navegadores de escritorio como para dispositivos móviles.

## 🛠️ Tecnologías Utilizadas

* **HTML5 & CSS3:** Estructura semántica, variables CSS y diseño Glassmorphism.
* **JavaScript (ES6+):** Lógica del DOM, gestión de estados y filtrado.
* **[Three.js](https://threejs.org/):** Renderizado tridimensional utilizando `CSS3DRenderer` para los elementos del DOM y WebGL para el fondo de partículas (estrellas).
* **[Tween.js](https://github.com/tweenjs/tween.js/):** Motor de interpolación para las transiciones suaves de cámara y elementos.

## 💻 Instalación y Uso Local

Este proyecto no requiere de un proceso de *build* complejo ni de Node.js. Para ejecutarlo en tu máquina:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/MichaelARC-NI/Periodic-table.git
