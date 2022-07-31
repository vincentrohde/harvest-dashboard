import { idObject } from './ObjectService.types';

class ObjectService {
    isEmptyObject(obj: Object) {
        if (typeof obj === 'undefined') return true;

        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    sortObjectsArray(isDescending: boolean, list: any[], selector: string) {
        if (!list.length) return list;

        return list.sort((a, b) => {
            if (isDescending) {
                return parseFloat(b[selector]) - parseFloat(a[selector]);
            } else {
                return parseFloat(a[selector]) - parseFloat(b[selector]);
            }
        });
    }

    isNewObjectDifferent(oldObject: Object, newObject: Object): boolean | Object {
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

    /**
     * TODO: Clarify this method, Rename
     */
    updateObjectInArray(array: idObject[], object: idObject) {
        return array.map((item) => {
            if (item.id !== object.id) return item;

            return {
                ...item,
                ...object
            }
        });
    };
}

const objectService = new ObjectService();

export default objectService;
