import { Button, Form, Input } from "antd";
import React, { useCallback, useMemo } from "react";
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
  const { isLoggingIn } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    // console.log(id, password);
    dispatch(loginRequestAction({ id, password }));
  }, [id, password]);
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">id</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
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
