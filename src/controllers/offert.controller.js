import { createOffert, getAllOfferts } from "../services/offert.service.js";
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
      "company_id",
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
      "responsibilities",
      "is_external",
    ];
    const labels = {
      company_id: "Empresa",
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
      responsibilities: "Responsabilidades",
      is_external: "Propiedad de la oferta",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const newOffert = await createOffert(req.body);

    return successRes(res, newOffert);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}
