module.exports = (error, req, res, next) => {
    // console.log(error);

    if (error.code == 11000)
        return res.status(403).json({
            status: 'fail',
            message: `${
                Object.keys(error.keyPattern)[0]
            } is already registered.`,
        });

    if (error.name === 'ValidationError') {
        let errors = {};
        Object.keys(error.errors).forEach(key => {
            errors[key] = error.errors[key].message;
            // errors[key] = req.t(error.errors[key].message);
        });
        return res.status(400).json({
            status: 'fail',
            errors,
        });
    }

    if (error.name == 'BadRequestError' && error.message.errors) {
        let errors = {};
        Object.keys(error.message.errors).forEach(key => {
            let myKey = key;
            if (myKey.includes('.')) myKey = myKey.split('.').pop();
            errors[myKey] = error.message.errors[key].message;
            // errors[myKey] = req.t(error.message.errors[key].message);
        });
        return res.status(400).json({
            status: 'fail',
            errors,
        });
    }

    if (
        error.message.toString().includes(': ') &&
        error.name == 'BadRequestError'
    ) {
        error.message = error.message.toString().split(': ').pop();
        // console.log(error.message);
    }
    res.status(error.status || 500).json({
        status: 'fail',
        // message: error.message,
        message: req.t(error.message),
    });
};
