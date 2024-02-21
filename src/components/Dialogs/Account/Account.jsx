import React, { useEffect, useState } from "react";
import styles from "./Account.module.scss";
import { Box, TextField } from "@mui/material";
import { Button, Icon } from "components";
import { useIPC } from "#hooks";
import { useForm } from "react-hook-form";
import { httpConfig } from "#config";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, resetUserInfo } from "#userSlice";
import {
  validateLogin,
  validateRegister,
  setActivePanel,
} from "#slices/accountSlice";

// const initialAccount = {
//   loginForm: {
//     email: {
//       error: false,
//       msg: "",
//     },
//     password: {
//       error: false,
//       msg: "",
//     },
//   },
// };
function Account() {
  console.log("Account COMPONENT IS RENDERING");
  const account = useSelector((state) => state.accountStore);
  // const [activeRight, setActiveRight] = useState("");
  // const [account, setAccouunt] = useState(initialAccount);
  const dispatch = useDispatch();
  const ipc = useIPC();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  const onSubmit = async (data) => {
    console.log("submitted form ", data);
    const loginData = await ipc.login(data.email, data.password);
    if (loginData.error) {
      const { code, msg } = loginData.error;

      const loginForm = {
        email: {
          error: code === httpConfig.errorCode.INVALID_EMAIL,
          msg: code === httpConfig.errorCode.INVALID_EMAIL && msg,
        },
        password: {
          error: code === httpConfig.errorCode.INVALID_PASSWORD,
          msg: code === httpConfig.errorCode.INVALID_PASSWORD && msg,
        },
      };
      // setAccouunt((prev) => ({ ...prev, loginForm: loginFormState }));
      dispatch(validateLogin({ loginForm }));
    } else {
      // setAccouunt((prev) => ({ ...prev, pageOpen: false }));
      // login successfull, dispatch setUserInfo and animate leave
      dispatch(setUserInfo(loginData));
    }
  };
  // const guestOnClick = () => {
  //   setAccouunt((prev) => ({ ...prev, pageOpen: false }));
  //   navigate(links.Home());
  // };
  // const wrapperClass = `${styles.wrapper} ${!account.pageOpen && styles.close}`;
  const containerClass = `${styles.container} ${styles[account.activePanel]}`;
  const signinClass = `${styles.form} ${styles.signin}`;
  const signupClass = `${styles.form} ${styles.signup}`;
  const panelLeft = `${styles.panel} ${styles.panelLeft}`;
  const panelRight = `${styles.panel} ${styles.panelRight}`;

  useEffect(() => {
    console.log("formstate", errors);
  });
  return (
    // <div className={wrapperClass}>
    //   <div>
    //     <Button onClick={() => navigate(links.Home())}>
    //       <Icon icon="times" width={24} height={24} color="white" />
    //       Continue As Guest
    //     </Button>
    <div className={containerClass}>
      <div className={signupClass}>
        <div className={styles.formPart}>
          <h1>Create Account</h1>
          <TextField label="Name *" type="text" variant="outlined" />
          <TextField label="Email *" type="text" variant="outlined" />
          <TextField label="Password *" type="password" variant="outlined" />
          <Button onClick={() => console.log("adslkfja")}>Sign Up</Button>
        </div>
      </div>
      <div className={signinClass}>
        <form className={styles.formPart} onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign in</h1>
          <TextField
            name="email"
            label="Email *"
            type="text"
            variant="outlined"
            error={errors.email || account.loginForm.email.error}
            helperText={errors.email?.message || account.loginForm.email.msg}
            {...register("email", {
              required: "Please enter a valid email",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
          />
          <TextField
            name="password"
            label="Password *"
            type="password"
            variant="outlined"
            error={errors.password || account.loginForm.password.error}
            helperText={errors.password?.message || account.loginForm.password.msg}
            {...register("password", {
              required: "Please enter your password!",
            })}
          />
          <a href="#">Forgot your password?</a>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
      <div className={styles.overlayWrap}>
        <div className={styles.overlay}>
          <div className={panelLeft}>
            <h1>Hello, Friend!</h1>
            <p>
              Create your VM account to start playing with a personalized
              experience!
            </p>
            <p>
              If you already have an account click &nbsp;
              <a onClick={() => dispatch(setActivePanel("login"))}>
                <strong>here</strong>
              </a>{" "}
              to login.
            </p>
            {/* <Button onClick={() => setActiveRight("")}>Sign In</Button> */}
          </div>
          <div className={panelRight}>
            <h1>Welcome Back!</h1>
            <p>Login to your VM account entering your e-mail and password.</p>
            <p>
              If you dont have a VM account click &nbsp;
              <a onClick={() => dispatch(setActivePanel("register"))}>
                <strong>here</strong>
              </a>
              to create.
            </p>
            {/* <Button
                className={styles.btnActivateLogin}
                onClick={() => setActiveRight("activeRight")}
              >
                Sign Up
              </Button> */}
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
}

export default Account;
