async function fetchAndMapAthletes() {
    const url = '/api/v1/atletas/obtener_atletas';
    try {
        const respuesta = await fetch(url);
        const datosOriginales = await respuesta.json();

        return datosOriginales.map(atleta => ({
            id: atleta.id_atleta,
            firstName: atleta.nombre,
            lastName: atleta.apellido,
            fullName: `${atleta.nombre} ${atleta.apellido}`,
            documentType: atleta.tipo_documento,
            documentNumber: atleta.n_documento,
            birthDate: atleta.fecha_nacimiento,
            age: 2026 - new Date(atleta.fecha_nacimiento).getFullYear(), 
            gender: atleta.genero,
            email: atleta.email,
            phone: atleta.telefono,
            address: atleta.direccion,
            emergencyContact: atleta.contacto_emergencia,
            emergencyPhone: atleta.telef_emergencia,
            team: atleta.categoria,
            position: atleta.posicion,
            jerseyNumber: parseInt(atleta.dorsal),
            joinDate: atleta.fecha_ingreso,
            height: atleta.estatura,
            weight: atleta.peso,
            dominantHand: atleta.mano_dominante,
            experience: atleta.exp_previa,
            bloodType: atleta.tipo_sangre,
            allergies: atleta.alergias,
            medicalConditions: atleta.condiciones,
            medications: atleta.medicamentos,
            medicalInsurance: true,
            status: atleta.activo,
            avatarColor: "#3b82f6"
        }));
    } catch (error) {
        console.error("Error al cargar:", error);
        return []; 
    }
}

const getFormDataBackend = () => {
    return {
        // Información de cuenta (puedes generar uno por defecto o añadir inputs al HTML)
        username: document.getElementById('username')?.value || 
                  document.getElementById('firstName').value.toLowerCase() + Math.floor(Math.random() * 1000),
        password: document.getElementById('password')?.value || "123456", // Password temporal si no hay input
        
        // Información Básica
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        documentType: document.getElementById('documentType').value,
        documentNumber: document.getElementById('documentNumber').value,
        birthDate: document.getElementById('birthDate').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        emergencyPhone: document.getElementById('emergencyPhone').value,

        // Información Deportiva
        team: document.getElementById('team').value,
        position: document.getElementById('position').value,
        jerseyNumber: parseInt(document.getElementById('jerseyNumber').value) || 0,
        joinDate: document.getElementById('joinDate').value,
        height: parseFloat(document.getElementById('height').value) || 0,
        weight: parseFloat(document.getElementById('weight').value) || 0,
        dominantHand: document.getElementById('dominantHand').value,
        experience: parseInt(document.getElementById('experience').value) || 0,

        // Historial Médico
        bloodType: document.getElementById('bloodType').value,
        allergies: document.getElementById('allergies').value,
        medicalConditions: document.getElementById('medicalConditions').value,
        medications: document.getElementById('medications').value
    };
};




document.addEventListener('DOMContentLoaded', async function() {
    // Datos de ejemplo para atletas
    const sampleAthletes = await fetchAndMapAthletes();
    // Variables globales
    let athletes = [...sampleAthletes];
    
console.log("Atletas listos para la interfaz:", athletes);    
    let editingAthleteId = null;

    // Elementos del DOM
    const athletesTableBody = document.getElementById('athletesTableBody');
    const athleteModal = document.getElementById('athleteModal');
    const profileModal = document.getElementById('profileModal');
    const addAthleteBtn = document.getElementById('addAthleteBtn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const athleteForm = document.getElementById('athleteForm');
    const formTabs = document.querySelectorAll('.form-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterTeam = document.getElementById('filterTeam');
    const filterStatus = document.getElementById('filterStatus');
    const searchAthlete = document.getElementById('searchAthlete');
    const exportBtn = document.getElementById('exportAthletes');
    const uploadDocumentBtn = document.getElementById('uploadDocumentBtn');
    const documentUpload = document.getElementById('documentUpload');

    // Inicializar selectores de fecha
    const datePickers = document.querySelectorAll('.datepicker');
    datePickers.forEach(input => {
        flatpickr(input, {
            locale: "es",
            dateFormat: "Y-m-d",
            allowInput: true
        });
    });

    // Cargar datos iniciales
    loadAthletesTable(athletes);

    // Abrir modal para nuevo atleta
    addAthleteBtn.addEventListener('click', () => {
        editingAthleteId = null;
        document.getElementById('modalTitle').textContent = 'Nuevo Atleta';
        athleteForm.reset();
        resetFormTabs();
        athleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            athleteModal.classList.remove('active');
            profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            athleteForm.reset();
        });
    });

    // Cerrar modales al hacer clic fuera
    athleteModal.addEventListener('click', (e) => {
        if (e.target === athleteModal) {
            document.body.style.overflow = 'auto';
            athleteForm.reset();
        }
    });

    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navegación entre pestañas del formulario
    formTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Actualizar pestañas activas
            formTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar contenido correspondiente
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Subir documentos
    uploadDocumentBtn.addEventListener('click', () => {
        documentUpload.click();
    });

    documentUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            showAlert(`${files.length} documento(s) seleccionado(s)`, 'success');
            // En un sistema real, aquí se subirían los archivos al servidor
        }
    });

    // Filtrar atletas
    filterTeam.addEventListener('change', applyFilters);
    filterStatus.addEventListener('change', applyFilters);
    searchAthlete.addEventListener('input', applyFilters);

    // Exportar datos
    exportBtn.addEventListener('click', () => {
        exportAthletesToCSV();
    });

    // Enviar formulario
    athleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const athleteData = getFormData();
        const athleteDataBackend = getFormDataBackend();
        // Validaciones
        if (!validateForm(athleteData)) {
            return;
        }
        
        // Calcular edad
        const birthDate = new Date(athleteData.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Generar color para avatar
        const avatarColor = generateAvatarColor(athleteData.gender);
        
        if (editingAthleteId) {
            // Actualizar atleta existente
            const index = athletes.findIndex(a => a.id === editingAthleteId);
            if (index !== -1) {
                athletes[index] = {
                    ...athletes[index],
                    ...athleteData,
                    age: age,
                    fullName: `${athleteData.firstName} ${athleteData.lastName}`,
                    avatarColor: avatarColor,
                    id: editingAthleteId
                };
                showAlert('Atleta actualizado exitosamente', 'success');
            }
        } else {
            try {
            // 3. Enviamos el athleteData al backend
            const response = await fetch('/api/v1/atletas/registro_atleta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(athleteDataBackend)
            });

            const result = await response.json();

            if (response.ok) {
                // 4. Creamos el objeto para la tabla local (con campos extra de UI)
                const newAthlete = {
                    ...athleteData,
                    id: result.id || Date.now(),
                    fullName: `${athleteDataBackend.firstName} ${athleteDataBackend.lastName}`,
                    avatarColor: generateAvatarColor(athleteDataBackend.gender),
                    status: 'active',
                    lastPayment: new Date().toISOString().split('T')[0]
                };

                athletes.push(newAthlete);
                
                // 5. Limpiamos y cerramos
                loadAthletesTable(athletes);
                athleteModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                athleteForm.reset();
                resetFormTabs();
                showAlert('Atleta registrado exitosamente', 'success');
            } else {
                showAlert(`Error: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error de conexión con el servidor', 'error');
        }
            
        }
        
        // Actualizar tabla
        loadAthletesTable(athletes);
        
        // Cerrar modal y resetear formulario
        athleteModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        athleteForm.reset();
        resetFormTabs();
        editingAthleteId = null;
    });

    // Funciones principales
    function loadAthletesTable(athletesList) {
        athletesTableBody.innerHTML = '';
        
        if (athletesList.length === 0) {
            athletesTableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2rem;">
                        <i class="fas fa-users-slash" style="font-size: 2rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                        <p>No se encontraron atletas</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        athletesList.forEach(athlete => {
            const row = document.createElement('tr');
            
            // Avatar e iniciales
            const initials = `${athlete.firstName.charAt(0)}${athlete.lastName.charAt(0)}`;
            
            // Texto del equipo
            const teamText = getTeamText(athlete.team);
            const teamClass = `team-${athlete.team}`;
            
            // Texto de posición
            const positionText = getPositionText(athlete.position);
            
            // Estado
            let statusClass, statusText;
            switch(athlete.status) {
                case true:
                    statusClass = 'status-paid';
                    statusText = 'Activo';
                    break;
                case false :
                    statusClass = 'status-pending';
                    statusText = 'Inactivo';
                    break;
                case 'injured':
                    statusClass = 'status-overdue';
                    statusText = 'Lesionado';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    statusText = 'Pendiente';
                    break;
                default:
                    statusClass = 'status-pending';
                    statusText = 'Pendiente';
            }
            
            // Fecha del último pago
            const lastPaymentFormatted = athlete.lastPayment ? 
                formatDate(athlete.lastPayment) : 'Sin pagos';
            
            row.innerHTML = `
                <td>#${athlete.id.toString().padStart(3, '0')}</td>
                <td>
                    <div class="athlete-name">
                        <div class="athlete-avatar" style="background-color: ${athlete.avatarColor}">
                            ${initials}
                        </div>
                        <div class="athlete-info">
                            <h4>${athlete.fullName}</h4>
                            <p>${athlete.documentNumber}</p>
                        </div>
                    </div>
                </td>
                <td>${athlete.age} años</td>
                <td><span class="team-badge ${teamClass}">${teamText}</span></td>
                <td><span class="position-badge">${positionText}</span></td>
                <td>
                    <div>${athlete.phone || '-'}</div>
                    <small>${athlete.email || ''}</small>
                </td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${lastPaymentFormatted}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="Ver perfil" onclick="viewAthleteProfile(${athlete.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" title="Editar" onclick="editAthlete(${athlete.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="Eliminar" onclick="deleteAthlete(${athlete.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            athletesTableBody.appendChild(row);
        });
    }
    
    function applyFilters() {
        let filteredAthletes = [...athletes];
        
        // Filtrar por equipo
        if (filterTeam.value !== 'all') {
            filteredAthletes = filteredAthletes.filter(athlete => 
                athlete.team === filterTeam.value
            );
        }
        
        // Filtrar por estado
        if (filterStatus.value !== 'all') {
            filteredAthletes = filteredAthletes.filter(athlete => 
                athlete.status === filterStatus.value
            );
        }
        
        // Filtrar por búsqueda
        if (searchAthlete.value.trim() !== '') {
            const searchTerm = searchAthlete.value.toLowerCase();
            filteredAthletes = filteredAthletes.filter(athlete =>
                athlete.fullName.toLowerCase().includes(searchTerm) ||
                athlete.documentNumber.includes(searchTerm) ||
                athlete.phone.toLowerCase().includes(searchTerm) ||
                athlete.email.toLowerCase().includes(searchTerm)
            );
        }
        
        loadAthletesTable(filteredAthletes);
    }
    
    function getFormData() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            documentType: document.getElementById('documentType').value,
            documentNumber: document.getElementById('documentNumber').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            emergencyContact: document.getElementById('emergencyContact').value,
            emergencyPhone: document.getElementById('emergencyPhone').value,
            team: document.getElementById('team').value,
            position: document.getElementById('position').value,
            jerseyNumber: parseInt(document.getElementById('jerseyNumber').value) || null,
            joinDate: document.getElementById('joinDate').value,
            height: parseInt(document.getElementById('height').value) || null,
            weight: parseFloat(document.getElementById('weight').value) || null,
            dominantHand: document.getElementById('dominantHand').value,
            experience: parseInt(document.getElementById('experience').value) || 0,
            bloodType: document.getElementById('bloodType').value,
            allergies: document.getElementById('allergies').value,
            medicalConditions: document.getElementById('medicalConditions').value,
            medications: document.getElementById('medications').value,
            lastMedicalCheck: document.getElementById('lastMedicalCheck').value,
            nextMedicalCheck: document.getElementById('nextMedicalCheck').value,
            medicalInsurance: document.getElementById('medicalInsurance').checked,
            notes: document.getElementById('notes').value
        };
    }
    
    function validateForm(data) {
        // Validaciones básicas
        if (!data.firstName || !data.lastName) {
            showAlert('Nombre y apellido son requeridos', 'error');
            return false;
        }
        
        if (!data.documentType || !data.documentNumber) {
            showAlert('Tipo y número de documento son requeridos', 'error');
            return false;
        }
        
        if (!data.birthDate) {
            showAlert('Fecha de nacimiento es requerida', 'error');
            return false;
        }
        
        if (!data.gender) {
            showAlert('Género es requerido', 'error');
            return false;
        }
        
        if (!data.phone) {
            showAlert('Teléfono es requerido', 'error');
            return false;
        }
        
        if (!data.emergencyContact || !data.emergencyPhone) {
            showAlert('Contacto de emergencia es requerido', 'error');
            return false;
        }
        
        if (!data.team || !data.position) {
            showAlert('Equipo y posición son requeridos', 'error');
            return false;
        }
        
        if (!data.joinDate) {
            showAlert('Fecha de ingreso es requerida', 'error');
            return false;
        }
        
        return true;
    }
    
    function resetFormTabs() {
        // Activar primera pestaña
        formTabs.forEach((tab, index) => {
            if (index === 0) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        tabContents.forEach((content, index) => {
            if (index === 0) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
    
    function getTeamText(teamValue) {
        const teams = {
            'sub18': 'Sub-18',
            'sub21': 'Sub-21',
            'principal': 'Principal',
            'femenino': 'Femenino',
            'juvenil': 'Juvenil'
        };
        return teams[teamValue] || teamValue;
    }
    
    function getPositionText(positionValue) {
        const positions = {
            'armador': 'Armador',
            'opuesto': 'Opuesto',
            'central': 'Central',
            'libero': 'Libero',
            'externo': 'Externo'
        };
        return positions[positionValue] || positionValue;
    }
    
    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    function generateAvatarColor(gender) {
        const colors = {
            'female': ['#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4'],
            'male': ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6']
        };
        
        const genderColors = colors[gender] || colors['male'];
        return genderColors[Math.floor(Math.random() * genderColors.length)];
    }
    
    function exportAthletesToCSV() {
        if (athletes.length === 0) {
            showAlert('No hay datos para exportar', 'error');
            return;
        }
        
        // Crear contenido CSV
        const headers = ['ID', 'Nombre', 'Documento', 'Edad', 'Equipo', 'Posición', 'Teléfono', 'Email', 'Estado'];
        const csvContent = [
            headers.join(','),
            ...athletes.map(athlete => [
                athlete.id,
                `"${athlete.fullName}"`,
                athlete.documentNumber,
                athlete.age,
                getTeamText(athlete.team),
                getPositionText(athlete.position),
                athlete.phone,
                athlete.email,
                athlete.status
            ].join(','))
        ].join('\n');
        
        // Crear y descargar archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `atletas_club_${getTodayDate()}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showAlert('Datos exportados exitosamente', 'success');
    }
    
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '15px 20px';
        alertDiv.style.borderRadius = '8px';
        alertDiv.style.color = 'white';
        alertDiv.style.fontWeight = '500';
        alertDiv.style.zIndex = '1001';
        alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        alertDiv.style.animation = 'slideIn 0.3s ease-out';
        
        if (type === 'success') {
            alertDiv.style.backgroundColor = '#10b981';
        } else if (type === 'error') {
            alertDiv.style.backgroundColor = '#ef4444';
        }
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 4000);
    }

    // Funciones globales para acciones de la tabla
    window.viewAthleteProfile = function(id) {
        const athlete = athletes.find(a => a.id === id);
        if (!athlete) return;
        
        // Crear contenido del perfil
        const profileContent = createProfileContent(athlete);
        
        // Actualizar modal
        document.getElementById('profileTitle').textContent = `Perfil de ${athlete.fullName}`;
        profileModal.querySelector('.modal-body').innerHTML = profileContent;
        
        // Agregar eventos a las pestañas del perfil
        setupProfileTabs();
        
        // Mostrar modal
        profileModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    function createProfileContent(athlete) {
        const initials = `${athlete.firstName.charAt(0)}${athlete.lastName.charAt(0)}`;
        const teamText = getTeamText(athlete.team);
        const positionText = getPositionText(athlete.position);
        
        // Calcular años en el club
        const joinDate = new Date(athlete.joinDate);
        const today = new Date();
        let yearsInClub = today.getFullYear() - joinDate.getFullYear();
        const monthDiff = today.getMonth() - joinDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joinDate.getDate())) {
            yearsInClub--;
        }
        
        return `
            <div class="profile-header">
                <div class="profile-avatar" style="background-color: ${athlete.avatarColor}">
                    ${initials}
                </div>
                <div class="profile-info">
                    <h2>${athlete.fullName}</h2>
                    <p><strong>${positionText}</strong> • ${teamText}</p>
                    <p>#${athlete.jerseyNumber || 'Sin número'} • ${athlete.height ? athlete.height + ' cm' : ''} ${athlete.weight ? '• ' + athlete.weight + ' kg' : ''}</p>
                    
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <span class="profile-stat-value">${athlete.age}</span>
                            <span class="profile-stat-label">Edad</span>
                        </div>
                        <div class="profile-stat">
                            <span class="profile-stat-value">${yearsInClub}</span>
                            <span class="profile-stat-label">Años en el club</span>
                        </div>
                        <div class="profile-stat">
                            <span class="profile-stat-value">${athlete.experience || 0}</span>
                            <span class="profile-stat-label">Años de experiencia</span>
                        </div>
                        <div class="profile-stat">
                            <span class="profile-stat-value">${athlete.medicalInsurance ? 'Sí' : 'No'}</span>
                            <span class="profile-stat-label">Seguro médico</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-tabs">
                <button class="profile-tab active" data-tab="info">Información</button>
                <button class="profile-tab" data-tab="sports">Deportivo</button>
                <button class="profile-tab" data-tab="medical">Médico</button>
                <button class="profile-tab" data-tab="documents">Documentos</button>
            </div>
            
            <div class="tab-content active" id="infoTab">
                <div class="profile-section">
                    <h3>Información Personal</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Documento</span>
                            <span class="info-value">${athlete.documentNumber}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Fecha de Nacimiento</span>
                            <span class="info-value">${formatDate(athlete.birthDate)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Género</span>
                            <span class="info-value">${athlete.gender === 'female' ? 'Femenino' : 'Masculino'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email</span>
                            <span class="info-value">${athlete.email || 'No registrado'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Teléfono</span>
                            <span class="info-value">${athlete.phone || 'No registrado'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Dirección</span>
                            <span class="info-value">${athlete.address || 'No registrada'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3>Contacto de Emergencia</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Nombre</span>
                            <span class="info-value">${athlete.emergencyContact}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Teléfono</span>
                            <span class="info-value">${athlete.emergencyPhone}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="sportsTab">
                <div class="profile-section">
                    <h3>Información Deportiva</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Equipo</span>
                            <span class="info-value">${teamText}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Posición</span>
                            <span class="info-value">${positionText}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Número de camiseta</span>
                            <span class="info-value">${athlete.jerseyNumber || 'Sin asignar'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Fecha de ingreso</span>
                            <span class="info-value">${formatDate(athlete.joinDate)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Mano dominante</span>
                            <span class="info-value">${getDominantHandText(athlete.dominantHand)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Años de experiencia</span>
                            <span class="info-value">${athlete.experience || 0}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Estatura</span>
                            <span class="info-value">${athlete.height ? athlete.height + ' cm' : 'No registrada'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Peso</span>
                            <span class="info-value">${athlete.weight ? athlete.weight + ' kg' : 'No registrado'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="medicalTab">
                <div class="profile-section">
                    <h3>Historial Médico</h3>
                    
                    ${athlete.allergies || athlete.medicalConditions || athlete.medications ? `
                    <div class="medical-alert">
                        <h4><i class="fas fa-exclamation-triangle"></i> Información Médica Importante</h4>
                        ${athlete.allergies ? `<p><strong>Alergias:</strong> ${athlete.allergies}</p>` : ''}
                        ${athlete.medicalConditions ? `<p><strong>Condiciones médicas:</strong> ${athlete.medicalConditions}</p>` : ''}
                        ${athlete.medications ? `<p><strong>Medicamentos:</strong> ${athlete.medications}</p>` : ''}
                    </div>
                    ` : ''}
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Grupo sanguíneo</span>
                            <span class="info-value">${athlete.bloodType ? athlete.bloodType.toUpperCase() : 'No registrado'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Último control médico</span>
                            <span class="info-value">${athlete.lastMedicalCheck ? formatDate(athlete.lastMedicalCheck) : 'No registrado'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Próximo control</span>
                            <span class="info-value">${athlete.nextMedicalCheck ? formatDate(athlete.nextMedicalCheck) : 'No programado'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Seguro médico</span>
                            <span class="info-value">${athlete.medicalInsurance ? 'Sí' : 'No'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="documentsTab">
                <div class="profile-section">
                    <h3>Documentos</h3>
                    <p>No hay documentos adjuntos.</p>
                </div>
            </div>
            
            <div class="modal-actions" style="margin-top: 2rem;">
                <button type="button" class="btn-secondary close-modal">Cerrar</button>
                <button type="button" class="btn-primary" onclick="editAthlete(${athlete.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </div>
        `;
    }
    
    function getDominantHandText(handValue) {
        const hands = {
            'right': 'Derecha',
            'left': 'Izquierda',
            'ambidextrous': 'Ambidiestro'
        };
        return hands[handValue] || 'No especificado';
    }
    
    function setupProfileTabs() {
        const profileTabs = document.querySelectorAll('.profile-tab');
        const profileTabContents = document.querySelectorAll('.tab-content');
        
        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Actualizar pestañas activas
                profileTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Mostrar contenido correspondiente
                profileTabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}Tab`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    window.editAthlete = function(id) {
        const athlete = athletes.find(a => a.id === id);
        if (!athlete) return;
        
        // Cerrar modales abiertos
        athleteModal.classList.remove('active');
        profileModal.classList.remove('active');
        
        // Llenar formulario con datos del atleta
        
        document.getElementById('username').value = athlete.username;
        document.getElementById('password').value = athlete.password;
        document.getElementById('firstName').value = athlete.firstName;
        document.getElementById('lastName').value = athlete.lastName;
        document.getElementById('documentType').value = athlete.documentType;
        document.getElementById('documentNumber').value = athlete.documentNumber;
        document.getElementById('birthDate').value = athlete.birthDate;
        document.getElementById('gender').value = athlete.gender;
        document.getElementById('email').value = athlete.email || '';
        document.getElementById('phone').value = athlete.phone;
        document.getElementById('address').value = athlete.address || '';
        document.getElementById('emergencyContact').value = athlete.emergencyContact;
        document.getElementById('emergencyPhone').value = athlete.emergencyPhone;
        document.getElementById('team').value = athlete.team;
        document.getElementById('position').value = athlete.position;
        document.getElementById('jerseyNumber').value = athlete.jerseyNumber || '';
        document.getElementById('joinDate').value = athlete.joinDate;
        document.getElementById('height').value = athlete.height || '';
        document.getElementById('weight').value = athlete.weight || '';
        document.getElementById('dominantHand').value = athlete.dominantHand || '';
        document.getElementById('experience').value = athlete.experience || '';
        document.getElementById('bloodType').value = athlete.bloodType || '';
        document.getElementById('allergies').value = athlete.allergies || '';
        document.getElementById('medicalConditions').value = athlete.medicalConditions || '';
        document.getElementById('medications').value = athlete.medications || '';
        document.getElementById('lastMedicalCheck').value = athlete.lastMedicalCheck || '';
        document.getElementById('nextMedicalCheck').value = athlete.nextMedicalCheck || '';
        document.getElementById('medicalInsurance').checked = athlete.medicalInsurance || false;
        document.getElementById('notes').value = athlete.notes || '';
        
        // Actualizar título del modal
        document.getElementById('modalTitle').textContent = `Editar Atleta #${id}`;
        
        // Activar primera pestaña
        resetFormTabs();
        
        // Guardar ID para actualización
        editingAthleteId = id;
        
        // Abrir modal de edición
        athleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.deleteAthlete = function(id) {
        if (confirm('¿Está seguro de eliminar este atleta?\nEsta acción no se puede deshacer.')) {
            const index = athletes.findIndex(a => a.id === id);
            if (index !== -1) {
                athletes.splice(index, 1);
                loadAthletesTable(athletes);
                showAlert('Atleta eliminado exitosamente', 'success');
            }
        }
    };
});