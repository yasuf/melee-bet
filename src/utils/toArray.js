export function toArray(object) {
  const array = []
  for(const key in object) {
    array.push({ ...object[key], id: key })
  }
  return array
}
