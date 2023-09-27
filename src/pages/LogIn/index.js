import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from 'Components/AuthForm';
import { authUser } from 'app/userSlice';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password'
    }
  ];

  const onSubmit = data => {
    console.log(data);
    dispatch(authUser(data)).then(() => {
      navigate(location.state?.from || '/');
    });
  };

  return (
    <div>
      <AuthForm
        buttonText="Log in"
        onSubmit={onSubmit}
        title="Sign in to your account"
        fields={fields}
      />
      <div className="form-links">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link> 
          
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}
