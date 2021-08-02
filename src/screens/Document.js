/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import * as React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../utils/documents";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/lib";
import { ArticleImage } from "../components/ArticleCard/ArticleImage";
import moment from "moment";
import {FaCalendar} from 'react-icons/fa'
import { useHistory } from "react-router-dom";

function DocumentScreen() {
  const { documentId } = useParams();
  const history = useHistory();
  const { document, isLoading, error } = useDocument(documentId);

  const leadImage = document?.elements?.mainImage?.value?.leadImage || null;
  const headingValue = document?.elements?.heading?.value || null;
  const authorValue = document?.elements?.author?.value || null;
  const authorBioValue = document?.elements?.authorBio?.value || null;
  const dateValue = document?.elements?.date?.value || null;
  const body = document?.elements?.body || null;

  const {
    data: authorBioData,
    isLoading: authorBioIsLoading,
  } = useDocument(document?.elements?.authorBio?.value?.id, {
    enabled: !!document,
  }, 'authorBio');

  const formattedDate = moment(dateValue).format("MMMM Do YYYY");

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
          <h1>
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
        <div css={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <FaCalendar css={{marginRight: '10px'}}/><span css={{fontStyle: 'italic'}}>Published: {formattedDate}</span>
        </div>
        <ArticleImage
          crop="100"
          rendition={leadImage}
          css={{
            height: "50vh",
            marginBottom: '50px',
          }}
          documentLoading={isLoading}
        />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            marginBottom: '50px',
            justifyContent: 'center',
          }}
        >
          {authorBioValue ? (
            <div css={{
                margin: '10px',
              }}>
            <ArticleImage
              css={{
                borderRadius: '50px',
                width: "80px",
                height: "80px",
              }}
              crop="100"
              rendition={
                authorBioData?.elements?.profilePicture?.renditions?.closeUp
              }
              documentLoading={isLoading || authorBioIsLoading}
            />
            </div>
          ) : null}
          <div css={{maxWidth: '500px'}}>
            <h4>{authorValue}</h4>
            <div css={css`p {
              font-style: italic;
              font-size: 12px;
            }`} dangerouslySetInnerHTML={{ __html: authorBioData?.elements?.shortBio?.value }}></div>
          </div>
        </div>
        <article css={{
          marginBottom: '200px',
          maxWidth: '1000px',
          margin: 'auto',
        }}>
          {body?.values ? (
            body?.values.map((value, index) => (
              <div css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: {
                  textIndent: '30px',
                }
              }} key={index}>
                <div dangerouslySetInnerHTML={{ __html: value }}></div>
                <div css={{
                  width: '80%',
                  margin: '50px',
                  height: '10px',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: '5px',
                }}></div>
              </div>
            ))
          ) : (
            <p>Missing Content</p>
          )}
        </article>
      </div>
    </ErrorBoundary>
  );
}

export { DocumentScreen };
