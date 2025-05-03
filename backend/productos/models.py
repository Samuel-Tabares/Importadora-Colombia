from django.db import models

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(null=True, blank=True)
    activo = models.BooleanField(default=True)
    imagen_representativa = models.CharField(max_length=255, null=True, blank=True)
    descripcion_imagen = models.CharField(max_length=200, null=True, blank=True)
    
    class Meta:
        db_table = 'categorias'
        
    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'usuarios'
        
    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    imagen_url = models.CharField(max_length=255, null=True, blank=True)
    fecha_importacion = models.DateField(null=True, blank=True)
    ficha_tecnica = models.TextField(null=True, blank=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, db_column='id_categoria')
    
    class Meta:
        db_table = 'productos'
        
    def __str__(self):
        return self.nombre

class ImagenProducto(models.Model):
    id_imagen = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='id_producto')
    url_imagen = models.CharField(max_length=255)
    es_imagen_principal = models.BooleanField(default=False)
    fecha_added = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'imagenes_producto'

class VideoProducto(models.Model):
    id_video = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='id_producto')
    url_video = models.CharField(max_length=255)
    titulo_video = models.CharField(max_length=100, null=True, blank=True)
    descripcion_video = models.TextField(null=True, blank=True)
    es_video_principal = models.BooleanField(default=False)
    fecha_added = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'videos_producto'

class Calificacion(models.Model):
    id_calificacion = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='id_producto')
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    estrellas = models.IntegerField()
    comentario = models.TextField(null=True, blank=True)
    fecha_calificacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'calificaciones'

class Resena(models.Model):
    id_resena = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='id_producto')
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    comentario = models.TextField(null=True, blank=True)
    calificacion = models.IntegerField(null=True, blank=True)
    fecha_resena = models.DateTimeField(auto_now_add=True)
    ciudad = models.CharField(max_length=100, null=True, blank=True)
    ip_usuario = models.CharField(max_length=15, null=True, blank=True)
    
    class Meta:
        db_table = 'resenas'

class Like(models.Model):
    id_like = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, db_column='id_producto')
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    fecha_like = models.DateTimeField(auto_now_add=True)
    tipo = models.CharField(max_length=10, choices=[
        ('like', 'Like'),
        ('dislike', 'Dislike'),
        ('neutral', 'Neutral')
    ], default='neutral')
    
    class Meta:
        db_table = 'likes'
        unique_together = ('id_producto', 'id_usuario')