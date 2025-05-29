import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  changeRoleToUser,
  deleteUser,
} from "../services/user.service.js";

import {
  serverErrorRes,
  successEmptyRes,
  successRes,
  badRequestRes,
} from "../handlers/response.handler.js";

export async function getAllUsersCtrl(req, res) {
  try {
    const resService = await getAllUsers();

    return res.status(200).json({
      statusCode: 200,
      statusMessage: "success",
      message: "Consulta exitosa",
      next: true,
      data: resService,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "error",
      message: "Error interno consultando usuarios",
      next: false,
      data: [],
    });
  }
}

export async function getInfoSessionCtrl(req, res) {
  try {
    const { user } = req;
    delete user.password
    return successRes(res, user);
  } catch (error) {
    return serverErrorRes(
      res,
      "Ha ocurrido un error obteniendo la información del usuario"
    );
  }
}

export async function getUserByIdCtrl(req, res) {
  try {
    const { id } = req.params;
    const resService = await getUserById(id);
    if (resService.length > 0) {
      return successRes(res, resService[0]);
    } else {
      return successEmptyRes(res, resService);
    }
  } catch (error) {
    return serverErrorRes(
      res,
      "Ha ocurrido un error obteniendo la información del usuario"
    );
  }
}

export async function createUserCtrl(req, res) {
  try {
    const resService = await createUser(req.body);

    if (resService.length > 0) {
      return successRes(res, resService[0]);
    } else {
      return badRequestRes(res, [""]);
    }
  } catch (error) {
    return serverErrorRes(res, "Ha ocurrido un error creando nuevo usuario");
  }
}

export async function updateUserCtrl(req, res) {
  try {
    const { id } = req.params;
    const resService = await updateUser(id, req.body);

    if (resService.length > 0) {
      return successRes(res, resService[0]);
    } else {
      return badRequestRes(res, [
        "No existe el usuario con el identificador proporcionado",
      ]);
    }
  } catch (error) {
    return serverErrorRes(
      res,
      "Ha ocurrido un error interno actualizando usuario"
    );
  }
}

export async function changeRoleToUserCtrl(req, res) {
  try {
    const { id } = req.params;
    const { roleId } = req.body;
    const resService = await changeRoleToUser(id, roleId);

    if (resService.length > 0) {
      return successRes(res, resService[0]);
    } else {
      return badRequestRes(res, [
        "No existe el usuario con el identificador proporcionado",
      ]);
    }
  } catch (error) {
    return serverErrorRes(
      res,
      "Ha ocurrido un error interno actualizando usuario"
    );
  }
}

export async function deleteUserCtrl(req, res) {
  try {
    const { id } = req.params;
    const resService = await deleteUser(id);

    if (resService.length > 0) {
      return successRes(res, resService[0]);
    } else {
      return badRequestRes(res, [
        "No existe el usuario con el identificador proporcionado",
      ]);
    }
  } catch (error) {
    return serverErrorRes(res, "Ha ocurrido un error eliminando usuario");
  }
}
