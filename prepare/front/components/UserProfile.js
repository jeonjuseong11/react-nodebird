import { Avatar, Card, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback } from "react";
const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar>JS</Avatar>}
        title="JuSeong"
        description={<Button onClick={onLogOut}>로그아웃</Button>}
      />
    </Card>
  );
};
export default UserProfile;
