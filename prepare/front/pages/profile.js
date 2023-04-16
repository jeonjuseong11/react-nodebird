import React, { useEffect } from "react";
import Router from "next/router";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";
import wrapper from "../store/configureStore";

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);
  useEffect(() => {
    if (!(me && me.id)) {
      alert("로그인시 이용 가능한 서비스입니다.");
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  //Home 보다 먼저 실행됨
  async (context) => {
    console.log("getServerSideProps start");
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = ""; //서버에 쿠키가 있을때만 쿠키를 넣고 아니면 쿠기를 제거하여 다른 유저에게 쿠키가 공유되는 문제를 해결
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log("getServerSideProps end");
    await context.store.sagaTask.toPromise();
  }
);
export default Profile;
