from adaptadores import conexion_db

def probar_conexion():
    conn = conexion_db()
    if conn:
        print("Conexión exitosa a la base de datos.")
        conn.close()
    else:
        print(" No se pudo conectar a la base de datos.")

probar_conexion()

def a():
    c = conexion_db()
    cur = c.cursor()
    query = cur.execute('select * from info_depot_atleta')
    
    columns = [i[0] for i in cur.description]
    return columns


