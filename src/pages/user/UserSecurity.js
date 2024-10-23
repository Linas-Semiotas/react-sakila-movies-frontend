import { useState } from 'react';
import { useFormik } from 'formik';
import { passwordSchema } from '../../utils/schemas';
import { TooltipFormikPasswordInput } from '../../components/Input';
import { Form } from '../../components/Form';
import { changePassword } from '../../services/userService';
import Utils from '../../utils/utility';

const UserSecurity = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
        validationSchema: passwordSchema,
        onSubmit: (values, { resetForm }) => {
            setError('');
            setSuccess('');

            changePassword(values.currentPassword, values.newPassword)
                .then((data) => {
                    Utils.handleResponse(data, setSuccess, "Password changed successfully");
                    resetForm();
                })
                .catch(err => Utils.handleResponse(err, setError, "Error changing password"));
        },
    });

    return (
        <div className="user-container" style={{width: "400px", margin: "30px auto"}}>
            <h2>Change Password</h2>
            <Form onSubmit={formik.handleSubmit} buttonText="Change Password">
                <TooltipFormikPasswordInput
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Current password"
                    error={formik.errors.currentPassword}
                    touched={formik.touched.currentPassword}
                    label="Current Password"
                />

                <TooltipFormikPasswordInput
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="New password"
                    error={formik.errors.newPassword}
                    touched={formik.touched.newPassword}
                    label="New Password"
                />

                <TooltipFormikPasswordInput
                    name="repeatNewPassword"
                    value={formik.values.repeatNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Repeat new password"
                    error={formik.errors.repeatNewPassword}
                    touched={formik.touched.repeatNewPassword}
                    label="Repeat New Password"
                />
            </Form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default UserSecurity;
