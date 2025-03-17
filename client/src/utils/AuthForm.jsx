export const validateForm = (contact) => {
    const errors = {};

    if (!contact) {
      return { general: "Datos de formulario no proporcionados" };
    }
  
    if (!contact.first_name.trim()) {
      errors.first_name = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(contact.first_name)) {
      errors.first_name = "El nombre solo debe contener letras y espacios (2-50 caracteres)";
    }
  
    if (!contact.last_name.trim()) {
      errors.last_name = "El apellido es obligatorio";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(contact.last_name)) {
      errors.last_name = "El apellido solo debe contener letras y espacios (2-50 caracteres)";
    }
  
    if (!contact.phone.trim()) {
      errors.phone = "El teléfono es obligatorio";
    } else if (!/^\+?\d{7,15}$/.test(contact.phone)) {
      errors.phone = "Número de teléfono inválido";
    }
  
    if (contact.other_phone && !/^\+?\d{7,15}$/.test(contact.other_phone)) {
      errors.other_phone = "Número de teléfono inválido";
    }
  
    if (contact.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact.email)) {
      errors.email = "Correo electrónico inválido";
    }
  
    if (contact.address.length > 150) {
      errors.address = "La dirección no puede superar los 150 caracteres";
    }
  
    if (!contact.gender) {
      errors.gender = "Debe seleccionar un género";
    }
  
    if (contact.birthday) {
      const today = new Date().toISOString().split("T")[0];
      if (contact.birthday > today) {
        errors.birthday = "La fecha de nacimiento no puede ser futura";
      }
    }
  
    if (!contact.roleId) {
      errors.roleId = "Debe seleccionar una categoría de empleado";
    }
  
    if (contact.roleId == 2 && !contact.departmentId) {
      errors.departmentId = "Debe seleccionar un departamento";
    }
  
    if (contact.image && contact.image.size > 2 * 1024 * 1024) {
      errors.image = "El archivo debe pesar menos de 2MB";
    }
  
    return errors;
  };
  