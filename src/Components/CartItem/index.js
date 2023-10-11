import React, { useState, useEffect } from "react";
import { Image, Col, Row, InputNumber, Button, Typography, message } from "antd";
import styles from './style.module.css'; // Import the CSS module
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
    onQuantityChange(item.product?._id, value);
    message.success(`Quantity updated to ${value}`);
  };

  return (
    <Row className={styles.productCardRow} align="middle">
      <Col span={4}>
        <Image alt="product" src= "https://i.stack.imgur.com/mdx8R.png?s=64&g=1"/>
        {/* {item.product.imgLink} */}
      </Col>
      <Col span={4}>
        <Button
          icon={<MinusOutlined />}
          type="primary"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        />
      </Col>
      <Col span={4}>
        <InputNumber min={1} max={10} value={quantity} onChange={handleQuantityChange} />
      </Col>
      <Col span={4}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= 10}
        />
      </Col>
      <Col span={4}>
        <Text>{`$${item.product.price}`}</Text>
      </Col>
      <Col span={4}>
        <Button type="link" onClick={() => onRemove(item.product?._id)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
}