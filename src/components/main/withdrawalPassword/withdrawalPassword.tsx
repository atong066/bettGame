import MainLayout from "../../layout";
import "./withdrawalPassword.css";
import TextFieldMui from "../../layout/common/textField";
import ErrorIcon from "@mui/icons-material/Error";
import { useRef, useState } from "react";
import ComponentTitle from "../../layout/common/componentTitle";

export default function WithdrawalPassword() {
  const withdrawalPassword = useRef("");
  const withdrawalPasswordConfirm = useRef("");

  function onChangeWithdrawalPassword(value: any) {
    // setWithdrawalPassword(value);
    console.log(withdrawalPassword.current=value)
  }

  function onChangeWithdrawalPasswordConfirm(value: any) {
    // setWithdrawalPasswordConfirm(value);
    console.log(withdrawalPasswordConfirm.current=value)

    console.log("value ", value);
  }

  const isPasswordValid = withdrawalPassword

  const isPasswordConfirmValid =
    withdrawalPassword === withdrawalPasswordConfirm &&
    withdrawalPassword

  return (
    <div>
      <MainLayout>
        <section>
          <ComponentTitle turnBack="Turn back" title="Withdrawal Password"/>
          <div className="bodyContainer">

            <div className="greenText">
              You are the first withdrawal, you need to set the withdrawal
              password first
            </div>

            <div className="bodyHeaderTitle">Set Withdrawal Password</div>
            <div className="passwordInput">New Withdrawal Password</div>

            <TextFieldMui key="pwd1" onChange={onChangeWithdrawalPassword} />

            {!isPasswordValid && (
              <div className="errorBody">
                <ErrorIcon key="err1" className="error" />
                <div className="warning">6 numbers</div>
              </div>
            )}

            <div className="passwordInput">Confirm New Password</div>
            <TextFieldMui
              key="pwd2"
              onChange={onChangeWithdrawalPasswordConfirm}
            />

            {!isPasswordConfirmValid && (
              <div className="errorBody">
                <ErrorIcon key="err2" className="error" />
                <div className="warning">
                  Withdrawal Password Field cannot be empty
                </div>
              </div>
            )}

            <div className="notice">
              You are the first withdrawal, you need to set the withdrawal
              password first
            </div>

            <button className="confirm">Confirm</button>

          </div>
        </section>
      </MainLayout>
    </div>
  );
}
