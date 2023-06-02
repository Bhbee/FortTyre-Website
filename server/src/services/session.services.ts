import { HydratedDocument, FilterQuery, UpdateQuery } from "mongoose";
//import config from "config";
import { get } from "lodash";
import { UserDocument } from "../models/user.model";
import Session, { SessionDocument } from "../models/session.model";
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.services";


//const accessTokenOpt = process.env.accessTokenOpt;
export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | HydratedDocument<Omit<UserDocument, "password">>;
  session:
    | Omit<SessionDocument, "password">
    | HydratedDocument<Omit<SessionDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: "15m"} // 15 minutes
    // { expiresIn: config.get<string>("accessTokenOpt") } // 15 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await Session.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
