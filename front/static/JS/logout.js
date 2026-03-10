
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST', // O 'GET', dependiendo de cómo lo definieras en Flask
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (response.ok) {
            // Si el logout fue exitoso, redirigimos al usuario
            window.location.href = result.redirect_url;; 
        } else {
            alert("Error al cerrar sesión");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
});