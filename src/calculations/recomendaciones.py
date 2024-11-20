import mysql.connector
import numpy as np
from dotenv import load_dotenv
import os
import decimal

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Función que se conecta a la base de datos y obtiene las especies
def obtener_datos_especies():
    # Obtener los valores desde las variables de entorno
    host = os.getenv('DB_HOST')
    user = os.getenv('DB_USER')
    password = os.getenv('DB_PASSWORD')
    database = os.getenv('DB')

    # Conexión a la base de datos usando las variables de entorno
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    cursor = connection.cursor(dictionary=True)

    # Realizamos la consulta SQL para obtener las especies
    cursor.execute("SELECT * FROM especies")

    # Obtenemos todos los resultados
    especies = cursor.fetchall()

    # Cerramos la conexión
    cursor.close()
    connection.close()

    return especies

# Función que calcula la frecuencia de alimentación de un pez
def calcular_frecuencia_alimentacion(edad, tamaño, peso):
    # Convertir los valores a float si son tipo Decimal
    edad = float(edad) if isinstance(edad, decimal.Decimal) else edad
    tamaño = float(tamaño) if isinstance(tamaño, decimal.Decimal) else tamaño
    peso = float(peso) if isinstance(peso, decimal.Decimal) else peso

    # Suponiendo que la frecuencia de alimentación aumenta con el tamaño y peso
    coef_edad = 0.1  # coeficiente que afecta la edad
    coef_tamano = 0.2  # coeficiente que afecta el tamaño
    coef_peso = 0.3  # coeficiente que afecta el peso

    # Definimos una fórmula simplificada para calcular la frecuencia de alimentación:
    # Frecuencia = coef_edad * edad + coef_tamano * tamaño + coef_peso * peso
    frecuencia = coef_edad * edad + coef_tamano * tamaño + coef_peso * peso

    # Aseguramos que la frecuencia de alimentación no sea negativa
    frecuencia = max(frecuencia, 0)

    return frecuencia
# Función que calcula la frecuencia de alimentación normalizada usando distribución normal
def calcular_frecuencia_normalizada(edad, tamaño, peso):
    media = calcular_frecuencia_alimentacion(edad, tamaño, peso)
    desviacion_estandar = 1  # Desviación estándar asumida

    # Usamos una distribución normal para generar la frecuencia de alimentación
    frecuencia_normalizada = np.random.normal(media, desviacion_estandar)
    frecuencia_normalizada = max(frecuencia_normalizada, 0)  # Evitar valores negativos
    return frecuencia_normalizada

# Obtenemos las especies desde la base de datos
especies = obtener_datos_especies()

# Calculamos la frecuencia de alimentación para cada especie
for especie in especies:
    edad = especie['edad_promedio']
    tamaño = especie['tamano']
    peso = especie['peso_promedio']

    # Calculando la frecuencia de alimentación usando el modelo
    frecuencia = calcular_frecuencia_alimentacion(edad, tamaño, peso)
    print(f"La frecuencia de alimentación de {especie['nombre_comun']} es: {frecuencia} veces por semana")

    # Calculando la frecuencia de alimentación con variabilidad (distribución normal)
    frecuencia_con_variabilidad = calcular_frecuencia_normalizada(edad, tamaño, peso)
    print(f"La frecuencia de alimentación normalizada de {especie['nombre_comun']} es: {frecuencia_con_variabilidad:.2f} veces por semana\n")
