import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (category) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: category
            })  
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `${CATEGORY_URL}/${category.id}`,
                method: 'PUT',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Category']
        }),
        listCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}`,
                method: 'GET'
            }),
            providesTags: ['Category'],
        }),
        getCategory: builder.query({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'GET'
            }),
        }),

    }),
    
})

export const { 
    useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation, 
    useListCategoriesQuery, 
    useGetCategoryQuery } = categoryApiSlice;