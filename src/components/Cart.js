import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/shoppingListReducer";

function Cart() {
  const cart = useSelector(state => state.shoppingList.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className='cart-item'>
              <p>{item.shoppingItem} - {item.price}</p>
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          ))}
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
