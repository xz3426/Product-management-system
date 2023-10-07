import { List } from "antd";
import ProductItem from "./ProductItem";

function ProductItemList({ products }) {
  return (
    <List
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      size="large"
      pagination={{
        onChange: (page) => {},
        pageSize: 6,
      }}
      dataSource={products}
      renderItem={(item) => <ProductItem item={item} />}
    />
  );
}

export default ProductItemList;
