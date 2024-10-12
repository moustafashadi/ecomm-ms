import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createCategory: builder.mutation({
        query: (category) => ({
          url: `${CATEGORY_URL}/`,
          method: 'POST',
          body: category,
        }),
        invalidatesTags: ['Category'], // Invalidate Category tag to refresh the list
      }),
      updateCategory: builder.mutation({
        query: (category) => ({
          url: `${CATEGORY_URL}/${category.id}`,
          method: 'PUT',
          body: category,
        }),
        invalidatesTags: ['Category'], // Invalidate Category tag to refresh the list
      }),
      deleteCategory: builder.mutation({
        query: (categoryId) => ({
          url: `${CATEGORY_URL}/${categoryId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Category'], // Invalidate Category tag to refresh the list
      }),
      listCategories: builder.query({
        query: () => ({
          url: `${CATEGORY_URL}`,
          method: 'GET',
        }),
        providesTags: ['Category'], // Provide Category tag for cache
      }),
      getCategory: builder.query({
        query: (categoryId) => ({
          url: `${CATEGORY_URL}/${categoryId}`,
          method: 'GET',
        }),
      }),
    }),
  });
  

export const { 
    useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation, 
    useListCategoriesQuery, 
    useGetCategoryQuery } = categoryApiSlice;