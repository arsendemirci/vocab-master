import React, { useEffect, useState } from "react";
import styles from "./Account.module.scss";
import { Box, TextField } from "@mui/material";
import { Button, Icon } from "components";
import { useIPC } from "#hooks";
import { useForm } from "react-hook-form";
import { httpConfig } from "#config";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, resetUserInfo } from "#userSlice";

const initialAccount = {
  loginForm: {
    email: {
      error: false,
      msg: "",
    },
    password: {
      error: false,
      msg: "",
    },
  },
};
function Account() {
  console.log("Account COMPONENT IS RENDERING");
  const [activeRight, setActiveRight] = useState("");
  const [account, setAccouunt] = useState(initialAccount);
  const dispatch = useDispatch();
  const ipc = useIPC();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("submitted form ", data);
    const loginData = await ipc.login(data.email, data.password);
    if (loginData.error) {
      const { code, msg } = loginData.error;

      const loginFormState = {
        email: {
          error: code === httpConfig.errorCode.INVALID_EMAIL,
          msg: code === httpConfig.errorCode.INVALID_EMAIL && msg,
        },
        password: {
          error: code === httpConfig.errorCode.INVALID_PASSWORD,
          msg: code === httpConfig.errorCode.INVALID_PASSWORD && msg,
        },
      };
      setAccouunt((prev) => ({ ...prev, loginForm: loginFormState }));
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
  const containerClass = `${styles.container} ${styles[activeRight]}`;
  const signinClass = `${styles.form} ${styles.signin}`;
  const signupClass = `${styles.form} ${styles.signup}`;
  const panelLeft = `${styles.panel} ${styles.panelLeft}`;
  const panelRight = `${styles.panel} ${styles.panelRight}`;

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
          <TextField label="Email *" type="email" variant="outlined" />
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
            error={account.loginForm.email.error}
            helperText={account.loginForm.email.msg}
            {...register("email", {
              required: true,
              onChange: (e) => console.log("you're typing email"),
            })}
          />
          <TextField
            name="password"
            label="Password *"
            type="password"
            variant="outlined"
            error={account.loginForm.password.error}
            helperText={account.loginForm.password.msg}
            {...register("password")}
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
              If you already have an account click{" "}
              <a onClick={() => setActiveRight("")}>
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
              If you dont have a VM account click{" "}
              <a onClick={() => setActiveRight("activeRight")}>
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
