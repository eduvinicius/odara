export type PaginationProps = {
  page: number;
  totalPages: number;
  /** Base path for navigation links (e.g. "/catalogo") */
  basePath: string;
  /** Additional URL params to preserve when changing pages (e.g. { q: "rosas", cat: "Flores" }) */
  params?: Record<string, string>;
};
