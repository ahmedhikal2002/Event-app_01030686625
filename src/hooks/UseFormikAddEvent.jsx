import { useFormik } from "formik";
import React from "react";
import { EventSchema } from "../Utils/Yup";
import { addEvent } from "../Store/AdminSlice/ThunkActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function UseFormikAddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      eventName: "",
      eventCategory: "",
      eventVenue: "",
      eventDate: "",
      eventPrice: "",
      eventImg: "",
      description: "",
    },
    validationSchema: EventSchema,
    onSubmit: (values, helper) => {
      const payload = {
        eventName: values.eventName,
        eventCategory: values.eventCategory,
        eventVenue: values.eventVenue,
        eventDate: values.eventDate,
        eventPrice: values.eventPrice,
        eventImg: values.eventImg,
        description: values.description,
      };
      dispatch(addEvent(payload))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
          helper.resetForm();
        })
        .catch(() =>
          toast.error("Some thing went wrong please try again later.")
        );
    },
  });
  return formik;
}

export default UseFormikAddEvent;
