import { useState } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation, 
  useListCategoriesQuery, 
  useGetCategoryQuery } from "../../redux/api/categoryApiSlice"

const Categories = () => {
  const {data: categories} = useListCategoriesQuery();
  console.log(categories);
  return (
    <div>Categories</div>
  )
}

export default Categories