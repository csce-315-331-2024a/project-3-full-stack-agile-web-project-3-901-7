
interface IManagerTableProps {
  headerColumns: string[];
  thumbnails?: string[];
  data: any[][];
}

const ManagerTable : React.FC<IManagerTableProps> = (props) => {
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
            <tr key={row[0]} className="bg-white border-b">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerTable;