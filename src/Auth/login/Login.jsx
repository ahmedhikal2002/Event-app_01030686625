import { useFormik } from "formik";
import Heading from "../../Utils/Heading";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Store/AuthSlice/ThunkAuth";
import WithGuard from "../../Utils/WithGuard";
import { LoginSchema } from "../../Utils/Yup";
import InputFrom from "../../Utils/InputFrom";

import { Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  console.log(error);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login({ email: values.email, password: values.password }))
        .unwrap()
        .catch(() => toast.error(`failed to login ${error}`));
    },
  });

  return (
    <div className="flex-column">
      <Heading>Login</Heading>
      <form className="from" onSubmit={formik.handleSubmit}>
        <InputFrom
          formik={formik}
          id="email-add"
          label="Email"
          name="email"
          placeholder="enter your email"
          type="email"
        />
        <InputFrom
          formik={formik}
          id="pass"
          label="Password"
          name="password"
          placeholder="enter your password"
          type="password"
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading..." : " Login"}
        </button>
        <Link to="/signup" className="link">
          Don't have an account signup now
        </Link>
      </form>
    </div>
  );
}

export default WithGuard(Login);
