import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import "./filterselect.css";

const filterItems = [
  {
    id: 2,
    title: "All",
  },
  {
    id: 3,
    title: "Brand",
  },
  {
    id: 4,
    title: "Size",
  },
];

type FilterProps = {
  onChange?: (e: string) => void;
};

const FilterSelect: React.FC<FilterProps> = ({ onChange } ) => {
  const [select, setSelect] = useState<string>("");

  return (
    <Dropdown className="mx-2  filter-search-button">
      <Dropdown.Toggle
        className="filter-search-button"
        variant="success"
        id="dropdown-basic"
      >
        {select !== "" ? select : "Select"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {filterItems.map((item) => (
          <Dropdown.Item
            // onClick={onChange}
            eventKey={item.title}
            key={item.id}
            href="#/action-1"
          >
            {item.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterSelect;
