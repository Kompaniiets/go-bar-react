import React from 'react';
import Alert from 'react-s-alert';

const ErrorHandler = (code, err) => {
    const template = (
        <div>
            <p>Error: {err.message}</p>
            <p>Code: {code}</p>
        </div>
    );

    Alert.error(template, {
        position: 'top-right',
        effect: 'scale',
        timeout: 3000
    });
};

export default ErrorHandler;