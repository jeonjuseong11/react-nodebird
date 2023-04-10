import { Button, Form, Input } from "antd";
import React, { useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";
const FormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginForm = () => {
  const style = useMemo(
    () => ({
      marginTop: 10,
    }),
    []
  );
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInError) {
      alert(logInError); //로그인 실패 이유
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    // console.log(id, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">email</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-pw">pw</label>
        <br />
        <Input
          name="user-pw"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={style}>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
