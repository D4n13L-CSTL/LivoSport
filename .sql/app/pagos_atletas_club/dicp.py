a   = [
    {
        "email": "deikerd@example.com",
        "estado": "pendiente",
        "fecha_pago": "Thu, 01 May 2025 00:00:00 GMT",
        "id": 21,
        "monto": "20.00",
        "nombres": "Juan"
    },
    {
        "email": "deikerd@example.com",
        "estado": "pendiente",
        "fecha_pago": "Thu, 01 May 2025 00:00:00 GMT",
        "id": 21,
        "monto": "20.00",
        "nombres": "Juan"
    },
    {
        "email": "deikerd@example.com",
        "estado": "pendiente",
        "fecha_pago": "Thu, 01 May 2025 00:00:00 GMT",
        "id": 21,
        "monto": "20.00",
        "nombres": "Juan"
    },
    {
        "email": "deikerd@example.com",
        "estado": "pendiente",
        "fecha_pago": "Thu, 01 May 2025 00:00:00 GMT",
        "id": 21,
        "monto": "20.00",
        "nombres": "Juan"
    },
    {
        "email": "deikerd@example.com",
        "estado": "pendiente",
        "fecha_pago": "Thu, 01 May 2025 00:00:00 GMT",
        "id": 20,
        "monto": "20.00",
        "nombres": "Juan"
    }
]


filtro = 21

for i in a:
    if filtro == i.get('id'):
        print(i)