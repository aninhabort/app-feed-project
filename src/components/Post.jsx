/* eslint-disable react/prop-types */
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import ptBr from "date-fns/locale/pt-BR";

import styles from "./style/Post.module.css";

export const Post = ({ author, publishedAt, content }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  const handleCreateNewComment = (e) => {
    const { value } = e.target.comment;

    e.preventDefault();

    setComments([...comments, value]);
    setNewCommentText("");
  };

  const handleNewCommentChange = (e) => {
    const { target } = e;

    target.setCustomValidity('')
    setNewCommentText(target.value);
  };

  const deleteComment = (commentToDelete) => {
    const commentWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentWithoutDeletedOne);
  }

  const handleNewCommentInvalid = (e) => {
    e.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const isNewCommentIsEmpty = () => newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form
        onSubmit={(e) => handleCreateNewComment(e)}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Escreva um comentário..."
          value={newCommentText}
          onChange={(e) => handleNewCommentChange(e)}
          onInvalid={(e) => handleNewCommentInvalid(e)}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentIsEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  );
};
