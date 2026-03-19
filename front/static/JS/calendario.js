async function fetchAndMapEventos() {
    const url = `/api/v1/eventos/ver`;
    try {
        const respuesta = await fetch(url);
        const datosOriginales = await respuesta.json();
        renderUpcomingEvents(datosOriginales)
        renderCalendarStats(datosOriginales)
        // IMPORTANTE: Mira en la consola cómo se llaman las llaves que vienen del servidor
        console.log("Datos crudos del servidor:", datosOriginales);

        // Si la respuesta es un objeto que contiene una lista, ajusta: datosOriginales.data.map...
        return datosOriginales.map(e => ({
            // Usamos nombres de propiedades que coincidan con lo que definimos en Python
            id: e.id,
            title:e.titulo,
            type:e.tipo,
            date:e.fecha,
            startTime:e.hora_ini,
            endTime:e.hora_fin,
            location: e.ubicacion,
            teams:e.equipo ,
            description: e.descripcion,
            color: "#3b82f6"
        }));
    } catch (error) {
        console.error("Error al cargar:", error);
        return []; 
    }
}


document.addEventListener('DOMContentLoaded', async function() {
    // Variables globales
    let currentDate = new Date();
    let events = [];
    let editingEventId = null;

    // Datos de ejemplo para eventos

    const sampleEvents = await fetchAndMapEventos();

    // Inicializar eventos
    events = [...sampleEvents];

    // Elementos del DOM
    const currentMonthElement = document.getElementById('currentMonth');
    const monthGrid = document.getElementById('monthGrid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayBtn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarViews = document.querySelectorAll('.calendar-view');
    const eventModal = document.getElementById('eventModal');
    const addEventBtn = document.getElementById('addEventBtn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const eventForm = document.getElementById('eventForm');
    const eventDateInput = document.getElementById('eventDate');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    // allDayCheckbox = document.getElementById('allDayEvent');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    const eventsListContainer = document.getElementById('eventsList');

    // Inicializar selectores de fecha y hora
    const datePicker = flatpickr(eventDateInput, {
        locale: "es",
        dateFormat: "Y-m-d",
        defaultDate: "today"
    });

    const startTimePicker = flatpickr(startTimeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultHour: 9,
        defaultMinute: 0
    });

    const endTimePicker = flatpickr(endTimeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultHour: 10,
        defaultMinute: 0
    });

    // Manejar checkbox "Todo el día"
   /* allDayCheckbox.addEventListener('change', function() {
        if (this.checked) {
            startTimeInput.disabled = true;
            endTimeInput.disabled = true;
            startTimeInput.value = '';
            endTimeInput.value = '';
        } else {
            startTimeInput.disabled = false;
            endTimeInput.disabled = false;
        }
    });*/

    // Inicializar calendario
    updateCalendar();
    updateEventList();
    loadWeekView();
    loadDayView();

    // Navegación del calendario
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        updateCalendar();
    });

    // Cambiar vista del calendario
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            
            // Actualizar botones activos
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar vista correspondiente
            calendarViews.forEach(viewElement => {
                viewElement.classList.remove('active');
                if (viewElement.id === `${view}View`) {
                    viewElement.classList.add('active');
                }
            });
            
            // Actualizar contenido de la vista
            if (view === 'week') {
                loadWeekView();
            } else if (view === 'day') {
                loadDayView();
            } else if (view === 'list') {
                updateEventList();
            }
        });
    });

    // Filtros de eventos
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCalendar();
        });
    });

    // Modal de evento
    addEventBtn.addEventListener('click', () => {
        editingEventId = null;
        document.getElementById('modalTitle').textContent = 'Nuevo Evento';
        eventForm.reset();
        startTimeInput.disabled = false;
        endTimeInput.disabled = false;
        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            eventModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            eventForm.reset();
        });
    });

    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            eventForm.reset();
        }
    });

    // Enviar formulario de evento
eventForm.addEventListener('submit', async (e) => { // Agregamos async aquí
    e.preventDefault();
    
    // 1. Obtener datos del formulario
    // Asegúrate de tener los IDs correctos para hora_ini y hora_fin en tu HTML
    const eventData = {
        titulo: document.getElementById('eventTitle').value,
        tipo: document.getElementById('eventType').value,
        fecha: eventDateInput.value,
        ubicacion: document.getElementById('eventLocation').value,
        equipo: document.getElementById('eventTeams').value,
        descripcion: document.getElementById('eventDescription').value,
        hora_ini: document.getElementById('eventStartTime')?.value || "00:00",
        hora_fin: document.getElementById('eventEndTime')?.value || "00:00",
        id_club: 1 // ID estático según tu requerimiento
    };
    
    // Validaciones básicas
    if (!eventData.titulo || !eventData.tipo || !eventData.fecha) {
        showAlert('Por favor complete los campos requeridos', 'error');
        return;
    }

    try {
        // 2. Determinar si es Crear o Editar (Configuración de la petición)
        let url = '/api/v1/eventos/';
        let method = 'POST';

        // Si estás editando, podrías necesitar cambiar el método a PUT y la URL
        
        // 3. Petición Fetch a la API
        const respuesta = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.message || 'Error al guardar el evento');
        }

        const resultado = await respuesta.json();
        console.log("Respuesta del servidor:", resultado);

        // 4. Lógica de actualización local (solo si el servidor respondió OK)
        if (editingEventId) {
            const index = events.findIndex(event => event.id === editingEventId);
            if (index !== -1) {
                events[index] = { ...eventData, id: editingEventId };
                showAlert('Evento actualizado exitosamente', 'success');
            }
        } else {
            // Usamos el ID que nos devuelva el servidor si es posible
            const newEvent = { 
                ...eventData, 
                id: resultado.id || (events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1) 
            };
            events.push(newEvent);
            showAlert('Evento creado exitosamente', 'success');
        }

        // Actualizar vistas y cerrar modal
        updateCalendar();
        updateEventList();
        loadWeekView();
        loadDayView();
        
        eventModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        eventForm.reset();
        editingEventId = null;

    } catch (error) {
        console.error("Error en la petición:", error);
        showAlert('Hubo un problema con el servidor: ' + error.message, 'error');
    }
});

    // Funciones principales
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Actualizar título del mes
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Obtener primer día del mes y último día
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Obtener día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
        let firstDayIndex = firstDay.getDay(); // Domingo = 0
        
        // Ajustar para que la semana empiece en Lunes
        //firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        
        // Obtener último día del mes
        const lastDate = lastDay.getDate();
        
        // Limpiar grid
        monthGrid.innerHTML = '';
        
        // Agregar días del mes anterior
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = 0; i < firstDayIndex; i++) {
            const dayNumber = prevMonthLastDay - firstDayIndex + i + 1;
            const dayElement = createDayElement(dayNumber, true, year, month - 1);
            monthGrid.appendChild(dayElement);
        }
        
        // Agregar días del mes actual
        const today = new Date();
        const isTodayMonth = today.getMonth() === month && today.getFullYear() === year;
        
        for (let day = 1; day <= lastDate; day++) {
            const isToday = isTodayMonth && day === today.getDate();
            const dayElement = createDayElement(day, false, year, month, isToday);
            monthGrid.appendChild(dayElement);
        }
        
        // Completar con días del próximo mes
        const totalCells = 42; // 6 semanas * 7 días
        const remainingCells = totalCells - (firstDayIndex + lastDate);
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = createDayElement(i, true, year, month + 1);
            monthGrid.appendChild(dayElement);
        }
    }
    
  function createDayElement(dayNumber, isOtherMonth, year, month, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    
    if (isToday) {
        dayElement.classList.add('today');
    }
    
    // Crear string de fecha directamente (evita problemas de zona horaria)
    const year_str = year;
    const month_str = String(month + 1).padStart(2, '0'); // +1 porque el mes viene 0-11
    const day_str = String(dayNumber).padStart(2, '0');
    const dateString = `${year_str}-${month_str}-${day_str}`;
    
    // Verificar si hay eventos para este día
    const dayEvents = getEventsForDate(dateString);
    if (dayEvents.length > 0) {
        dayElement.classList.add('has-events');
    }
    
    // Número del día
    const dayNumberElement = document.createElement('div');
    dayNumberElement.className = 'day-number';
    dayNumberElement.textContent = dayNumber;
    dayElement.appendChild(dayNumberElement);
    
    // Eventos del día (mostrar máximo 2)
    if (dayEvents.length > 0) {
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'day-events';
        
        const eventsToShow = dayEvents.slice(0, 2);
        eventsToShow.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = `day-event ${event.type}`;
            eventElement.textContent = event.title;
            eventElement.title = `${event.title}\n${event.startTime || 'Todo el día'} - ${event.endTime || ''}\n${event.location || 'Sin ubicación'}`;
            eventElement.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el click se propague al día
                viewEventDetails(event.id);
            });
            eventsContainer.appendChild(eventElement);
        });
        
        // Mostrar indicador si hay más eventos
        if (dayEvents.length > 2) {
            const moreEventsElement = document.createElement('div');
            moreEventsElement.className = 'more-events';
            moreEventsElement.textContent = `+${dayEvents.length - 2} más`;
            
            // Crear dayDate para pasarlo a showDayEvents
            const dayDate = new Date(year, month, dayNumber);
            moreEventsElement.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el click se propague al día
                showDayEvents(dayDate, dayEvents);
            });
            
            eventsContainer.appendChild(moreEventsElement);
        }
        
        dayElement.appendChild(eventsContainer);
    }
    
    // Agregar evento de clic en el día para crear nuevo evento
    dayElement.addEventListener('click', () => {
        // Establecer la fecha en el formulario
        eventDateInput.value = dateString;
        // Abrir modal para nuevo evento
        editingEventId = null;
        document.getElementById('modalTitle').textContent = 'Nuevo Evento';
        eventForm.reset();
        startTimeInput.disabled = false;
        endTimeInput.disabled = false;
        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    return dayElement;
}
    
    function getEventsForDate(dateString) {
        // Obtener filtros activos
        const activeFilters = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.id.replace('filter', '').toLowerCase());
        
        return events.filter(event => {
            // Filtrar por fecha
            const matchesDate = event.date === dateString;
            
            // Filtrar por tipo si hay filtros activos
            const matchesType = activeFilters.length === 0 || activeFilters.includes(event.type);
            
            return matchesDate && matchesType;
        });
    }
    
    function loadWeekView() {
        // Esta función cargaría los eventos para la vista semanal
        // Por simplicidad, aquí mostramos una implementación básica
        const weekEvents = document.querySelectorAll('.week-event');
        weekEvents.forEach(eventElement => {
            eventElement.addEventListener('click', () => {
                const eventTitle = eventElement.querySelector('.event-title').textContent;
                alert(`Evento: ${eventTitle}\nHaz clic para ver detalles completos.`);
            });
        });
    }
    
    function loadDayView() {
        // Esta función cargaría los eventos para la vista diaria
        // Por simplicidad, aquí mostramos una implementación básica
        const dayTimeline = document.querySelector('.day-timeline');
        if (dayTimeline) {
            dayTimeline.innerHTML = `
                <div class="time-slot">
                    <div class="time-label">08:00</div>
                    <div class="time-content">
                        <div class="day-event-item training" style="top: 0; height: 80px;">
                            <strong>Entrenamiento Matutino</strong><br>
                            <small>08:00 - 10:00 | Cancha Principal</small>
                        </div>
                    </div>
                </div>
                <div class="time-slot">
                    <div class="time-label">10:00</div>
                    <div class="time-content"></div>
                </div>
                <div class="time-slot">
                    <div class="time-label">12:00</div>
                    <div class="time-content"></div>
                </div>
                <div class="time-slot">
                    <div class="time-label">14:00</div>
                    <div class="time-content"></div>
                </div>
                <div class="time-slot">
                    <div class="time-label">16:00</div>
                    <div class="time-content">
                        <div class="day-event-item meeting" style="top: 20px; height: 60px;">
                            <strong>Reunión Técnica</strong><br>
                            <small>16:20 - 17:20 | Sala de Reuniones</small>
                        </div>
                    </div>
                </div>
                <div class="time-slot">
                    <div class="time-label">18:00</div>
                    <div class="time-content">
                        <div class="day-event-item training" style="top: 0; height: 80px;">
                            <strong>Entrenamiento Nocturno</strong><br>
                            <small>18:00 - 20:00 | Cancha Cubierta</small>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    function updateEventList() {
        if (!eventsListContainer) return;
        
        eventsListContainer.innerHTML = '';
        
        // Ordenar eventos por fecha (más cercanos primero)
        const sortedEvents = [...events].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        
        // Mostrar eventos
        sortedEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleDateString('es-ES', { month: 'short' });
            
            const eventElement = document.createElement('div');
            eventElement.className = 'list-event';
            eventElement.innerHTML = `
                <div class="list-event-date">
                    <span class="list-event-day">${day}</span>
                    <span class="list-event-month">${month}</span>
                </div>
                <div class="list-event-content">
                    <h4 class="list-event-title">${event.title}</h4>
                    <div class="list-event-details">
                        <span><i class="far fa-clock"></i> ${event.startTime || 'Todo el día'}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location || 'Sin ubicación'}</span>
                    </div>
                    <span class="list-event-type" style="background-color: ${event.color}">
                        ${getEventTypeText(event.type)}
                    </span>
                    ${event.description ? `<p class="list-event-description">${event.description}</p>` : ''}
                </div>
            `;
            
            eventElement.addEventListener('click', () => viewEventDetails(event.id));
            eventsListContainer.appendChild(eventElement);
        });
        
        if (sortedEvents.length === 0) {
            eventsListContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #94a3b8;">
                    <i class="fas fa-calendar-times" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>No hay eventos programados</p>
                </div>
            `;
        }
    }
    
    function viewEventDetails(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${event.title}</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 1.5rem;">
                        <span class="status-badge" style="background-color: ${event.color}; color: white;">
                            ${getEventTypeText(event.type)}
                        </span>
                    </div>
                    
                    <div class="event-details">
                        <div class="detail-item">
                            <i class="far fa-calendar"></i>
                            <div>
                                <strong>Fecha:</strong>
                                <p>${formatDate(event.date)}</p>
                            </div>
                        </div>
                        
                        ${event.startTime ? `
                        <div class="detail-item">
                            <i class="far fa-clock"></i>
                            <div>
                                <strong>Horario:</strong>
                                <p>${event.startTime} - ${event.endTime}</p>
                            </div>
                        </div>
                        ` : ''}
                        
                        ${event.location ? `
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Ubicación:</strong>
                                <p>${event.location}</p>
                            </div>
                        </div>
                        ` : ''}
                        
                        ${event.teams ? `
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <strong>Participantes:</strong>
                                <p>${event.teams}</p>
                            </div>
                        </div>
                        ` : ''}
                        
                        ${event.description ? `
                        <div class="detail-item">
                            <i class="far fa-file-alt"></i>
                            <div>
                                <strong>Descripción:</strong>
                                <p>${event.description}</p>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions" style="margin-top: 2rem;">
                        <button type="button" class="btn-secondary close-detail-modal">Cerrar</button>
                        <button type="button" class="btn-primary" onclick="editEventFromDetails(${eventId})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button type="button" class="btn-danger" onclick="deleteEventFromDetails(${eventId})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
        
        modal.querySelector('.close-detail-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
    }
    
  function showDayEvents(date, dayEvents) {
    // Crear fecha en formato local sin usar toISOString()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    const formattedDate = formatDate(dateString);
    let message = `Eventos para ${formattedDate}:\n\n`;
    
    dayEvents.forEach((event, index) => {
        message += `${index + 1}. ${event.title}\n`;
        message += `   Horario: ${event.startTime || 'Todo el día'}\n`;
        message += `   Ubicación: ${event.location || 'No especificada'}\n\n`;
    });
    
    alert(message);
}
    
function formatDate(dateString) {
    // Si dateString viene en formato YYYY-MM-DD, lo dividimos para evitar problemas de zona horaria
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // Creamos la fecha en zona horaria local
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
    
    function getEventTypeText(type) {
        const typeMap = {
            'training': 'Entrenamiento',
            'game': 'Juego',
            'meeting': 'Reunión',
            'event': 'Evento',
            'other': 'Otro'
        };
        return typeMap[type] || 'Evento';
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

    // Funciones globales para detalles de eventos
    window.editEventFromDetails = function(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;
        
        editingEventId = eventId;
        
        // Llenar formulario con datos del evento
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventType').value = event.type;
        eventDateInput.value = event.date;
        startTimeInput.value = event.startTime || '';
        endTimeInput.value = event.endTime || '';
        document.getElementById('eventLocation').value = event.location || '';
        document.getElementById('eventTeams').value = event.teams || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('allDayEvent').checked = !event.startTime;
        document.getElementById('sendNotification').checked = false;
        
        // Actualizar estado de campos de tiempo
        if (!event.startTime) {
            startTimeInput.disabled = true;
            endTimeInput.disabled = true;
        }
        
        // Actualizar título del modal
        document.getElementById('modalTitle').textContent = 'Editar Evento';
        
        // Cerrar modal de detalles
        document.querySelector('.modal.active').remove();
        
        // Abrir modal de edición
        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.deleteEventFromDetails = function(eventId) {
        if (confirm('¿Está seguro de eliminar este evento?')) {
            const index = events.findIndex(e => e.id === eventId);
            if (index !== -1) {
                events.splice(index, 1);
                
                // Cerrar modal de detalles
                document.querySelector('.modal.active').remove();
                document.body.style.overflow = 'auto';
                
                // Actualizar vistas
                updateCalendar();
                updateEventList();
                loadWeekView();
                loadDayView();
                
                showAlert('Evento eliminado exitosamente', 'success');
            }
        }
    };

    // Agregar estilos para detalles del evento
    const style = document.createElement('style');
    style.textContent = `
        .event-details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .detail-item {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }
        
        .detail-item i {
            color: var(--primary-color);
            font-size: 1.2rem;
            margin-top: 2px;
            width: 24px;
        }
        
        .detail-item strong {
            display: block;
            color: var(--gray-dark);
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        
        .detail-item p {
            margin: 0;
            color: var(--secondary-color);
        }
        
        .btn-danger {
            background-color: #ef4444;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: var(--border-radius);
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-danger:hover {
            background-color: #dc2626;
        }
    `;
    document.head.appendChild(style);
});

function renderUpcomingEvents(eventos) {
    const container = document.querySelector('.upcoming-list');
    
    // Limpiamos el contenedor por si hay datos estáticos previos
    container.innerHTML = '';

    // Opcional: Ordenar por fecha antes de mostrar
    eventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    eventos.forEach(evento => {
        // 1. Procesar la fecha (YYYY-MM-DD)
        const fechaObj = new Date(evento.fecha + 'T00:00:00'); // Forzamos hora local
        const dia = fechaObj.getDate();
        const mes = fechaObj.toLocaleString('es-ES', { month: 'short' }).replace('.', '');

        // 2. Formatear la hora (quitar los segundos :00 del final)
        const horaIni = evento.hora_ini.substring(0, 5);
        const horaFin = evento.hora_fin.substring(0, 5);
        const horario = (horaIni === "00:00" && horaFin === "00:00") ? "Todo el día" : `${horaIni} - ${horaFin}`;

        // 3. Crear el template HTML
        const eventHTML = `
            <div class="upcoming-event ${evento.tipo}">
                <div class="event-date">
                    <span class="event-day">${dia}</span>
                    <span class="event-month">${mes.charAt(0).toUpperCase() + mes.slice(1)}</span>
                </div>
                <div class="event-info">
                    <h4>${evento.titulo}</h4>
                    <p class="event-time">${horario}</p>
                    <p class="event-location">${evento.ubicacion}</p>
                </div>
            </div>
        `;

        // 4. Inyectar en el contenedor
        container.innerHTML += eventHTML;
    });
}

function renderCalendarStats(eventos) {
    const statsContainer = document.querySelector('.calendar-stats');
    
    // 1. Contadores iniciales
    let entrenamientos = 0;
    let juegos = 0;
    let eventosEspeciales = 0;
    const diasOcupadosSet = new Set(); // Usamos Set para contar días únicos

    // 2. Obtener el mes actual para filtrar (opcional, si solo quieres estadísticas del mes en curso)
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();

    // 3. Procesar datos
    eventos.forEach(evento => {
        const fechaObj = new Date(evento.fecha + 'T00:00:00');
        
        // Filtramos para contar solo los del mes/año actual
        if (fechaObj.getMonth() === mesActual && fechaObj.getFullYear() === anioActual) {
            
            // Contar por tipo (usando los strings que vienen de tu backend)
            if (evento.tipo === 'training') entrenamientos++;
            else if (evento.tipo === 'game') juegos++;
            else if (evento.tipo === 'event') eventosEspeciales++;

            // Registrar el día como ocupado
            diasOcupadosSet.add(evento.fecha);
        }
    });

    // 4. Calcular días totales del mes actual
    const diasEnElMes = new Date(anioActual, mesActual + 1, 0).getDate();

    // 5. Generar el HTML
    statsContainer.innerHTML = `
        <h3>Estadísticas del Mes</h3>
        <div class="stat-item">
            <span>Entrenamientos:</span>
            <strong>${entrenamientos}</strong>
        </div>
        <div class="stat-item">
            <span>Juegos:</span>
            <strong>${juegos}</strong>
        </div>
        <div class="stat-item">
            <span>Eventos:</span>
            <strong>${eventosEspeciales}</strong>
        </div>
        <div class="stat-item">
            <span>Días ocupados:</span>
            <strong>${diasOcupadosSet.size}/${diasEnElMes}</strong>
        </div>
    `;
}