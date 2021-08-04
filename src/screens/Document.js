/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDocument } from "../utils/documents";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, ErrorMessage } from "../components/lib";
import { ArticleImage } from "../components/Article/ArticleImage";
import { Article } from "../components/Article/Article";
import { ArticleHeader } from "../components/Article/ArticleHeader";
import { AuthorBio } from "../components/Article/AuthorBio";
import { ArticleBody } from "../components/Article/ArticleBody";

function DocumentScreen() {
  const { documentId } = useParams();
  const history = useHistory();
  const { document, isLoading, error, refetch } = useDocument(documentId);

  const leadImage = document?.elements?.mainImage?.value?.leadImage || null;
  const headingValue = document?.elements?.heading?.value || null;
  const authorValue = document?.elements?.author?.value || null;
  const authorBioValue = document?.elements?.authorBio?.value || null;
  const dateValue = document?.elements?.date?.value || null;
  const body = document?.elements?.body || null;

  const { data: authorBioData, isLoading: authorBioIsLoading } = useDocument(
    authorBioValue?.id,
    {
      enabled: !!authorBioValue,
    },
    "authorBio"
  );

  React.useEffect(() => {
    if (error) {
      history.push("/");
    }
  }, [history, error]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {!error ? <Article>
        <ArticleHeader
          heading={headingValue}
          author={authorValue}
          date={dateValue}
          isLoading={isLoading}
        />
        <ArticleImage
          rendition={leadImage}
          css={{
            height: "50vh",
            marginBottom: "50px",
          }}
          documentLoading={isLoading}
        />
        <AuthorBio
          author={authorValue}
          bio={authorBioData?.elements?.shortBio?.value}
          image={authorBioData?.elements?.profilePicture?.renditions?.closeUp}
          isLoading={isLoading || authorBioIsLoading}
        />
        <ArticleBody body={body} isLoading={isLoading} />
      </Article> : <ErrorMessage error={error} retry={refetch} />}
    </ErrorBoundary>
  );
}

export { DocumentScreen };
