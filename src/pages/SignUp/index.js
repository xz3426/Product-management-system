import { CodeSandboxCircleFilled, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import AuthForm from "Components/AuthForm";
import { signUpUser } from "app/userSlice";
import { Layout, message } from "antd";

export default function SignIn() {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const signUpStatus = useSelector((state) => state.user.status);
  const signUpError = useSelector((state) => state.error.message);

  const initialRender = useRef(true);

  console.log(initialRender.current);
  useEffect(() => {
    if (!initialRender.current) {
      console.log(signUpStatus);
      if (signUpStatus === "succeeded") {
        message.success("Sign up successfully");
        initialRender.current = true;
        navigate("/signin");
      } else if (signUpStatus === "failed") {
        message.error(signUpError);
      }
    } else {
      if (signUpStatus !== "succeeded") {
        initialRender.current = false;
      }
    }
  }, [signUpStatus]);

  const fields = [
    {
      placeholder: "Email",
      name: "email",
      type: "text",
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter your email!",
          validateTrigger: "onBlur", // Validate onBlur
        },
        {
          type: "email",
          message: "Invalid email format!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
    },
    {
      placeholder: "Password",
      name: "password",
      type: "password",
      rules: [
        {
          required: true,
          message: "Please enter your password!",
          validateTrigger: "onBlur", // Validate onBlur
        },
        {
          min: 6,
          message: "Password must be at least 6 characters long!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
    },
  ];

  const checkbox = {
    name: "authorization",
    text: "Admin",
  };

  const onSubmit = async (data) => {
    if (data["authorization"]) {
      data["authorization"] = "admin";
    } else {
      data["authorization"] = "regular";
    }
    data.username = data.email.split("@")[0];

    dispatch(signUpUser(data));
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
        {/* {signUpStatus === 'failed' && (
          <Message type="error" text="This email is already registered" /> */}
        {/* )} */}
        <AuthForm
          buttonText="Create account"
          onSubmit={onSubmit}
          title="Sign up an account"
          fields={fields}
          checkbox={checkbox}
        />
        <div>
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </Content>
  );
}
