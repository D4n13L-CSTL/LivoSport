document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para entrenadores
    const sampleCoaches = [
        {
            id: 1,
            firstName: "Carlos",
            lastName: "López",
            fullName: "Carlos López",
            documentType: "dni",
            documentNumber: "12345678",
            birthDate: "1980-05-15",
            age: 43,
            gender: "male",
            email: "carlos.lopez@club.com",
            phone: "+51 987654321",
            address: "Av. Principal 123, Lima",
            emergencyContact: "María López",
            emergencyPhone: "+51 987654322",
            specialty: "tactics",
            level: "head",
            hireDate: "2018-03-10",
            contractType: "full-time",
            salary: 2500,
            weeklyHours: 40,
            experience: 15,
            previousTeams: "Club Deportivo Lima, Universidad San Marcos",
            achievements: "Campeón Nacional 2019, Mejor Entrenador 2020",
            licenseNumber: "LIC-123456",
            licenseExpiration: "2024-12-31",
            certificationLevel: "level3",
            courses: "Curso de Táctica Avanzada, Seminario de Liderazgo",
            availableForTravel: true,
            availableWeekends: true,
            status: "active",
            avatarColor: "#3b82f6",
            certifications: [
                "Certificación Nacional Nivel III",
                "Curso de Preparación Física",
                "Seminario de Psicología Deportiva"
            ],
            availability: {
                monday: "08:00-12:00, 14:00-18:00",
                tuesday: "08:00-12:00, 14:00-18:00",
                wednesday: "08:00-12:00, 14:00-18:00",
                thursday: "08:00-12:00, 14:00-18:00",
                friday: "08:00-12:00, 14:00-18:00",
                saturday: "09:00-13:00",
                sunday: "Libre"
            }
        },
        {
            id: 2,
            firstName: "Ana",
            lastName: "García",
            fullName: "Ana García",
            documentType: "dni",
            documentNumber: "23456789",
            birthDate: "1985-08-22",
            age: 38,
            gender: "female",
            email: "ana.garcia@club.com",
            phone: "+51 987654323",
            address: "Calle Los Olivos 456, Lima",
            emergencyContact: "Juan García",
            emergencyPhone: "+51 987654324",
            specialty: "technique",
            level: "senior",
            hireDate: "2020-02-15",
            contractType: "full-time",
            salary: 2200,
            weeklyHours: 40,
            experience: 12,
            previousTeams: "Club Regatas, Colegio San Agustín",
            achievements: "Campeona Juvenil 2021, Tercer lugar Nacional 2022",
            licenseNumber: "LIC-234567",
            licenseExpiration: "2024-06-30",
            certificationLevel: "level2",
            courses: "Curso de Técnica Avanzada, Taller de Metodología",
            availableForTravel: true,
            availableWeekends: false,
            status: "active",
            avatarColor: "#ec4899",
            certifications: [
                "Certificación Nacional Nivel II",
                "Curso de Metodología de Entrenamiento"
            ],
            availability: {
                monday: "14:00-20:00",
                tuesday: "14:00-20:00",
                wednesday: "14:00-20:00",
                thursday: "14:00-20:00",
                friday: "14:00-20:00",
                saturday: "Libre",
                sunday: "Libre"
            }
        },
        {
            id: 3,
            firstName: "María",
            lastName: "Rodríguez",
            fullName: "María Rodríguez",
            documentType: "dni",
            documentNumber: "34567890",
            birthDate: "1978-11-02",
            age: 45,
            gender: "female",
            email: "maria.rodriguez@club.com",
            phone: "+51 987654325",
            address: "Jr. Las Flores 789, Lima",
            emergencyContact: "Pedro Rodríguez",
            emergencyPhone: "+51 987654326",
            specialty: "physical",
            level: "senior",
            hireDate: "2019-08-20",
            contractType: "full-time",
            salary: 2300,
            weeklyHours: 40,
            experience: 18,
            previousTeams: "Club Universitario, Selección Regional",
            achievements: "Preparadora Física de la Selección Nacional 2018",
            licenseNumber: "LIC-345678",
            licenseExpiration: "2025-03-15",
            certificationLevel: "level3",
            courses: "Maestría en Ciencias del Deporte, Curso de Nutrición Deportiva",
            availableForTravel: true,
            availableWeekends: true,
            status: "active",
            avatarColor: "#10b981",
            certifications: [
                "Certificación Internacional en Preparación Física",
                "Diploma en Nutrición Deportiva",
                "Curso de Recuperación y Regeneración"
            ],
            availability: {
                monday: "07:00-11:00, 16:00-20:00",
                tuesday: "07:00-11:00, 16:00-20:00",
                wednesday: "07:00-11:00",
                thursday: "07:00-11:00, 16:00-20:00",
                friday: "07:00-11:00, 16:00-20:00",
                saturday: "08:00-12:00",
                sunday: "Libre"
            }
        },
        {
            id: 4,
            firstName: "Javier",
            lastName: "Pérez",
            fullName: "Javier Pérez",
            documentType: "dni",
            documentNumber: "45678901",
            birthDate: "1990-03-18",
            age: 33,
            gender: "male",
            email: "javier.perez@club.com",
            phone: "+51 987654327",
            address: "Av. Los Pinos 101, Lima",
            emergencyContact: "Laura Pérez",
            emergencyPhone: "+51 987654328",
            specialty: "mental",
            level: "junior",
            hireDate: "2022-05-15",
            contractType: "part-time",
            salary: 1500,
            weeklyHours: 25,
            experience: 5,
            previousTeams: "Club Deportivo Municipal",
            achievements: "Especialista en Rendimiento Mental",
            licenseNumber: "LIC-456789",
            licenseExpiration: "2024-09-30",
            certificationLevel: "level1",
            courses: "Psicología del Deporte, Coaching Deportivo",
            availableForTravel: false,
            availableWeekends: true,
            status: "active",
            avatarColor: "#8b5cf6",
            certifications: [
                "Certificación en Psicología Deportiva",
                "Curso de Coaching Deportivo"
            ],
            availability: {
                monday: "16:00-20:00",
                tuesday: "16:00-20:00",
                wednesday: "16:00-20:00",
                thursday: "16:00-20:00",
                friday: "16:00-20:00",
                saturday: "09:00-13:00",
                sunday: "Libre"
            }
        },
        {
            id: 5,
            firstName: "Roberto",
            lastName: "Martínez",
            fullName: "Roberto Martínez",
            documentType: "dni",
            documentNumber: "56789012",
            birthDate: "1975-06-30",
            age: 48,
            gender: "male",
            email: "roberto.martinez@club.com",
            phone: "+51 987654329",
            address: "Calle Las Palmas 202, Lima",
            emergencyContact: "Carmen Martínez",
            emergencyPhone: "+51 987654330",
            specialty: "goalkeeper",
            level: "coordinator",
            hireDate: "2017-09-01",
            contractType: "full-time",
            salary: 2800,
            weeklyHours: 45,
            experience: 22,
            previousTeams: "Selección Nacional, Club Olimpia",
            achievements: "Ex-seleccionado nacional, Coordinador de Área",
            licenseNumber: "LIC-567890",
            licenseExpiration: "2026-01-15",
            certificationLevel: "level4",
            courses: "Curso Internacional de Especialistas, Maestría en Dirección Deportiva",
            availableForTravel: true,
            availableWeekends: true,
            status: "active",
            avatarColor: "#f59e0b",
            certifications: [
                "Certificación Master en Voleibol",
                "Diploma Internacional de Entrenador",
                "Curso de Alto Rendimiento"
            ],
            availability: {
                monday: "08:00-13:00, 15:00-19:00",
                tuesday: "08:00-13:00, 15:00-19:00",
                wednesday: "08:00-13:00, 15:00-19:00",
                thursday: "08:00-13:00, 15:00-19:00",
                friday: "08:00-13:00, 15:00-19:00",
                saturday: "09:00-14:00",
                sunday: "10:00-13:00"
            }
        }
    ];

    // Variables globales
    let coaches = [...sampleCoaches];
    let editingCoachId = null;
    let certificationCount = 0;

    // Elementos del DOM
    const coachesGrid = document.getElementById('coachesGrid');
    const coachModal = document.getElementById('coachModal');
    const profileModal = document.getElementById('profileModal');
    const addCoachBtn = document.getElementById('addCoachBtn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const coachForm = document.getElementById('coachForm');
    const formTabs = document.querySelectorAll('.form-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterSpecialty = document.getElementById('filterSpecialty');
    const filterLevel = document.getElementById('filterLevel');
    const filterStatus = document.getElementById('filterStatus');
    const searchCoach = document.getElementById('searchCoach');
    const addCertificationBtn = document.getElementById('addCertificationBtn');
    const certificationsList = document.getElementById('certificationsList');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
    const timeInputs = document.querySelectorAll('.time-input');

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
    loadCoachesGrid(coaches);

    // Abrir modal para nuevo entrenador
    addCoachBtn.addEventListener('click', () => {
        editingCoachId = null;
        certificationCount = 0;
        document.getElementById('modalTitle').textContent = 'Nuevo Entrenador';
        coachForm.reset();
        resetFormTabs();
        clearCertificationsList();
        coachModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            coachModal.classList.remove('active');
            profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            coachForm.reset();
        });
    });

    // Cerrar modales al hacer clic fuera
    coachModal.addEventListener('click', (e) => {
        if (e.target === coachModal) {
            coachModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            coachForm.reset();
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

    // Agregar certificación
    addCertificationBtn.addEventListener('click', () => {
        addCertificationField();
    });

    // Habilitar/deshabilitar campos de tiempo según disponibilidad
    availabilityCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            timeInputs[index].disabled = !checkbox.checked;
            if (!checkbox.checked) {
                timeInputs[index].value = '';
            }
        });
    });

    // Filtrar entrenadores
    filterSpecialty.addEventListener('change', applyFilters);
    filterLevel.addEventListener('change', applyFilters);
    filterStatus.addEventListener('change', applyFilters);
    searchCoach.addEventListener('input', applyFilters);

    // Enviar formulario
    coachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const coachData = getFormData();
        
        // Validaciones
        if (!validateForm(coachData)) {
            return;
        }
        
        // Calcular edad
        const birthDate = new Date(coachData.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Obtener certificaciones
        const certifications = getCertificationsFromForm();
        
        // Obtener disponibilidad
        const availability = getAvailabilityFromForm();
        
        // Generar color para avatar
        const avatarColor = generateAvatarColor(coachData.gender);
        
        if (editingCoachId) {
            // Actualizar entrenador existente
            const index = coaches.findIndex(c => c.id === editingCoachId);
            if (index !== -1) {
                coaches[index] = {
                    ...coaches[index],
                    ...coachData,
                    age: age,
                    fullName: `${coachData.firstName} ${coachData.lastName}`,
                    avatarColor: avatarColor,
                    certifications: certifications,
                    availability: availability,
                    id: editingCoachId
                };
                showAlert('Entrenador actualizado exitosamente', 'success');
            }
        } else {
            // Crear nuevo entrenador
            const newCoach = {
                ...coachData,
                id: coaches.length > 0 ? Math.max(...coaches.map(c => c.id)) + 1 : 1,
                age: age,
                fullName: `${coachData.firstName} ${coachData.lastName}`,
                avatarColor: avatarColor,
                certifications: certifications,
                availability: availability,
                status: 'active'
            };
            coaches.push(newCoach);
            showAlert('Entrenador registrado exitosamente', 'success');
        }
        
        // Actualizar grid
        loadCoachesGrid(coaches);
        
        // Cerrar modal y resetear formulario
        coachModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        coachForm.reset();
        resetFormTabs();
        clearCertificationsList();
        editingCoachId = null;
    });

    // Funciones principales
    function loadCoachesGrid(coachesList) {
        coachesGrid.innerHTML = '';
        
        if (coachesList.length === 0) {
            coachesGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-user-tie" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                    <h3>No se encontraron entrenadores</h3>
                    <p>Intenta con otros criterios de búsqueda</p>
                </div>
            `;
            return;
        }
        
        coachesList.forEach(coach => {
            const card = createCoachCard(coach);
            coachesGrid.appendChild(card);
        });
    }
    
    function createCoachCard(coach) {
        const card = document.createElement('div');
        card.className = 'coach-card';
        
        // Avatar e iniciales
        const initials = `${coach.firstName.charAt(0)}${coach.lastName.charAt(0)}`;
        
        // Textos de especialidad y nivel
        const specialtyText = getSpecialtyText(coach.specialty);
        const levelText = getLevelText(coach.level);
        
        // Estado
        let statusClass, statusText;
        switch(coach.status) {
            case 'active':
                statusClass = 'status-active';
                statusText = 'Activo';
                break;
            case 'inactive':
                statusClass = 'status-inactive';
                statusText = 'Inactivo';
                break;
            case 'vacation':
                statusClass = 'status-vacation';
                statusText = 'Vacaciones';
                break;
            case 'sick':
                statusClass = 'status-sick';
                statusText = 'Enfermedad';
                break;
            default:
                statusClass = 'status-inactive';
                statusText = 'Inactivo';
        }
        
        card.innerHTML = `
            <div class="coach-header">
                <div class="coach-avatar" style="background-color: ${coach.avatarColor}">
                    ${initials}
                </div>
                <div class="coach-info">
                    <h3>${coach.fullName}</h3>
                    <p>${specialtyText}</p>
                    <span class="coach-level">${levelText}</span>
                </div>
            </div>
            
            <div class="coach-body">
                <div class="coach-details">
                    <div class="detail-item">
                        <span class="detail-label">Experiencia</span>
                        <span class="detail-value">${coach.experience} años</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Horas semanales</span>
                        <span class="detail-value">${coach.weeklyHours}h</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Contrato</span>
                        <span class="detail-value">${getContractTypeText(coach.contractType)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Certificaciones</span>
                        <span class="detail-value">${coach.certifications ? coach.certifications.length : 0}</span>
                    </div>
                </div>
                
                <div class="specialty-tags">
                    <span class="specialty-tag">${specialtyText}</span>
                    ${coach.availableForTravel ? '<span class="specialty-tag">Disponible para viajar</span>' : ''}
                    ${coach.availableWeekends ? '<span class="specialty-tag">Disponible fines de semana</span>' : ''}
                </div>
            </div>
            
            <div class="coach-footer">
                <span class="status-badge ${statusClass}">${statusText}</span>
                <div class="action-buttons">
                    <button class="btn-icon" title="Ver perfil" onclick="viewCoachProfile(${coach.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" title="Editar" onclick="editCoach(${coach.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" title="Eliminar" onclick="deleteCoach(${coach.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    function applyFilters() {
        let filteredCoaches = [...coaches];
        
        // Filtrar por especialidad
        if (filterSpecialty.value !== 'all') {
            filteredCoaches = filteredCoaches.filter(coach => 
                coach.specialty === filterSpecialty.value
            );
        }
        
        // Filtrar por nivel
        if (filterLevel.value !== 'all') {
            filteredCoaches = filteredCoaches.filter(coach => 
                coach.level === filterLevel.value
            );
        }
        
        // Filtrar por estado
        if (filterStatus.value !== 'all') {
            filteredCoaches = filteredCoaches.filter(coach => 
                coach.status === filterStatus.value
            );
        }
        
        // Filtrar por búsqueda
        if (searchCoach.value.trim() !== '') {
            const searchTerm = searchCoach.value.toLowerCase();
            filteredCoaches = filteredCoaches.filter(coach =>
                coach.fullName.toLowerCase().includes(searchTerm) ||
                coach.documentNumber.includes(searchTerm) ||
                coach.email.toLowerCase().includes(searchTerm)
            );
        }
        
        loadCoachesGrid(filteredCoaches);
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
            specialty: document.getElementById('specialty').value,
            level: document.getElementById('level').value,
            hireDate: document.getElementById('hireDate').value,
            contractType: document.getElementById('contractType').value,
            salary: parseFloat(document.getElementById('salary').value) || null,
            weeklyHours: parseInt(document.getElementById('weeklyHours').value),
            experience: parseInt(document.getElementById('experience').value),
            previousTeams: document.getElementById('previousTeams').value,
            achievements: document.getElementById('achievements').value,
            licenseNumber: document.getElementById('licenseNumber').value,
            licenseExpiration: document.getElementById('licenseExpiration').value,
            certificationLevel: document.getElementById('certificationLevel').value,
            courses: document.getElementById('courses').value,
            availableForTravel: document.getElementById('availableForTravel').checked,
            availableWeekends: document.getElementById('availableWeekends').checked,
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
        
        if (!data.email || !data.phone) {
            showAlert('Email y teléfono son requeridos', 'error');
            return false;
        }
        
        if (!data.specialty || !data.level) {
            showAlert('Especialidad y nivel son requeridos', 'error');
            return false;
        }
        
        if (!data.hireDate || !data.contractType) {
            showAlert('Fecha de contratación y tipo de contrato son requeridos', 'error');
            return false;
        }
        
        if (!data.weeklyHours || data.weeklyHours <= 0) {
            showAlert('Horas semanales son requeridas', 'error');
            return false;
        }
        
        if (!data.experience || data.experience < 0) {
            showAlert('Años de experiencia son requeridos', 'error');
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
    
    function addCertificationField(certification = '') {
        certificationCount++;
        const certificationDiv = document.createElement('div');
        certificationDiv.className = 'certification-input';
        certificationDiv.innerHTML = `
            <input type="text" class="certification-name" placeholder="Nombre de la certificación" value="${certification}">
            <button type="button" class="remove-certification" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        certificationsList.appendChild(certificationDiv);
    }
    
    function clearCertificationsList() {
        certificationsList.innerHTML = '';
        certificationCount = 0;
    }
    
    function getCertificationsFromForm() {
        const certificationInputs = certificationsList.querySelectorAll('.certification-name');
        const certifications = [];
        certificationInputs.forEach(input => {
            if (input.value.trim() !== '') {
                certifications.push(input.value.trim());
            }
        });
        return certifications;
    }
    
    function getAvailabilityFromForm() {
        const availability = {};
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        
        availabilityCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked && timeInputs[index].value) {
                availability[days[index]] = timeInputs[index].value;
            } else if (checkbox.checked) {
                availability[days[index]] = 'Disponible';
            } else {
                availability[days[index]] = 'No disponible';
            }
        });
        
        return availability;
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
    
    function getSpecialtyText(specialtyValue) {
        const specialties = {
            'technique': 'Técnica',
            'tactics': 'Táctica',
            'physical': 'Preparación Física',
            'mental': 'Preparación Mental',
            'goalkeeper': 'Especialista en Liberos',
            'general': 'Entrenador General'
        };
        return specialties[specialtyValue] || specialtyValue;
    }
    
    function getLevelText(levelValue) {
        const levels = {
            'junior': 'Junior',
            'senior': 'Senior',
            'head': 'Jefe de Equipo',
            'coordinator': 'Coordinador',
            'director': 'Director Técnico'
        };
        return levels[levelValue] || levelValue;
    }
    
    function getContractTypeText(contractValue) {
        const contracts = {
            'full-time': 'Tiempo Completo',
            'part-time': 'Medio Tiempo',
            'hourly': 'Por Hora',
            'seasonal': 'Temporal'
        };
        return contracts[contractValue] || contractValue;
    }
    
    function generateAvatarColor(gender) {
        const colors = {
            'female': ['#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4'],
            'male': ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
        };
        
        const genderColors = colors[gender] || colors['male'];
        return genderColors[Math.floor(Math.random() * genderColors.length)];
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

    // Funciones globales para acciones
    window.viewCoachProfile = function(id) {
        const coach = coaches.find(c => c.id === id);
        if (!coach) return;
        
        // Crear contenido del perfil
        const profileContent = createProfileContent(coach);
        
        // Actualizar modal
        document.getElementById('profileTitle').textContent = `Perfil de ${coach.fullName}`;
        profileModal.querySelector('.modal-body').innerHTML = profileContent;
        
        // Mostrar modal
        profileModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    function createProfileContent(coach) {
        const initials = `${coach.firstName.charAt(0)}${coach.lastName.charAt(0)}`;
        const specialtyText = getSpecialtyText(coach.specialty);
        const levelText = getLevelText(coach.level);
        const contractText = getContractTypeText(coach.contractType);
        
        // Calcular años en el club
        const hireDate = new Date(coach.hireDate);
        const today = new Date();
        let yearsInClub = today.getFullYear() - hireDate.getFullYear();
        const monthDiff = today.getMonth() - hireDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < hireDate.getDate())) {
            yearsInClub--;
        }
        
        return `
            <div class="coach-profile-header">
                <div class="coach-profile-avatar" style="background-color: ${coach.avatarColor}">
                    ${initials}
                </div>
                <div class="coach-profile-info">
                    <h2>${coach.fullName}</h2>
                    <p><strong>${specialtyText}</strong> • ${levelText}</p>
                    <p>${contractText} • ${coach.weeklyHours} horas semanales</p>
                    
                    <div class="coach-profile-stats">
                        <div class="coach-profile-stat">
                            <span class="coach-profile-stat-value">${coach.age}</span>
                            <span class="coach-profile-stat-label">Edad</span>
                        </div>
                        <div class="coach-profile-stat">
                            <span class="coach-profile-stat-value">${yearsInClub}</span>
                            <span class="coach-profile-stat-label">Años en el club</span>
                        </div>
                        <div class="coach-profile-stat">
                            <span class="coach-profile-stat-value">${coach.experience}</span>
                            <span class="coach-profile-stat-label">Años de experiencia</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-tabs">
                <button type="button" class="form-tab active" data-tab="info">Información</button>
                <button type="button" class="form-tab" data-tab="professional">Profesional</button>
                <button type="button" class="form-tab" data-tab="certifications">Certificaciones</button>
                <button type="button" class="form-tab" data-tab="availability">Disponibilidad</button>
            </div>
            
            <div class="tab-content active" id="infoTab">
                <div class="profile-section">
                    <h3>Información Personal</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Documento</span>
                            <span class="info-value">${coach.documentNumber}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Fecha de Nacimiento</span>
                            <span class="info-value">${formatDate(coach.birthDate)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Género</span>
                            <span class="info-value">${coach.gender === 'female' ? 'Femenino' : 'Masculino'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email</span>
                            <span class="info-value">${coach.email}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Teléfono</span>
                            <span class="info-value">${coach.phone}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Dirección</span>
                            <span class="info-value">${coach.address || 'No registrada'}</span>
                        </div>
                    </div>
                </div>
                
                ${coach.emergencyContact ? `
                <div class="profile-section">
                    <h3>Contacto de Emergencia</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Nombre</span>
                            <span class="info-value">${coach.emergencyContact}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Teléfono</span>
                            <span class="info-value">${coach.emergencyPhone}</span>
                        </div>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="tab-content" id="professionalTab">
                <div class="profile-section">
                    <h3>Información Profesional</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Especialidad</span>
                            <span class="info-value">${specialtyText}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Nivel</span>
                            <span class="info-value">${levelText}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Fecha de Contratación</span>
                            <span class="info-value">${formatDate(coach.hireDate)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Tipo de Contrato</span>
                            <span class="info-value">${contractText}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Horas Semanales</span>
                            <span class="info-value">${coach.weeklyHours}h</span>
                        </div>
                        ${coach.salary ? `
                        <div class="info-item">
                            <span class="info-label">Salario Mensual</span>
                            <span class="info-value">$${coach.salary.toFixed(2)}</span>
                        </div>
                        ` : ''}
                        <div class="info-item">
                            <span class="info-label">Licencia</span>
                            <span class="info-value">${coach.licenseNumber || 'No registrada'}</span>
                        </div>
                        ${coach.licenseExpiration ? `
                        <div class="info-item">
                            <span class="info-label">Vencimiento de Licencia</span>
                            <span class="info-value">${formatDate(coach.licenseExpiration)}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                ${coach.previousTeams ? `
                <div class="profile-section">
                    <h3>Equipos Anteriores</h3>
                    <p>${coach.previousTeams}</p>
                </div>
                ` : ''}
                
                ${coach.achievements ? `
                <div class="profile-section">
                    <h3>Logros y Reconocimientos</h3>
                    <p>${coach.achievements}</p>
                </div>
                ` : ''}
                
                ${coach.courses ? `
                <div class="profile-section">
                    <h3>Cursos Realizados</h3>
                    <p>${coach.courses}</p>
                </div>
                ` : ''}
            </div>
            
            <div class="tab-content" id="certificationsTab">
                <div class="profile-section">
                    <h3>Certificaciones</h3>
                    ${coach.certifications && coach.certifications.length > 0 ? 
                        coach.certifications.map(cert => `
                            <span class="certification-badge">${cert}</span>
                        `).join('') :
                        '<p>No hay certificaciones registradas</p>'
                    }
                </div>
            </div>
            
            <div class="tab-content" id="availabilityTab">
                <div class="profile-section">
                    <h3>Disponibilidad Semanal</h3>
                    <div class="availability-options">
                        ${Object.entries(coach.availability).map(([day, time]) => `
                            <div class="availability-day-option">
                                <label>${getDayName(day)}:</label>
                                <span>${time}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="availability-info" style="margin-top: 1.5rem;">
                        <p><strong>Disponibilidad para viajes:</strong> ${coach.availableForTravel ? 'Sí' : 'No'}</p>
                        <p><strong>Disponible fines de semana:</strong> ${coach.availableWeekends ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions" style="margin-top: 2rem;">
                <button type="button" class="btn-secondary close-modal">Cerrar</button>
                <button type="button" class="btn-primary" onclick="editCoach(${coach.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </div>
        `;
    }
    
    function getDayName(dayKey) {
        const days = {
            'monday': 'Lunes',
            'tuesday': 'Martes',
            'wednesday': 'Miércoles',
            'thursday': 'Jueves',
            'friday': 'Viernes',
            'saturday': 'Sábado',
            'sunday': 'Domingo'
        };
        return days[dayKey] || dayKey;
    }
    
    window.editCoach = function(id) {
        const coach = coaches.find(c => c.id === id);
        if (!coach) return;
        
        // Cerrar modales abiertos
        coachModal.classList.remove('active');
        profileModal.classList.remove('active');
        
        // Llenar formulario con datos del entrenador
        document.getElementById('firstName').value = coach.firstName;
        document.getElementById('lastName').value = coach.lastName;
        document.getElementById('documentType').value = coach.documentType;
        document.getElementById('documentNumber').value = coach.documentNumber;
        document.getElementById('birthDate').value = coach.birthDate;
        document.getElementById('gender').value = coach.gender;
        document.getElementById('email').value = coach.email;
        document.getElementById('phone').value = coach.phone;
        document.getElementById('address').value = coach.address || '';
        document.getElementById('emergencyContact').value = coach.emergencyContact || '';
        document.getElementById('emergencyPhone').value = coach.emergencyPhone || '';
        document.getElementById('specialty').value = coach.specialty;
        document.getElementById('level').value = coach.level;
        document.getElementById('hireDate').value = coach.hireDate;
        document.getElementById('contractType').value = coach.contractType;
        document.getElementById('salary').value = coach.salary || '';
        document.getElementById('weeklyHours').value = coach.weeklyHours;
        document.getElementById('experience').value = coach.experience;
        document.getElementById('previousTeams').value = coach.previousTeams || '';
        document.getElementById('achievements').value = coach.achievements || '';
        document.getElementById('licenseNumber').value = coach.licenseNumber || '';
        document.getElementById('licenseExpiration').value = coach.licenseExpiration || '';
        document.getElementById('certificationLevel').value = coach.certificationLevel || '';
        document.getElementById('courses').value = coach.courses || '';
        document.getElementById('availableForTravel').checked = coach.availableForTravel;
        document.getElementById('availableWeekends').checked = coach.availableWeekends;
        document.getElementById('notes').value = coach.notes || '';
        
        // Cargar certificaciones
        clearCertificationsList();
        if (coach.certifications && coach.certifications.length > 0) {
            coach.certifications.forEach(cert => {
                addCertificationField(cert);
            });
        }
        
        // Cargar disponibilidad
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        days.forEach((day, index) => {
            const checkbox = availabilityCheckboxes[index];
            const timeInput = timeInputs[index];
            
            if (coach.availability && coach.availability[day]) {
                const availability = coach.availability[day];
                if (availability !== 'No disponible' && availability !== 'Libre') {
                    checkbox.checked = true;
                    timeInput.disabled = false;
                    timeInput.value = availability;
                } else if (availability === 'Disponible' || availability === 'Libre') {
                    checkbox.checked = true;
                    timeInput.disabled = false;
                    timeInput.value = '';
                } else {
                    checkbox.checked = false;
                    timeInput.disabled = true;
                    timeInput.value = '';
                }
            }
        });
        
        // Actualizar título del modal
        document.getElementById('modalTitle').textContent = `Editar Entrenador #${id}`;
        
        // Activar primera pestaña
        resetFormTabs();
        
        // Guardar ID para actualización
        editingCoachId = id;
        
        // Abrir modal de edición
        coachModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.deleteCoach = function(id) {
        if (confirm('¿Está seguro de eliminar este entrenador?\nEsta acción no se puede deshacer.')) {
            const index = coaches.findIndex(c => c.id === id);
            if (index !== -1) {
                coaches.splice(index, 1);
                loadCoachesGrid(coaches);
                showAlert('Entrenador eliminado exitosamente', 'success');
            }
        }
    };

    // Configurar pestañas en el perfil
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('form-tab') && profileModal.classList.contains('active')) {
            const tabId = e.target.getAttribute('data-tab');
            const tabs = document.querySelectorAll('.form-tab');
            const contents = document.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            e.target.classList.add('active');
            
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}Tab`) {
                    content.classList.add('active');
                }
            });
        }
    });
});