import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onItemFormSubmit(e, id, name, category) {
    e.preventDefault();
    const newItem = {
      id,
      name,
      category,
    };
    setFormData((prevData) => [...prevData, newItem]);
  }

  // setFormData((prevData) => [...prevData, newItem]);
  // console.log("Updated form data", formData);

  const itemsToDisplay = formData.filter((item) => {
    const isCategoryMatch =
      selectedCategory === "All" || selectedCategory === item.category;
    const isSearchMatch =
      search > 0 || item.name.toLowerCase().includes(search.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={onSearchChange}
        search={search}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
