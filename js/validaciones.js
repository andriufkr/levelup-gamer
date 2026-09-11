document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el envío automático de datos incompletos[cite: 2]
            
            let tieneErrores = false;

            // 1. Capturar valores
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const fechaNac = document.getElementById('fecha-nacimiento').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // 2. Resetear mensajes de error
            document.querySelectorAll('.error-field').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });
            document.getElementById('alert-global').style.display = 'none';

            // 3. Validar campos vacíos básicos
            if (!nombre || !email || !fechaNac || !password) {
                const alertGlobal = document.getElementById('alert-global');
                alertGlobal.textContent = 'Faltan campos obligatorios.';
                alertGlobal.style.display = 'block';
                tieneErrores = true;
            }

            // 4. Regla de Negocio: Validación de Edad (Mayor de 18)[cite: 3]
            if (fechaNac) {
                const hoy = new Date();
                const nacimiento = new Date(fechaNac);
                let edad = hoy.getFullYear() - nacimiento.getFullYear();
                const mes = hoy.getMonth() - nacimiento.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                    edad--;
                }
                
                if (edad < 18) {
                    const errorFecha = document.getElementById('error-fecha');
                    errorFecha.textContent = 'Debes ser mayor de 18 años para registrarte.'; // Mensaje claro y específico[cite: 2]
                    errorFecha.style.display = 'block';
                    tieneErrores = true;
                }
            }

            // 5. Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                const errorPass = document.getElementById('error-confirm-password');
                errorPass.textContent = 'Las contraseñas no coinciden.'; // Mensaje de error específico[cite: 2]
                errorPass.style.display = 'block';
                tieneErrores = true;
            }

            // 6. Procesar registro exitoso y Regla del Descuento
            if (!tieneErrores) {
                // Identificar si el correo pertenece a Duoc[cite: 3]
                const esDuoc = email.toLowerCase().includes('@duoc.cl') || email.toLowerCase().includes('@duocuc.cl');
                
                const usuarioData = {
                    nombre: nombre,
                    email: email,
                    esDuoc: esDuoc,
                    puntosLevelUp: 0 // Preparación para el sistema de gamificación[cite: 3]
                };

                // Guardar usuario en localStorage temporalmente
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioData));
                
                alert(`¡Registro completado! ${esDuoc ? 'Obtienes un 20% de descuento de por vida por usar tu correo Duoc.' : ''}`);
                window.location.href = 'login.html'; // Redirigir al inicio de sesión
            }
        });
    }
});