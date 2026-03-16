document.addEventListener('DOMContentLoaded', function() {
    // Simular datos del dashboard
    loadDashboardData();
    
    // Manejar cierre de sesión
    
    
    // Notificaciones
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            showNotifications();
        });
    }
    
    // Funciones
    function loadDashboardData() {
        // En un sistema real, aquí se haría una petición al backend
        // para obtener los datos actualizados del dashboard
        
        // Simular carga de datos
        setTimeout(() => {
            console.log('Datos del dashboard cargados');
        }, 500);
    }
    
    function showNotifications() {
        const notifications = [
            { id: 1, text: '3 pagos pendientes de revisión', time: 'Hace 10 min', type: 'payment' },
            { id: 2, text: 'Nuevo atleta registrado', time: 'Hace 30 min', type: 'athlete' },
            { id: 3, text: 'Próximo juego en 2 días', time: 'Hace 1 hora', type: 'game' }
        ];
        
        // Crear modal de notificaciones
        const modal = document.createElement('div');
        modal.className = 'notifications-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Notificaciones</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    ${notifications.map(notif => `
                        <div class="notification-item ${notif.type}">
                            <div class="notification-text">
                                <p>${notif.text}</p>
                                <small>${notif.time}</small>
                            </div>
                            <i class="fas fa-circle"></i>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Estilos para el modal
        const style = document.createElement('style');
        style.textContent = `
            .notifications-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;
                z-index: 1000;
                padding-top: 80px;
                padding-right: 20px;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 10px;
                width: 350px;
                max-height: 400px;
                overflow-y: auto;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #334155;
            }
            
            .close-modal {
                font-size: 1.5rem;
                cursor: pointer;
                color: #94a3b8;
            }
            
            .modal-body {
                padding: 1rem 0;
            }
            
            .notification-item {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 0.8rem 1.5rem;
                border-bottom: 1px solid #f1f5f9;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .notification-item:hover {
                background-color: #f8fafc;
            }
            
            .notification-item i {
                color: #10b981;
                font-size: 0.6rem;
                margin-top: 5px;
            }
            
            .notification-item.payment i {
                color: #f59e0b;
            }
            
            .notification-item.game i {
                color: #2563eb;
            }
            
            .notification-text p {
                margin: 0 0 4px 0;
                color: #334155;
            }
            
            .notification-text small {
                color: #94a3b8;
                font-size: 0.8rem;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Cerrar modal al hacer clic en la X
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Marcar como autenticado para propósitos de demostración
    localStorage.setItem('isAuthenticated', 'true');
});