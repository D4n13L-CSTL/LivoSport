const loginForm = document.getElementById('loginForm');
const messageContainer = document.getElementById('messageContainer');

function showMessage(text, isError = true) {
    messageContainer.textContent = text;
    messageContainer.style.display = 'block';
    messageContainer.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
    messageContainer.style.color = isError ? '#721c24' : '#155724';
    messageContainer.style.border = `1px solid ${isError ? '#f5c6cb' : '#c3e6cb'}`;
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log(result);
        
        if (response.ok && result.success) {
            
            window.location.href = result.redirect_url; 
        } else {
            showMessage(result.Error || "Credenciales incorrectas");
        }
    } catch (error) {
        showMessage("No se pudo conectar con el servidor.");
        console.error('Error en la petición:', error);
    }
});

