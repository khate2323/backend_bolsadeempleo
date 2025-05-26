import bcrypt from "bcryptjs";
import { createUser, getUserByLogin } from "../services/user.service.js";
import { saveRefreshToken } from "../services/refresh-token.service.js";
import {
  createCode,
  getCodeByUserId,
  markCodeIsUsed,
} from "../services/code-verification.service.js";

import { generateCodeWithExpiration } from "../utils/generate.utils.js";
import {
  codeIsExpired,
  isEmail,
  validateFieldsRequired,
} from "../utils/validators.utils.js";
import { handleDbError } from "../handlers/error-db.handler.js";
import { sendEmailHtml } from "../handlers/mailer.handler.js";

import {
  badRequestRes,
  serverErrorRes,
  successRes,
  unauthorizedRes,
} from "../handlers/response.handler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../handlers/jwt.handler.js";

export async function loginCtrl(req, res) {
  try {
    
    const requiredFields = ["login", "password"];
    const labels = { login: "Usuario", password: "Contraseña" };
    
    const errors = validateFieldsRequired(requiredFields, req.body, labels);
    
    if (errors.length > 0) return badRequestRes(res, errors);
    
    const { login = null, password = null } = req.body;
    const user = await getUserByLogin(login);
    if (!user) return unauthorizedRes(res, "Usuario o contraseña incorrectos");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return unauthorizedRes(res, "Usuario o contraseña incorrectos");

    if (user.is_active === 0) return unauthorizedRes(res, "Usuario inactivo");
    // if (user.is_verified === 0)
    //   return unauthorizedRes(res, "Usuario no verificado");

    const codeVerification = generateCodeWithExpiration();
    await createCode({
      code: codeVerification.code,
      user_id: user.id,
      expires_at: codeVerification.expiresAt,
      type: 1,
    });

    sendEmailHtml(
      user.email,
      "Código de acceso Bolsa Unimayor",
      `Código de acceso ${codeVerification.code}`
    );

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    await saveRefreshToken(user.id, refreshToken, expiresAt);

    delete user.password;
    return successRes(res, { user: user, accessToken, refreshToken });
  } catch (error) {
    console.error("error exec loginCtrl=>", error.message);
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);

    return serverErrorRes(res);
  }
}

export async function registerUserCtrl(req, res) {
  try {
    const {
      full_name = null,
      identification = null,
      red_id = null,
      role_id = null,
      email = null,
      login = null,
      password = null,
    } = req.body;

    const requiredFields = [
      "full_name",
      "identification",
      "red_id",
      "role_id",
      "email",
      "login",
      "password",
    ];
    const labels = {
      full_name: "Nombre",
      identification: "Nit o identificación",
      red_id: "Red",
      role_id: "Rol",
      email: "Correo",
      login: "Login",
      password: "Contraseña",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    if (!isEmail(email))
      return badRequestRes(res, ["El correo proporcionado no es válido"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const dataToSave = {
      full_name: full_name,
      identification: identification,
      red_id: red_id,
      role_id: role_id,
      email: email,
      login: login,
      password: passwordHash,
    };

    const user = await createUser(dataToSave);
    if (user) {
      const codeVerification = generateCodeWithExpiration();

      await createCode({
        code: codeVerification.code,
        user_id: user.id,
        expires_at: codeVerification.expiresAt,
        type: 2,
      });

      sendEmailHtml(
        email,
        "Verificar cuenta",
        `Este es el código de verificación ${codeVerification.code}`
      );
    }

    delete user.password;
    return successRes(res, user);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);
    return serverErrorRes(res);
  }
}

export async function verifyUserCtrl(req, res) {
  try {
    const { user_id = null, code = null } = req.body;
    const requiredFields = ["user_id", "code"];

    const labels = {
      user_id: "Usuario",
      code: "Código",
    };

    const errors = validateFieldsRequired(requiredFields, req.body, labels);

    if (errors.length > 0) return badRequestRes(res, errors);

    const codeData = await getCodeByUserId(parseInt(code), parseInt(user_id));

    if (codeData.length === 0)
      return badRequestRes(res, [
        "El código proporcionado por el usuario es invalido o ya fué usado con anterioridad",
      ]);

    if (codeIsExpired(codeData[0].expires_at))
      return badRequestRes(res, [
        "El código ha expirado, por favor solicite el código de verificación nuevamente",
      ]);

    await markCodeIsUsed(codeData[0].id);
    return successRes(res, codeData);
  } catch (error) {
    const { code, message } = handleDbError(error);
    if (code === 400) return badRequestRes(res, [message]);
    return serverErrorRes(res);
  }
}
