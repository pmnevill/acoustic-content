/** @jsxImportSource @emotion/react */
import { FaCalendar } from "react-icons/fa";
import { SkeletonText } from "carbon-components-react";
import moment from "moment";

function ArticleHeader({ heading, author, date, isLoading }) {
  const formattedDate = moment(date).format("MMMM Do YYYY");

  return (
    <div
      css={{
        margin: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <SkeletonText
          heading={true}
          css={{
            height: "50px",
            width: "50% !important",
          }}
        />
      ) : (
        <h1>{heading}</h1>
      )}
      {isLoading ? (
        <SkeletonText
          css={{
            height: "36px",
            width: "30% !important",
          }}
        />
      ) : (
        <h3
          css={{
            fontStyle: "italic",
            fontWeight: "lighter",
          }}
        >
          {author}
        </h3>
      )}
      <div
        css={{
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "30% !important",
        }}
      >
        {isLoading ? (
          <>
            <SkeletonText />
          </>
        ) : (
          <>
            <FaCalendar css={{ marginRight: "10px" }} />
            <span css={{ fontStyle: "italic" }}>
              Published: {formattedDate}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export { ArticleHeader };
