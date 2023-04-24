import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Col, Input, Menu, Row } from "antd";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import useInput from "../hooks/useInput";
import Router from "next/router";

const SearchInput = styled(Input.Search)`
  padding: 10px;
  justify-content: center;
  align-item: center;
`;
const Global = createGlobalStyle`
.ant-row{
  margin-right:0 | important'
  margin-left:0|important
}
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput("");
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <SearchInput
        enterButton
        value={searchInput}
        onChange={onChangeSearchInput}
        onSearch={onSearch}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://juseongsdevstory.tistory.com/"
            target="_blank"
            rel="noreferer noopener"
          >
            Made by Jeo
          </a>
        </Col>
      </Row>
    </div>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
