import { access } from 'fs/promises'

export const isAccessible = async (path) => {
  try {
    await access(path)
    return true
  } catch (e) {
    return false
  }
}
