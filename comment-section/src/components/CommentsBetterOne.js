import React, { useState } from "react";

// commentsById = {
//   "1": {
//     id: "1",
//     text: "First comment",
//     parentId: null,
//     likes: 2,
//     children: ["2", "5"]
//   },

//   "2": {
//     id: "2",
//     text: "Reply to first comment",
//     parentId: "1",
//     likes: 1,
//     children: []
//   },

//   "3": {
//     id: "3",
//     text: "Another reply",
//     parentId: null,
//     likes: 0,
//     children: ["4"]
//   },

//   "4": {
//     id: "4",
//     text: "Nested reply",
//     parentId: "3",
//     likes: 0,
//     children: []
//   }
//  "5": {
//     id: "5",
//     text: "Nested reply",
//     parentId: "1",
//     likes: 0,
//     children: []
//   }
// };
// Root Comment Order
// commentAllIds = ["1","3"]

export default function CommentSection() {
  const [commentsById, setCommentsById] = useState({});
  const [commentAllIds, setCommentAllIds] = useState([]);
  const [input, setInput] = useState("");

  const addComment = (text, parentId = null) => {
    const id = crypto.randomUUID();

    const newComment = {
      id,
      text,
      parentId,
      likes: 0,
      children: [],
    };

    // root comment
    if (!parentId) {
      setCommentsById((prev) => ({
        ...prev,
        [id]: newComment,
      }));

      setCommentAllIds((prev) => [id, ...prev]);
      return;
    }

    // reply comment
    setCommentsById((prev) => {
      const parent = prev[parentId];

      return {
        ...prev,
        [id]: newComment,
        [parentId]: {
          ...parent,
          children: [id, ...parent.children],
        },
      };
    });
  };

  const likeComment = (id) => {
    setCommentsById((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        likes: prev[id].likes + 1,
      },
    }));
  };

  const deleteComment = (id, parentId) => {
    setCommentsById((prev) => {
      const updated = { ...prev };
      delete updated[id];

      if (!parentId) return updated;

      return {
        ...updated,
        [parentId]: {
          ...updated[parentId],
          children: updated[parentId].children.filter(
            (childId) => childId !== id,
          ),
        },
      };
    });

    if (!parentId) {
      setCommentAllIds((prev) => prev.filter((commentId) => commentId !== id));
    }
  };

  return (
    <div style={{ width: 500, margin: "20px auto" }}>
      <h2>Comments</h2>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write comment..."
        />

        <button
          onClick={() => {
            if (!input.trim()) return;
            addComment(input);
            setInput("");
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {commentAllIds.map((id) => (
          <CommentItem
            key={id}
            id={id}
            commentsById={commentsById}
            addComment={addComment}
            likeComment={likeComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
}

function CommentItem({
  id,
  commentsById,
  addComment,
  likeComment,
  deleteComment,
}) {
  const comment = commentsById[id];

  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState("");

  return (
    <div
      style={{
        marginLeft: 20,
        marginTop: 10,
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 10,
      }}
    >
      <div>{comment.text}</div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button onClick={() => likeComment(id)}>👍 {comment.likes}</button>

        <button onClick={() => setShowReply((prev) => !prev)}>Reply</button>

        <button onClick={() => deleteComment(id, comment.parentId)}>
          Delete
        </button>
      </div>

      {showReply && (
        <div style={{ marginTop: 8 }}>
          <input
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            placeholder="Write reply..."
          />

          <button
            onClick={() => {
              if (!replyInput.trim()) return;
              addComment(replyInput, id);
              setReplyInput("");
              setShowReply(false);
            }}
          >
            Add Reply
          </button>
        </div>
      )}

      {comment.children.map((childId) => (
        <CommentItem
          key={childId}
          id={childId}
          commentsById={commentsById}
          addComment={addComment}
          likeComment={likeComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
}
