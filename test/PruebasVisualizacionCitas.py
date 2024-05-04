import unittest
import requests
import json
from datetime import datetime

class TestVisualizarCitasEndpoint(unittest.TestCase):
    valid_citasdia_url_data = None
    invalid_citasdia_url_data = None
    valid_date_to_search = None
    invalid_date_to_search = None
    expected_valid_response = None
    
    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:5000/Citas"
        cls.headers = {"Content-Type": "application/json"}
        cls.valid_date_to_search = datetime.strptime("07-06-2024", "%d-%m-%Y").date()
        cls.invalid_date_to_search = datetime.strptime("07-04-2024", "%d-%m-%Y").date()
        cls.valid_citasdia_url_data = f"{cls.base_url}/{cls.valid_date_to_search}"
        cls.invalid_citasdia_url_data = f"{cls.base_url}/{cls.invalid_date_to_search}"
        cls.expected_valid_response = [{
            "rutp": "21.219.902-8",
            "idmedico": "5",
            "idex": 1,
            "motivo": "Dolor en la pierna. Posible fractura de fémur.",
            "fecha": "2024-06-07T14:30:00.000Z",
            "equipo": 4,
            "rutm": "400"
        }, {
            "rutp": "20.567.889-2",
            "idmedico": "6",
            "idex": 3,
            "motivo": "Posible tumor en el páncreas. Evaluar con urgencia.",
            "fecha": "2024-06-07T11:30:00.000Z",
            "equipo": 2,
            "rutm": "400"
        }
        ]

    @classmethod
    def tearDownClass(cls):
        del cls.valid_date_to_search
        del cls.invalid_date_to_search
        del cls.valid_citasdia_url_data
        del cls.invalid_citasdia_url_data
        del cls.expected_valid_response

    def test_visualizar_citas_dia_validas(self):
        # Testear el caso en el que se busque todas las citas pendientes en un mismo día.
        # Para un día válido se deben mostrar todas las citas asociadas.
        response = requests.get(self.valid_citasdia_url_data, headers=self.headers)
        data = response.json()

        
        # Verificar cada cita en la lista de citas (en este caso la fecha asociada debería tener 2 citas cuyos campos coincidan
        # con los ingresados, siguiendo el mismo orden en que fueron ingresados los registros)
        cont = 0

        if len(data) != len(self.expected_valid_response):
            self.fail("No se tienen los mismos datos")

        for cita in data:
            self.assertEqual(self.expected_valid_response[cont]["rutp"], cita["rutp"])
            self.assertEqual(self.expected_valid_response[cont]["idmedico"], cita["idmedico"])
            self.assertEqual(self.expected_valid_response[cont]["idex"], cita["idex"])
            self.assertEqual(self.expected_valid_response[cont]["motivo"], cita["motivo"])
            self.assertEqual(self.expected_valid_response[cont]["fecha"], cita["fecha"])
            self.assertEqual(self.expected_valid_response[cont]["equipo"], cita["equipo"])
            self.assertEqual(self.expected_valid_response[cont]["rutm"], cita["rutm"])
            cont += 1

    def test_visualizar_citas_dia_error(self):
        # Testear el caso en el que se busque las citas pendientes para una fecha inadecuada al contexto, debiendo retornar  
        # una lista vacía
        response = requests.get(self.invalid_citasdia_url_data, headers=self.headers)

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
