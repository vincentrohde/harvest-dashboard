function sortObjectsArray (isDescending, list, selector) {
    return list.sort((a, b) => {
        if (isDescending) {
            return parseFloat(b[selector]) - parseFloat(a[selector]);
        } else {
            return parseFloat(a[selector]) - parseFloat(b[selector]);
        }
    });
};

function isPropertyDifferentFromOldObject (selector, oldObject, newObject) {
    if (newObject[selector]) {
        const oldProperty = oldObject[selector];
        const newProperty = newObject[selector];

        const oldPropertyJSON = JSON.stringify(oldProperty);
        const newPropertyJSON = JSON.stringify(newProperty);

        if (oldPropertyJSON !== newPropertyJSON) {
            return newProperty;
        }

        return false;
    }

    return false;
};

export {
    sortObjectsArray,
    isPropertyDifferentFromOldObject
}