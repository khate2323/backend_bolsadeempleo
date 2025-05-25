import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  changeRoleToUser,
  deleteUser,
} from "../services/user.service.js";

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

export async function getUserByIdCtrl(req, res) {
  try {
    const { id } = req.params;
    const resService = await getUserById(id);

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
      message: "Error interno consultando el usuario",
      next: false,
      data: [],
    });
  }
}

export async function createUserCtrl(req, res) {
  try {
    const resService = await createUser(req.body);

    return res.status(202).json({
      statusCode: 202,
      statusMessage: "success",
      message: "Usuario creado con éxito",
      next: true,
      data: resService,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "error",
      message: "Error interno creando nuevo usuario",
      next: false,
      data: [],
    });
  }
}

export async function updateUserCtrl(req, res) {
  try {
    const { id } = req.params;
    const resService = await updateUser(id, req.body);

    return res.status(202).json({
      statusCode: 202,
      statusMessage: "success",
      message: "Usuario actualizado con éxito",
      next: true,
      data: resService,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "error",
      message: "Error interno actualizando usuario",
      next: false,
      data: [],
    });
  }
}

export async function changeRoleToUserCtrl(req, res) {
  try {
    const { id } = req.params;
    const { roleId } = req.body;
    const resService = await changeRoleToUser(id, roleId);

    return res.status(200).json({
      statusCode: 200,
      statusMessage: "success",
      message: "Usuario actualizado con éxito",
      next: true,
      data: resService,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "error",
      message: "Error interno actualizando usuario",
      next: false,
      data: [],
    });
  }
}

export async function deleteUserCtrl(req, res) {
  try {
    const { id } = req.params;
    const resService = await deleteUser(id);

    return res.status(200).json({
      statusCode: 200,
      statusMessage: "success",
      message: "Usuario eliminado con éxito",
      next: true,
      data: resService,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "error",
      message: "Error interno eliminando usuario",
      next: false,
      data: [],
    });
  }
}
