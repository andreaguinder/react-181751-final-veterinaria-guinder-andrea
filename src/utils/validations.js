// Validaciones para el formulario de Turnos
export const validarTurno = (formData) => {
  const errores = {};

  if (!formData.nombre || !formData.nombre.trim()) {
    errores.nombre = 'El nombre del dueño es obligatorio.';
  }

  if (!formData.mascota || !formData.mascota.trim()) {
    errores.mascota = 'El nombre de la mascota es obligatorio.';
  }

  if (!formData.fecha) {
    errores.fecha = 'Debes seleccionar una fecha.';
  }

  if (!formData.horario) {
    errores.horario = 'Debes seleccionar un horario.';
  }

  if (!formData.mensaje || !formData.mensaje.trim()) {
    errores.mensaje = 'El motivo de consulta es obligatorio.';
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
};

// Validaciones para el formulario de Login
export const validarLogin = (email, password) => {
  const errores = {};


  if (!email || !email.trim()) {
    errores.email = 'El email es obligatorio.';
  } else if (!email.includes('@')) {
    errores.email = 'El email debe contener un "@".';
  }


  if (!password || !password.trim()) {
    errores.password = 'La contraseña es obligatoria.';
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
};