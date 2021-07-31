import { useQuery, queryCache } from "react-query";
import { searchDocument, getContentById } from "./api";

const loadingDocument = {
};

const loadingDocuments = Array.from({ length: 10 }, (v, index) => ({
  document: {
    id: `loading-document-${index}`,
    ...loadingDocument,
  },
}));

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

function useDocument(documentId) {
  const result = useQuery({
    queryKey: ['document', {id: documentId}],
    queryFn: () => getContentById(documentId),
  })
  return {...result, document: result.data ?? loadingDocument}
}

function useDocumentSearch({ text, type }) {
  const result = useQuery(getDocumentSearchConfig({ text, type }));
  return { ...result, documents: result.data ?? loadingDocuments };
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
