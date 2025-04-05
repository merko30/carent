import { format } from "date-fns/format";

import { RentingVehiclesWithVehicle } from "@/types";

const RentalList = ({ rentals }: { rentals: RentingVehiclesWithVehicle[] }) => (
  <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
    <table className="w-full">
      <thead className="w-full">
        <tr className="w-full text-left">
          <th className="p-4">Vozilo</th>
          <th>Period</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {rentals.map(({ id, vehicle, startDate, endDate }) => (
          <tr key={id} className="w-full odd:bg-gray-100">
            <td className="p-4">
              {vehicle.brand.name} {vehicle.model}
            </td>
            <td>
              {format(new Date(startDate), "dd.MM.yyyy") +
                " - " +
                format(new Date(endDate!), "dd.MM.yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RentalList;
