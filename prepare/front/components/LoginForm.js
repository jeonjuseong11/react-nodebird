import { Button, Form, Input } from "antd";
import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import styled from "styled-components";
const FormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginForm = ({ setIsLoggedIn }) => {
  const style = useMemo(
    () => ({
      marginTop: 10,
    }),
    []
  );

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
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
        <Button type="primary" htmlType="submit" loading={false}>
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
