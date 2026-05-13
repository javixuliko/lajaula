**LaJaula** es una plataforma web de venta de entradas para **eventos de MMA**, inspirada en Ticketmaster pero enfocada exclusivamente en artes marciales mixtas: veladas, combates, galas y torneos.

---

## 🧩 Tecnologías Utilizadas

- **Frontend:** HTML5 + CSS3 + JavaScript (Vanilla)
- **Backend:** PHP (arquitectura MVC)
- **Base de datos:** MySQL (gestionada con WAMP)
- **Servidor local:** WAMP64
- **Comunicación asíncrona:** Fetch API con Promises (`promises.js`)
- **Acceso a base de datos:** PDO (PHP Data Objects)
- **Mapas:** Leaflet.js (integrado en Shop y Details)
- **Patrón:** MVC modular con módulos independientes por sección

---

## 🗂️ Estructura del Proyecto

```text
lajaulav12/
├── DB/                        # Scripts y configuración de base de datos
│   └── DB.sql
├── model/
│   └── connect.php
├── module/                    # Módulos por sección
│   ├── home/
│   │   ├── ctrl/
│   │   │   └── ctrl_home.php
│   │   ├── model/
│   │   │   ├── ctrl_home.js
│   │   │   └── DAO_home.php
│   │   └── view/
│   │       └── home.html
│   ├── shop/
│   │   ├── ctrl/
│   │   │   └── ctrl_shop.php
│   │   ├── model/
│   │   │   ├── ctrl_shop.js
│   │   │   └── DAO_shop.php
│   │   └── view/
│   │       └── shop.html
│   └── search/
│       ├── ctrl/
│       │   └── ctrl_search.php
│       ├── model/
│       │   ├── ctrl_search.js
│       │   └── DAO_search.php
│       └── view/
│           └── search.html
├── view/                      # Vistas y recursos globales
│   ├── css/                   # Hojas de estilo
│   ├── img/                   # Imágenes (eventos, banners, etc.)
│   ├── js/
│   │   └── promises.js        # Lógica de fetch y promesas
│   └── inc/                   # Componentes reutilizables
│       ├── header.html
│       ├── footer.html
│       ├── menu.html
│       ├── top_page.html
│       ├── top_page_home.html
│       ├── top_page_shop.html
│       ├── bottom_page.html
│       ├── pages.php
│       ├── error404.php
│       └── error503.php
└── index.php                  # Punto de entrada principal
```

---

## 🏠 Home

<img width="1895" height="860" alt="inicio" src="https://github.com/user-attachments/assets/d7f09063-e088-41c9-ac0d-633abb42538e" />

- Listado de próximos eventos de MMA destacados
- Banners con imágenes de los combates
- Navegación directa a la tienda de entradas
- 
<img width="1895" height="860" alt="inicio" src="https://github.com/user-attachments/assets/5dbe1a2b-b158-4662-9d5d-92f89d56754a" />

---

## 🛒 Shop (Tienda de Entradas)

<img width="1892" height="860" alt="shop" src="https://github.com/user-attachments/assets/df25b32b-6288-4b16-9f5a-0c7f85e30ac7" />

- Catálogo completo de eventos disponibles
- **Filtros dinámicos alimentados desde base de datos** (categoría, fecha, ubicación, etc.)
- **Paginación** para navegar entre resultados
- **Sistema de popularidad** que ordena y destaca los eventos con más demanda
- Mapa interactivo con **Leaflet.js** para visualizar la ubicación de los eventos

<img width="1197" height="762" alt="mapa" src="https://github.com/user-attachments/assets/fa7f4726-6894-43db-bbab-fad3901428cf" />
  
- Navegación al detalle de cada evento

  

---

## 🔍 Search (Búsqueda)

- Búsqueda dinámica de eventos por nombre, fecha o categoría
- Resultados en tiempo real mediante Fetch API y Promises

---

## 📄 Details (Detalle de Evento)

- Vista completa de cada evento con toda la información relevante
- Mapa interactivo con **Leaflet.js** mostrando la ubicación exacta del recinto
- Proceso de compra de entradas

---

## 🔄 Arquitectura MVC

El proyecto sigue el patrón **Modelo–Vista–Controlador** de forma modular:

- **Model (DAO):** Acceso a base de datos mediante PHP con **PDO (PHP Data Objects)**. Cada módulo tiene su propio `DAO_[modulo].php`. La conexión se centraliza en `model/connect.php`.
- **Controller:** Lógica de negocio dividida en dos capas:
  - `ctrl_[modulo].php` — Controlador PHP (servidor)
  - `ctrl_[modulo].js` — Controlador JS (cliente), gestiona las llamadas asíncronas
- **View:** Vistas en HTML puro. Los componentes comunes (header, footer, menú) se reutilizan desde `view/inc/`.

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- WAMP64 instalado y en ejecución
- PHP 7.x o superior
- MySQL

### Pasos

1. Clona o copia el proyecto en la carpeta `www` de WAMP:

```
C:\wamp64\www\lajaulav12\
```

2. Importa la base de datos desde la carpeta `DB/` usando phpMyAdmin o MySQL CLI.

3. Accede al proyecto desde el navegador:

```
http://localhost/lajaulav12/
```

---

## 📦 Componentes Reutilizables (`view/inc/`)

| Archivo              | Descripción                                  |
|----------------------|----------------------------------------------|
| `header.html`        | Cabecera global de la web                    |
| `footer.html`        | Pie de página                                |
| `menu.html`          | Barra de navegación                          |
| `top_page.html`      | Parte superior genérica de página            |
| `top_page_home.html` | Parte superior específica de la home         |
| `top_page_shop.html` | Parte superior específica de la shop         |
| `bottom_page.html`   | Parte inferior de página                     |
| `pages.php`          | Enrutador de páginas                         |
| `error404.php`       | Página de error 404                          |
| `error503.php`       | Página de error 503                          |

---

## 📜 Licencia

Este proyecto es de uso académico.
