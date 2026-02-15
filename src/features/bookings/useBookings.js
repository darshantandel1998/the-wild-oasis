import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filters = [];
  const statusFilterValue = searchParams.get("status");
  if (statusFilterValue) {
    filters.push({ field: "status", value: statusFilterValue });
  }

  const sortByValue = searchParams.get("sortBy") ?? "startDate-desc";
  const [sortByField, sortByDirection] = sortByValue.split("-");
  const order = { field: sortByField, dir: sortByDirection };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filters, order, page],
    queryFn: () => getBookings({ filters, order, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, order, page - 1],
      queryFn: () => getBookings({ filters, order, page: page - 1 }),
    });
  }

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, order, page + 1],
      queryFn: () => getBookings({ filters, order, page: page + 1 }),
    });
  }

  return { isLoading, bookings, count };
}
