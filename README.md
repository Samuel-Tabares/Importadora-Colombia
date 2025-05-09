# Importa Colombia

![Banner](https://i.imgur.com/sJHRsyA.png)

Aplicación web para mostrar y evaluar productos importados de China a Colombia. Los usuarios pueden explorar productos, dar likes/dislikes y escribir reseñas con calificaciones de estrellas.

## ✨ Características

- Catálogo de productos importados con imágenes y fichas técnicas
- Sistema de likes/dislikes para medir popularidad de productos
- Sistema de reseñas con calificaciones de 1-5 estrellas
- Segmentación geográfica de usuarios por ciudad e IP
- Interfaz responsiva y moderna con Bootstrap 5
- Backend API REST desarrollado con Django
- Frontend interactivo con React

## 🖼️ Capturas de Pantalla

<table>
  <tr>
    <td><img src="https://i.imgur.com/JZTXJhO.png" alt="Página de inicio" width="400"/></td>
    <td><img src="https://i.imgur.com/BkFZK5N.png" alt="Detalle de producto" width="400"/></td>
  </tr>
</table>

## 🛠️ Tecnologías Utilizadas

### Backend
- Python 3.8+
- Django 5.2
- Django REST Framework
- SQLite (desarrollo)

### Frontend
- React 19
- Bootstrap 5
- Bootstrap Icons
- React Router
- Axios

## 📋 Requisitos Previos

- Python 3.8+
- Node.js 14+
- npm 6+
- Git

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Samuel-Tabares/Importadora-Colombia.git
cd Importadora-Colombia
```

### 2. Configurar el Backend (Django)

```bash
# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
cd backend
pip install django djangorestframework django-cors-headers

# Aplicar migraciones
python manage.py migrate

# Cargar datos de ejemplo (opcional)
python manage.py load_sample_data

# Cargar datos de prueba para likes y reseñas (opcional)
python manage.py load_likes_dislikes

# Iniciar el servidor Django
python manage.py runserver
```

### 3. Configurar el Frontend (React)

```bash
# En otra terminal, navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar la aplicación React
npm start
```

## 🌐 Uso

1. Abre tu navegador y ve a: `http://localhost:3000`
2. Explora los productos disponibles
3. Haz clic en "Ver detalle" para ver información detallada del producto
4. Dale like o dislike a los productos
5. Escribe reseñas con tu nombre, ciudad y calificación

## 🔗 Endpoints de la API

### Productos
- `GET /api/productos/` - Obtener todos los productos
- `GET /api/productos/:id/` - Obtener un producto específico

### Categorías
- `GET /api/categorias/` - Obtener todas las categorías

### Reseñas
- `GET /api/resenas/por_producto/?producto_id=:id` - Obtener reseñas de un producto
- `POST /api/resenas/` - Agregar una reseña a un producto

### Likes
- `GET /api/likes/conteo/?producto_id=:id` - Obtener conteo de likes/dislikes
- `POST /api/likes/` - Registrar un like/dislike para un producto

## 👥 Contribución

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`)
4. Sube los cambios a tu fork (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Samuel Tabares** - [Samuel-Tabares](https://github.com/Samuel-Tabares)

## 🙏 Agradecimientos

- [Claude de Anthropic](https://claude.ai) por la asistencia en desarrollo, scripts personalizados, solución de errores y mejoras de UI
- [Pexels](https://www.pexels.com/) por las imágenes de muestra
- [Bootstrap](https://getbootstrap.com/) por el framework CSS
- [FontAwesome](https://fontawesome.com/) por los iconos