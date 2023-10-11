import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography, Row, Col, message } from 'antd';
import { fetchCartc, updateQuantityc, removeProductc, checkoutCart } from 'app/cartSlice';
import { applyDiscountCode } from 'utils/discountCodes'; // needs to be implemented
import CartItem from 'Components/CartItem';
import styles from './style.module.css';


const { Title } = Typography;

const Cart = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  
  useEffect(() => {
    if (currentUser?.username) {
      dispatch(fetchCartc({username: currentUser?.username}));
    }
  }, []);
// }, [dispatch, currentUser, cartItems.length]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantityc({ username: currentUser?.username, productId, quantity }))
      .then((action) => {
        message.success('Item quantity updated.');
        dispatch(fetchCartc({username: currentUser?.username}));
        calculateTotal();
      });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeProductc({ username: currentUser?.username, productId }))
      .then((action) => {
        message.success('Item removed from cart.');
        dispatch(fetchCartc({username: currentUser?.username}));

      });
  };

  const handleCheckout = () => {
    dispatch(checkoutCart({username: currentUser.username})) // pass the current user's id when dispatching the action
      .then(() => {
        message.success('Checkout successful!');
        history('/checkout');
      })
      .catch(() => {
        message.error('Checkout failed. Please try again.');
      });
  };

  const handleApplyDiscountCode = () => {
    try {
        const discountValue = applyDiscountCode(discountCode);
        setDiscount(discountValue);
        message.success(`Discount code applied. Your discount is ${discountValue * 100}%.`);
      } catch (error) {
        message.error(error.message);
      }
  };
  
  const calculateTotal = () =>{
    const newSubtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setSubtotal(newSubtotal);

    // Calculate tax (11% of subtotal)
    const newTax = newSubtotal * 0.11;
    setTax(newTax);

    // Calculate total (subtotal + tax - discount)
    const newTotal = newSubtotal + newTax - (newSubtotal * discount);
    setTotal(newTotal);
  }

  useEffect(() => {
    // Recalculate subtotal whenever cartItems change
    calculateTotal();
  }, [cartItems, discount]);


  return (
    <div >
        <h2>Cart ({cartItems.length} items)</h2>
        <div>
            {cartItems.map((item) => (
                <div>
                    <CartItem 
                      key={item._id}
                      item={item}
                      onQuantityChange={handleQuantityChange} 
                      onRemove={handleRemoveFromCart} 
                    />
                </div>
            ))}
        </div>
        <div className={styles.checkoutContainer}>
        <Input
            className={styles.discountCodeInput}
            placeholder="Apply Discount Code"
            value={discountCode}
            onChange={e => setDiscountCode(e.target.value)}
        />
        <Button className={styles.applyButton} onClick={handleApplyDiscountCode}>Apply</Button>
        <Row className={styles.rowStyle}>
            <Col span={16}><Typography.Text>Subtotal:</Typography.Text></Col>
            <Col span={8}><Typography.Text>${subtotal.toFixed(2)}</Typography.Text></Col>
        </Row>
        <Row className={styles.rowStyle}>
            <Col span={16}><Typography.Text>Tax:</Typography.Text></Col>
            <Col span={8}><Typography.Text>${tax.toFixed(2)}</Typography.Text></Col>
        </Row>
        <Row className={styles.rowStyle}>
            <Col span={16}><Typography.Text>Discount:</Typography.Text></Col>
            <Col span={8}><Typography.Text>-${(subtotal * discount).toFixed(2)}</Typography.Text></Col>
        </Row>
        <Row className={styles.rowStyle}>
            <Col span={16}><Typography.Text>Total:</Typography.Text></Col>
            <Col span={8}><Typography.Text>${total.toFixed(2)}</Typography.Text></Col>
        </Row>
            <Button type="primary" onClick={handleCheckout} className={styles.checkoutButton}>Checkout</Button>
        </div>
    </div>
  );
};

export default Cart;
