const Utils = {};

Utils.sortObjectsArray = (isDescending, list, selector) => {
    return list.sort((a, b) => {
        if (isDescending) {
            return parseFloat(b[selector]) - parseFloat(a[selector]);
        } else {
            return parseFloat(a[selector]) - parseFloat(b[selector]);
        }
    });
};

Utils.objectsAreEquivalentToEachOther = (a, b) => {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

export default Utils;