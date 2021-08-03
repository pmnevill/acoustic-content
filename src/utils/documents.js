import { useQuery, queryCache } from "react-query";
import { searchDocument, getContentById } from "./api";

const getDocumentSearchConfig = ({ text, type }) => ({
  queryKey: ["contentSearch", { text, type }],
  queryFn: () =>
    searchDocument({
      text: encodeURIComponent(text),
      type: encodeURIComponent(type),
    }).then((data) => (data?.documents ? data?.documents : [])),
  config: {
    onSuccess(documents) {
      for (const document of documents) {
        setQueryDataForDocument(document.document);
      }
    },
  },
});

function useDocument(documentId, config = {}) {
  const result = useQuery({
    queryKey: ["document", { id: documentId }],
    queryFn: () => getContentById(documentId),
    ...config,
  });
  return { ...result, document: result.data };
}

function useDocumentSearch({ text, type }) {
  const result = useQuery(getDocumentSearchConfig({ text, type }));
  return { ...result, documents: result.data };
}

const documentQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function setQueryDataForDocument(document) {
  queryCache.setQueryData(
    ["document", { id: document.id }],
    document,
    documentQueryConfig
  );
}

export { useDocumentSearch, useDocument };
