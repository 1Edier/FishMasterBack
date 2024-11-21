import requests
import mysql.connector
import numpy as np
from dotenv import load_dotenv
import os
import decimal

# Cargar las variables de entorno
load_dotenv()

# Función que se conecta a la base de datos y obtiene las especies
def obtener_datos_especies():
    host = os.getenv('DB_HOST')
    user = os.getenv('DB_USER')
    password = os.getenv('DB_PASSWORD')
    database = os.getenv('DB')

    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM especies")
    especies = cursor.fetchall()
    cursor.close()
    connection.close()
    return especies

# Funciones para calcular la frecuencia de alimentación
def calcular_frecuencia_alimentacion(edad, tamaño, peso):
    edad = float(edad) if isinstance(edad, decimal.Decimal) else edad
    tamaño = float(tamaño) if isinstance(tamaño, decimal.Decimal) else tamaño
    peso = float(peso) if isinstance(peso, decimal.Decimal) else peso

    coef_edad = 0.1
    coef_tamano = 0.2
    coef_peso = 0.3

    frecuencia = coef_edad * edad + coef_tamano * tamaño + coef_peso * peso
    return max(frecuencia, 0)


