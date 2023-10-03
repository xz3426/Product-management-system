import React from "react";
import { Button, Space, Input, Select, Form, Layout, Upload } from "antd";
import {
  InboxOutlined,
  UploadOutlined,
  FileImageTwoTone,
} from "@ant-design/icons";

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
  const [form] = Form.useForm();

  return (
    <div style={{ backgroundColor: "#f5f3f38f" }}>
      <h1 style={title}>Create Product</h1>
      <div style={container}>
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="Product name"
            label="Product name"
            rules={[
              //   {
              //     required: true,
              //   },
              {
                type: "text",
                warningOnly: true,
              },
              {
                type: "string",
                min: 1,
              },
            ]}
          >
            <Input
              style={{ width: "100%" }}
              placeholder="input your product name"
            />
          </Form.Item>

          <Form.Item label="Product decription">
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
            <Form.Item label="Category">
              <Select
                placeholder="choose the category"
                options={categories}
                style={{ width: "200px" }}
              />
            </Form.Item>

            <Form.Item label="Price">
              <Input style={{ width: "200px" }} placeholder="input the price" />
            </Form.Item>
          </Space>

          <Space size="large">
            <Form.Item label="In Stock Quantity">
              <Input
                style={{ width: "200px" }}
                placeholder="input the quantity"
              />
            </Form.Item>

            <Form.Item label="Add Image Link">
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
                style={{ display: "block", textAlign: "center", color: "grey" }}
              >
                Product Image Preview
              </p>
            </div>
          </Form.Item>

          <br />

          <Form.Item>
            <Button type="primary">Add Product</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
