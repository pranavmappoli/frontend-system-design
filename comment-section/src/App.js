import "./App.css";
import "./components/commentSection.css";
import CommentSection from "./components/CommentSection";

import React, { useState } from "react";

const commentData = [
  {
    id: 1,
    comment: "comment parent one",
    replies: [
      {
        id: 2,
        comment: "reply level 2",
        replies: [
          {
            id: 3,
            comment: "replay level 3",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    comment: "comment parent two",
    replies: [
      {
        id: 10,
        comment: "reply level 2",
        replies: [],
      },
    ],
  },
];

function App() {
  const [comments, setComments] = useState(commentData);
  const [comment, setComment] = useState("");

  function generateCommentObj(comment) {
    return {
      id: Date.now(),
      comment,
      replies: [],
    };
  }

  function saveHandler(id, message) {
    function dfs(comment) {
      if (comment.id == id) {
        return { ...comment, comment: message };
      }
      const modifiedReplies = [];
      for (let cmd of comment.replies || []) {
        modifiedReplies.push(dfs(cmd));
      }
      return {
        ...comment,
        replies: modifiedReplies,
      };
    }
    const newComments = comments.map((comment) => dfs(comment));
    setComments(newComments);
  }

  function replyHandler(id, message) {
    function dfs(comment) {
      if (comment.id == id) {
        comment.replies.push(generateCommentObj(message));
        return comment;
      }
      const modifiedReplies = [];
      for (let cmd of comment.replies || []) {
        modifiedReplies.push(dfs(cmd));
      }
      return {
        ...comment,
        replies: modifiedReplies,
      };
    }
    const newComments = comments.map((comment) => dfs(comment));
    setComments(newComments);
  }

  function deleteHandler(id) {
    function dfs(comment) {
      if (comment.id == id) {
        return;
      }
      const modifiedReplies = [];
      for (let cmd of comment.replies || []) {
        const replies = dfs(cmd);
        if (replies) modifiedReplies.push(replies);
      }
      return {
        ...comment,
        replies: modifiedReplies,
      };
    }
    const newComments = comments.map((comment) => dfs(comment)).filter(Boolean);
    setComments(newComments);
  }
  function commentSaveHanlder() {
    setComments((prev) => [...prev, generateCommentObj(comment)]);
    setComment("");
  }
  return (
    <div className="container">
      <div className="reply-container">
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <div className="reply-btns">
          <button onClick={commentSaveHanlder}>Save</button>
        </div>
      </div>
      <div className="commentContainer">
        {comments.map((comment) => {
          return (
            <CommentSection
              key={comment.id}
              comment={comment}
              saveHandler={saveHandler}
              replyHandler={replyHandler}
              deleteHandler={deleteHandler}
            ></CommentSection>
          );
        })}
      </div>
    </div>
  );
}

export default App;
