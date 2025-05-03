from django.core.management.base import BaseCommand
from productos.models import Categoria, Producto
from django.utils import timezone
import random

class Command(BaseCommand):
    help = 'Carga datos de ejemplo en la base de datos'

    def handle(self, *args, **options):
        # Crear categorías
        categorias = [
            {
                'nombre': 'Electrónicos',
                'descripcion': 'Productos electrónicos de última generación',
                'imagen_representativa': 'https://via.placeholder.com/300x200.png?text=Electrónicos'
            },
            {
                'nombre': 'Hogar',
                'descripcion': 'Artículos para el hogar de calidad premium',
                'imagen_representativa': 'https://via.placeholder.com/300x200.png?text=Hogar'
            },
            {
                'nombre': 'Moda',
                'descripcion': 'Moda importada de las mejores marcas',
                'imagen_representativa': 'https://via.placeholder.com/300x200.png?text=Moda'
            }
        ]

        for cat_data in categorias:
            Categoria.objects.get_or_create(
                nombre=cat_data['nombre'],
                defaults={
                    'descripcion': cat_data['descripcion'],
                    'imagen_representativa': cat_data['imagen_representativa']
                }
            )
        
        self.stdout.write(self.style.SUCCESS('Categorías creadas correctamente'))

        # Crear productos
        categoria_electronica = Categoria.objects.get(nombre='Electrónicos')
        categoria_hogar = Categoria.objects.get(nombre='Hogar')
        categoria_moda = Categoria.objects.get(nombre='Moda')

        productos = [
            {
                'nombre': 'Smartphone Premium X23',
                'descripcion': 'El último modelo de smartphone con cámara de alta resolución, procesador rápido y batería de larga duración.',
                'imagen_url': 'https://via.placeholder.com/600x400.png?text=Smartphone',
                'fecha_importacion': timezone.now().date(),
                'ficha_tecnica': 'Pantalla: 6.7 pulgadas AMOLED\nProcesador: Octa-core 2.8GHz\nRAM: 12GB\nAlmacenamiento: 256GB\nCámara principal: 108MP\nBatería: 5000mAh',
                'id_categoria': categoria_electronica
            },
            {
                'nombre': 'Licuadora Pro Max',
                'descripcion': 'Licuadora de alta potencia para todo tipo de preparaciones. Ideal para batidos, sopas y salsas.',
                'imagen_url': 'https://via.placeholder.com/600x400.png?text=Licuadora',
                'fecha_importacion': timezone.now().date(),
                'ficha_tecnica': 'Potencia: 1200W\nCapacidad: 1.5L\nVelocidades: 10\nFunciones adicionales: Pulso, Triturador de hielo\nMaterial: Acero inoxidable y vidrio templado',
                'id_categoria': categoria_hogar
            },
            {
                'nombre': 'Zapatos Deportivos Ultimate',
                'descripcion': 'Zapatos deportivos de alto rendimiento con tecnología de amortiguación avanzada y materiales transpirables.',
                'imagen_url': 'https://via.placeholder.com/600x400.png?text=Zapatos',
                'fecha_importacion': timezone.now().date(),
                'ficha_tecnica': 'Material exterior: Malla sintética\nSuela: Caucho de alta durabilidad\nAmortiguación: Tecnología AirMax\nPeso: 280g\nColores disponibles: Negro, Azul, Rojo',
                'id_categoria': categoria_moda
            },
            {
                'nombre': 'Smartwatch Health Pro',
                'descripcion': 'Reloj inteligente con monitoreo avanzado de salud, GPS integrado y resistencia al agua.',
                'imagen_url': 'https://via.placeholder.com/600x400.png?text=Smartwatch',
                'fecha_importacion': timezone.now().date(),
                'ficha_tecnica': 'Pantalla: 1.4 pulgadas AMOLED\nBatería: Hasta 14 días\nResistencia al agua: 5ATM\nGPS: Integrado\nSensores: Ritmo cardíaco, SpO2, acelerómetro, giroscopio\nCompatibilidad: Android e iOS',
                'id_categoria': categoria_electronica
            },
            {
                'nombre': 'Set de Ollas Premium',
                'descripcion': 'Juego de ollas de acero inoxidable de calidad profesional para cocina gourmet.',
                'imagen_url': 'https://via.placeholder.com/600x400.png?text=Ollas',
                'fecha_importacion': timezone.now().date(),
                'ficha_tecnica': 'Material: Acero inoxidable 18/10\nPiezas: 8 (2 ollas, 2 sartenes, 4 tapas)\nCompatible con inducción: Sí\nApto para lavavajillas: Sí\nMangos ergonómicos resistentes al calor',
                'id_categoria': categoria_hogar
            },
            {
                'nombre': 'Chaqueta Impermeable Mountain',
                'descripcion': 'Chaqueta técnica impermeable y transpirable para actividades al aire libre en cualquier clima.',
                'imagen_url': 'https://via.placeholder.com/600x400.png?text=Chaqueta',
                'fecha_importacion': timezone.now().date(),
                'ficha_tecnica': 'Material: Poliéster reciclado con membrana impermeable\nImpermeabilidad: 20,000mm\nTranspirabilidad: 15,000g/m²/24h\nCapucha: Ajustable y desmontable\nBolsillos: 4 con cremallera\nPeso: 480g',
                'id_categoria': categoria_moda
            }
        ]

        for prod_data in productos:
            Producto.objects.get_or_create(
                nombre=prod_data['nombre'],
                defaults={
                    'descripcion': prod_data['descripcion'],
                    'imagen_url': prod_data['imagen_url'],
                    'fecha_importacion': prod_data['fecha_importacion'],
                    'ficha_tecnica': prod_data['ficha_tecnica'],
                    'id_categoria': prod_data['id_categoria']
                }
            )
        
        self.stdout.write(self.style.SUCCESS('Productos creados correctamente'))