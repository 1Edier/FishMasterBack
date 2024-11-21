from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa la extensión
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()
app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

# Función para calcular frecuencia de alimentación
def calcular_frecuencia_alimentacion(edad, tamaño, peso):
    coef_edad = 0.1
    coef_tamaño = 0.2
    coef_peso = 0.3
    frecuencia = coef_edad * float(edad) + coef_tamaño * float(tamaño) + coef_peso * float(peso)
    # Escalamos las horas para que tengan un rango más amplio
    horas = max(24 / (frecuencia + 1), 1)  # +1 para evitar valores extremos
    return horas


@app.route('/calcular_recomendaciones', methods=['POST'])
def calcular_recomendaciones():
    data = request.json

    # Validación de datos de entrada
    if not all(key in data for key in ("edad", "tamaño", "peso")):
        return jsonify({"error": "Faltan datos para el cálculo"}), 400

    try:
        # Calcular las recomendaciones
        frecuencia_alimentacion_horas = calcular_frecuencia_alimentacion(
            data["edad"], data["tamaño"], data["peso"]
        )
        cantidad_alimento_gramos = round(frecuencia_alimentacion_horas * 10, 2)  # Ejemplo: proporcional a las horas

        recommendations = {
            "frecuencia_alimentacion": round(frecuencia_alimentacion_horas, 2),  # En horas
            "cantidad_alimento": cantidad_alimento_gramos,  # En gramos
            "temperatura": 22.0,  # Constante o fórmula
            "ph": 7.5  # Constante o fórmula
        }

        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ejecuta el servidor Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
