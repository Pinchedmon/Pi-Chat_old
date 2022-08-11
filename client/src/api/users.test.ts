import { getCurrentUser } from './users'

// test('getting user without token', () => {
//   return getCurrentUser('').then((data) => {
//     expect(data).toEqual({ message: 'Пользователь не авторизован' })
//   })
// })
// test('getting user without token', async () => {
//   let data
//   await getCurrentUser('').then((res) => (data = res.data))
//   expect(data).toBe({ message: 'Пользователь не авторизован' })
// })
test('getting user without token', async () => {
  await expect(getCurrentUser('')).rejects.toContain({ data: { message: 'Пользователь не авторизован' } })
})
