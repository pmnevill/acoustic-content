async function client(endpoint) {
  const response = await fetch(endpoint)
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject({
      message: data?.errors?.description,
    })
  }
}

export {client}
