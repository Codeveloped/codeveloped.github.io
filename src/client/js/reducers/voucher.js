import Immutable from 'immutable';

import {toRecordSet} from '../lib/immutableHelper';
import {
    VOUCHER_LIST,
    VOUCHER_LIST_SUCCESS,
    VOUCHER_LIST_FAIL,
    VOUCHER_FILTER,
    VOUCHER_SORT,
    VOUCHER_HISTORY,
    VOUCHER_HISTORY_SUCCESS,
    VOUCHER_HISTORY_FAIL,
    FORM_VOUCHER_RESERVATION,
    FORM_VOUCHER_RESERVATION_SUCCESS,
    FORM_VOUCHER_RESERVATION_FAIL
} from '../constants/ActionTypes';

const filters = {
    'odd': function (value, idx) {
        return idx % 2 !== 0;
    },
    'price>10': function (value) {
        return value.get('price') > 10;
    },
    organisatie: function (name) {
        return function (value) {
            return value.get('name_organisation') === name;
        }
    },
    search: function (term) {
        try {
            var regex = new RegExp(term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'ig');
            return function (value) {
                var fields = ['description', 'name', 'name_organisation'];

                for (var i=0, l=fields.length; i<l; ++i) {
                    if (regex.test(value.get(fields[i]))) return true;
                }
                return false;
            }
        } catch (e) {
            return function () { return true; }
        }
    },
    tag: function (tag) {
        return function (value) {
            var tags = value.get('tags');
            for (var i=0, l=tags.length; i<l; ++i) {
                if (tags[i].tag === tag) return true;
            }
            return false;
        }
    },
    child: function (state) {
        return function (value) {
            return value.get('target_audience') === 'child';
        }
    }
};

function filter(filtersList, list) {
    if (!filtersList) return list;
    Object.keys(filtersList).forEach(function (key) {
        var filter = filters[key];
        if (filter) {
            list = list.filter(filter(filtersList[key]));
        }
    });

    return list;
}

/*
 comparator(valueA, valueB):

 Returns 0 if the elements should not be swapped.
 Returns -1 (or any negative number) if valueA comes before valueB
 Returns 1 (or any positive number) if valueA comes after valueB
 */
const sorters = {
    'a-z': function (v1, v2) {
        let cmp1 = (v1.get('description') || '')[0];
        let cmp2 = (v2.get('description') || '')[0];

        if (cmp1 < cmp2) return -1;
        if (cmp1 > cmp2) return 1;
        return 0;
    },
    'price_desc': function (v1, v2) {
        let cmp1 = v2.get('price');
        let cmp2 = v1.get('price');

        if (cmp1 < cmp2) return -1;
        if (cmp1 > cmp2) return 1;
        return 0;
    },
    'price_asc': function (v1, v2) {
        let cmp1 = v1.get('price');
        let cmp2 = v2.get('price');

        if (cmp1 < cmp2) return -1;
        if (cmp1 > cmp2) return 1;
        return 0;
    },
    'date_desc': function (v1, v2) {
        let cmp1 = +new Date(v2.get('date_created'));
        let cmp2 = + new Date(v1.get('date_created'));

        if (cmp1 > cmp2) return -1;
        if (cmp1 < cmp2) return 1;
        return 0;
    },
    'date_asc': function (v1, v2) {
        let cmp1 = +new Date(v2.get('date_created'));
        let cmp2 = + new Date(v1.get('date_created'));

        if (cmp1 < cmp2) return -1;
        if (cmp1 > cmp2) return 1;
        return 0;
    },
    'most-used': function (v1, v2) {
        let cmp1 = v1.get('global_used');
        let cmp2 = v2.get('global_used');

        if (cmp1 > cmp2) return -1;
        if (cmp1 < cmp2) return 1;
        return 0;
    },
    availability: function (v1, v2) {
        let cmp1 = v1.get('available');
        let cmp2 = v2.get('available');

        if (cmp1 > cmp2) return -1;
        if (cmp1 < cmp2) return 1;
        return 0;
    }
};

function sort(type, list) {
    if (sorters[type]) {
        list = list.sort(sorters[type]);
    }
    return list;
}

const voucherRecord = Immutable.Record({
    address: '',
    available: 0,
    city: '',
    created: '',
    default_price: 0,
    description: '',
    discount_price: 0,
    end_date: '',
    global_used: null,
    house_number: 0,
    id: 0,
    image: '',
    information: '',
    logo: '',
    name: '',
    name_organisation: '',
    participant_id: 0,
    period: null,
    phone_1: '',
    phone_2: '',
    postal_code: '',
    reserved: 0,
    start_date: '',
    tags: [],
    target_audience: '',
    url: '',
    usage_limit_global: null,
    usage_limit_per_consumer: null,
    used: 0,
    reservation_preferred: false,
    horizontal_image: '',
    vertical_image: '',
    website: ''
});

const initialHistory = Immutable.Map({
    loading: false,
    transactions: [],
    error: false
});

const initialVoucherReservation = {
    loading: false,
    error: null,
    id: 0,
    quantity: 0,
    success: {id: null, quantity: null}
};

const initialState = Immutable.Map({
    loading: false,
    vouchers: Immutable.Map(),
    error: false,
    active: Immutable.OrderedMap(),
    filter: {},
    sort: 'date_desc',
    history: initialHistory,
    reservation: initialVoucherReservation
});


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case '@@redux/INIT':
            if (state !== initialState) {
                return initialState.withMutations(function (map) {
                    let vouchers = toRecordSet(state.vouchers, voucherRecord);
                    map.set('vouchers', vouchers).set('active', vouchers)
                });
            }
            return state;
        case VOUCHER_LIST:
            return initialState.set('loading', true);
        case VOUCHER_LIST_SUCCESS:
            let vouchers = toRecordSet(action.result, voucherRecord);

            let active = vouchers;
            active = filter(state.get('filter'), active);
            active = sort(state.get('sort'), active);

            return state.set(
                'vouchers', vouchers
            ).set(
                'active', active
            ).set('loading', false);
        case VOUCHER_LIST_FAIL:
            return initialState.set('error', Immutable.fromJS(action.error));
        case VOUCHER_FILTER:
        case VOUCHER_SORT:
            if (action.filter !== undefined) state = state.set('filter', action.filter);
            if (action.sort !== undefined) state = state.set('sort', action.sort);

            let list = state.get('vouchers');

            list = filter(state.get('filter'), list);
            list = sort(state.get('sort'), list);

            return state.set('active', list);
        case VOUCHER_HISTORY:
            return state.set('history', initialHistory.set('loading', true));
        case VOUCHER_HISTORY_SUCCESS:
            return state.set('history', initialHistory.set('transactions', action.result));
        case VOUCHER_HISTORY_FAIL:
            return state.set('history', initialHistory.set('error', action.error));

        case FORM_VOUCHER_RESERVATION:
            return state.set('reservation', {
                ...initialVoucherReservation,
                loading: true,
                id: action.id,
                quantity: action.quantity
            });
        case FORM_VOUCHER_RESERVATION_SUCCESS:
            let id = state.get('reservation').id;
            let quantity = state.get('reservation').quantity;
            return state
                .updateIn(['vouchers', id, 'available'], val => parseInt(val, 10) - quantity)
                .updateIn(['vouchers', id, 'reserved'], val => parseInt(val, 10) + quantity)
                .set('reservation', {...initialVoucherReservation, success: {id: id, quantity: quantity}});
        case FORM_VOUCHER_RESERVATION_FAIL:
            return state.set('reservation', {
                ...initialVoucherReservation,
                error: action.error
            });
        default:
            return state;
    }
}
