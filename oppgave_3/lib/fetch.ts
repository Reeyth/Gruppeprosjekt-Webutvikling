/* eslint-disable import/no-anonymous-default-export */

export default async function (url: string, options: any): Promise<any> {
  let defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await fetch(url, { ...defaultOptions, ...options })
    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json')

    const data = isJson ? await response.json() : null
    if (!response.ok) {
      const error = {
        status: false,
        error: data && data.error ? data.error : response.statusText,
      }
      throw error
    }
    const result = data ? data : { status: true, data: {} }
    return result
  } catch (error) {
    throw error
  }
}
