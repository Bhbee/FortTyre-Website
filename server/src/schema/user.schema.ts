import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    first_name: string().required("First name is required"),
    last_name: string().required("Last name is required"),
    email: string().email("Must be a valid email").required("Email is required"),
    phone_number: string().matches(/^\+\d{1,3}-\d{3,14}$/,  "Please enter a valid phone number.").required(),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    passwordConfirmation: string().oneOf(
      [ref("password"), undefined],
      "Passwords must match"
    ),
   
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),

    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

