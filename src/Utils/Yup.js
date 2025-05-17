import * as Yup from "yup";
export const EventSchema = Yup.object().shape({
  eventName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Event name is required"),

  eventCategory: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Category is required"),

  eventVenue: Yup.string().min(3, "Too Short!").required("Venue is required"),

  eventDate: Yup.date()
    .min(new Date(), "Event date must be in the future")
    .required("Event date is required"),

  eventPrice: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price can't be negative")
    .required("Price is required"),

  eventImg: Yup.mixed().required("Image is required"),

  description: Yup.string()
    .min(10, "Description too short")
    .required("Description is required"),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password too short").required("Required"),
});
