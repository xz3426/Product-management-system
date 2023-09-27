import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from 'Components/AuthForm';
import { authUser } from 'app/userSlice';
import { Layout } from "antd";
const { Content } = Layout;
export default function SignIn() {
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
    <Content
    style={{
      padding: "0 50px",
      minHeight: "100vh",
      backgroundColor: "lightgrey",
      display: "flex", // Add display flex
        // alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
    }}
    >
    
    <div
        style={{
          width: "700px",
          margin: "150px auto 0", // Add a 200px margin from the top
          padding: "20px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          flexDirection: "column",
          height: "500px", 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
      <AuthForm
        buttonText="Create account"
        onSubmit={onSubmit}
        title="Sign up an account"
        fields={fields}
      />
      <div className="form-links">
        <p>
          Already have an account? <Link to="/signin">Sign in</Link> 
          
        </p>
      </div>
    </div>
    </Content>
  );
}
