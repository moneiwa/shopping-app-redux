import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchShoppingItems,
  deleteShoppingItemFromServer,
  editShoppingItemOnServer,
  addShoppingItemToServer,
  logoutUser,
  addToCart,
} from "../redux/shoppingListReducer";

function ShoppingList() {
  const shoppingList = useSelector(state => state.shoppingList.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  useEffect(() => {
    // Load items from local storage on initial render
    const savedItems = JSON.parse(localStorage.getItem("shoppingItems"));
    if (savedItems) {
      savedItems.forEach(item => {
        dispatch(addShoppingItemToServer(item)); // Populate Redux store
      });
    } else {
      dispatch(fetchShoppingItems());
    }
  }, [dispatch]);

  useEffect(() => {
    // Save items to local storage whenever the shoppingList changes
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const handleDelete = (id) => {
    dispatch(deleteShoppingItemFromServer(id));
  };

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditedText(item.shoppingItem);
    setNewItemCategory(item.category);
    setNewItemImage(item.image || null);
  };

  const handleSaveEdit = (id) => {
    const updatedItem = {
      id,
      shoppingItem: editedText,
      category: newItemCategory,
      image: newItemImage,
    };
    dispatch(editShoppingItemOnServer(updatedItem));
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim() && newItemCategory) {
      const newItem = {
        id: Date.now(),
        shoppingItem: newItemText,
        category: newItemCategory,
        image: newItemImage,
      };
      dispatch(addShoppingItemToServer(newItem));
      setNewItemText("");
      setNewItemCategory("");
      setNewItemImage(null);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItemImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = (item) => {
    const itemToAdd = {
      ...item,
      quantity: quantityToAdd,
    };
    dispatch(addToCart(itemToAdd));
    setQuantityToAdd(1);
  };

  return (
    <div className='list'>
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>

      <form onSubmit={handleAddItem} className='add-item-form'>
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new item"
          className='add-item-input'
          required
        />
        <input
          type="text"
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          placeholder="Category"
          className='add-item-input'
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className='add-item-input'
        />
        <button type="submit" className='add-item-button'>Add</button>
      </form>

      <div className='card-container'>
        {shoppingList.length === 0 ? (
          <p>No items to display</p>
        ) : (
          shoppingList.map((item) => (
            <div key={item.id} className='card'>
              {item.image && <img src={item.image} alt={item.shoppingItem} className='card-image' />}
              <div className='card-content'>
                {editingItem === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className='card-input'
                    />
                    <input
                      type="text"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className='card-input'
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <button onClick={() => handleSaveEdit(item.id)} className='card-button'>Save</button>
                    <button onClick={handleCancelEdit} className='card-button'>Cancel</button>
                  </>
                ) : (
                  <>
                    <p className='card-text'>{item.shoppingItem}</p>
                    <p className='card-category'>{item.category}</p>
                    <button onClick={() => handleDelete(item.id)} className='card-button'>Delete</button>
                    <button onClick={() => handleEdit(item)} className='card-button'>Edit</button>
                    <input
                      type="number"
                      value={quantityToAdd}
                      onChange={(e) => setQuantityToAdd(Number(e.target.value))}
                      min="1"
                      className='quantity-input'
                    />
                    <button onClick={() => handleAddToCart(item)} className='card-button'>Add to Cart</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
