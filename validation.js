export const validator = (data) => {
    //To check whether the data is filled
    if (isNaN(data.id) || data.name.length <= 0
        || data.city.length <= 0
        || typeof (data.id) == 'undefined'
        || typeof (data.name) == 'undefined'
        || typeof (data.city) == 'undefined') {
        return { status: false, msg: 'Fill the required fields', code: 400 }
    }
    //To check id is number
    else if (typeof data.id != 'number') {
        return { status: false, msg: 'Invalid id format', code: 400 }
    }
    //to check name is string
    else if (typeof data.name != 'string') {
        return { status: false, msg: 'Invalid name format', code: 400 }
    }
    //To check city is string
    else if (typeof data.city != 'string') {
        return { status: false, msg: 'Invalid city format', code: 400 }
    }
    //To return data
    else {
        return { status: true, data, code: 200 }
    }
};
