export type CreateRecipeDTO = {
  title: string;
  slug?: string;
  instruction?: string;
  author?: string;
};

export interface RecipesFilterDto {
  author?: string;
}
