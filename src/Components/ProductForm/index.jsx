import React from "react";
import { Button, Space, Input, Select, Form, Layout, Upload } from "antd";
import {
  FileImageTwoTone,
} from "@ant-design/icons";

const { Content } = Layout;
const { Search, TextArea } = Input;

const fields = {
    productName: {
      placeholder: "Input your product name",
      name: "Product Name",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please enter your product name!",
          validateTrigger: "onBlur", // Validate onBlur
        },
        {
          type: "text",
          warningOnly: true,
        },
        {
          type: "string",
          min: 1,
        },
      ],
    },

    description: {
      placeholder: "Add product description here, no more than 200 words",
      name: "Product Description",
      type: "text",
      rules: [
        {
          required: true,
          message: "Please enter your product description!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
    },

    category: {
      placeholder: "Choose the category",
      name: "Category",
      type: "string",
      rules: [
        {
          required: true,
          message: "Please choose your product catagory!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
      categories: [
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
      ],
    },

    price: {
      placeholder: "Input the price",
      name: "Price",
      type: "number",
      rules: [
        {
          required: true,
          message: "Please enter your product price!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
    },

    quantity: {
      placeholder: "Input the quantity",
      name: "In Stock Quantity",
      type: "number",
      require: true,
      rules: [
        {
          required: true,
          message: "Please enter your product quantity!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
    },

    imgLink: {
      placeholder: "Input Image Link Here",
      name: "Add Image Link",
      type: "url",
      rules: [
        {
          type: "url",
          message: "Invalid url format!",
          validateTrigger: "onBlur", // Validate onBlur
        },
      ],
    },
  };


// const categories = [
//   {
//     value: "meat",
//     label: "meat",
//   },
//   {
//     value: "drink",
//     label: "drink",
//   },
//   {
//     value: "fruit",
//     label: "fruit",
//   },
// ];


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

const ProductForm = (
  buttonText,
  onSubmit,
  titleText,
) => {

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>
            {/* {titleText} */}
            Edit Product
        </h1>

        <div style={container}>
          <Form onFinish={onSubmit} layout="vertical" autoComplete="off">
            <Form.Item
              key={fields.productName.name}
              name={fields.productName.name}
              label={fields.productName.name}
            //   rules={fields.productName.rules}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={fields.productName.placeholder}
              />
            </Form.Item>

            <Form.Item 
              key={fields.description.name}
              name={fields.description.name}
              label={fields.description.name}
            //   rules={fields.description.rules}
            >
              <Input.TextArea
                showCount
                maxLength={200}
                style={{
                  height: 120,
                  marginBottom: 24,
                }}
                placeholder={fields.description.placeholder}
              />
            </Form.Item>

            <Space size="large">
              <Form.Item   
                key={fields.category.name}
                name={fields.category.name}
                label={fields.category.name}
                // rules={fields.catagory.rules}
              >
                <Select
                  placeholder={fields.category.placeholder}
                  options={fields.category.categories}
                  style={{ width: "200px" }}
                />
              </Form.Item>

              <Form.Item   
                key={fields.price.name}
                name={fields.price.name}
                label={fields.price.name}
                // rules={fields.price.rules}
              >
                <Input
                  style={{ width: "200px" }}
                  placeholder={fields.price.placeholder}
                />
              </Form.Item>
            </Space>

            <Space size="large">
              <Form.Item 
                key={fields.quantity.name}
                name={fields.quantity.name}
                label={fields.quantity.name}
                // rules={fields.quantity.rules}
              >
                <Input
                  style={{ width: "200px" }}
                  placeholder={fields.quantity.placeholder}
                />
              </Form.Item>

              <Form.Item 
                key={fields.imgLink.name}
                name={fields.imgLink.name}
                label={fields.imgLink.name}
                // rules={fields.imgLink.rules}
              >
                <Space.Compact>
                  <Input placeholder={fields.imgLink.placeholder} />
                  <Button type="primary">Submit</Button>
                </Space.Compact>
              </Form.Item>
            </Space>


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
            <br />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {/* {buttonText} */}
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default ProductForm;
