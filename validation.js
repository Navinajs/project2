export const validator = (data) => {
    if (isNaN(data.id) || data.name.length <= 0
        || data.city.length <= 0
        || typeof (data.id) == 'undefined'
        || typeof (data.name) == 'undefined'
        || typeof (data.city) == 'undefined') {
        return { status: false, msg: 'Fill the required fields', code: 400 }
    }
    else if (typeof data.id != 'number') {
        return { status: false, msg: 'Invalid id format', code: 400 }
    }
    else if (typeof data.name != 'string') {
        return { status: false, msg: 'Invalid name format', code: 400 }
    }
    else if (typeof data.city != 'string') {
        return { status: false, msg: 'Invalid city format', code: 400 }
    }
    else {
        return { status: true, data, code: 200 }
    }
};
