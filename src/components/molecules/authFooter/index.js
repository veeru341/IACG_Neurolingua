import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './styles.module.css';
import Text from '../../atoms/text';

const AuthFooter = ({ type }) => {
    const history = useHistory();
    const clickHandler = () => {
        if (!type) {
            history.push('/auth/signup');
        } else {
            history.push('/auth/login');
        }
    };
    return (
        <div className={classes.authFooter}>
            <div>
                <Text
                    onClick={clickHandler}
                    title={
                        type
                            ? 'Already have an account?'
                            : 'Dont have an account?'
                    }
                    theme='heading5'
                    style={{fontSize: '16px'}}
                />
            </div>
            <Text
                onClick={clickHandler}
                title={type ? 'Log in' : 'Sign up'}
                theme='heading5'
                style={{fontSize: '16px'}}
            />
        </div>
    );
};
AuthFooter.prototype = {
    type: PropTypes.bool,
};

export default AuthFooter;
