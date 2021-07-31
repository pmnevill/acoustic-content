/** @jsxImportSource @emotion/react */
import * as React from "react";
import {
  Search,
  Form,
  FormGroup,
  Select,
  SelectItem,
  InlineLoading,
  Button,
  Grid,
  Column,
  Row,
  SkeletonPlaceholder,
} from "carbon-components-react";
import { useDocumentSearch } from "../utils/documents";
import { ArticleCard } from "../components/ArticleCard/ArticleCard";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/lib";

function Discover() {
  const initialQuery = {
    text: "",
    type: "Design article",
  };
  const [query, setQuery] = React.useState(initialQuery);
  const [, setQueried] = React.useState(false);
  const { documents, isLoading, isSuccess } = useDocumentSearch(query);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery({
      text: event.target.elements["text"].value,
      type: event.target.elements["select"].value,
    });
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form onSubmit={handleSearchSubmit}>
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
              disabled={isLoading}
              size="xl"
              css={{
                width: "200px",
                borderRightColor: "rgba(0, 0, 0, 0.1)",
                borderRightStyle: "solid",
                borderRightWidth: "1px",
              }}
            >
              <SelectItem value="Design article" text="Design Articles" />
              <SelectItem value="Article" text="Articles" />
            </Select>
            <Search
              id="text"
              labelText="Search"
              defaultValue={initialQuery.text}
              disabled={isLoading}
            />
          </FormGroup>
          <div css={{ display: "flex" }}>
            {isLoading ? (
              <InlineLoading description="Searching..." />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </Form>
        {isSuccess ? (
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
