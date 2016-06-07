import Immutable from 'immutable';


/**
 * Immutable.Map is iterable (for example forEach)
 * this has the benefit of being able to get an element by its id from the Map directly
 */
export function toRecordSet (items, record) {
    return Immutable.OrderedMap(items.map(function (item) {
        return [item.id, record(item)]
    }))
}

