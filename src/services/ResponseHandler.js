import React from 'react';
import Alert from 'react-s-alert';

export const SuccessHandler = (message) => {
    const template = (
        <div>
            <p>{message}</p>
        </div>
    );

    ShowAlert('success', template);
};

export const ErrorHandler = (code, err) => {
    const template = (
        <div>
            <p>Error: {err.message}</p>
            <p>Code: {code}</p>
        </div>
    );
    ShowAlert('error', template);
};

export const WarningHandler = (message) => {
    const template = (
        <div>
            <p>{message}</p>
        </div>
    );

    ShowAlert('warning', template);
};

function ShowAlert(status, template) {
    Alert[status](template, {
        position: 'top-right',
        effect: 'scale',
        timeout: 3000
    });
}
