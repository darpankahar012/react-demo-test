/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import LoginEnhancer from "./enhancers/LoginEnhancer";
import AuthActions from "../../redux/auth/actions";
import NavigationAction from "../../redux/navigation/action";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import axios from "axios";
import vars from "../../utils/vars";

let { isLogin } = AuthActions;
let { success, error, fetching } = NavigationAction;

const Login = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    submitCount,
    errors,
    isLogin,
    success,
    error,
    history,
    fetching,
  } = props;

  const Error = (props) => {
    const field = props.field;
    if ((errors[field] && touched[field]) || submitCount > 0) {
      return <ErrorMsg message={errors[field]} />;
    } else {
      return <span />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetching(true);
    const { isValid } = props;

    if (isValid) {
      const headers = {
        "Content-Type": "application/json",
      };

      await axios
        .post(
          `${vars.API_URL}/auth/login`,
          {
            password: values.password,
            username: values.username,
          },
          { headers }
        )
        .then((response) => {
          if (response.status === 200) {
            success("Login successful !!!");
            isLogin(true, response.data);
            fetching(false);
            history.push("/dashboard");
          } else {
            fetching(false);
            error("Login failed !!!");
          }
        })
        .catch((err) => {
          console.log("Error ========>", err);
        });
    }
  };

  return (
    <main className="grid min-h-full place-items-center bg-white lg:px-8">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="box-border border-2 p-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-24 w-24 rounded-full ring-2 ring-white mx-auto h-10 w-auto"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    values={values?.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <Error field="username" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    values={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <Error field="password" />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state?.authentication?.loggedIn,
  };
};

export default compose(
  withRouter,
  LoginEnhancer,
  connect(mapStateToProps, { isLogin, success, error, fetching })
)(Login);
