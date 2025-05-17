import React from "react";

function FromikError({ formik, inputName }) {
  const hasError = formik.errors[inputName] && formik.touched[inputName];
  return (
    <>
      {hasError ? (
        <div className="text-red-600">{formik.errors[inputName]}</div>
      ) : null}
    </>
  );
}

export default FromikError;
