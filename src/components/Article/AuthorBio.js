/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ArticleImage } from "./ArticleImage";

function AuthorBio({ author, bio, image, isLoading }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "50px",
        justifyContent: "center",
      }}
    >
      {image ? (
        <div
          css={{
            margin: "10px",
          }}
        >
          <ArticleImage
            css={{
              borderRadius: "50px",
              width: "80px",
              height: "80px",
            }}
            rendition={image}
            documentLoading={isLoading}
          />
        </div>
      ) : null}
      <div css={{ maxWidth: "500px" }}>
        <h4>{author}</h4>
        <div
          css={css`
            p {
              font-style: italic;
              font-size: 12px;
            }
          `}
          dangerouslySetInnerHTML={{
            __html: bio,
          }}
        ></div>
      </div>
    </div>
  );
}

export { AuthorBio };
