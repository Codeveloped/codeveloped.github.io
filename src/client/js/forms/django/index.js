
export default function djangoFormHandler (promise) {

    return new Promise((resolve, reject) => {
        promise.then(function (res) {
            resolve(res);
        }, function (err) {
            var errors = {};
            Object.keys(err).forEach(function (key) {
                var msg = err[key] && err[key].length && err[key][0] && err[key][0].message;
                if (key === '__all__') key = '_error';
                errors[key] = msg;
            });
            reject(errors);
        });
    })

};
