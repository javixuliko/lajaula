# 🥊 LaJaula

**LaJaula** es una plataforma web de venta de entradas para **eventos de MMA**, inspirada en Ticketmaster pero enfocada exclusivamente en artes marciales mixtas: veladas, combates, galas y torneos.

---

## 🧩 Tecnologías Utilizadas

- **Frontend:** HTML5 + CSS3 + JavaScript (Vanilla)
- **Backend:** PHP (arquitectura MVC)
- **Base de datos:** MySQL (gestionada con WAMP)
- **Servidor local:** WAMP64
- **Comunicación asíncrona:** Fetch API con Promises (`promises.js`)
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

- Listado de próximos eventos de MMA destacados
- Banners con imágenes de los combates
- Navegación directa a la tienda de entradas

---

## 🛒 Shop (Tienda de Entradas)

- Catálogo completo de eventos disponibles
- Filtrado y búsqueda de eventos
- Visualización de detalles por evento
- Flujo de compra de entradas

---

## 🔍 Search (Búsqueda)

- Búsqueda dinámica de eventos por nombre, fecha o categoría
- Resultados en tiempo real mediante Fetch API y Promises

---

## 🔄 Arquitectura MVC

El proyecto sigue el patrón **Modelo–Vista–Controlador** de forma modular:

- **Model (DAO):** Acceso a base de datos mediante PHP. Cada módulo tiene su propio `DAO_[modulo].php`.
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

| Archivo             | Descripción                                      |
|---------------------|--------------------------------------------------|
| `header.html`       | Cabecera global de la web                        |
| `footer.html`       | Pie de página                                    |
| `menu.html`         | Barra de navegación                              |
| `top_page.html`     | Parte superior genérica de página                |
| `top_page_home.html`| Parte superior específica de la home             |
| `top_page_shop.html`| Parte superior específica de la shop             |
| `bottom_page.html`  | Parte inferior de página                         |
| `pages.php`         | Enrutador de páginas                             |
| `error404.php`      | Página de error 404                              |
| `error503.php`      | Página de error 503                              |

---

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
