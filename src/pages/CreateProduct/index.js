import React from "react";
import {
  Button,
  Space,
  Input,
  Select,
  Form,
  Layout,
  Upload,
  InputNumber,
  message,
} from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  FileImageTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createProductsAction } from "app/productSlice";
const { Content } = Layout;
const { Search, TextArea } = Input;

const categories = [
  {
    value: "meat",
    label: "meat",
  },
  {
    value: "drink",
    label: "drink",
  },
  {
    value: "fruit",
    label: "fruit",
  },
];

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const title = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  marginLeft: "-500px",
};

const container = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginLeft: "350px",
  marginRight: "350px",
  padding: "30px 100px",
  "font-family": "Arial, sans-serif",
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const createProductStatus = useSelector((state) => state.products.status);
  const onSubmit = async (data) => {
    dispatch(createProductsAction(data));
  };

  switch (createProductStatus) {
    case "succeeded":
      message.success("Product created successfully");
      break;
    case "failed":
      message.error("Something went wrong in the back end. Please Try Again!");
      break;
    default:
      break;
  }

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Create Product</h1>
        <div style={container}>
          <Form
          onFinish={onSubmit}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your product Name",
              },
                {
                  type: "text",
                  warningOnly: true,
                },
                {
                  type: "string",
                  min: 10,
                message: "Product Name must be at least 10 characters long",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                placeholder="input your product name"
              />
            </Form.Item>

            <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter your product description",
              },
            ]}
          >
              <Input.TextArea
                showCount
                maxLength={100}
                style={{
                  height: 120,
                  marginBottom: 24,
                }}
                //   onChange={onChange}
                placeholder="Add Product Description Here, No More Than 100 words"
              />
            </Form.Item>

            <Space size="large">
              <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please enter your product's category",
                },
              ]}
            >
                <Select
                  placeholder="choose the category"
                  options={categories}
                  style={{ width: "200px" }}
                />
              </Form.Item>

              <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter your price!" }]}
            >
                <InputNumber
                  style={{ width: "200px" }}
                min={0}
                  placeholder="input the price"
                />
              </Form.Item>
            </Space>

            <Space size="large">
              <Form.Item
              name="quantity"
              label="In Stock Quantity"
              rules={[
                { required: true, message: "Please enter your quantity!" },
              ]}
            >
                <InputNumber
                min={1}
                  style={{ width: "200px" }}
                  placeholder="input the quantity"
                />
              </Form.Item>

              <Form.Item name="imgLink" label="Add Image Link">
                <Space.Compact>
                  <Input placeholder="Input Image Link Here" />
                  <Button type="primary">Submit</Button>
                </Space.Compact>
              </Form.Item>
            </Space>

            {/* <div className="image_frame">
            <div className="image_frame_name">Image Preview!</div>
          </div> */}

            <Form.Item>
              <div
                style={{
                  margin: "0px 50px",
                  height: "15em",
                  backgroundColor: "#f5f3f38f",
                  border: "1px dashed grey",
                  borderRadius: "10px",
                }}
              >
                <p>
                  <FileImageTwoTone
                    style={{
                      display: "block",
                      fontSize: "50px",
                      alignItems: "center",
                      paddingTop: "1em",
                    }}
                  />
                </p>
                <p
                  style={{
                    display: "block",
                    textAlign: "center",
                    color: "grey",
                  }}
                >
                  Product Image Preview
                </p>
              </div>
            </Form.Item>
          </Form.Item>

          <br />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
