import React, { useEffect, useState } from "react";
import { Button, Space, Input, Select, Form, Layout, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { FileImageTwoTone } from "@ant-design/icons";
import { deleteProductById } from "services/products";

const { Content } = Layout;

const fields = {
  productName: {
    placeholder: "Input your product name",
    name: "productName",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your product name!",
        validateTrigger: "onBlur",
      },
      {
        type: "text",
        warningOnly: true,
      },
      {
        type: "string",
        min: 5,
        message: "Product Name must be at least 10 characters long",
      },
    ],
  },

  description: {
    placeholder: "Add product description here, no more than 200 words",
    name: "description",
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
    name: "category",
    type: "string",
    rules: [
      {
        required: true,
        message: "Please enter your product's category",
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
      {
        value: "electronic product",
        label: "electronic product",
      },
    ],
  },

  price: {
    placeholder: "Input the price",
    name: "price",
    type: "number",
    rules: [
      {
        required: true,
        message: "Please enter your product price!",
      },
    ],
  },

  quantity: {
    placeholder: "Input the quantity",
    name: "quantity",
    type: "number",
    rules: [
      {
        required: true,
        message: "Please enter your product quantity!",
      },
    ],
  },

  imgLink: {
    placeholder: "Input Image Link Here",
    name: "imgLink",
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
  fontFamily: "Arial, sans-serif",
};

const ProductForm = ({
  buttonText,
  onSubmit,
  product,
  titleText,
  isEdit = false,
}) => {
  const [productImg, setProductImg] = useState("");
  const [submitedImg, setSubmitedImg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.imgLink !== undefined) {
      setProductImg(product.imgLink);
    }
  }, []);

  const handleButtonClick = () => {
    var inputElement = document.getElementById("myInputImg");
    setProductImg(inputElement.value);
    setSubmitedImg(true);
  };

  return (
    <Content>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>{titleText}</h1>

        <div style={container}>
          <Form onFinish={onSubmit} layout="vertical" autoComplete="off">
            <Form.Item
              key={fields.productName.name}
              name={fields.productName.name}
              label="Product Name"
              rules={fields.productName.rules}
              initialValue={product?.productName}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={fields.productName.placeholder}
              />
            </Form.Item>

            <Form.Item
              key={fields.description.name}
              name={fields.description.name}
              label="Product Description"
              rules={fields.description.rules}
              initialValue={product?.description}
            >
              <Input.TextArea
                showCount
                maxLength={200}
                style={{
                  height: 120,
                  marginBottom: 24,
                }}
                placeholder={fields.description.placeholder}
                // value={product?.description}
              />
            </Form.Item>

            <Space size="large">
              <Form.Item
                key={fields.category.name}
                name={fields.category.name}
                label="Category"
                rules={fields.category.rules}
                initialValue={product?.category}
              >
                <Select
                  placeholder={fields.category.placeholder}
                  options={fields.category.categories}
                  // value={product?.category}
                  style={{ width: "200px" }}
                />
              </Form.Item>

              <Form.Item
                key={fields.price.name}
                name={fields.price.name}
                label="Price"
                rules={fields.price.rules}
                initialValue={product?.price}
              >
                <Input
                  style={{ width: "200px" }}
                  min={0}
                  placeholder={fields.price.placeholder}
                />
              </Form.Item>
            </Space>

            <Space size="large">
              <Form.Item
                key={fields.quantity.name}
                name={fields.quantity.name}
                label="In Stock Quantity"
                rules={fields.quantity.rules}
                initialValue={product?.quantity}
              >
                <Input
                  style={{ width: "200px" }}
                  placeholder={fields.quantity.placeholder}
                  // value={product?.quantity}
                />
              </Form.Item>

              <Form.Item
                key={fields.imgLink.name}
                name={fields.imgLink.name}
                label="Add Image Link"
                rules={fields.imgLink.rules}
              >
                <Space.Compact>
                  <Input
                    placeholder={fields.imgLink.placeholder}
                    value={product?.imgLink}
                    id="myInputImg"
                  />
                  <Button type="primary" onClick={handleButtonClick}>
                    Submit
                  </Button>
                </Space.Compact>
              </Form.Item>
            </Space>

            <Form.Item>
              {!submitedImg ? (
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
              ) : (
                <Image
                  width={250}
                  src={productImg}
                  style={{ display: "block", marginLeft: "150px" }}
                />
              )}
            </Form.Item>
            <br />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "20px" }}
              >
                {buttonText}
              </Button>
              {isEdit && (
                <Button
                  danger
                  style={{ margin: "20px" }}
                  onClick={() => {
                    deleteProductById(product._id).then(navigate("/"));
                  }}
                >
                  Delete
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default ProductForm;
