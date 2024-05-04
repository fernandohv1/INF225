import unittest
import requests
import json
from datetime import datetime

class TestCitasPendientesEndpoint(unittest.TestCase):
    valid_citaspendientes_url_data = None
    invalid_citaspendientes_url_data = None
    valid_rut = None
    invalid_rut = None
    actual_date = None


    @classmethod
    def setUpClass(cls):
        cls.actual_date = datetime.now().strftime("%d-%m-%Y")
        cls.base_url = "http://localhost:5000/Citas"
        cls.headers = {"Content-Type": "application/json"}
        cls.valid_rut = "21.219.902-8"
        cls.invalid_rut = "21.219.902$8"
        cls.valid_citaspendientes_url_data = f"{cls.base_url}/{cls.valid_rut}/{cls.actual_date}"
        cls.invalid_citaspendientes_url_data = f"{cls.base_url}/{cls.invalid_rut}/{cls.actual_date}"

    @classmethod
    def tearDownClass(cls):
        del cls.valid_rut
        del cls.invalid_rut
        del cls.actual_date
        del cls.valid_citaspendientes_url_data
        del cls.invalid_citaspendientes_url_data

    def test_busqueda_citas_paciente_valida(self):
        # Testear el caso en el que se busque todas las citas pendientes para un rut válido, debiendo retornar los 
        # valores almacenados en la base de datos
        response = requests.get(self.valid_citaspendientes_url_data, headers=self.headers)

        # Verificar el resultado de la solicitud
        self.assertEqual(response.status_code, 200, "La solicitud no fue exitosa")

        try:
            data = response.json()
        except json.JSONDecodeError:
            self.fail("La respuesta no es un JSON válido")

        # Verificar la estructura de los datos recibidos
        self.assertIsInstance(data, list, "La respuesta no es una lista como se esperaba")
        if not data:
            self.fail("No se encontraron citas pendientes para este paciente")

        if len(data) != 1:
            self.fail("No se tienen los datos esperados")

        # Verificar cada cita en la lista de citas (en este caso el rut asociado solo debería tener 1 cita con los datos
        # almacenados en la base de datos)
        for cita in data:
            self.assertEqual(1, cita["idex"])
            self.assertEqual("Dolor en la pierna. Posible fractura de fémur.", cita["motivo"])
            self.assertEqual("2024-06-07T14:30:00.000Z", cita["fecha"])
            self.assertEqual(4, cita["equipo"])

    def test_busqueda_citas_paciente_invalida(self):
        # Testear el caso en el que se busque las citas pendientes para un rut inválido, debiendo retornar  
        # una lista vacía (dado que no existe dicho rut)

        response = requests.get(self.invalid_citaspendientes_url_data, headers=self.headers)

        try:
            data = response.json()
        except json.JSONDecodeError:
            self.fail("La respuesta no es un JSON válido")

        # Verificar la estructura de los datos recibidos
        self.assertIsInstance(data, list, "La respuesta no es una lista como se esperaba")

        # Revisar si efectivamente es una lista vacía
        self.assertEqual(data, [])

if __name__ == '__main__':
    unittest.main()