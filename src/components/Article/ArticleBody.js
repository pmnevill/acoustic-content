/** @jsxImportSource @emotion/react */
import { SkeletonText } from "carbon-components-react";
import { Fragment } from "react";

function ArticleSection({ children }) {
  return (
    <div
      css={{
        p: {
          textIndent: "30px",
        },
      }}
    >
      <Fragment children={children}></Fragment>
      <div
        css={{
          width: "80%",
          margin: "50px",
          height: "10px",
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
}

function ArticleBody({ body, isLoading, numberLoadingSections = 3 }) {
  const loadingSections = new Array(numberLoadingSections).fill();

  return (
    <div
      css={{
        marginBottom: "200px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {isLoading ? (
        loadingSections.map((value, index) => (
          <ArticleSection key={index}>
            <SkeletonText paragraph={true} lineCount={5} />
          </ArticleSection>
        ))
      ) : body?.values ? (
        body?.values.map((value, index) => (
          <ArticleSection key={index}>
            <div dangerouslySetInnerHTML={{ __html: value }}></div>
          </ArticleSection>
        ))
      ) : (
        <p>Missing Content</p>
      )}
    </div>
  );
}

export { ArticleBody };
