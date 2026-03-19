document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo
    const sampleAthletes = [
        { id: 1, name: "Ana García", team: "principal", document: "12345678", avatarColor: "#3b82f6" },
        { id: 2, name: "Carlos López", team: "principal", document: "23456789", avatarColor: "#ef4444" },
        { id: 3, name: "María Rodríguez", team: "femenino", document: "34567890", avatarColor: "#8b5cf6" },
        { id: 4, name: "Javier Pérez", team: "sub21", document: "45678901", avatarColor: "#10b981" },
        { id: 5, name: "Laura Martínez", team: "sub18", document: "56789012", avatarColor: "#f59e0b" },
        { id: 6, name: "Diego Sánchez", team: "sub21", document: "67890123", avatarColor: "#ec4899" },
        { id: 7, name: "Sofía Hernández", team: "femenino", document: "78901234", avatarColor: "#06b6d4" },
        { id: 8, name: "Pedro Ramírez", team: "principal", document: "89012345", avatarColor: "#8b5cf6" }
    ];

    const sampleCoaches = [
        { id: 1, name: "Carlos López" },
        { id: 2, name: "Ana García" },
        { id: 3, name: "María Rodríguez" },
        { id: 4, name: "Javier Pérez" }
    ];

    const sampleSessions = [
        {
            id: 1,
            title: "Entrenamiento Técnico",
            type: "training",
            date: getTodayDate(),
            startTime: "08:00",
            endTime: "10:00",
            teams: ["principal", "sub21"],
            location: "Cancha 1",
            coachId: 1,
            coachName: "Carlos López",
            status: "active",
            attendance: [
                { athleteId: 1, checkIn: "08:05", checkOut: "09:55", status: "present" },
                { athleteId: 2, checkIn: "08:15", checkOut: "09:50", status: "late" },
                { athleteId: 4, checkIn: null, checkOut: null, status: "absent" },
                { athleteId: 8, checkIn: "08:00", checkOut: "10:00", status: "present" }
            ]
        },
        {
            id: 2,
            title: "Preparación Física",
            type: "training",
            date: getTodayDate(),
            startTime: "10:30",
            endTime: "12:30",
            teams: ["femenino", "sub18"],
            location: "Gimnasio",
            coachId: 2,
            coachName: "Ana García",
            status: "upcoming",
            attendance: []
        },
        {
            id: 3,
            title: "Partido de Práctica",
            type: "game",
            date: getTodayDate(),
            startTime: "15:00",
            endTime: "17:00",
            teams: ["principal"],
            location: "Cancha Principal",
            coachId: 1,
            coachName: "Carlos López",
            status: "upcoming",
            attendance: []
        },
        {
            id: 4,
            title: "Entrenamiento Matutino",
            type: "training",
            date: getYesterdayDate(),
            startTime: "08:00",
            endTime: "10:00",
            teams: ["principal", "sub21", "femenino"],
            location: "Cancha 2",
            coachId: 3,
            coachName: "María Rodríguez",
            status: "completed",
            attendance: [
                { athleteId: 1, checkIn: "08:00", checkOut: "10:00", status: "present" },
                { athleteId: 2, checkIn: "08:10", checkOut: "09:45", status: "late" },
                { athleteId: 3, checkIn: "08:05", checkOut: "10:00", status: "present" },
                { athleteId: 5, checkIn: null, checkOut: null, status: "excused" },
                { athleteId: 7, checkIn: "08:00", checkOut: "09:30", status: "present" }
            ]
        }
    ];

    // Variables globales
    let sessions = [...sampleSessions];
    let currentSessionId = null;
    let qrScanner = null;
    let scanning = false;

    // Elementos del DOM
    const sessionsGrid = document.getElementById('sessionsGrid');
    const attendanceTableBody = document.getElementById('attendanceTableBody');
    const sessionModal = document.getElementById('sessionModal');
    const excuseModal = document.getElementById('excuseModal');
    const detailModal = document.getElementById('detailModal');
    const newSessionBtn = document.getElementById('newSessionBtn');
    const quickCheckinBtn = document.getElementById('quickCheckinBtn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const sessionForm = document.getElementById('sessionForm');
    const excuseForm = document.getElementById('excuseForm');
    const athleteSelect = document.getElementById('athleteSelect');
    const sessionSelect = document.getElementById('sessionSelect');
    const manualCheckinBtn = document.getElementById('manualCheckinBtn');
    const startScannerBtn = document.getElementById('startScannerBtn');
    const qrScannerContainer = document.getElementById('qrScanner');
    const filterDate = document.getElementById('filterDate');
    const filterTeam = document.getElementById('filterTeam');
    const filterSession = document.getElementById('filterSession');
    const filterStatus = document.getElementById('filterStatus');
    const uploadEvidenceBtn = document.getElementById('uploadEvidenceBtn');
    const excuseEvidence = document.getElementById('excuseEvidence');

    // Inicializar selectores de fecha y hora
    const datePicker = flatpickr(filterDate, {
        locale: "es",
        dateFormat: "Y-m-d",
        defaultDate: "today",
        onChange: applyFilters
    });

    const sessionDatePicker = flatpickr(document.getElementById('sessionDate'), {
        locale: "es",
        dateFormat: "Y-m-d",
        defaultDate: "today"
    });

    const startTimePicker = flatpickr(document.getElementById('startTime'), {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultHour: 8,
        defaultMinute: 0
    });

    const endTimePicker = flatpickr(document.getElementById('endTime'), {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultHour: 10,
        defaultMinute: 0
    });

    // Cargar datos iniciales
    loadActiveSessions();
    loadAttendanceTable();
    loadAthleteSelect();
    loadSessionSelect();
    loadCoachSelect();

    // Abrir modal para nueva sesión
    newSessionBtn.addEventListener('click', () => {
        sessionModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Check-in rápido
    quickCheckinBtn.addEventListener('click', () => {
        showQuickCheckin();
    });

    // Iniciar escáner QR
    startScannerBtn.addEventListener('click', () => {
        if (!scanning) {
            startQRScanner();
        } else {
            stopQRScanner();
        }
    });

    // Check-in manual
    manualCheckinBtn.addEventListener('click', () => {
        const athleteId = parseInt(athleteSelect.value);
        const sessionId = parseInt(sessionSelect.value);
        
        if (!athleteId || !sessionId) {
            showAlert('Seleccione un atleta y una sesión', 'error');
            return;
        }
        
        registerCheckin(athleteId, sessionId);
    });

    // Subir evidencia
    uploadEvidenceBtn.addEventListener('click', () => {
        excuseEvidence.click();
    });

    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sessionModal.classList.remove('active');
            excuseModal.classList.remove('active');
            detailModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Detener escáner si está activo
            if (scanning) {
                stopQRScanner();
            }
        });
    });

    // Cerrar modales al hacer clic fuera
    [sessionModal, excuseModal, detailModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                if (modal === excuseModal && scanning) {
                    stopQRScanner();
                }
            }
        });
    });

    // Filtrar asistencias
    filterTeam.addEventListener('change', applyFilters);
    filterSession.addEventListener('change', applyFilters);
    filterStatus.addEventListener('change', applyFilters);

    // Enviar formulario de sesión
    sessionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const sessionData = getSessionFormData();
        
        if (!validateSessionForm(sessionData)) {
            return;
        }
        
        const newSession = {
            id: sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1,
            title: sessionData.title,
            type: sessionData.type,
            date: sessionData.date,
            startTime: sessionData.startTime,
            endTime: sessionData.endTime,
            teams: sessionData.teams,
            location: sessionData.location,
            coachId: parseInt(sessionData.coachId),
            coachName: sampleCoaches.find(c => c.id === parseInt(sessionData.coachId))?.name || 'Sin asignar',
            status: "upcoming",
            attendance: [],
            notes: sessionData.notes
        };
        
        sessions.push(newSession);
        showAlert('Sesión creada exitosamente', 'success');
        
        sessionModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        sessionForm.reset();
        
        loadActiveSessions();
        loadSessionSelect();
    });

    // Enviar formulario de justificación
    excuseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const excuseData = {
            athleteId: parseInt(document.getElementById('excuseAthlete').dataset.id),
            sessionId: parseInt(document.getElementById('excuseSession').dataset.id),
            type: document.getElementById('excuseType').value,
            reason: document.getElementById('excuseReason').value,
            evidence: excuseEvidence.files.length > 0 ? excuseEvidence.files[0].name : null
        };
        
        if (!excuseData.type || !excuseData.reason) {
            showAlert('Complete todos los campos requeridos', 'error');
            return;
        }
        
        // Actualizar asistencia
        const session = sessions.find(s => s.id === excuseData.sessionId);
        if (session) {
            const attendance = session.attendance.find(a => a.athleteId === excuseData.athleteId);
            if (attendance) {
                attendance.status = 'excused';
                attendance.excuse = {
                    type: excuseData.type,
                    reason: excuseData.reason,
                    date: getTodayDate(),
                    evidence: excuseData.evidence
                };
                
                showAlert('Ausencia justificada exitosamente', 'success');
                loadAttendanceTable();
                excuseModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                excuseForm.reset();
            }
        }
    });

    // Funciones principales
    function loadActiveSessions() {
        sessionsGrid.innerHTML = '';
        
        const today = getTodayDate();
        const activeSessions = sessions.filter(session => 
            session.date === today && (session.status === 'active' || session.status === 'upcoming')
        );
        
        if (activeSessions.length === 0) {
            sessionsGrid.innerHTML = `
                <div class="no-sessions" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <i class="fas fa-calendar-times" style="font-size: 2rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                    <p>No hay sesiones activas hoy</p>
                    <button class="btn-secondary" id="newSessionBtn2">
                        <i class="fas fa-plus"></i> Crear Sesión
                    </button>
                </div>
            `;
            
            document.getElementById('newSessionBtn2')?.addEventListener('click', () => {
                sessionModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            return;
        }
        
        activeSessions.forEach(session => {
            const sessionCard = createSessionCard(session);
            sessionsGrid.appendChild(sessionCard);
        });
    }
    
    function createSessionCard(session) {
        const card = document.createElement('div');
        card.className = `session-card ${session.status}`;
        
        // Calcular atletas esperados
        const expectedAthletes = sampleAthletes.filter(athlete => 
            session.teams.includes(athlete.team)
        ).length;
        
        // Calcular atletas presentes
        const presentAthletes = session.attendance.filter(a => 
            a.status === 'present' || a.status === 'late'
        ).length;
        
        // Texto de estado
        let statusText, statusClass;
        switch(session.status) {
            case 'active':
                statusText = 'En Curso';
                statusClass = 'status-active';
                break;
            case 'upcoming':
                statusText = 'Próxima';
                statusClass = 'status-upcoming';
                break;
            case 'completed':
                statusText = 'Completada';
                statusClass = 'status-completed';
                break;
            default:
                statusText = 'Programada';
                statusClass = 'status-upcoming';
        }
        
        card.innerHTML = `
            <div class="session-header">
                <div>
                    <h4 class="session-title">${session.title}</h4>
                    <div class="session-time">
                        <i class="far fa-clock"></i> ${session.startTime} - ${session.endTime}
                    </div>
                </div>
                <span class="session-status ${statusClass}">${statusText}</span>
            </div>
            
            <div class="session-details">
                <div class="session-detail">
                    <i class="fas fa-user-tie"></i>
                    <span>${session.coachName}</span>
                </div>
                <div class="session-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${session.location}</span>
                </div>
            </div>
            
            <div class="session-progress">
                <div class="progress-info">
                    <span>Asistencia: ${presentAthletes}/${expectedAthletes}</span>
                    <span>${expectedAthletes > 0 ? Math.round((presentAthletes / expectedAthletes) * 100) : 0}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${expectedAthletes > 0 ? (presentAthletes / expectedAthletes) * 100 : 0}%"></div>
                </div>
            </div>
            
            <div class="session-actions">
                ${session.status === 'active' ? `
                <button class="btn-primary small" onclick="manageAttendance(${session.id})">
                    <i class="fas fa-clipboard-check"></i> Gestionar
                </button>
                ` : ''}
                <button class="btn-secondary small" onclick="viewSessionDetails(${session.id})">
                    <i class="fas fa-eye"></i> Detalles
                </button>
            </div>
        `;
        
        return card;
    }
    
    function loadAttendanceTable() {
        attendanceTableBody.innerHTML = '';
        
        let filteredData = getAllAttendanceRecords();
        
        // Aplicar filtros
        const selectedDate = filterDate.value;
        const selectedTeam = filterTeam.value;
        const selectedSession = filterSession.value;
        const selectedStatus = filterStatus.value;
        
        if (selectedDate) {
            filteredData = filteredData.filter(record => record.sessionDate === selectedDate);
        }
        
        if (selectedTeam !== 'all') {
            filteredData = filteredData.filter(record => record.athleteTeam === selectedTeam);
        }
        
        if (selectedSession !== 'all') {
            filteredData = filteredData.filter(record => record.sessionType === selectedSession);
        }
        
        if (selectedStatus !== 'all') {
            filteredData = filteredData.filter(record => record.status === selectedStatus);
        }
        
        if (filteredData.length === 0) {
            attendanceTableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2rem;">
                        <i class="fas fa-clipboard-list" style="font-size: 2rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                        <p>No hay registros de asistencia</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        filteredData.forEach(record => {
            const row = createAttendanceRow(record);
            attendanceTableBody.appendChild(row);
        });
    }
    
    function getAllAttendanceRecords() {
        const records = [];
        
        sessions.forEach(session => {
            session.attendance.forEach(attendance => {
                const athlete = sampleAthletes.find(a => a.id === attendance.athleteId);
                if (athlete) {
                    records.push({
                        athleteId: athlete.id,
                        athleteName: athlete.name,
                        athleteTeam: athlete.team,
                        sessionId: session.id,
                        sessionTitle: session.title,
                        sessionDate: session.date,
                        sessionType: getSessionType(session.startTime),
                        scheduledTime: session.startTime,
                        checkIn: attendance.checkIn,
                        checkOut: attendance.checkOut,
                        status: attendance.status,
                        duration: calculateDuration(attendance.checkIn, attendance.checkOut)
                    });
                }
            });
        });
        
        return records;
    }
    
    function createAttendanceRow(record) {
        const row = document.createElement('tr');
        
        // Estado y clases
        let statusClass, statusText;
        switch(record.status) {
            case 'present':
                statusClass = 'status-present';
                statusText = 'Presente';
                break;
            case 'absent':
                statusClass = 'status-absent';
                statusText = 'Ausente';
                break;
            case 'late':
                statusClass = 'status-late';
                statusText = 'Tardanza';
                break;
            case 'excused':
                statusClass = 'status-excused';
                statusText = 'Justificado';
                break;
            default:
                statusClass = 'status-absent';
                statusText = 'Ausente';
        }
        
        // Calcular si es tardanza
        const isLate = record.checkIn && isTimeLate(record.checkIn, record.scheduledTime);
        const finalStatus = isLate && record.status === 'present' ? 'late' : record.status;
        const finalStatusClass = isLate && record.status === 'present' ? 'status-late' : statusClass;
        const finalStatusText = isLate && record.status === 'present' ? 'Tardanza' : statusText;
        
        row.innerHTML = `
            <td>
                <div class="athlete-name">
                    <div class="athlete-avatar small" style="background-color: ${getAthleteColor(record.athleteId)}">
                        ${getInitials(record.athleteName)}
                    </div>
                    <div class="athlete-info">
                        <h4>${record.athleteName}</h4>
                        <p>${record.athleteTeam.toUpperCase()}</p>
                    </div>
                </div>
            </td>
            <td><span class="team-badge">${getTeamText(record.athleteTeam)}</span></td>
            <td>${record.sessionTitle}</td>
            <td>${record.scheduledTime}</td>
            <td class="checkin-time">${record.checkIn || '-'}</td>
            <td class="checkin-time">${record.checkOut || '-'}</td>
            <td><span class="attendance-status ${finalStatusClass}">${finalStatusText}</span></td>
            <td class="duration">${record.duration}</td>
            <td>
                <div class="action-buttons">
                    ${record.status === 'absent' ? `
                    <button class="btn-icon" title="Justificar ausencia" onclick="excuseAbsence(${record.athleteId}, ${record.sessionId}, '${record.athleteName}', '${record.sessionTitle}')">
                        <i class="fas fa-file-medical"></i>
                    </button>
                    ` : ''}
                    <button class="btn-icon" title="Ver detalles" onclick="viewAttendanceDetails(${record.athleteId}, ${record.sessionId})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" title="Editar" onclick="editAttendance(${record.athleteId}, ${record.sessionId})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        
        return row;
    }
    
    function loadAthleteSelect() {
        athleteSelect.innerHTML = '<option value="">Seleccionar atleta...</option>';
        sampleAthletes.forEach(athlete => {
            const option = document.createElement('option');
            option.value = athlete.id;
            option.textContent = `${athlete.name} (${getTeamText(athlete.team)})`;
            athleteSelect.appendChild(option);
        });
    }
    
    function loadSessionSelect() {
        sessionSelect.innerHTML = '<option value="">Seleccionar sesión...</option>';
        const today = getTodayDate();
        const activeSessions = sessions.filter(s => s.date === today && s.status !== 'completed');
        
        activeSessions.forEach(session => {
            const option = document.createElement('option');
            option.value = session.id;
            option.textContent = `${session.title} (${session.startTime} - ${session.endTime})`;
            sessionSelect.appendChild(option);
        });
    }
    
    function loadCoachSelect() {
        const coachSelect = document.getElementById('sessionCoach');
        coachSelect.innerHTML = '<option value="">Seleccionar entrenador...</option>';
        sampleCoaches.forEach(coach => {
            const option = document.createElement('option');
            option.value = coach.id;
            option.textContent = coach.name;
            coachSelect.appendChild(option);
        });
    }
    
    function showQuickCheckin() {
        // En un sistema real, esto abriría una pantalla completa para check-in
        showAlert('Modo check-in rápido activado', 'info');
        
        // Simular check-in automático después de 2 segundos
        setTimeout(() => {
            const randomAthlete = sampleAthletes[Math.floor(Math.random() * sampleAthletes.length)];
            const activeSession = sessions.find(s => s.status === 'active');
            
            if (activeSession) {
                registerCheckin(randomAthlete.id, activeSession.id);
            }
        }, 2000);
    }
    
    function startQRScanner() {
        if (!qrScanner) {
            qrScanner = new Html5Qrcode("qrScanner");
        }
        
        const qrConfig = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            rememberLastUsedCamera: true
        };
        
        qrScanner.start(
            { facingMode: "environment" },
            qrConfig,
            onQRScanSuccess,
            onQRScanError
        ).then(() => {
            scanning = true;
            startScannerBtn.innerHTML = '<i class="fas fa-stop"></i> Detener Escáner';
            startScannerBtn.classList.add('btn-danger');
            startScannerBtn.classList.remove('btn-secondary');
        }).catch(err => {
            console.error("Error al iniciar el escáner:", err);
            showAlert('No se pudo acceder a la cámara', 'error');
        });
    }
    
    function stopQRScanner() {
        if (qrScanner && scanning) {
            qrScanner.stop().then(() => {
                scanning = false;
                startScannerBtn.innerHTML = '<i class="fas fa-camera"></i> Iniciar Escáner';
                startScannerBtn.classList.remove('btn-danger');
                startScannerBtn.classList.add('btn-secondary');
            }).catch(err => {
                console.error("Error al detener el escáner:", err);
            });
        }
    }
    
    function onQRScanSuccess(decodedText) {
        try {
            const qrData = JSON.parse(decodedText);
            if (qrData.athleteId && qrData.sessionId) {
                registerCheckin(qrData.athleteId, qrData.sessionId);
                
                // Detener escáner después de lectura exitosa
                stopQRScanner();
                
                // Mostrar confirmación
                const athlete = sampleAthletes.find(a => a.id === qrData.athleteId);
                if (athlete) {
                    showAlert(`Check-in registrado para ${athlete.name}`, 'success');
                }
            }
        } catch (error) {
            console.error("Error al procesar QR:", error);
            showAlert('Código QR inválido', 'error');
        }
    }
    
    function onQRScanError(error) {
        // No mostrar errores en consola para el usuario
        console.warn("Error de escaneo QR:", error);
    }
    
    function registerCheckin(athleteId, sessionId) {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) {
            showAlert('Sesión no encontrada', 'error');
            return;
        }
        
        // Verificar que el atleta pertenezca al equipo
        const athlete = sampleAthletes.find(a => a.id === athleteId);
        if (!athlete || !session.teams.includes(athlete.team)) {
            showAlert('El atleta no pertenece a esta sesión', 'error');
            return;
        }
        
        // Verificar si ya tiene registro
        const existingRecord = session.attendance.find(a => a.athleteId === athleteId);
        
        if (existingRecord) {
            // Si ya check-in, hacer check-out
            if (existingRecord.checkIn && !existingRecord.checkOut) {
                existingRecord.checkOut = getCurrentTime();
                showAlert(`Check-out registrado para ${athlete.name}`, 'success');
            } else if (existingRecord.checkIn && existingRecord.checkOut) {
                showAlert('El atleta ya completó la sesión', 'info');
            }
        } else {
            // Nuevo check-in
            const checkInTime = getCurrentTime();
            const isLate = isTimeLate(checkInTime, session.startTime);
            
            session.attendance.push({
                athleteId: athleteId,
                checkIn: checkInTime,
                checkOut: null,
                status: isLate ? 'late' : 'present'
            });
            
            showAlert(`Check-in registrado para ${athlete.name} ${isLate ? '(Tardanza)' : ''}`, 'success');
        }
        
        // Actualizar interfaces
        loadActiveSessions();
        loadAttendanceTable();
        
        // Limpiar selects
        athleteSelect.value = '';
        sessionSelect.value = '';
    }
    
    function getSessionFormData() {
        const teams = Array.from(document.querySelectorAll('input[name="teams"]:checked'))
            .map(cb => cb.value);
        
        return {
            title: document.getElementById('sessionTitle').value,
            type: document.getElementById('sessionType').value,
            date: document.getElementById('sessionDate').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            teams: teams,
            location: document.getElementById('sessionLocation').value,
            coachId: document.getElementById('sessionCoach').value,
            notes: document.getElementById('sessionNotes').value
        };
    }
    
    function validateSessionForm(data) {
        if (!data.title || !data.type || !data.date || !data.startTime || !data.endTime) {
            showAlert('Complete todos los campos requeridos', 'error');
            return false;
        }
        
        if (data.teams.length === 0) {
            showAlert('Seleccione al menos un equipo', 'error');
            return false;
        }
        
        if (!data.coachId) {
            showAlert('Seleccione un entrenador responsable', 'error');
            return false;
        }
        
        if (data.startTime >= data.endTime) {
            showAlert('La hora de inicio debe ser anterior a la hora de fin', 'error');
            return false;
        }
        
        return true;
    }
    
    function applyFilters() {
        loadAttendanceTable();
    }
    
    // Funciones de utilidad
    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    function getYesterdayDate() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }
    
    function isTimeLate(checkInTime, scheduledTime) {
        if (!checkInTime) return false;
        
        const [checkInHours, checkInMinutes] = checkInTime.split(':').map(Number);
        const [scheduledHours, scheduledMinutes] = scheduledTime.split(':').map(Number);
        
        const checkInTotal = checkInHours * 60 + checkInMinutes;
        const scheduledTotal = scheduledHours * 60 + scheduledMinutes;
        
        return checkInTotal > scheduledTotal + 5; // 5 minutos de tolerancia
    }
    
    function calculateDuration(checkIn, checkOut) {
        if (!checkIn || !checkOut) return '-';
        
        const [inHours, inMinutes] = checkIn.split(':').map(Number);
        const [outHours, outMinutes] = checkOut.split(':').map(Number);
        
        const durationMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        
        return `${hours}h ${minutes}m`;
    }
    
    function getSessionType(startTime) {
        const hour = parseInt(startTime.split(':')[0]);
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
    }
    
    function getTeamText(team) {
        const teams = {
            'principal': 'Principal',
            'sub21': 'Sub-21',
            'sub18': 'Sub-18',
            'femenino': 'Femenino'
        };
        return teams[team] || team;
    }
    
    function getAthleteColor(athleteId) {
        const athlete = sampleAthletes.find(a => a.id === athleteId);
        return athlete ? athlete.avatarColor : '#6b7280';
    }
    
    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
        } else if (type === 'info') {
            alertDiv.style.backgroundColor = '#3b82f6';
        } else if (type === 'warning') {
            alertDiv.style.backgroundColor = '#f59e0b';
        }
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }

    // Funciones globales para acciones
    window.manageAttendance = function(sessionId) {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;
        
        // Cambiar estado a activo si está upcoming
        if (session.status === 'upcoming') {
            session.status = 'active';
            loadActiveSessions();
        }
        
        // Mostrar modal de gestión
        showAttendanceManagement(session);
    };
    
    window.viewSessionDetails = function(sessionId) {
        const session = sessions.find(s => s.id === sessionId);
        if (!session) return;
        
        const detailContent = createSessionDetailContent(session);
        
        document.getElementById('detailTitle').textContent = 'Detalles de Sesión';
        detailModal.querySelector('.modal-body').innerHTML = detailContent;
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.excuseAbsence = function(athleteId, sessionId, athleteName, sessionTitle) {
        document.getElementById('excuseTitle').textContent = `Justificar Ausencia - ${athleteName}`;
        document.getElementById('excuseAthlete').value = athleteName;
        document.getElementById('excuseAthlete').dataset.id = athleteId;
        document.getElementById('excuseSession').value = sessionTitle;
        document.getElementById('excuseSession').dataset.id = sessionId;
        
        excuseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.viewAttendanceDetails = function(athleteId, sessionId) {
        const session = sessions.find(s => s.id === sessionId);
        const athlete = sampleAthletes.find(a => a.id === athleteId);
        const attendance = session?.attendance.find(a => a.athleteId === athleteId);
        
        if (!session || !athlete || !attendance) return;
        
        const detailContent = createAttendanceDetailContent(athlete, session, attendance);
        
        document.getElementById('detailTitle').textContent = 'Detalles de Asistencia';
        detailModal.querySelector('.modal-body').innerHTML = detailContent;
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.editAttendance = function(athleteId, sessionId) {
        const session = sessions.find(s => s.id === sessionId);
        const athlete = sampleAthletes.find(a => a.id === athleteId);
        
        if (!session || !athlete) return;
        
        // En un sistema real, esto abriría un formulario de edición
        // Por ahora, mostramos una alerta con opciones
        const options = ['Presente', 'Ausente', 'Tardanza', 'Justificado'];
        const currentStatus = session.attendance.find(a => a.athleteId === athleteId)?.status || 'absent';
        
        let message = `Editar asistencia de ${athlete.name}\n\n`;
        message += `Sesión: ${session.title}\n`;
        message += `Estado actual: ${getStatusText(currentStatus)}\n\n`;
        message += 'Seleccione nuevo estado:';
        
        const newStatus = prompt(message + '\n\n1. Presente\n2. Ausente\n3. Tardanza\n4. Justificado\n\nIngrese número:');
        
        if (newStatus) {
            const statusMap = {'1': 'present', '2': 'absent', '3': 'late', '4': 'excused'};
            const selectedStatus = statusMap[newStatus];
            
            if (selectedStatus) {
                let attendance = session.attendance.find(a => a.athleteId === athleteId);
                
                if (!attendance) {
                    attendance = { athleteId: athleteId, checkIn: null, checkOut: null, status: selectedStatus };
                    session.attendance.push(attendance);
                } else {
                    attendance.status = selectedStatus;
                    
                    // Si se marca como presente sin check-in, agregar hora actual
                    if (selectedStatus === 'present' && !attendance.checkIn) {
                        attendance.checkIn = getCurrentTime();
                    }
                    
                    // Si se marca como ausente, limpiar check-in/out
                    if (selectedStatus === 'absent' || selectedStatus === 'excused') {
                        attendance.checkIn = null;
                        attendance.checkOut = null;
                    }
                }
                
                showAlert('Asistencia actualizada exitosamente', 'success');
                loadAttendanceTable();
                loadActiveSessions();
            }
        }
    };
    
    function createSessionDetailContent(session) {
        const expectedAthletes = sampleAthletes.filter(athlete => 
            session.teams.includes(athlete.team)
        );
        
        const presentAthletes = session.attendance.filter(a => 
            a.status === 'present' || a.status === 'late'
        ).length;
        
        const attendanceRate = expectedAthletes.length > 0 ? 
            Math.round((presentAthletes / expectedAthletes.length) * 100) : 0;
        
        return `
            <div class="attendance-detail">
                <div class="detail-header">
                    <div class="detail-avatar" style="background-color: #3b82f6">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <div class="detail-info">
                        <h4>${session.title}</h4>
                        <p>${session.coachName} • ${session.location}</p>
                        <p>${session.date} • ${session.startTime} - ${session.endTime}</p>
                    </div>
                </div>
                
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Estado</span>
                        <span class="detail-value">${getSessionStatusText(session.status)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo</span>
                        <span class="detail-value">${getSessionTypeText(session.type)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Equipos</span>
                        <span class="detail-value">${session.teams.map(t => getTeamText(t)).join(', ')}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Asistencia</span>
                        <span class="detail-value">${presentAthletes}/${expectedAthletes.length} (${attendanceRate}%)</span>
                    </div>
                </div>
                
                ${session.notes ? `
                <div class="detail-item">
                    <span class="detail-label">Notas</span>
                    <p>${session.notes}</p>
                </div>
                ` : ''}
                
                <div class="detail-actions">
                    <button class="btn-secondary" onclick="detailModal.classList.remove('active'); document.body.style.overflow='auto'">
                        Cerrar
                    </button>
                    ${session.status !== 'completed' ? `
                    <button class="btn-primary" onclick="manageAttendance(${session.id}); detailModal.classList.remove('active');">
                        <i class="fas fa-clipboard-check"></i> Gestionar Asistencia
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    function createAttendanceDetailContent(athlete, session, attendance) {
        const initials = getInitials(athlete.name);
        
        return `
            <div class="attendance-detail">
                <div class="detail-header">
                    <div class="detail-avatar" style="background-color: ${athlete.avatarColor}">
                        ${initials}
                    </div>
                    <div class="detail-info">
                        <h4>${athlete.name}</h4>
                        <p>${getTeamText(athlete.team)} • ${athlete.document}</p>
                        <p>${session.title} • ${session.date}</p>
                    </div>
                </div>
                
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Estado</span>
                        <span class="detail-value ${getStatusClass(attendance.status)}">
                            ${getStatusText(attendance.status)}
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Hora Programada</span>
                        <span class="detail-value">${session.startTime}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Check-in</span>
                        <span class="detail-value">${attendance.checkIn || 'No registrado'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Check-out</span>
                        <span class="detail-value">${attendance.checkOut || 'No registrado'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duración</span>
                        <span class="detail-value">${calculateDuration(attendance.checkIn, attendance.checkOut)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Entrenador</span>
                        <span class="detail-value">${session.coachName}</span>
                    </div>
                </div>
                
                ${attendance.excuse ? `
                <div class="detail-item" style="grid-column: 1 / -1; background-color: #f0f9ff;">
                    <span class="detail-label">Justificación</span>
                    <div>
                        <p><strong>Tipo:</strong> ${getExcuseTypeText(attendance.excuse.type)}</p>
                        <p><strong>Razón:</strong> ${attendance.excuse.reason}</p>
                        <p><strong>Fecha:</strong> ${attendance.excuse.date}</p>
                        ${attendance.excuse.evidence ? `<p><strong>Evidencia:</strong> ${attendance.excuse.evidence}</p>` : ''}
                    </div>
                </div>
                ` : ''}
                
                <div class="detail-actions">
                    <button class="btn-secondary" onclick="detailModal.classList.remove('active'); document.body.style.overflow='auto'">
                        Cerrar
                    </button>
                    <button class="btn-primary" onclick="editAttendance(${athlete.id}, ${session.id}); detailModal.classList.remove('active');">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </div>
            </div>
        `;
    }
    
    function showAttendanceManagement(session) {
        // En un sistema real, esto mostraría una interfaz para gestionar asistencia en tiempo real
        // Por ahora, mostramos una alerta con información
        
        const expectedAthletes = sampleAthletes.filter(athlete => 
            session.teams.includes(athlete.team)
        );
        
        let message = `Gestionar Asistencia: ${session.title}\n\n`;
        message += `Hora: ${session.startTime} - ${session.endTime}\n`;
        message += `Ubicación: ${session.location}\n`;
        message += `Entrenador: ${session.coachName}\n\n`;
        message += `Atletas esperados (${expectedAthletes.length}):\n`;
        
        expectedAthletes.forEach((athlete, index) => {
            const attendance = session.attendance.find(a => a.athleteId === athlete.id);
            const status = attendance ? getStatusText(attendance.status) : 'Ausente';
            const checkIn = attendance?.checkIn || '-';
            
            message += `${index + 1}. ${athlete.name} - ${status} (Check-in: ${checkIn})\n`;
        });
        
        alert(message);
    }
    
    function getSessionStatusText(status) {
        const statuses = {
            'active': 'En Curso',
            'upcoming': 'Programada',
            'completed': 'Completada'
        };
        return statuses[status] || status;
    }
    
    function getSessionTypeText(type) {
        const types = {
            'training': 'Entrenamiento',
            'practice': 'Práctica',
            'game': 'Partido',
            'meeting': 'Reunión',
            'other': 'Otro'
        };
        return types[type] || type;
    }
    
    function getStatusText(status) {
        const statuses = {
            'present': 'Presente',
            'absent': 'Ausente',
            'late': 'Tardanza',
            'excused': 'Justificado'
        };
        return statuses[status] || status;
    }
    
    function getStatusClass(status) {
        const classes = {
            'present': 'text-success',
            'absent': 'text-danger',
            'late': 'text-warning',
            'excused': 'text-info'
        };
        return classes[status] || '';
    }
    
    function getExcuseTypeText(type) {
        const types = {
            'medical': 'Enfermedad/Lesión',
            'family': 'Asunto Familiar',
            'academic': 'Compromiso Académico',
            'work': 'Trabajo',
            'personal': 'Asunto Personal',
            'other': 'Otro'
        };
        return types[type] || type;
    }

    // Agregar estilos adicionales
    const additionalStyles = `
        .text-success { color: #10b981 !important; }
        .text-danger { color: #ef4444 !important; }
        .text-warning { color: #f59e0b !important; }
        .text-info { color: #3b82f6 !important; }
        
        .progress-info {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: var(--gray-dark);
            margin-bottom: 0.5rem;
        }
        
        .progress-bar {
            height: 6px;
            background-color: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            border-radius: 3px;
        }
        
        .athlete-avatar.small {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
        }
        
        .athlete-name {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .btn-danger {
            background-color: #ef4444 !important;
            border-color: #ef4444 !important;
        }
        
        .btn-danger:hover {
            background-color: #dc2626 !important;
            border-color: #dc2626 !important;
        }
        
        .btn-primary.small, .btn-secondary.small {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mostrarModal() {
            Swal.fire({
                title: '🚧 Opción en construcción',
                html: `
                    <div style="text-align: center; padding: 10px;">
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">
                            ⚠️ Los datos a continuación son datos <strong>NO REALES</strong>, 
                            son estáticos, pero así se verá el diseño.
                        </p>
                    </div>
                `,
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#FFA500',
                allowOutsideClick: true,
                allowEscapeKey: true,
                width: '500px',
                padding: '20px',
                background: 'white',
                backdrop: 'rgba(0,0,0,0.5)'
            });
        }
window.onload = mostrarModal;