export function successRes(res, data) {
  res.status(200).json({
    status: 200,
    message: "Success",
    next: true,
    data: data,
  });
}

export function successEmptyRes(res, data) {
  res.status(202).json({
    status: 202,
    message: "Success Empty",
    next: true,
    data: data,
  });
}

export function badRequestRes(res, errors = []) {
  res.status(400).json({
    status: 400,
    next: false,
    message: "Datos invalidos",
    errors: errors,
  });
}

export function unauthorizedRes(res, message) {
  res.status(401).json({
    status: 401,
    next: false,
    message: message ?? "Unauthorized",
  });
}

export function forbiddenRes(res, message) {
  res.status(403).json({
    status: 403,
    next: false,
    message: message ?? "Forbidden",
  });
}

export function serverErrorRes(res, message) {
  res.status(500).json({
    status: 500,
    message: "Error",
    next: false,
    message: message ?? "Internal server error",
  });
}
