import '../styles/Components.css';
import { SubmitButton } from './Button';

export const Form = ({ onSubmit, children, className = '', buttonText, ...props }) => {
    return (
        <form 
            onSubmit={onSubmit} 
            className={`custom-form ${className}`} 
            {...props}
        >
            {children}
            {buttonText && <SubmitButton text={buttonText} />}
        </form>
    );
};