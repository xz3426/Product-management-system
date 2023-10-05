import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AuthForm from 'Components/AuthForm';
import { changePwd, updatePwd } from 'services/auth';
import { Layout, message, Typography, Space, Button, Form, Input } from "antd";
const { Content } = Layout;
const { Text } = Typography;

export default function ChangePassword() {
    const [changePwdStatus, setChangePwdStatus] = useState('idle');
    const [changePwdError, setChangePwdError] = useState('');
    const [updatePwdStatus, setupdatePwdStatus] = useState('idle');
    const [updatePwdError, setupdatePwdError] = useState('');
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false); // Track whether to show the new password form
    const [form] = Form.useForm();
    const navigate = useNavigate();

  useEffect(() => {
    if (changePwdStatus === 'succeeded') {
      setEmailSent(true); // Set emailSent to true when succeeded
    } else if (changePwdStatus === 'failed') {
      message.error(changePwdError);
      setChangePwdStatus('idle');
    }
  }, [changePwdStatus, changePwdError]);
  useEffect(() => {
    if (updatePwdStatus === 'succeeded') {
      message.success("Password update successfully");// Set emailSent to true when succeeded
    } else if (updatePwdStatus === 'failed') {
      message.error(updatePwdError);
      setChangePwdStatus('idle');
    }
  }, [updatePwdStatus, updatePwdError]);

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />
    },
  ];

  const onSubmit = async data => {
    try {
      await changePwd(data);
      setChangePwdStatus('succeeded');
      setEmail(data.email);
    } catch (error) {
      setChangePwdError(error.message);
      setChangePwdStatus('failed');
    }
  };
  const handleNewPasswordForm = () => {
    setShowNewPasswordForm(true);
  };

  const onFinishNewPasswordForm = async data => {
    // Handle the submission of the new password form here
    // You can send the new password to your API or perform any required actions
    try {
      data.email = email;
      console.log("!!!!",data);
        await updatePwd(data);
    } catch (error) {
      setupdatePwdError(error.message);
      setupdatePwdStatus('failed');
    }
    // console.log('New Password:', data.password);
    // After handling the form submission, you can navigate or perform other actions as needed
    navigate('/');
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
            margin: "150px auto 0",
            padding: "50px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flexDirection: "column",
            height: "400px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
              {emailSent ? (
          showNewPasswordForm ? ( // Display the new password form when showNewPasswordForm is true
            <div>
              <Space direction="vertical" align="center" style={{ textAlign: "center" }}>
                <LockOutlined style={{ fontSize: "36px", color: "#52c41a" }} />
                <Text strong>Set a New Password</Text>
                <Form form={form} onFinish={onFinishNewPasswordForm} layout="vertical">
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true, message: 'Please enter a new password' },
                      { min: 6, message: 'Password must be at least 6 characters long' },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Password
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </div>
          ) : (
            <div>
              <Space direction="vertical" align="center" style={{ textAlign: "center" }}>
                <LockOutlined style={{ fontSize: "36px", color: "#52c41a" }} />
                <Text strong>An email has been sent!</Text>
                <Text>
                  Please check your inbox for further instructions.
                  Click <Link to="/">here</Link> to go back to the homepage.
                </Text>
              </Space>
              <Button type="primary" onClick={handleNewPasswordForm}>
                Set New Password
              </Button>
            </div>
          )
        ) : (
          <AuthForm
            buttonText="Update Password"
            onSubmit={onSubmit}
            title="Update Your Password"
            title1="Enter your email link, we will send you the recovery link"
            fields={fields}
          />
        )}
      </div>
    </Content>
  );
}
