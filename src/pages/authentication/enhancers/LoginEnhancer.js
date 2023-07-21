import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please provide a email."),
    password: Yup.string().required("Please provide a password."),
  }),
  validateOnMount: true,
  mapPropsToValues: () => ({
    username: "",
    password: "",
  }),
  handleSubmit: () => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
