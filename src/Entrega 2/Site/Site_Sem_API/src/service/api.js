export const auth = {
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  },
}
