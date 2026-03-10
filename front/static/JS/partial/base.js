// Script para el menú responsive
document.addEventListener('DOMContentLoaded', function() {
    setActiveMenuItem()
    // Crear el botón de hamburguesa dinámicamente si no existe
    if (!document.getElementById('sidebarToggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebarToggle';
        toggleBtn.className = 'sidebar-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(toggleBtn);
    }

    // Crear el overlay si no existe
    if (!document.getElementById('sidebarOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'sidebarOverlay';
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Verificar que los elementos existan
    if (!sidebar) {
        console.error('No se encontró el elemento .sidebar');
        return;
    }

    // Función para abrir/cerrar el sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Cambiar icono del botón
        const icon = toggleBtn.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Event listener para el botón de toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Cerrar sidebar al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleSidebar();
        });
    }
    
    // Cerrar sidebar al hacer clic en un enlace (en móvil)
    const sidebarLinks = sidebar.querySelectorAll('a');
    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleSidebar();
                }
            });
        });
    }
    
    // Manejar el botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para cerrar sesión
            console.log('Cerrando sesión...');
        });
    }
    
    // Manejar resize de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // En desktop, aseguramos que el sidebar esté visible
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            
            // Resetear icono
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});



function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuLinks = document.querySelectorAll('.sidebar-menu .menu-item a');
    
    // Primero remover todas las clases active
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // Variable para trackear si encontramos una coincidencia exacta
    let exactMatchFound = false;
    
    // Buscar coincidencia exacta primero
    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentPath) {
            link.classList.add('active');
            exactMatchFound = true;
        }
    });
    
    // Si no hay coincidencia exacta, buscar por prefijo
    if (!exactMatchFound) {
        menuLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Ignorar enlaces vacíos o el dashboard para esta búsqueda
            if (linkPath && linkPath !== '/' && linkPath !== '/index') {
                // Verificar si la ruta actual comienza con el linkPath
                // y el linkPath no es demasiado genérico
                if (currentPath.startsWith(linkPath) && linkPath !== '/') {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Si aún no hay active y estamos en la raíz, activar dashboard
    const hasActive = Array.from(menuLinks).some(link => link.classList.contains('active'));
    if (!hasActive && (currentPath === '/' || currentPath === '')) {
        const dashboardLink = document.querySelector('.sidebar-menu a[href="/index"]');
        if (dashboardLink) {
            dashboardLink.classList.add('active');
        }
    }
}

