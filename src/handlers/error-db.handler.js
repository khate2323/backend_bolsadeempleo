export function handleDbError(error) {
  if (!error || !error.code) {
    return {
      code: 500,
      message: "Error interno desconocido",
    };
  }

  switch (error.code) {
    case "23505": {
      // unique_violation
      // Ejemplo de error.detail: 'Key (email)=(test@example.com) already exists.'
      const match = error.detail?.match(/\((.*?)\)=\((.*?)\)/);
      const field = match?.[1];
      const value = match?.[2];
      return {
        code: 400,
        message: field
          ? `Ya existe un registro con el valor '${value}' en el campo '${field}'.`
          : "Ya existe un registro con esos datos (duplicado).",
        field,
      };
    }

    case "23502": {
      // not_null_violation
      // error.column debería venir definido
      const field = error.column;
      return {
        code: 400,
        message: field
          ? `El campo '${field}' es obligatorio.`
          : "Faltan campos obligatorios para guardar la información.",
        field,
      };
    }

    case "42703": {
      // undefined_column
      // error.message contiene: column "X" does not exist
      const match = error.message?.match(/column "(.*?)" does not exist/i);
      const field = match?.[1];
      return {
        code: 400,
        message: field
          ? `El campo '${field}' no es válido (no existe en la base de datos).`
          : "Alguno de los campos enviados no es válido.",
        field,
      };
    }
    case "23503": {
      // foreign_key_violation
      const match = error.detail?.match(/\((.*?)\)=\((.*?)\)/);
      const field = match?.[1];
      const value = match?.[2];
      return {
        code: 400,
        message: field
          ? `El valor del campo '${field}' no es válido porque no existe en la tabla relacionada.`
          : "Referencia inválida a una tabla relacionada.",
        field,
      };
    }

    case "22003": {
      // numeric_value_out_of_range
      return {
        code: 400,
        message: "El valor numérico excede el rango permitido.",
      };
    }

    case "22P02": {
      // invalid_text_representation
      return {
        code: 400,
        message: "El formato de alguno de los datos es inválido.",
      };
    }

    default:
      return {
        code: 500,
        message: "Error desconocido.",
      };
  }
}
