import jwt from "jsonwebtoken";

//const privateKey = config.get("privateKey") as string;
 const pKey = process.env.privateKey as string;
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, pKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, pKey);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}