
const CategoryForm = ({value, setValue , handleSubmit , buttonText = 'Submit' , handleDelete}) => {
  return (
    <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
            <input 
                type="text" 
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50
                dark:bg-gray-800 dark:text-white dark:border-gray-600" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Category Name" 
                required/>
            <button 
                type="submit" 
                className="bg-pink-500 text-sm p-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 
                focus:ring-pink-600 focus:ring-opacity-50">{buttonText}</button>
            {handleDelete && 
                <button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-sm p-2 rounded-lg focus:outline-none focus:ring-2 
                focus:ring-red-600 focus:ring-opacity-50 ml-2">Delete</button>}
        </form>
    </div>
  )
}

export default CategoryForm