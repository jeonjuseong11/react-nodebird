import { Avatar, Card, Button } from "antd";
import React, { useCallback } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>짹짹</a>
          </Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          <Link href={`/profile`}>
            <a>팔로잉</a>
          </Link>
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          <Link href={`/profile`}>
            <a>팔로워</a>
          </Link>
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
        description={
          <Button onClick={onLogOut} loading={logOutLoading}>
            로그아웃
          </Button>
        }
      />
    </Card>
  );
};
export default UserProfile;
