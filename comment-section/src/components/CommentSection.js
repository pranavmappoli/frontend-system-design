import React, { useEffect, useRef, useState } from "react";
import "./commentSection.css";

function CommentSection({ comment, saveHandler, replyHandler, deleteHandler }) {
  const [editable, setEditable] = useState(false);
  const [replyMode, setreplyMode] = useState(false);
  const [replyMessage, setreplyMessage] = useState("");
  const [message, setMessage] = useState();
  const inputRef = useRef();

  useEffect(() => {
    setMessage(comment.comment);
  }, [comment.comment]);

  function replyHandlerLocal(id) {
    replyHandler(id, replyMessage);
    setreplyMode(false);
    setreplyMessage("");
  }
  function saveHandlerLocal(id) {
    setEditable(false);
    saveHandler(id, message);
  }
  function cancelHandler() {
    setEditable(false);
    setMessage(comment.comment);
  }
  function replyCancelHandler() {
    setreplyMode(false);
    setreplyMessage("");
  }
  function deleteHandlerLocal(id) {
    setEditable(false);
    deleteHandler(id);
  }
  function inputHandler(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      <div key={comment.id}>
        <div className="commentContainer">
          {editable && (
            <input ref={inputRef} onChange={inputHandler} value={message} />
          )}
          {!editable && <span> {message}</span>}
          <div className="commentsButton">
            {!editable && !replyMode && (
              <button onClick={() => setreplyMode(true)}>Reply</button>
            )}
            {editable && (
              <button onClick={() => saveHandlerLocal(comment.id)}>Save</button>
            )}
            {!editable && (
              <button onClick={() => setEditable(true)}>Edit</button>
            )}
            {editable && <button onClick={cancelHandler}>Cancel</button>}
            {!editable && (
              <button onClick={() => deleteHandlerLocal(comment.id)}>
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="commentReplies">
          {replyMode && (
            <div className="reply-container">
              <input onChange={(e) => setreplyMessage(e.target.value)} />
              <div className="reply-btns">
                <button onClick={replyCancelHandler}>Cancel</button>
                <button onClick={() => replyHandlerLocal(comment.id)}>
                  Save
                </button>
              </div>
            </div>
          )}
          {comment?.replies?.map((replie) => {
            return (
              <CommentSection
                key={replie.id}
                comment={replie}
                saveHandler={saveHandler}
                replyHandler={replyHandler}
                deleteHandler={deleteHandler}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CommentSection;
