// Barrel re-export — allows `import { getProducts } from "@/lib/queries"` to keep working.

export {
  PAGE_SIZE,
  getProducts,
  getPromoProducts,
  getFeaturedProducts,
  getProductsPaginated,
  getProductsByCategory,
  getProductById,
  getRelatedProducts,
  type PaginatedProducts,
} from "./products";

export { getCategories } from "./categories";

export { getFeaturedFeedbacks } from "./feedbacks";
