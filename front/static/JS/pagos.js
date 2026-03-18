async function fetchAndMapPagos() {
    const url = `/api/v1/pagos/obtener`;
    try {
        const respuesta = await fetch(url);
        const datosOriginales = await respuesta.json();

        // IMPORTANTE: Mira en la consola cómo se llaman las llaves que vienen del servidor
        console.log("Datos crudos del servidor:", datosOriginales);

        // Si la respuesta es un objeto que contiene una lista, ajusta: datosOriginales.data.map...
        return datosOriginales.map(p => ({
            // Usamos nombres de propiedades que coincidan con lo que definimos en Python
            id:p.id,
            athlete: `${p.nombre} ${p.apellido}` || "Sin nombre", // Verifica si tu query trae el nombre
            concept: p.concepto || "Pago de mensualidad",
            dueDate: p.fecha_pago || "Pendiente",
            paymentDate: p.fecha_pago || "",
            amount: p.monto || 0,
            method: p.metodo || "N/A",
            status: p.estado || "pendiente",
            notes: p.comentario || "",
            referencia :p.referencia
        }));
    } catch (error) {
        console.error("Error al cargar:", error);
        return []; 
    }
}


document.addEventListener('DOMContentLoaded', async function() {
    // Datos de ejemplo para pagos
    const respuesta = await fetchAndMapPagos()
    const samplePayments = [...respuesta]
    
  

    

    // Elementos del DOM
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    const paymentModal = document.getElementById('paymentModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const paymentForm = document.getElementById('paymentForm');
    const athleteSelect = document.getElementById('athleteSelect');
    const filterStatus = document.getElementById('filterStatus');
    const filterMonth = document.getElementById('filterMonth');
    const searchPayment = document.getElementById('searchPayment');
    const resetFiltersBtn = document.getElementById('resetFilters');
    
    // Inicializar Flatpickr para selectores de fecha
    flatpickr(".datepicker", {
        locale: "es",
        dateFormat: "Y-m-d",
        allowInput: true
    });

    // Cargar datos iniciales
    loadPayments(samplePayments);
    updateStats(samplePayments);

    // Abrir modal de nuevo pago


    // Cerrar modal
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            paymentForm.reset();
        });
    });

    // Cerrar modal al hacer clic fuera
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            paymentForm.reset();
        }
    });

    // Enviar formulario de pago
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const athleteId = parseInt(athleteSelect.value);
        const athleteName = athleteSelect.options[athleteSelect.selectedIndex].text;
        const amount = parseFloat(document.getElementById('paymentAmount').value);
        const concept = document.getElementById('paymentConcept').value;
        const method = document.getElementById('paymentMethod').value;
        const dueDate = document.getElementById('dueDate').value;
        const paymentDate = document.getElementById('paymentDate').value;
        const notes = document.getElementById('paymentNotes').value;
        const markAsPaid = document.getElementById('markAsPaid').checked;
        
        // Validaciones
        if (!athleteId || !amount || !concept || !method) {
            showAlert('Por favor complete todos los campos requeridos', 'error');
            return;
        }
        
        // Crear nuevo pago
        const newPayment = {
            id: samplePayments.length + 1,
            athlete: athleteName,
            concept: getConceptText(concept),
            dueDate: dueDate || getNextMonthFirstDay(),
            paymentDate: markAsPaid ? (paymentDate || getTodayDate()) : '',
            amount: amount,
            method: getMethodText(method),
            status: markAsPaid ? 'paid' : 'pending',
            notes: notes
        };
        
        // Agregar a la lista (en un sistema real, esto se enviaría al backend)
        samplePayments.unshift(newPayment);
        
        // Actualizar la tabla
        loadPayments(samplePayments);
        updateStats(samplePayments);
        
        // Cerrar modal y resetear formulario
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        paymentForm.reset();
        
        // Mostrar mensaje de éxito
        showAlert('Pago registrado exitosamente', 'success');
        
        // Actualizar notificación
        updateNotificationBadge();
    });

    // Aplicar filtros
    filterStatus.addEventListener('change', applyFilters);
    filterMonth.addEventListener('change', applyFilters);
    searchPayment.addEventListener('input', applyFilters);
    
    // Restablecer filtros
    resetFiltersBtn.addEventListener('click', () => {
        filterStatus.value = 'all';
        filterMonth.value = 'all';
        searchPayment.value = '';
        loadPayments(samplePayments);
    });

    // Funciones auxiliares
    function loadAthletes() {
        athleteSelect.innerHTML = '<option value="">Seleccionar atleta...</option>';
        sampleAthletes.forEach(athlete => {
            const option = document.createElement('option');
            option.value = athlete.id;
            option.textContent = athlete.name;
            athleteSelect.appendChild(option);
        });
    }

    function loadPayments(payments) {
        paymentsTableBody.innerHTML = '';
        
        if (payments.length === 0) {
            paymentsTableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 2rem;">
                        <i class="fas fa-search" style="font-size: 2rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                        <p>No se encontraron pagos</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        payments.forEach(payment => {
            const row = document.createElement('tr');
            
            // Formatear fechas
            const dueDateFormatted = formatDate(payment.dueDate);
            const paymentDateFormatted = payment.paymentDate ? formatDate(payment.paymentDate) : '-';
            
            // Determinar clase de estado
            let statusClass, statusText;
            switch(payment.status) {
                case 'aprobado':
                    statusClass = 'status-paid';
                    statusText = 'Aprobado';
                    break;
                case 'pendiente':
                    statusClass = 'status-pending';
                    statusText = 'Pendiente';
                    break;
                case 'atrasado':
                    statusClass = 'status-overdue';
                    statusText = 'Atrasado';
                    break;
                default:
                    statusClass = 'status-pending';
                    statusText = 'Pendiente';
            }
            
            row.innerHTML = `
                <td>#${payment.id.toString().padStart(3, '0')}</td>
                <td><strong>${payment.athlete}</strong></td>
                <td>${payment.concept}</td>
                <td>${dueDateFormatted}</td>
                <td>${paymentDateFormatted}</td>
                <td><strong>$${payment.amount}</strong></td>
                <td>${payment.method || '-'}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="Ver detalles" onclick="viewPayment(${payment.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" title="Editar" onclick="editPayment(${payment.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="Eliminar" onclick="deletePayment(${payment.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            paymentsTableBody.appendChild(row);
        });
    }

    function applyFilters() {
        let filteredPayments = [...samplePayments];
        
        // Filtrar por estado
        if (filterStatus.value !== 'all') {
            filteredPayments = filteredPayments.filter(payment => 
                payment.status === filterStatus.value
            );
        }
        
        // Filtrar por mes
        if (filterMonth.value !== 'all') {
            const month = parseInt(filterMonth.value);
            filteredPayments = filteredPayments.filter(payment => {
                const dueDate = new Date(payment.dueDate);
                return dueDate.getMonth() + 1 === month;
            });
        }
        
        // Filtrar por búsqueda
        if (searchPayment.value.trim() !== '') {
            const searchTerm = searchPayment.value.toLowerCase();
            filteredPayments = filteredPayments.filter(payment =>
                payment.athlete.toLowerCase().includes(searchTerm) ||
                payment.concept.toLowerCase().includes(searchTerm)
            );
        }
        
        loadPayments(filteredPayments);
    }

    function updateStats(payments) {
        // En un sistema real, estos cálculos vendrían del backend
        let paidAmount = 0;
        let pendingAmount = 0;
        let overdueCount = 0;
        
        payments.forEach(payment => {
            if (payment.status === 'paid') {
                paidAmount += payment.amount;
            } else if (payment.status === 'pending') {
                pendingAmount += payment.amount;
            } else if (payment.status === 'overdue') {
                overdueCount++;
            }
        });
        
        // Actualizar elementos del DOM (simulación)
        console.log(`Pagado este mes: $${paidAmount}`);
        console.log(`Pendiente: $${pendingAmount}`);
        console.log(`Pagos atrasados: ${overdueCount}`);
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

    function getConceptText(conceptValue) {
        const concepts = {
            'mensualidad': 'Mensualidad',
            'inscripcion': 'Inscripción',
            'uniforme': 'Uniforme',
            'equipo': 'Equipo',
            'torneo': 'Inscripción a torneo',
            'otro': 'Otro'
        };
        return concepts[conceptValue] || conceptValue;
    }

    function getMethodText(methodValue) {
        const methods = {
            'transferencia': 'Transferencia',
            'tarjeta': 'Tarjeta',
            'efectivo': 'Efectivo',
            'cheque': 'Cheque'
        };
        return methods[methodValue] || methodValue;
    }

    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    function getNextMonthFirstDay() {
        const now = new Date();
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return nextMonth.toISOString().split('T')[0];
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

    function updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent);
            badge.textContent = currentCount + 1;
        }
    }

    // Funciones globales para acciones de la tabla
window.viewPayment = function(id) {
    // Buscamos el pago en nuestro array global
    const payment = samplePayments.find(p => p.id === id);

    if (payment) {
        // Determinamos el color del estado para el diseño
        const statusColor = payment.status === 'pagado' || payment.status === 'paid' ? '#28a745' : '#ffc107';
        
        Swal.fire({
            title: `<strong>Detalles del Pago #${id}</strong>`,
            icon: 'info',
            html: `
                <div style="text-align: left; line-height: 1.6;">
                    
                    <p><strong>Concepto:</strong> ${payment.concept}</p>
                    <p><strong>Monto:</strong> <span style="color: #28a745; font-weight: bold;">$${payment.amount}</span></p>
                    <p><strong>Estado:</strong> <span style="background: ${statusColor}; color: white; padding: 2px 8px; border-radius: 4px;">${payment.status.toUpperCase()}</span></p>
                    <hr>
                    <p><strong>Vencimiento:</strong> ${formatDate(payment.dueDate)}</p>
                    <p><strong>Fecha de Pago:</strong> ${payment.paymentDate ? formatDate(payment.paymentDate) : '<span style="color: red;">Pendiente</span>'}</p>
                    <p><strong>Método:</strong> ${payment.method || 'No especificado'}</p>
                    <p><strong>Notas:</strong> <em>${payment.notes || 'Ninguna'}</em></p>
                    <p><strong>REF:</strong> <em>${payment.referencia || 'Ninguna'}</em></p>
                </div>
            `,
            showCloseButton: true,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entendido',
            confirmButtonColor: '#3085d6'
        });
    } else {
        Swal.fire('Error', 'No se encontró la información del pago', 'error');
    }
};

window.editPayment = function(id) {
    const payment = samplePayments.find(p => p.id === id);
    
    if (!payment) {
        Swal.fire('Error', 'No se encontró el pago', 'error');
        return;
    }

    // Definimos el estado actual para el select
    const estadoActual = (payment.status === 'paid' || payment.status === 'aprobado') ? 'aprobado' : 'pendiente';

    Swal.fire({
        title: `Editar Pago #${id}`,
        html: `
            <div style="text-align: left;">
                <label><b>Estado del Pago:</b></label>
                <select id="swal-estado" class="swal2-input" style="width: 80%; margin: 10px auto; display: block;">
                    <option value="aprobado" ${estadoActual === 'aprobado' ? 'selected' : ''}>Aprobado</option>
                    <option value="pendiente" ${estadoActual === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                </select>
                
                <label><b>Notas / Comentarios:</b></label>
                <textarea id="swal-notas" class="swal2-textarea" placeholder="Agregar notas..." style="width: 80%; margin: 10px auto; display: block;">${payment.notes || ''}</textarea>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar Cambios',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            // Capturamos los valores de los inputs del modal antes de cerrar
            return {
                nuevoEstado: document.getElementById('swal-estado').value,
                nuevasNotas: document.getElementById('swal-notas').value
            }
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { nuevoEstado, nuevasNotas } = result.value;

            try {
                // Mostramos un loader mientras se procesa la petición
                Swal.fire({ title: 'Procesando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

                const response = await fetch('/api/v1/pagos/obtener', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: id,
                        estado: nuevoEstado
                    })
                });

                if (response.ok) {
                    // Actualizamos los datos localmente
                    payment.status = nuevoEstado;
                    payment.notes = nuevasNotas;

                    // Refrescamos la tabla y estadísticas
                    loadPayments(samplePayments);
                    updateStats(samplePayments);

                    Swal.fire('¡Éxito!', 'El pago ha sido actualizado.', 'success');
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire('Error', 'No se pudo actualizar el pago en la base de datos.', 'error');
            }
        }
    });
};

    window.deletePayment = function(id) {
        if (confirm(`¿Está seguro de eliminar el pago #${id}?`)) {
            const index = samplePayments.findIndex(p => p.id === id);
            if (index !== -1) {
                samplePayments.splice(index, 1);
                loadPayments(samplePayments);
                updateStats(samplePayments);
                showAlert('Pago eliminado exitosamente', 'success');
            }
        }
    };

    // Funciones auxiliares para edición
    function getConceptValue(conceptText) {
        const conceptMap = {
            'Mensualidad': 'mensualidad',
            'Inscripción': 'inscripcion',
            'Uniforme': 'uniforme',
            'Equipo': 'equipo',
            'Inscripción a torneo': 'torneo',
            'Otro': 'otro'
        };
        return conceptMap[conceptText] || '';
    }

    function getMethodValue(methodText) {
        const methodMap = {
            'Transferencia': 'transferencia',
            'Tarjeta': 'tarjeta',
            'Efectivo': 'efectivo',
            'Cheque': 'cheque'
        };
        return methodMap[methodText] || '';
    }
});

async function cargarEstadisticas() {
    try {
        const response = await fetch('/api/v1/pagos/obtener');
        const pagos = await response.json();

        const ahora = new Date();
        const mesActual = ahora.getMonth();
        const añoActual = ahora.getFullYear();

        // 1. Calcular "Pagado este mes"
        const pagadoEsteMes = pagos.reduce((total, pago) => {
            const fechaPago = new Date(pago.fecha_pago);
            if (
                pago.estado === 'aprobado' &&
                fechaPago.getMonth() === mesActual &&
                fechaPago.getFullYear() === añoActual
            ) {
                return total + parseFloat(pago.monto);
            }
            return total;
        }, 0);

        // 2. Calcular "Al día con pagos" (Usuarios únicos con pagos este mes)
        const usuariosAlDia = new Set(
            pagos
                .filter(pago => {
                    const fecha = new Date(pago.fecha_pago);
                    return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
                })
                .map(pago => `${pago.nombre} ${pago.apellido}`)
        ).size;

        // 3. Pendientes (Lógica de ejemplo)
        // Nota: Si el API no devuelve los pendientes, esto suele ser 
        // una resta entre el (Monto Esperado Total - pagadoEsteMes)
        const montoEsperado = 10000; // Ejemplo
        const pendiente = montoEsperado - pagadoEsteMes;

        // Actualizar el DOM
        actualizarUI(pagadoEsteMes, pendiente, usuariosAlDia);

    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
}

function actualizarUI(pagado, pendiente, alDia) {
    // Formateador de moneda
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Asumiendo que les pones IDs a tus h3 en el HTML
    document.getElementById('stat-pagado').innerText = formatter.format(pagado);
    document.getElementById('stat-aldia').innerText = alDia;
}

cargarEstadisticas();