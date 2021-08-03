/** @jsxImportSource @emotion/react */
import * as React from "react";
import {
  Search,
  Form,
  FormGroup,
  Select,
  SelectItem,
  Grid,
  Column,
  Row,
  SkeletonPlaceholder,
  Loading,
} from "carbon-components-react";
import { useDocumentSearch } from "../utils/documents";
import { ArticleCard } from "../components/ArticleCard/ArticleCard";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/lib";
import debounceFn from "debounce-fn";

function Discover() {
  const initialQuery = {
    text: "",
    type: "Design article",
  };
  const [text, setText] = React.useState("");
  const [type, setType] = React.useState("Design article");
  const [query, setQuery] = React.useState({ text, type });
  const { documents, isLoading, isSuccess } = useDocumentSearch(query);

  const debouncedSearch = React.useMemo(
    () => debounceFn(setQuery, { wait: 500 }),
    [setQuery]
  );

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  React.useEffect(() => {
    debouncedSearch({ text, type });
  }, [debouncedSearch, text, type]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form onSubmit={(event) => event.preventDefault()}>
          <FormGroup
            legendText="Search"
            css={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Select
              id="select"
              noLabel
              defaultValue={query.type}
              size="xl"
              css={{
                width: "200px",
                borderRightColor: "rgba(0, 0, 0, 0.1)",
                borderRightStyle: "solid",
                borderRightWidth: "1px",
              }}
              onChange={handleTypeChange}
            >
              <SelectItem value="Design article" text="Design Articles" />
              <SelectItem value="Article" text="Articles" />
            </Select>
            <Search
              id="text"
              labelText="Search"
              defaultValue={initialQuery.text}
              onChange={handleTextChange}
            />
          </FormGroup>
        </Form>
        {isLoading && (
          <div
            css={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loading withOverlay={false} />
          </div>
        )}
        {!isLoading && isSuccess ? (
          documents.length ? (
            <Grid
              fullWidth
              css={{
                width: `100%`,
                marginTop: "30px",
                padding: 0,
              }}
            >
              <Row>
                {documents.map((document) => (
                  <Column key={document?.document?.id} sm={4} md={4} lg={3}>
                    {isLoading ? (
                      <SkeletonPlaceholder />
                    ) : (
                      <ArticleCard
                        articleId={document?.document?.id}
                        heading={document?.document?.elements?.heading?.value}
                        author={document?.document?.elements?.author?.value}
                        date={document?.document?.elements?.date?.value}
                        image={
                          document?.document?.elements?.mainImage?.value
                            ?.leadImage?.renditions?.card
                        }
                        body={document?.document?.elements?.body}
                      />
                    )}
                  </Column>
                ))}
              </Row>
            </Grid>
          ) : (
            <p>No Documents found</p>
          )
        ) : null}
      </div>
    </ErrorBoundary>
  );
}

export { Discover };
