import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="Cabins" />;

  let displayedCabins = cabins;

  const discountFilterValue = searchParams.get("discount");
  if (discountFilterValue === "no-discount")
    displayedCabins = displayedCabins.filter((cabin) => !cabin.discount);
  if (discountFilterValue === "with-discount")
    displayedCabins = displayedCabins.filter((cabin) => cabin.discount);

  const sortBy = searchParams.get("sortBy") ?? "name-asc";
  const [sortByField, sortByDirection] = sortBy.split("-");
  const sortByModifier = sortByDirection === "desc" ? -1 : 1;
  displayedCabins = displayedCabins.sort(
    (a, b) => (a[sortByField] - b[sortByField]) * sortByModifier,
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={displayedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
