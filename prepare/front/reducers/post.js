export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "jeo",
      },
      content: "첫번째 게시글 #헤시태그1 #헤시태그2",
      Images: [
        {
          src: "https://bootthumb=phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
      ],
      Comments: [
        {
          user: {
            nickname: "nero",
          },
          content: "테스크 댓글1",
        },
        {
          user: {
            nickname: "hoer",
          },
          content: "테스크 댓글2",
        },
      ],
    },
  ],
  imagePath: [],
  postAdded: false,
};
const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};
const dummyPost = {
  id: 2,
  content: "더미테이터입니다",
  User: {
    id: 1,
    nickname: "JuSeong",
  },
  Images: [],
  Comments: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};
export default reducer;
