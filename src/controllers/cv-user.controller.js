import {
  getCVByEgresadoId,
  createCV,
  updateCVById,
  getExperienciasByCV,
  addExperiencia,
  getEducacionByCV,
  addEducacion,
  getIdiomasByCV,
  addIdioma,
} from "../services/cv-user.service.js";

import { validateFieldsRequired } from "../utils/validators.utils.js";
import { handleDbError } from "../handlers/error-db.handler.js";
import {
  badRequestRes,
  serverErrorRes,
  successRes,
} from "../handlers/response.handler.js";

/* ------------------------ HOJA DE VIDA ------------------------ */

export async function getCVByEgresadoIdCtrl(req, res) {
  try {
    const { idUser } = req.params;
    if (!idUser) {
      badRequestRes(res, [
        "No se ha proporcionado el identificador de la hoja de vida a consultar",
      ]);
    }
    const cv = await getCVByEgresadoId(idUser);

    if (cv) {
      return successRes(res, cv);
    } else {
      return badRequestRes(res, ["Hoja de vida no encontrada"]);
    }
  } catch (error) {
    console.log(error);

    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function createCVCtrl(req, res) {
  try {
    const requiredFields = [
      "user_id",
      "direccion",
      "titulo",
      "descripcion",
      "foto_url",
      "correo",
      "telefono",
      "sitio_web",
      "estado_documento",
    ];
    const labels = {
      user_id: "Usuario",
      direccion: "Direccion",
      titulo: "Titulo",
      descripcion: "Descripcion",
      foto_url: "Foto_url",
      correo: "Correo",
      telefono: "Telefono",
      sitio_web: "Sitio web",
      estado_documento: "Estado del documento",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);
    const newCv = await createCV(req.body);

    if (newCv) {
      return successRes(res, newCv);
    } else {
      return badRequestRes(res, [
        "No fue posible crear la hoja de vida al usuario",
      ]);
    }
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function updateCVByIdCtrl(req, res) {
  try {
    const { idCv } = req.params;
    if (!idCv) {
      return badRequestRes(res, [
        "El identificador de la hoja de vida no ha sido proporcionado",
      ]);
    }

    const requiredFields = [
      "titulo",
      "descripcion",
      "foto_url",
      "correo",
      "telefono",
      "sitio_web",
      "estado_documento",
    ];
    const labels = {
      titulo: "Titulo",
      descripcion: "Descripcion",
      foto_url: "Foto_url",
      correo: "Correo",
      telefono: "Telefono",
      sitio_web: "Sitio web",
      estado_documento: "Estado del documento",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const newCv = await updateCVById(idCv, req.body);

    return successRes(res, newCv);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

/* -------------------- EXPERIENCIA LABORAL --------------------- */

export async function getExperienciasByCVCtrl(req, res) {
  try {
    const { idCv } = req.params;
    if (!idCv) {
      badRequestRes(res, [
        "No se ha proporcionado el identificador de la hoja de vida a consultar",
      ]);
    }
    const experienceCv = await getExperienciasByCV(idCv);

    return successRes(res, experienceCv);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function addExperienciaCtrl(req, res) {
  try {
    const requiredFields = [
      "cv_id",
      "cargo",
      "empresa",
      "descripcion",
      // "fecha_inicio",
      // "fecha_fin",
    ];
    const labels = {
      cv_id: "Identificador Hoja de vida",
      cargo: "Cargo",
      empresa: "Empresa",
      descripcion: "Descripcion",
      // fecha_inicio: "Fecha inicio",
      // fecha_fin: "Fecha fin",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const newEmperienceCv = await addExperiencia(req.body);

    return successRes(res, newEmperienceCv);
  } catch (error) {
    console.log(error);
    
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

/* ------------------------- EDUCACIÓN -------------------------- */

export async function getEducacionByCVCtrl(req, res) {
  try {
    const { idCv } = req.params;
    if (!idCv) {
      badRequestRes(res, [
        "No se ha proporcionado el identificador de la hoja de vida a consultar",
      ]);
    }
    const educationCv = await getEducacionByCV(idCv);

    return successRes(res, educationCv);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function addEducacionCtrl(req, res) {
  try {
    const requiredFields = [
      "cv_id",
      "titulo",
      "institucion",
      "descripcion",
      "fecha_inicio",
      "fecha_fin",
    ];
    const labels = {
      cv_id: "Identificador Hoja de vida",
      titulo: "Titulo",
      institucion: "Institucion",
      descripcion: "Descripcion",
      fecha_inicio: "Fecha inicio",
      fecha_fin: "Fecha fin",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const newEducationCv = await addEducacion(req.body);

    return successRes(res, newEducationCv);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

/* --------------------------- IDIOMAS -------------------------- */

export async function getIdiomasByCVCtrl(req, res) {
  try {
    const { idCv } = req.params;
    if (!idCv) {
      badRequestRes(res, [
        "No se ha proporcionado el identificador de la hoja de vida a consultar",
      ]);
    }
    const languageCv = await getIdiomasByCV(idCv);

    return successRes(res, languageCv);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function addIdiomaCtrl(req, res) {
  try {
    const requiredFields = ["cv_id", "idioma", "nivel"];
    const labels = {
      cv_id: "Identificador Hoja de vida",
      idioma: "Idioma",
      nivel: "Nivel",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const newLanguagueCv = await addIdioma(req.body);

    return successRes(res, newLanguagueCv);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}
