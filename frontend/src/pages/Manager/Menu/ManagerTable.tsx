import { useEffect, useState } from "react";
import { getUserAuth, UserInfo } from "../../Login";

interface IManagerTableProps {
  headerColumns: string[];
  thumbnails?: string[];
  onEdit?: (key : number) => void;
  data: any[][];
}

const ManagerTable : React.FC<IManagerTableProps> = (props) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleRowHover = (index: number | null) => {
    setHoveredRowIndex(index);
  };

  const [userProfile, setUserProfile] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    getUserAuth('manager')
      .then(setUserProfile)
      .catch(console.error);
  }, [])

  return (
    <div className='mt-4 ml-4 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 280px)' }}>
      <table className="overflow-scroll w-full text-sm text-center text-black  font-ptserif">
        <thead className="text-s text-black bg-gray-50 font-ptserif">
          <tr>
            {props.thumbnails && (
              <th scope="col" className="py-3 px-6  font-ptserif" />
            )}
            {props.headerColumns.map(columnTitle => 
              <th scope="col" className="py-3 px-6  font-ptserif">
                {columnTitle}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {props.data.map((row, i) => (
            <tr 
              key={row[0]} 
              className={`bg-white hover:bg-gray-50 cursor-pointer border-b ${
                i === hoveredRowIndex ? 'relative' : ''
              }`}
              onMouseEnter={() => handleRowHover(i)}
              onMouseLeave={() => handleRowHover(null)}
            >
              {/* Thumbnail */}
              {props.thumbnails && (
                <td className=" font-ptserif">
                  <img width={50} height={50} src={props.thumbnails[i]} />
                </td>
              )}

              {/* ID */}
              <th scope="row" className="py-4 px-6 font-medium text-black whitespace-nowrap  font-ptserif">
                {row[0]}
              </th>

              {/* Data */}
              {row.slice(1).map(item => (
                <td className="py-4 px-6  font-ptserif">
                  {item?.toString() || 'None'}
                </td>
              ))}

              {/* Edit Icon */}
              {(i === hoveredRowIndex) && props.onEdit && (
                <td className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
                  <button 
                    onClick={() => {
                      if (row[0] && props.onEdit)
                        props.onEdit(row[0]);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white-500 hover:text-white-600 cursor-pointer"
                      fill="black"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerTable;