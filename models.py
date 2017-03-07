from django.db import models
from django.conf import settings

from django.utils.translation import ugettext_lazy as _


class Administrador(models.Model):
    """
    Put documentation here
    """
    nombre_empresa = models.CharField(max_length=(32), )
    email = models.CharField(unique=True, max_length=(32), )
    contraseña = models.CharField(default="asd", max_length=(32), )


class Proyecto(models.Model):
    """
    Put documentation here
    """
    nombre = models.CharField(max_length=(32), )
    descripción = models.TextField()
    valor_estimado = models.UNDEFINED()


class Diseño(models.Model):
    """
    Put documentation here
    """
    fecha_creacion = models.DateField(help_text="La fecha en la cual se creó el diseño", )
    estado = models.CharField(max_length=(2), )
    precio_solicitado = models.UNDEFINED()
    archivo_original = models.FileField()
    archivo_procesado = models.FileField()


class Diseñador(models.Model):
    """
    Put documentation here
    """
    nombres = models.CharField(max_length=(64), )
    apellidos = models.CharField(max_length=(64), )
    email = models.EmailField()


