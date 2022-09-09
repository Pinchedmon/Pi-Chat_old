export const handleChange = (e: React.FormEvent<HTMLInputElement>, setValue: (value: string) => void) => {
  const target = e.target as HTMLInputElement
  setValue(target.value)
}
