import { Card, List } from "antd";
function ProductItemList({ products }) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={products}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.productName}>Card content</Card>
        </List.Item>
      )}
    />
  );
}

export default ProductItemList;
