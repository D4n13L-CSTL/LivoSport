document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para pagos
    const samplePayments = [
        {
            id: 1,
            athlete: "Ana García",
            concept: "Mensualidad",
            dueDate: "2023-10-05",
            paymentDate: "2023-10-03",
            amount: 120,
            method: "Transferencia",
            status: "paid",
            notes: "Pago completo"
        },
        {
            id: 2,
            athlete: "Carlos López",
            concept: "Mensualidad",
            dueDate: "2023-10-10",
            paymentDate: "",
            amount: 120,
            method: "Efectivo",
            status: "pending",
            notes: ""
        },
        {
            id: 3,
            athlete: "María Rodríguez",
            concept: "Uniforme",
            dueDate: "2023-09-25",
            paymentDate: "",
            amount: 85,
            method: "Tarjeta",
            status: "overdue",
            notes: "Pendiente desde septiembre"
        },
        {
            id: 4,
            athlete: "Javier Pérez",
            concept: "Mensualidad",
            dueDate: "2023-10-01",
            paymentDate: "2023-09-30",
            amount: 120,
            method: "Transferencia",
            status: "paid",
            notes: ""
        },
        {
            id: 5,
            athlete: "Laura Martínez",
            concept: "Inscripción torneo",
            dueDate: "2023-10-15",
            paymentDate: "2023-10-10",
            amount: 200,
            method: "Transferencia",
            status: "paid",
            notes: "Pago adelantado"
        },
        {
            id: 6,
            athlete: "Diego Sánchez",
            concept: "Mensualidad",
            dueDate: "2023-10-12",
            paymentDate: "",
            amount: 120,
            method: "",
            status: "pending",
            notes: "Recordar llamar"
        },
        {
            id: 7,
            athlete: "Sofía Hernández",
            concept: "Equipo",
            dueDate: "2023-09-30",
            paymentDate: "2023-09-28",
            amount: 65,
            method: "Efectivo",
            status: "paid",
            notes: "Rodilleras nuevas"
        },
        {
            id: 8,
            athlete: "Pedro Ramírez",
            concept: "Mensualidad",
            dueDate: "2023-10-08",
            paymentDate: "2023-10-08",
            amount: 120,
            method: "Tarjeta",
            status: "paid",
            notes: ""
        }
    ];

    const sampleAthletes = [
        { id: 1, name: "Ana García", status: "active" },
        { id: 2, name: "Carlos López", status: "active" },
        { id: 3, name: "María Rodríguez", status: "active" },
        { id: 4, name: "Javier Pérez", status: "active" },
        { id: 5, name: "Laura Martínez", status: "active" },
        { id: 6, name: "Diego Sánchez", status: "active" },
        { id: 7, name: "Sofía Hernández", status: "active" },
        { id: 8, name: "Pedro Ramírez", status: "active" },
        { id: 9, name: "Elena Castro", status: "active" },
        { id: 10, name: "Miguel Torres", status: "active" }
    ];

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
    loadAthletes();
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
                case 'paid':
                    statusClass = 'status-paid';
                    statusText = 'Pagado';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    statusText = 'Pendiente';
                    break;
                case 'overdue':
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
                <td><strong>$${payment.amount.toFixed(2)}</strong></td>
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
        const payment = samplePayments.find(p => p.id === id);
        if (payment) {
            alert(`Detalles del Pago #${id}:\n\n` +
                  `Atleta: ${payment.athlete}\n` +
                  `Concepto: ${payment.concept}\n` +
                  `Monto: $${payment.amount}\n` +
                  `Estado: ${payment.status}\n` +
                  `Fecha Vencimiento: ${formatDate(payment.dueDate)}\n` +
                  `Fecha Pago: ${payment.paymentDate ? formatDate(payment.paymentDate) : 'Pendiente'}\n` +
                  `Método: ${payment.method || 'No especificado'}\n` +
                  `Notas: ${payment.notes || 'Ninguna'}`);
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