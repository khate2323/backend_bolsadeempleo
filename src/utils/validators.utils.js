export function isEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// validar campos requeridos
export function validateFieldsRequired(fields, body, labels = {}) {
  const errors = [];

  try {
    if (!body || typeof body !== "object") {
      errors.push("Cuerpo de datos inválido");
      return errors;
    }

    fields.forEach((field) => {
      const value = body[field];

      if (value === undefined || value === null || value === "") {
        const label = labels[field] || field;
        errors.push(`${label} requerido(a)`);
      }
    });

    return errors;
  } catch (error) {
    errors.push("Error interno al validar los campos requeridos");
    return errors;
  }
}

export function codeIsExpired(expiresAt) {
  try {
    return new Date() > new Date(expiresAt);
  } catch (error) {
    return true;
  }
}
