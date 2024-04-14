import '../../../index.css';
import { useEffect, useState } from "react"
import ManagerNavbar from "../../../components/ManagerNavbar";
import { Item } from '../../../types/dbTypes';
import ManagerSearchbar from '../../../components/ManagerSearchbar';

const MenuItemCard : React.FC<{item: Item}> = ({item}) => {
  return (
    <div >
      <img width={50} height={50} src={item.picture} />
      <h2>{item.name}</h2>
    </div>
  );
}

const ManagerMenu = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
      const data = await response.json();
      setItems(data);
    }

    fetchItems();
  }, []);

  const getFilteredItems = (items: Item[], query : string) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <>
      <ManagerNavbar />
      <div className='p-4'>
        <ManagerSearchbar 
          searchPlaceholder='search item'
          onSearch={setSearchQuery}
          conditions={[
          ]}
          actions={[
            { title: 'New Item', callback: () => {} }
          ]}
        />
        {getFilteredItems(items, searchQuery).map(item => 
          <MenuItemCard item={item}/>
        )}
      </div>
    </>
  );
};

export default ManagerMenu;
