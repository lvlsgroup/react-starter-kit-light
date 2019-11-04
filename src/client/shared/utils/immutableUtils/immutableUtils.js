// It basically add an item to a list If item exists it updates it with new value,
// otherwise it just adds the item to the list, ie. The list shall not have any duplicated items.
export function setToList(list, compareProp, mapToAdd) {
  const indexToUpdate = list.findIndex((formKey) => {
    return formKey.get(compareProp) === mapToAdd.get(compareProp);
  });

  if (indexToUpdate === -1) {
    // mapToAdd doesn't exists in list
    return list.push(mapToAdd);
  } else {
    // mapToAdd obj exists in list. Update old obj with mapToAdd
    return list.set(indexToUpdate, mapToAdd);
  }
}

export function toJs(imJS) {
  return imJS && imJS.toJS && imJS.toJS();
}

export function strListToString(list, deliminator = ' ') {
  return (
    list &&
    list.reduce &&
    list.reduce((accum, item) => {
      return accum + deliminator + item;
    }, '')
  );
}
