import { useFormik } from "formik";

import { EventSchema } from "../Utils/Yup";
import { useDispatch } from "react-redux";
import { updateEvent } from "../Store/AdminSlice/ThunkActions";
import { toast } from "sonner";

function UseFormikUpdateEvent(item, toggleModelState) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      eventName: item.name,
      eventCategory: item.category,
      eventVenue: item.venue,
      eventDate: item.date,
      eventPrice: item.price,
      eventImg: item.img || "",
      description: item.description,
    },
    validationSchema: EventSchema,
    onSubmit: (values) => {
      const payload = {
        id: item.id,
        name: values.eventName,
        category: values.eventCategory,
        venue: values.eventVenue,
        date: values.eventDate,
        price: values.eventPrice,
        img: values.eventImg,
        oldImg: item.img,
        description: values.description,
      };
      dispatch(updateEvent(payload))
        .unwrap()
        .then(() => {
          toggleModelState();
        })
        .catch(() =>
          toast.error("Some thing went wrong please try again later.")
        );
    },
  });
  return formik;
}

export default UseFormikUpdateEvent;
