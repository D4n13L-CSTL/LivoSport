async function cargarEstadisticas() {
    try {
        // 1. Realizar la petición a tu API
        const response = await fetch('/api/v1/atletas/obtener_atletas'); // Reemplaza con tu URL real
        if (!response.ok) throw new Error("Error en la petición");
        
        const atletas = await response.json();

        // --- LÓGICA DE CONTEO ---
        
        let total = atletas.length;
        let mujeres = 0;
        let hombres = 0;
        
        // Objeto para agrupar posiciones
        const posiciones = {
            armador: 0,
            opuesto: 0,
            central: 0,
            libero: 0,
            atacante: 0
        };

        atletas.forEach(atleta => {
            // Normalizar Género (tu JSON trae "Masculino" y "female")
            const gen = atleta.genero ? atleta.genero.toLowerCase() : "";
            if (gen === 'femenino' || gen === 'female') mujeres++;
            if (gen === 'masculino' || gen === 'male') hombres++;

            // Normalizar y contar Posiciones
            const pos = atleta.posicion ? atleta.posicion.toLowerCase() : "";
            if (pos.includes("armador")) posiciones.armador++;
            else if (pos.includes("opuesto")) posiciones.opuesto++;
            else if (pos.includes("central")) posiciones.central++;
            else if (pos.includes("libero")) posiciones.libero++;
            else if (pos.includes("atacante")) posiciones.atacante++;
        });

        // --- INYECCIÓN EN EL DOM ---

        // Tarjetas superiores
        actualizarTexto('totalAtletas', total);
        actualizarTexto('atletasMujeres', mujeres);
        actualizarTexto('atletasHombres', hombres);
        // Supongamos que "Pagos" son todos los registrados por ahora
        actualizarTexto('atletasPagos', total); 

        // Lista de posiciones (IDs deben coincidir con tu HTML)
        actualizarTexto('count-armador', posiciones.armador);
        actualizarTexto('count-opuesto', posiciones.opuesto);
        actualizarTexto('count-central', posiciones.central);
        actualizarTexto('count-libero', posiciones.libero);
        actualizarTexto('count-atacante', posiciones.atacante);

        console.log("Panel de control actualizado correctamente");

    } catch (error) {
        console.error("Hubo un fallo al cargar los datos:", error);
    }
}

// Función auxiliar para evitar errores si el ID no existe en el HTML
function actualizarTexto(id, valor) {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarEstadisticas);