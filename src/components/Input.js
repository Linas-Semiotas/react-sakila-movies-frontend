import { useState } from 'react';
import '../styles/Components.css';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Simple input
export const SimpleInput = ({ name, type = "text", value, onChange, placeholder, maxLength, margin }) => {
    return (
        <div className="input-group-wrapper">
            <input
                name={name}
                type={type}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='search-component'
                style={{ margin: margin }}
            />
        </div>
    );
};

// Input that uses Tooltip inside formik
export const TooltipFormikInput = ({ name, value, onChange, onBlur, placeholder, error, touched, type = "text", maxLength, margin, label, autoComplete }) => {
    return (
        <div>
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <div style={{ margin: margin || '0 0 15px 0' }}>
                <Tooltip
                    title={error && touched ? error : ''}
                    placement="bottom-start"
                    open={Boolean(error && touched)}
                    classes={{ tooltip: 'error-message'}}
                    PopperProps={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-2, -4]
                                },
                            },
                        ],
                    }}
                > 
                    <input
                        id={name}
                        className='input-component'
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        autoComplete={autoComplete || name}
                    />
                </Tooltip>
            </div>
        </div>
    );
};

// TextArea that uses Tooltip inside formik
export const TooltipFormikTextArea = ({ name, value, onChange, onBlur, placeholder, error, touched, type = "text", maxLength, margin, label, autoComplete }) => {
    return (
        <div>
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <div style={{ margin: margin || '0' }}>
                <Tooltip
                    title={error && touched ? error : ''}
                    placement="bottom-start"
                    open={Boolean(error && touched)}
                    classes={{ tooltip: 'error-message'}}
                    PopperProps={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-2, -10]
                                },
                            },
                        ],
                    }}
                > 
                    <textarea
                        id={name}
                        className="textarea-field"
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        autoComplete={autoComplete || name}
                    />
                </Tooltip>
            </div>
        </div>
    );
};

// Password input that uses Tooltip inside formik with visibility button
export const TooltipFormikPasswordInput = ({ name, value, onChange, onBlur, placeholder, error, touched, maxLength, margin, label }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <div className="input-group-wrapper" style={{ margin: margin || '0 0 15px 0' }}>
                <Tooltip
                    title={error && touched ? error : ''}
                    placement="bottom-start"
                    open={Boolean(error && touched)}
                    classes={{ tooltip: 'error-message'}}
                    PopperProps={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-2, -15]
                                },
                            },
                        ],
                    }}
                >
                    <input
                        id={name}
                        className='input-component'
                        name={name}
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        maxLength={maxLength}
                    />
                </Tooltip>
                <span 
                    onClick={togglePasswordVisibility}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
            </div>   
        </div>
    );
};

// Input for select element that user Tooltip inside formik
export const TooltipFormikSelect = ({ name, value, onChange, onBlur, error, touched, label, options, optionKey = 'id', optionLabel = 'name', multiple = false, margin, isSimple = false, useKeyAsValue = false}) => {
    return (
        <div>
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <div style={{ margin: margin || '0 0 15px 0' }}>
                <Tooltip
                    title={error && touched ? error : ''}
                    placement="bottom-start"
                    open={Boolean(error && touched)}
                    classes={{ tooltip: 'error-message'}}
                    PopperProps={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [-2, -4]
                                },
                            },
                        ],
                    }}
                >
                    <select
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="select-component"
                        multiple={multiple}
                    >
                        {!multiple && <option value="">{`Select ${label}`}</option>}
                        {isSimple ? (
                            options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))
                        ) : (
                            options.map(option => (
                                <option key={option[optionKey]} value={useKeyAsValue ? option[optionKey] : option[optionLabel]}>
                                    {option[optionLabel]}
                                </option>
                            ))
                        )}
                    </select>
                </Tooltip>
            </div>
        </div>
    );
};

export const CheckboxInput = ({ name, checked, onChange, label, margin }) => {
    return (
        <div style={{ margin: margin || '5px 0' }} className="checkbox-row">
            <label htmlFor={name} className="checkbox-label">
                {label}
            </label>
            <input
                    id={name}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="checkbox-component"
                />
        </div>
    );
};

export const Label = ({ text }) => {
    return (
        <p className="simple-label">
            {text}
        </p>
    );
};
