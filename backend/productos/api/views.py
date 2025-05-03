from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from productos.models import *
from .serializers import *
import re

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def create(self, request, *args, **kwargs):
        # Para usuarios anónimos, podemos simplemente crear uno con el nombre proporcionado
        data = {
            'nombre': request.data.get('nombre', 'Usuario Anónimo'),
            'email': f"anonimo_{request.data.get('nombre', 'user')}_{request.data.get('ip_usuario', '0')}@importacolombia.com"
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ResenaViewSet(viewsets.ModelViewSet):
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer
    
    def create(self, request, *args, **kwargs):
        # Obtener o crear usuario anónimo
        nombre = request.data.get('nombre', 'Usuario Anónimo')
        ip = request.META.get('REMOTE_ADDR', '0.0.0.0')
        
        # Generar un correo único para el usuario anónimo
        email = f"anonimo_{nombre.replace(' ', '_')}_{ip.replace('.', '_')}@importacolombia.com"
        
        usuario, created = Usuario.objects.get_or_create(
            email=email,
            defaults={'nombre': nombre}
        )
        
        # Crear la reseña
        data = {
            'id_producto': request.data.get('id_producto'),
            'id_usuario': usuario.id_usuario,
            'comentario': request.data.get('comentario'),
            'calificacion': request.data.get('calificacion'),
            'ciudad': request.data.get('ciudad'),
            'ip_usuario': ip
        }
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'])
    def por_producto(self, request):
        producto_id = request.query_params.get('producto_id')
        if producto_id:
            resenas = Resena.objects.filter(id_producto=producto_id)
            serializer = self.get_serializer(resenas, many=True)
            return Response(serializer.data)
        return Response({"error": "Se requiere el ID del producto"}, status=status.HTTP_400_BAD_REQUEST)

class CalificacionViewSet(viewsets.ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer
    
    @action(detail=False, methods=['get'])
    def por_producto(self, request):
        producto_id = request.query_params.get('producto_id')
        if producto_id:
            calificaciones = Calificacion.objects.filter(id_producto=producto_id)
            serializer = self.get_serializer(calificaciones, many=True)
            return Response(serializer.data)
        return Response({"error": "Se requiere el ID del producto"}, status=status.HTTP_400_BAD_REQUEST)

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    
    def create(self, request, *args, **kwargs):
        # Obtener o crear usuario anónimo
        nombre = request.data.get('nombre', 'Usuario Anónimo')
        ip = request.META.get('REMOTE_ADDR', '0.0.0.0')
        email = f"anonimo_{nombre.replace(' ', '_')}_{ip.replace('.', '_')}@importacolombia.com"
        
        usuario, created = Usuario.objects.get_or_create(
            email=email,
            defaults={'nombre': nombre}
        )
        
        # Buscar si ya existe un like para este usuario y producto
        producto_id = request.data.get('id_producto')
        try:
            like = Like.objects.get(id_producto=producto_id, id_usuario=usuario.id_usuario)
            # Actualizar el tipo de like
            like.tipo = request.data.get('tipo', 'neutral')
            like.save()
            serializer = self.get_serializer(like)
            return Response(serializer.data)
        except Like.DoesNotExist:
            # Crear nuevo like
            data = {
                'id_producto': producto_id,
                'id_usuario': usuario.id_usuario,
                'tipo': request.data.get('tipo', 'neutral')
            }
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'])
    def por_producto(self, request):
        producto_id = request.query_params.get('producto_id')
        if producto_id:
            likes = Like.objects.filter(id_producto=producto_id)
            serializer = self.get_serializer(likes, many=True)
            return Response(serializer.data)
        return Response({"error": "Se requiere el ID del producto"}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def conteo(self, request):
        producto_id = request.query_params.get('producto_id')
        if producto_id:
            likes_count = Like.objects.filter(id_producto=producto_id, tipo='like').count()
            dislikes_count = Like.objects.filter(id_producto=producto_id, tipo='dislike').count()
            return Response({
                'likes': likes_count,
                'dislikes': dislikes_count
            })
        return Response({"error": "Se requiere el ID del producto"}, status=status.HTTP_400_BAD_REQUEST)