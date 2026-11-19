import { useEffect } from "react";

const SITE_NAME = "karnull";

export const useDocumentTitle = (page?: string) => {
  useEffect(() => {
    document.title = page ? `${page.toLowerCase()} · ${SITE_NAME}` : SITE_NAME;
  }, [page]);
};
