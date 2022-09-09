export const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>, setAddPost: (addPost: any) => void) => {
  setAddPost((addPost: any) => ({ ...addPost, category: e.target.value }))
}
