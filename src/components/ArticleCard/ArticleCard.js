/** @jsxImportSource @emotion/react */
import { ClickableTile } from "carbon-components-react";
import moment from "moment";
import { ErrorBoundary } from "react-error-boundary";
import { useHistory } from "react-router-dom";
import { ErrorFallback } from "../../components/lib";
import { ArticleImage } from "./ArticleImage";

function ArticleCard({
  articleId,
  image: imageRendition,
  author,
  heading,
  date,
}) {
  const formattedDate = moment(date).format("MMMM Do YYYY");
  const history = useHistory();

  const handleTileClick = event => {
    history.push(`/document/${articleId}`)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ClickableTile
        handleClick={handleTileClick}
        css={{
          height: "300px",
          width: "100%",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <ArticleImage
            rendition={imageRendition}
            css={{
              width: "100%",
              height: "100%",
            }}
          />
          <div
            css={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              height: "80px",
              padding: "10px",
              overflow: "auto",
              position: "absolute",
              width: "100%",
            }}
          >
            <h4>{heading || "DEFAULT HEADING"}</h4>
            <h6>{author || "DEFAULT AUTHOR"}</h6>
            <span>{formattedDate || "DATE"}</span>
          </div>
        </div>
      </ClickableTile>
    </ErrorBoundary>
  );
}

export { ArticleCard };
