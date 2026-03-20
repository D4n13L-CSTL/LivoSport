
import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DBNAME = os.getenv("DBNAME")
DB_URL = os.getenv('DATABASE_URL')
DEBUG = os.getenv('DEBUG')


""" 
def conexion_db():
    connection = psycopg2.connect(
            user=os.getenv("user"),
            password=os.getenv("password"),
            host=os.getenv("host"),
            port=os.getenv("port"),
            dbname=os.getenv("dbname"))
    return connection


"""
def conexion_db():
    connection = psycopg2.connect(
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT,
            dbname=DBNAME)
    return connection

def conexion_dbp():
    try:
        connection = psycopg2.connect(DB_URL.strip(), gssencmode="disable")
        return connection
    except Exception as e:
        print(f"Error: {e}")


def conexion():
    if DEBUG == "True":
      
        return conexion_db()
    else:
        return conexion_dbp()


#////////////////////////////////////
