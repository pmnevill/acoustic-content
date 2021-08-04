import { useQuery, useQueryClient } from "react-query";
import { searchDocument, getContentById } from "./api";

function useDocument(documentId, config = {}) {
  const result = useQuery({
    queryKey: ["document", { id: documentId }],
    queryFn: () => getContentById(documentId),
    ...config,
  });
  return { ...result, document: result.data };
}

function useDocumentSearch({ text, type }) {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["contentSearch", { text, type }],
    queryFn: () =>
      searchDocument({
        text: encodeURIComponent(text),
        type: encodeURIComponent(type),
      }).then((data) => (data?.documents ? data?.documents : [])),
    onSuccess(documents) {
      for (const document of documents) {
        setQueryDataForDocument(document.document, queryClient);
      }
    },
  });
  return { ...result, documents: result.data };
}

function setQueryDataForDocument(document, queryClient) {
  queryClient.setQueryData(["document", { id: document.id }], document);
}

export { useDocumentSearch, useDocument };
