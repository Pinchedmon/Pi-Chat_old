export const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>, setAddPost: (addPost: any) => void) => {
  setAddPost((addPost: any) => ({ ...addPost, course: e.target.value }))
}
