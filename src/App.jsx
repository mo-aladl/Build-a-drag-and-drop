// App.js
import './SortableList/SortableList.css'
import SortableList from "./SortableList/SortableList";

const App = () => {
  const items = [
    { id: 1, order: 1 },
    { id: 2, order: 2 },
    { id: 3, order: 3 },
    { id: 4, order: 4 },
    { id: 5, order: 5 },
    // Add more items as needed
  ];

  const handleOrderChange = (newOrder) => {
    console.log(newOrder);
    // Here you can perform any action with the new order array
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sortable Items List</h1>
      <SortableList items={items} onOrderChange={handleOrderChange} />

      
    </div>
  );
};

export default App;
