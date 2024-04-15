import '../../../index.css';
import { useEffect, useState } from "react"
import ManagerNavbar from "../../../components/ManagerNavbar";
import { Item } from '../../../types/dbTypes';
import ManagerSearchbar from '../../../components/ManagerSearchbar';
import ManagerTable from './ManagerTable';
import {  } from '@react-oauth/google';
import { getUserAuth, UserInfo } from '../../Login';

const ManagerMenuItemCard : React.FC<{item: Item}> = ({item}) => {
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
  const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    getUserAuth()
      .then(setUserProfile)
      .catch(console.error);
  }, [])

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/item/findAll");
      const data = await response.json();
      setItems(data);
    }

    fetchItems();
  }, []);

  const getFilteredItems = (items: Item[], query : string) => {
    const compare = (a : string, b : string) => a.toLowerCase().includes(b.toLowerCase());

    return items.filter(item => 
      compare(item.name, query) || 
      compare(item.itemDesc, query) || 
      compare(item.ingredientInfo, query)
    );
  }

  return (userProfile &&
    <>
      <ManagerNavbar userInfo={userProfile} />
      <div className='pl-4 pr-4 pb-4'>
        <ManagerSearchbar 
          searchPlaceholder='search item'
          onSearch={setSearchQuery}
          conditions={[]}
          actions={[
            { title: 'New Item', callback: () => {window.location.href = '/newmenuitem'} },
          ]}
          fill
        />
        <ManagerTable 
          headerColumns={[
            "ID", "Name", "Price", "Category", "Ingredients", "Start", "End", "Description"
          ]}
          data={getFilteredItems(items, searchQuery).map(item => [
            item._id, item.name, item.price, item.category, item.ingredientInfo, item.startDate, item.endDate, item.itemDesc,
          ])}
          thumbnails={getFilteredItems(items, searchQuery).map(item => item.picture)}
          onEdit={(itemId) => { 
            window.location.href = '/editmenuitem/' + itemId; 
          }}
        />
      </div>
    </>
  );
};

export default ManagerMenu;
