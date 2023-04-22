import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const PostCardContent = ({
  postData,
  editMode,
  onChangePost,
  onCancelUpdatePost,
}) => {
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post
  );
  const [editText, setEditText] = useState(postData); //props를 state로 만듦
  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdatePost();
    }
  }, [updatePostDone]);
  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button
              loading={updatePostLoading}
              onClick={onChangePost(editText)}
            >
              수정
            </Button>
            <Button type="danger" onClick={onCancelUpdatePost}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
      {}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdatePost: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};
PostCardContent.defaultProps = {
  editMode: false,
};
export default PostCardContent;
