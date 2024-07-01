// react lib's & hooks
import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons"; // react-bootstraps icon
import "../css/search.css"; // custom css file

function Search() {
  useEffect(() => {
    fetch(
      InstituteSoft.BaseURL + InstituteSoft.Student.GetActiveStudent // api's endpoint
    )
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        setFilterData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const handleFilter = (e) => {
    const res = filterData.filter((f) => f.name.toLowerCase().includes(value));
    setData(res);
    if (value === "") {
      setData([]);
    }
  };
  return (
    <>
      <div>
        {/* search box */}
        <div className="search-container">
          <Search className="text-xl" />
          <input
            type="text"
            className="form-control search-input"
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Search by Student Name"
          />
        </div>

        {/* search box suggestions */}
        <div className="search-suggestions">
          {data.map((d, i) => (
            <div key={i}>{d.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
