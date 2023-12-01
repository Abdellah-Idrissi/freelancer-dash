export function addQuery(key:string,value:string | number,searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set(key,value as string)

  return newSearchParams.toString()
}

export function addSizeQuery(value:string | number,searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set('pageSize',value as string)
  newSearchParams.set('pageInd','0')

  return newSearchParams.toString()
}

export function addProjectsQuery(value:string | number,searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set('projectsSort',value as string)
  newSearchParams.delete('emailSort')

  return newSearchParams.toString()
}

export function addEmailQuery(value:string | number,searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set('emailSort',value as string)
  newSearchParams.delete('projectsSort')

  return newSearchParams.toString()
}

export function removeSortQuery(searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.delete('emailSort')
  newSearchParams.delete('projectsSort')

  return newSearchParams.toString()
}

export function removeQuery(key:string,searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.delete(key)

  return newSearchParams.toString()
}

export function removeSearchQuery(searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.delete('nameSearch')
  newSearchParams.set('pageInd','0')

  return newSearchParams.toString()
}


export function addTwoQueries(key1:string,value1:string,key2:string,value2:string,searchParams:URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set(key1,value1)
  newSearchParams.set(key2,value2)


  return newSearchParams.toString()
}