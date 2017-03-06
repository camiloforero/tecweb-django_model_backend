from django.db import models
from django.conf import settings

from django.utils.translation import ugettext_lazy as _


class Administrador(models.Model):
    """
    Put documentation here
    """
    nombre_empresa = models.CharField(max_length=(32),32, )
    email = models.CharField(unique=True, max_length=(32),32, )
    contraseña = models.CharField(max_length=(32),32, )


class Proyecto(models.Model):
    """
    Put documentation here
    """
    nombre = models.UNDEFINED()
    descripción = models.UNDEFINED()
    valor_estimado = models.UNDEFINED()


class Diseño(models.Model):
    """
    Put documentation here
    """
    fecha_creacion = models.UNDEFINED()
    estado = models.UNDEFINED()
    precio_solicitado = models.UNDEFINED()
    archivo_original = models.UNDEFINED()
    archivo_procesado = models.UNDEFINED()


class Diseñador(models.Model):
    """
    Put documentation here
    """
    nombres = models.UNDEFINED()
    apellidos = models.UNDEFINED()
    email = models.UNDEFINED()


