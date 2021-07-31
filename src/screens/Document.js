/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import * as React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../utils/documents";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/lib";
import { ArticleImage } from "../components/ArticleCard/ArticleImage";
import { useAsync } from "../utils/hooks";
import { getContentById } from "../utils/api";
import moment from "moment";
import {FaCalendar} from 'react-icons/fa'
import { useHistory } from "react-router-dom";

function DocumentScreen() {
  const { documentId } = useParams();
  const { document, isLoading, isSuccess, error } = useDocument(documentId);
  const {
    data: authorBioData,
    isLoading: authorBioIsLoading,
    run: getAuthorBio,
  } = useAsync();
  const history = useHistory();

  const {
    elements: {
      mainImage: {
        value: { leadImage } = {
          leadImage: null,
        },
      } = {
        mainImage: {},
      },
      heading: { value: headingValue } = {
        value: null,
      },
      author: { value: authorValue } = {
        value: null,
      },
      authorBio: { value: authorBioValue } = {
        value: {},
      },
      date: { value: dateValue } = {
        value: {},
      },
      body,
    } = {
      elements: {},
    },
  } = document;

  const formattedDate = moment(dateValue).format("MMMM Do YYYY");

  React.useEffect(() => {
    if (isSuccess && authorBioValue && authorBioValue.id) {
      getAuthorBio(getContentById(authorBioValue.id));
    }
  }, [authorBioValue, document, getAuthorBio, isSuccess]);

  React.useEffect(() => {
    if (error) {
      history.push('/')
    }
  }, [history, error])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          css={{
            margin: "30px",
            textAlign: "center",
          }}
        >
          <h1
            css={{
              fontSize: "50px",
            }}
          >
            {headingValue}
          </h1>
          <h3
            css={{
              fontStyle: "italic",
              fontWeight: "lighter",
            }}
          >
            {authorValue}
          </h3>
        </div>
        <ArticleImage
          crop="100"
          rendition={leadImage}
          css={{
            height: "60vh",
          }}
          documentLoading={isLoading}
        />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
          }}
        >
          {authorBioValue ? (
            <ArticleImage
              css={{
                borderRadius: '50px',
                margin: '20px',
                width: "100px",
                height: "100px",
              }}
              crop="100"
              rendition={
                authorBioData?.elements?.profilePicture?.renditions?.closeUp
              }
              documentLoading={isLoading || authorBioIsLoading}
            />
          ) : null}
          <div css={{maxWidth: '500px'}}>
            <h4>{authorValue}</h4>
            <div css={css`p {
              font-style: italic;
              font-size: 12px;
            }`} dangerouslySetInnerHTML={{ __html: authorBioData?.elements?.shortBio?.value }}></div>
          </div>
        </div>
        <div css={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <FaCalendar css={{marginRight: '10px'}}/><span css={{fontStyle: 'italic'}}>Published: {formattedDate}</span>
        </div>
        <div>
          {body?.values ? (
            body?.values.map((value, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: value }}></div>
            ))
          ) : (
            <p>Missing Content</p>
          )}
        </div>
      </div>
      {/* <ArticleCard
        articleId={document?.id}
        heading={document?.elements?.heading?.value}
        author={document?.elements?.author?.value}
        date={document?.elements?.date?.value}
        image={document?.elements?.mainImage?.value?.leadImage}
        body={document?.elements?.body}
      /> */}
    </ErrorBoundary>
  );
}

export { DocumentScreen };