import '../styles/Components.css';

export const SubmitButton = ({ text, type = "submit", onClick, isDisabled = false }) => {
    return (
        <button type={type} className={`submit-button ${isDisabled ? 'disabled' : ''}`} onClick={onClick} disabled={isDisabled}>
            {text}
        </button>
    );
};

export const DeleteButton = ({ text = "Delete", onClick }) => {
    return (
        <button type="button" className={`delete-button`} onClick={onClick}>
            {text}
        </button>
    );
};

export const UpdateButton = ({ text = "Update", onClick }) => {
    return (
        <button type="button" className={`update-button`} onClick={onClick}>
            {text}
        </button>
    );
};

export const AddButton = ({ text = "Add", onClick }) => {
    return (
        <button type="button" className={`add-button`} onClick={onClick}>
            {text}
        </button>
    );
};