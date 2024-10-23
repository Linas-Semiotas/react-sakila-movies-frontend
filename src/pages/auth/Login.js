import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/schemas';
import { TooltipFormikInput, TooltipFormikPasswordInput } from '../../components/Input';
import { MainContainerSmall } from '../../components/Containers';
import { Form } from '../../components/Form';
import { login, getUserInfo } from '../../services/authService';
import Utils from '../../utils/utility';

const Login = ({ setIsLoggedIn, setUserInfo }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setErrors }) => {
            setError('');
            login(values.username, values.password)
                .then(async (data) => {
                    const userInfo = await getUserInfo();
                    setIsLoggedIn(true);
                    setUserInfo(userInfo);
                    navigate('/home');
                })
                .catch(err => Utils.handleResponse(err, setError, 'An error occurred during login'));
        }
    });

    return (
        <MainContainerSmall title="Login">
            <Form onSubmit={formik.handleSubmit} buttonText="Login">
                <TooltipFormikInput
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="Username"
                    error={formik.errors.username}
                    touched={formik.touched.username}
                    label="Username"
                />
                <TooltipFormikPasswordInput
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    label="Password"
                />
            </Form>
            {error && <p className="error-message">{error}</p>}
            <p className="register-link">
                Don't have an account?&nbsp;
                <Link to={`/register`}>Create an account</Link>
            </p>
        </MainContainerSmall>
    );
};

export default Login;
