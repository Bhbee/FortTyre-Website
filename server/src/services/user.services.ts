
import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../models/user.model";

//create user service
export async function createUser(input: UserDocument) {
  try {
    return await User.create(input);
  } catch (error) {
    throw error;
  }
}

//find user by query service
export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

//validate password service
export async function validatePassword({ email, password}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}