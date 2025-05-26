import {
  applyToOffert,
  createOffert,
  getAllOfferts,
  hasUserApplied,
  isOffertValidForApplication,
} from "../services/offert.service.js";
import { validateFieldsRequired } from "../utils/validators.utils.js";
import { handleDbError } from "../handlers/error-db.handler.js";
import {
  badRequestRes,
  serverErrorRes,
  successRes,
} from "../handlers/response.handler.js";

export async function getAllOffertsCtrl(req, res) {
  try {
    const offerts = await getAllOfferts();

    return successRes(res, offerts);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function createOffertCtrl(req, res) {
  try {
    const requiredFields = [
      "title",
      "description",
      "location",
      "modality",
      "employment_type",
      "salary_min",
      "salary_max",
      "currency",
      "vacancies",
      "requirements",
      "responsibilities"
    ];
    const labels = {
      title: "Titulo",
      description: "Descripción",
      location: "Ubicacion",
      modality: "Modalidad",
      employment_type: "Tipo de empleo",
      salary_min: "Salario minimo",
      salary_max: "Salario máximo",
      currency: "Tipo de moneda",
      vacancies: "Número de vacantes",
      requirements: "Requisitos",
      responsibilities: "Responsabilidades"
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const dataToSave = { ...req.body, company_id: req.userId };
    const newOffert = await createOffert(dataToSave);

    return successRes(res, newOffert);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

//! Applications to offerts
export async function applyToOffertCtrl(req, res) {
  try {
    const { userId, offertId } = req.body;
    const requiredFields = ["userId", "offertId"];
    const labels = {
      user_id: "Usuario",
      offertId: "Oferta",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const offertIsValid = await isOffertValidForApplication(offertId);
    console.log("offertIsValid", offertIsValid);
    
    if (!offertIsValid)
      return badRequestRes(res, [
        "La oferta se encuentra inactiva o expiro el tiempo hábil de postulación",
      ]);

    const userAlreadyAplly = await hasUserApplied(userId, offertId);
    if (userAlreadyAplly)
      return badRequestRes(res, ["Ya se encuentra postulado a la oferta"]);

    const newOffert = await applyToOffert(req.body);
    return successRes(res, newOffert);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}
