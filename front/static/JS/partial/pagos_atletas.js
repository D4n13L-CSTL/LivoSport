async function fetchAndMapAthletes(id) {
    const url = `/api/v1/pagos/registrar_pago?atleta=${id}`;
    try {
        const respuesta = await fetch(url);
        const datosOriginales = await respuesta.json();

        // IMPORTANTE: Mira en la consola cómo se llaman las llaves que vienen del servidor
        console.log("Datos crudos del servidor:", datosOriginales);

        // Si la respuesta es un objeto que contiene una lista, ajusta: datosOriginales.data.map...
        return datosOriginales.map(p => ({
            // Usamos nombres de propiedades que coincidan con lo que definimos en Python
            id:p.id,
            athlete: p.nombre_atleta || "Sin nombre", // Verifica si tu query trae el nombre
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

document.addEventListener('DOMContentLoaded',async function() {
    // Datos de ejemplo para pagos
    const respuesta = await fetchAndMapAthletes(idAtletaActual)
    const samplePayments = [...respuesta]
    console.log(samplePayments);
    


    // Elementos del DOM
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    const paymentModal = document.getElementById('paymentModal');
    const openPaymentModalBtn = document.getElementById('openPaymentModal');
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
    openPaymentModalBtn.addEventListener('click', () => {
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

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
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const athleteId = idAtletaActual;
        const amount = parseFloat(document.getElementById('paymentAmount').value);
        const concept = document.getElementById('paymentConcept').value;
        const method = document.getElementById('paymentMethod').value;
        const dueDate = document.getElementById('dueDate').value;
        const paymentDate = document.getElementById('paymentDate').value;
        const notes = document.getElementById('paymentNotes').value;
        const markAsPaid = document.getElementById('markAsPaid').checked;
        const ref = document.getElementById('referencia').value;
        // Validaciones
        if (!athleteId || !amount || !concept || !method) {
            showAlert('Por favor complete todos los campos requeridos', 'error');
            return;
        }
        
        // Crear nuevo pago
        const payload = {
        id_atleta: athleteId,
        id_club: idClubActual, // ¿Viene de algún lado? Si no, pon el ID por defecto de tu club
        monto: amount,
        fecha_pago: paymentDate,
        referencia: ref, // Generamos una referencia temporal o pídela en un input
        metodo: method,
        comprobante_url: "", // Aquí iría la URL si subes un archivo
        estado: markAsPaid ? 'pagado' : 'pendiente',
        comentario: notes,
        concepto: concept
    };
        
        try {
        // 4. Realizar la petición al servidor
        const response = await fetch('/api/v1/pagos/registrar_pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            // 5. Si el backend responde bien, actualizamos la UI local
            const newPaymentUI = {
                id: result.id || (samplePayments.length + 1), // Usamos el ID que viene del backend
                concept: concept,
                dueDate: dueDate || "Próximo mes",
                paymentDate: payload.fecha_pago || '',
                amount: amount,
                method: method,
                status: payload.estado,
                notes: notes
            };

            samplePayments.unshift(newPaymentUI);
            
            // Refrescar componentes visuales
            loadPayments(samplePayments);
            updateStats(samplePayments);
            
            // Cerrar modal y limpiar
            paymentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            paymentForm.reset();
            
            showAlert('Pago registrado en el servidor exitosamente', 'success');
            updateNotificationBadge();
        } else {
            // Manejar errores del servidor (ej. error 400 o 500)
            showAlert('Error del servidor: ' + (result.message || 'No se pudo registrar'), 'error');
        }
    } catch (error) {
        // Manejar errores de red o si el servidor está apagado
        console.error('Error en la petición:', error);
        showAlert('No se pudo conectar con el servidor', 'error');
    }




        
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
                    statusText = 'Pagado';
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
        if (payment) {
            // Llenar formulario con datos del pago
            document.getElementById('paymentAmount').value = payment.amount;
            document.getElementById('paymentConcept').value = getConceptValue(payment.concept);
            document.getElementById('paymentMethod').value = getMethodValue(payment.method);
            document.getElementById('dueDate').value = payment.dueDate;
            document.getElementById('paymentDate').value = payment.paymentDate || '';
            document.getElementById('paymentNotes').value = payment.notes || '';
            document.getElementById('markAsPaid').checked = payment.status === 'paid';
            
            // Establecer atleta (necesitaríamos el ID)
            // Por simplicidad, solo abrimos el modal
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Cambiar título del modal
            document.querySelector('.modal-header h3').textContent = `Editar Pago #${id}`;
            
            // Cambiar comportamiento del formulario para actualizar
            const form = document.getElementById('paymentForm');
            const originalSubmit = form.onsubmit;
            
            form.onsubmit = function(e) {
                e.preventDefault();
                
                // Actualizar pago
                payment.amount = parseFloat(document.getElementById('paymentAmount').value);
                payment.concept = getConceptText(document.getElementById('paymentConcept').value);
                payment.method = getMethodText(document.getElementById('paymentMethod').value);
                payment.dueDate = document.getElementById('dueDate').value;
                payment.paymentDate = document.getElementById('paymentDate').value || '';
                payment.notes = document.getElementById('paymentNotes').value;
                payment.status = document.getElementById('markAsPaid').checked ? 'paid' : 'pending';
                
                // Actualizar tabla
                loadPayments(samplePayments);
                updateStats(samplePayments);
                
                // Cerrar modal
                paymentModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                form.reset();
                
                // Restaurar comportamiento original
                form.onsubmit = originalSubmit;
                document.querySelector('.modal-header h3').textContent = 'Registrar Nuevo Pago';
                
                showAlert('Pago actualizado exitosamente', 'success');
            };
        }
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