import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, defaultOption = "" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? defaultOption;

  function handleChange(e) {
    if (e.target.value === "") searchParams.delete("sortBy");
    else searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      type="white"
      value={sortBy}
      onChange={handleChange}
      options={options}
    />
  );
}

export default SortBy;
