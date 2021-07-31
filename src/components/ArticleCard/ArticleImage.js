/** @jsxImportSource @emotion/react */
import * as React from "react";
import { DOMAIN_NAME } from "../../utils/endpoints";
import { SkeletonPlaceholder } from "carbon-components-react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../lib";

function ArticleImage({ rendition, crop = 120, css, documentLoading = false, ...props }) {
  const [loaded, setLoaded] = React.useState(false);
  const [imageReady, setImageReady] = React.useState(false)

  React.useEffect(() => {
    if (!documentLoading && loaded) {
      setImageReady(true)
    }
  }, [documentLoading, loaded])

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <div
        {...props}
        css={{
          ...css,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {!imageReady && (
          <SkeletonPlaceholder
            css={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          />
        )}
        {!documentLoading && <img
          src={`${
            rendition?.url ? DOMAIN_NAME + rendition?.url : "/logo512.png"
          }`}
          alt={rendition?.altText}
          onLoad={() => setLoaded(true)}
          css={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "auto",
            width: `${crop}%`,
            webkitTransform: "translate(-50%,-50%)",
            msTransform: "translate(-50%,-50%)",
            transform: "translate(-50%,-50%)",
            visibility: imageReady ? 'visible' : 'hidden',
          }}
        />}
      </div>
    </ErrorBoundary>
  );
}

export { ArticleImage };
