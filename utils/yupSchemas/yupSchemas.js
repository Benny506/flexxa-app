import * as Yup from "yup";

export const passwordSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>\/~`]/,
    "Password must contain at least one special character"
  )
  .matches(/^\S*$/, "Password must not contain spaces");
