import FromikError from "./FromikError";

const InputFrom = ({ label, type, placeholder, formik, id, name }) => {
  const errorFiled = (inputName) => {
    const err = formik.errors[inputName] && formik.touched[inputName];
    if (err) {
      return "bg-red-50 border-red-500";
    }
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
        className={`${errorFiled(name) ? "input-err" : "form-filed "}`}
        required
      />
      <FromikError formik={formik} inputName={name} />
    </>
  );
};

export default InputFrom;
