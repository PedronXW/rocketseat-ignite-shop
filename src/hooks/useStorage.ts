'use client'

export function useStorage() {
  const setStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const getStorage = (key: string) => {
    try {
      const data = window.localStorage.getItem(key)
      if (!data) return null
      return JSON.parse(data)
    } catch (error) {}
  }

  return { getStorage, setStorage }
}
