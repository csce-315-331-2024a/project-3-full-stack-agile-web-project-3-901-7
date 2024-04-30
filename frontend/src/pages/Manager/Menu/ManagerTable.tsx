import { useState } from "react";

interface IManagerTableProps {
  headerColumns: string[];
  thumbnails?: string[];
  onEdit?: (key : number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[][];
}
/**
 * Represents the sorting order of the table.
 */
type SortOrdering = 'ascending' | 'descending';

/**
 * Represents the sort options for the table.
 */
interface ISortOptions {
  column: number;
  order: SortOrdering;
}

/**
 * Compares two values based on the specified sort order.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @param order - The sort order.
 * @returns A negative number if a is less than b, a positive number if a is greater than b, or 0 if they are equal.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function compare(a: any, b: any, order: SortOrdering) {
  const orderFactor = ((order === 'ascending') ? 1 : -1);

  if (!b)
    return orderFactor;
  if (!a)
    return -orderFactor;

  if (typeof a === 'string' && typeof b === 'string')
    return a.localeCompare(b) * orderFactor;

  if (typeof a === 'number' && typeof b === 'number')
    return (a - b) * orderFactor;

  if (typeof a === 'object' && typeof b === 'object')
    return (a > b) ? orderFactor : -orderFactor;

  return 0;
}

/**
 * Represents the props for the ManagerTable component.
 */
interface IManagerTableProps {
  headerColumns: string[];
  thumbnails?: string[];
  onEdit?: (key: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[][];
}

/**
 * Represents a table component for the manager page.
 * @param props - The component props.
 * @returns The rendered ManagerTable component.
 */
const ManagerTable: React.FC<IManagerTableProps> = (props) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  /**
   * Handles the hover event on a table row.
   * @param index - The index of the hovered row.
   */
  const handleRowHover = (index: number | null) => {
    setHoveredRowIndex(index);
  };

  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    column: 0,
    order: 'ascending',
  });

  /**
   * Toggles the sort order for a column.
   * @param column - The index of the column to toggle.
   */
  const toggleSort = (column: number) => {
    setSortOptions((prevSort) => {
      const newSort: ISortOptions = { column, order: 'ascending' };
      if (prevSort.column === column)
        newSort.order = prevSort.order === 'ascending' ? 'descending' : 'ascending';
      return newSort;
    });
  };

  return (
    <div className='mt-4 ml-4 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 280px)' }}>
      <table className="overflow-scroll w-full text-sm text-center text-black  font-ptserif">
        <thead className="text-s text-black bg-gray-50 font-ptserif">
          <tr>
            {props.thumbnails && (
              <th scope="col" className="py-3 px-6  font-ptserif" />
            )}
            {props.headerColumns.map((columnTitle, colIdx) =>
              <th
                className="py-3 px-6  font-ptserif whitespace-nowrap cursor-pointer"
                scope="col"
                onClick={() => toggleSort(colIdx)}
              >
                {columnTitle + (colIdx === sortOptions.column ? (sortOptions.order === 'ascending' ? ' ↓' : ' ↑') : '')}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {props.data
            .map((row, i) => ({ thumbnail: props.thumbnails && props.thumbnails[i], row }))
            .sort((a, b) => compare(a.row[sortOptions.column], b.row[sortOptions.column], sortOptions.order))
            .map(({ row, thumbnail }, i) => (
              <tr
                key={row[0]}
                className={`bg-white hover:bg-gray-50 cursor-pointer border-b ${
                  i === hoveredRowIndex ? 'relative' : ''
                }`}
                onMouseEnter={() => handleRowHover(i)}
                onMouseLeave={() => handleRowHover(null)}
              >
                {/* Thumbnail */}
                {thumbnail && (
                  <td className=" font-ptserif">
                    <img width={50} height={50} src={thumbnail} />
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
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
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