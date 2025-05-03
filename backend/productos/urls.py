from django.urls import path, include
from rest_framework.routers import DefaultRouter
from productos.api.views import *

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'resenas', ResenaViewSet)
router.register(r'calificaciones', CalificacionViewSet)
router.register(r'likes', LikeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]