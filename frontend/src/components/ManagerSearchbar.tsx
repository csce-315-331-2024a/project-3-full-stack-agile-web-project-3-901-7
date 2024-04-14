import React, { useState } from "react";

interface ISearchbarAction {
  title: string;
  callback: () => void;
};

interface ISearchbarCondition {
  title: string;
  callback: (status: boolean) => void;
}

interface IManagerSearchbarProps {
  searchPlaceholder: string;
  onSearch: (query: string) => void;
  actions: ISearchbarAction[];
  conditions: ISearchbarCondition[];
}

const ManagerSearchbar : React.FC<IManagerSearchbarProps> = (props) => {

  const [conditionStatus, setConditionStatus] = useState<boolean[]>(
    props.conditions.map(_ => false)
  );

  const toggleCondition = (i : number) => {
    setConditionStatus(oldState => {
      props.conditions[i].callback(!oldState[i]);
      oldState[i] = !oldState[i];
      return oldState;
    });
  } 

  return (
    <div className="flex flex-col items-center">
      <div className="pl-4 pr-64 mt-8 mb-4 flex flex-col sm:flex-row items-center justify-between w-full">
        <div className="relative flex-grow">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="icons/search-icon.png" alt="Search" className="w-5 h-5" />
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder={props.searchPlaceholder}
              className="text-xl font-ptserif block w-full pl-10 pr-3 py-2 border-b-2 border-black bg-transparent placeholder-gray-500 focus:outline-none focus:border-black focus:ring-0"
              onChange={(e) => props.onSearch(e.target.value)}
            />
        </div>

        {/* Conditions */}

        {props.conditions.map((condition, i) => (
          <button
            onClick={() => toggleCondition(i)}
            className={`ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium font-ptserif ${
              conditionStatus[i] ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {condition.title}
          </button>
        ))}
        

        {/* Reorder Stock Button */}
        {props.actions.map((action) => (
          <button
            onClick={() => action.callback()}
            className="ml-4 border-2 border-black px-4 py-2 rounded-md text-lg font-medium bg-white text-black font-ptserif hover:bg-black hover:text-white"
          >
            {action.title}
          </button>
        ))}

      </div>
    </div>
  )
}

export default ManagerSearchbar;