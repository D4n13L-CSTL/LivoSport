document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para atletas
    const sampleAthletes = [
        {
            id: 1,
            firstName: "Ana",
            lastName: "García",
            fullName: "Ana García",
            documentType: "dni",
            documentNumber: "12345678",
            birthDate: "2002-05-15",
            age: 21,
            gender: "female",
            email: "ana.garcia@email.com",
            phone: "+51 987654321",
            address: "Av. Principal 123, Lima",
            emergencyContact: "María García",
            emergencyPhone: "+51 987654322",
            team: "principal",
            position: "armador",
            jerseyNumber: 7,
            joinDate: "2022-01-10",
            height: 175,
            weight: 62,
            dominantHand: "right",
            experience: 5,
            bloodType: "o+",
            allergies: "Ninguna",
            medicalConditions: "Ninguna",
            medications: "Ninguna",
            lastMedicalCheck: "2023-09-15",
            nextMedicalCheck: "2024-03-15",
            medicalInsurance: true,
            status: "active",
            lastPayment: "2023-10-05",
            avatarColor: "#3b82f6"
        },
        {
            id: 2,
            firstName: "Carlos",
            lastName: "López",
            fullName: "Carlos López",
            documentType: "dni",
            documentNumber: "23456789",
            birthDate: "2003-08-22",
            age: 20,
            gender: "male",
            email: "carlos.lopez@email.com",
            phone: "+51 987654323",
            address: "Calle Los Olivos 456, Lima",
            emergencyContact: "Juan López",
            emergencyPhone: "+51 987654324",
            team: "sub21",
            position: "opuesto",
            jerseyNumber: 12,
            joinDate: "2023-02-15",
            height: 185,
            weight: 78,
            dominantHand: "right",
            experience: 3,
            bloodType: "a+",
            allergies: "Polen",
            medicalConditions: "Ninguna",
            medications: "Antihistamínicos en temporada",
            lastMedicalCheck: "2023-08-20",
            nextMedicalCheck: "2024-02-20",
            medicalInsurance: true,
            status: "active",
            lastPayment: "2023-10-10",
            avatarColor: "#ef4444"
        },
        {
            id: 3,
            firstName: "María",
            lastName: "Rodríguez",
            fullName: "María Rodríguez",
            documentType: "dni",
            documentNumber: "34567890",
            birthDate: "2004-11-02",
            age: 19,
            gender: "female",
            email: "maria.rodriguez@email.com",
            phone: "+51 987654325",
            address: "Jr. Las Flores 789, Lima",
            emergencyContact: "Pedro Rodríguez",
            emergencyPhone: "+51 987654326",
            team: "femenino",
            position: "central",
            jerseyNumber: 5,
            joinDate: "2022-08-20",
            height: 180,
            weight: 68,
            dominantHand: "right",
            experience: 4,
            bloodType: "b+",
            allergies: "Ninguna",
            medicalConditions: "Asma leve",
            medications: "Inhalador de rescate",
            lastMedicalCheck: "2023-07-10",
            nextMedicalCheck: "2024-01-10",
            medicalInsurance: false,
            status: "active",
            lastPayment: "2023-09-25",
            avatarColor: "#8b5cf6"
        },
        {
            id: 4,
            firstName: "Javier",
            lastName: "Pérez",
            fullName: "Javier Pérez",
            documentType: "dni",
            documentNumber: "45678901",
            birthDate: "2001-03-18",
            age: 22,
            gender: "male",
            email: "javier.perez@email.com",
            phone: "+51 987654327",
            address: "Av. Los Pinos 101, Lima",
            emergencyContact: "Laura Pérez",
            emergencyPhone: "+51 987654328",
            team: "principal",
            position: "libero",
            jerseyNumber: 1,
            joinDate: "2021-05-15",
            height: 170,
            weight: 65,
            dominantHand: "right",
            experience: 6,
            bloodType: "ab+",
            allergies: "Ninguna",
            medicalConditions: "Ninguna",
            medications: "Ninguna",
            lastMedicalCheck: "2023-10-01",
            nextMedicalCheck: "2024-04-01",
            medicalInsurance: true,
            status: "injured",
            lastPayment: "2023-09-30",
            avatarColor: "#10b981"
        },
        {
            id: 5,
            firstName: "Laura",
            lastName: "Martínez",
            fullName: "Laura Martínez",
            documentType: "dni",
            documentNumber: "56789012",
            birthDate: "2005-06-30",
            age: 18,
            gender: "female",
            email: "laura.martinez@email.com",
            phone: "+51 987654329",
            address: "Calle Las Palmas 202, Lima",
            emergencyContact: "Carlos Martínez",
            emergencyPhone: "+51 987654330",
            team: "sub18",
            position: "externo",
            jerseyNumber: 10,
            joinDate: "2023-03-01",
            height: 172,
            weight: 60,
            dominantHand: "left",
            experience: 2,
            bloodType: "o-",
            allergies: "Mariscos",
            medicalConditions: "Ninguna",
            medications: "Ninguna",
            lastMedicalCheck: "2023-06-15",
            nextMedicalCheck: "2023-12-15",
            medicalInsurance: true,
            status: "active",
            lastPayment: "2023-10-01",
            avatarColor: "#f59e0b"
        },
        {
            id: 6,
            firstName: "Diego",
            lastName: "Sánchez",
            fullName: "Diego Sánchez",
            documentType: "dni",
            documentNumber: "67890123",
            birthDate: "2002-09-12",
            age: 21,
            gender: "male",
            email: "diego.sanchez@email.com",
            phone: "+51 987654331",
            address: "Jr. Los Almendros 303, Lima",
            emergencyContact: "Sofía Sánchez",
            emergencyPhone: "+51 987654332",
            team: "sub21",
            position: "central",
            jerseyNumber: 15,
            joinDate: "2022-11-05",
            height: 188,
            weight: 82,
            dominantHand: "right",
            experience: 4,
            bloodType: "a-",
            allergies: "Ninguna",
            medicalConditions: "Ninguna",
            medications: "Ninguna",
            lastMedicalCheck: "2023-08-30",
            nextMedicalCheck: "2024-02-28",
            medicalInsurance: false,
            status: "pending",
            lastPayment: "2023-08-15",
            avatarColor: "#ec4899"
        },
        {
            id: 7,
            firstName: "Sofía",
            lastName: "Hernández",
            fullName: "Sofía Hernández",
            documentType: "dni",
            documentNumber: "78901234",
            birthDate: "2003-12-08",
            age: 20,
            gender: "female",
            email: "sofia.hernandez@email.com",
            phone: "+51 987654333",
            address: "Av. Las Gardenias 404, Lima",
            emergencyContact: "Miguel Hernández",
            emergencyPhone: "+51 987654334",
            team: "femenino",
            position: "armador",
            jerseyNumber: 3,
            joinDate: "2023-01-20",
            height: 168,
            weight: 58,
            dominantHand: "right",
            experience: 3,
            bloodType: "b-",
            allergies: "Penicilina",
            medicalConditions: "Ninguna",
            medications: "Ninguna",
            lastMedicalCheck: "2023-09-05",
            nextMedicalCheck: "2024-03-05",
            medicalInsurance: true,
            status: "active",
            lastPayment: "2023-10-12",
            avatarColor: "#06b6d4"
        },
        {
            id: 8,
            firstName: "Pedro",
            lastName: "Ramírez",
            fullName: "Pedro Ramírez",
            documentType: "dni",
            documentNumber: "89012345",
            birthDate: "2000-01-25",
            age: 23,
            gender: "male",
            email: "pedro.ramirez@email.com",
            phone: "+51 987654335",
            address: "Calle Los Robles 505, Lima",
            emergencyContact: "Elena Ramírez",
            emergencyPhone: "+51 987654336",
            team: "principal",
            position: "externo",
            jerseyNumber: 9,
            joinDate: "2020-09-10",
            height: 182,
            weight: 76,
            dominantHand: "right",
            experience: 8,
            bloodType: "o+",
            allergies: "Ninguna",
            medicalConditions: "Ninguna",
            medications: "Ninguna",
            lastMedicalCheck: "2023-10-10",
            nextMedicalCheck: "2024-04-10",
            medicalInsurance: true,
            status: "active",
            lastPayment: "2023-10-08",
            avatarColor: "#8b5cf6"
        }
    ];

    // Variables globales
    let athletes = [...sampleAthletes];
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
            athleteModal.classList.remove('active');
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
    athleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const athleteData = getFormData();
        
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
            // Crear nuevo atleta
            const newAthlete = {
                ...athleteData,
                id: athletes.length > 0 ? Math.max(...athletes.map(a => a.id)) + 1 : 1,
                age: age,
                fullName: `${athleteData.firstName} ${athleteData.lastName}`,
                avatarColor: avatarColor,
                status: 'active',
                lastPayment: getTodayDate()
            };
            athletes.push(newAthlete);
            showAlert('Atleta registrado exitosamente', 'success');
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
                case 'active':
                    statusClass = 'status-paid';
                    statusText = 'Activo';
                    break;
                case 'inactive':
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