import { UserModel } from "models/users";

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne({email});
export const getuserById = (id:String) => UserModel.findById(id);
export const getUserBySessionToken = (sessionToken: String) =>UserModel.findOne({
    'aunthentication.sessionToken': sessionToken,
})
export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());

export const deleteUserById = (id: string) => {
    UserModel.findOneAndDelete({_id: id});
}
export const updateUserById = (id: string, values: Record<string, any>) => {
    UserModel.findByIdAndUpdate(id, values)
}