CREATE OR REPLACE FUNCTION obtener_formulario(
    p_id_club INT,
    p_id_formulario INT
)
RETURNS JSON AS $$
DECLARE
    resultado JSON;
BEGIN
    SELECT formulario
    INTO resultado
    FROM formulario_registro_atleta
    WHERE id_club = p_id_club AND id = p_id_formulario;

    RETURN resultado;
END;
$$ LANGUAGE plpgsql;
