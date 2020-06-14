class ObjectService {
    isEmptyObject (obj) {
        if (typeof obj === 'undefined') return true;

        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    sortObjectsArray (isDescending, list, selector) {
        return list.sort((a, b) => {
            if (isDescending) {
                return parseFloat(b[selector]) - parseFloat(a[selector]);
            } else {
                return parseFloat(a[selector]) - parseFloat(b[selector]);
            }
        });
    }

    isNewObjectDifferent (oldObject, newObject) {
        if (newObject) {
            const oldObjectJSON = JSON.stringify(oldObject);
            const newObjectJSON = JSON.stringify(newObject);

            if (oldObjectJSON !== newObjectJSON) {
                return newObject;
            }

            return false;
        }

        return false;
    }
}

export const objectService = new ObjectService();