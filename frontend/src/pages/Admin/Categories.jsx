import { useState } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation, 
  useListCategoriesQuery, 
  useGetCategoryQuery } from "../../redux/api/categoryApiSlice"
import CategoryForm from "../../components/categoryForm";
import Modal from "../../components/Modal";
import { set } from "mongoose";

const Categories = () => {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const {data: categories} = useListCategoriesQuery();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingname, setUpdateName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if(!name){
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({name}).unwrap();
      if(result.error){
        toast.error(result.error);
        return;
      }else{
        setName('');
        toast.success("Category created successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      return;
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if(!updatingname){
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({id: selectedCategory._id, name: updatingname}).unwrap();
      if(result.error){
        toast.error(result.error);
        return;
      } else{
        setModalVisible(false);
        toast.success("Category updated successfully");
        setUpdateName('');
        setSelectedCategory(null);
      }
    }
    catch (error) {
      toast.error(error?.data?.message || error.message);
      return;
    }
  }

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      await deleteCategory(selectedCategory._id).unwrap();
  
      setModalVisible(false);
      toast.success("Category deleted successfully");
  
      setUpdateName('');
      setSelectedCategory(null);
    }
    catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  

  return (
    <div className="p-4 ml-[4rem]">
      {/*Admin menu*/}
      <div className="text-2xl font-semibold mb-4">Manage Categories</div>
      <CategoryForm value = {name} setValue={setName} handleSubmit={handleCreateCategory}/>
      <br/>
      <hr/>
      <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category.id}>
            <button className=" border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3
            hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              onClick={() => {
                setSelectedCategory(category);
                setUpdateName(category.name);
                setModalVisible(true);
              }}> {category.name}
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen = {modalVisible} onClose = {() => setModalVisible(false)}>
        <CategoryForm 
          value = {updatingname} 
          setValue={value => setUpdateName(value)} 
          handleSubmit={handleUpdateCategory}
          buttonText = 'Update' 
          handleDelete={handleDeleteCategory}
          />
      </Modal>
    </div>
  )
}

export default Categories