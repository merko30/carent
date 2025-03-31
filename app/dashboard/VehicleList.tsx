import { Pencil } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Vehicle } from "@/types";

const VehicleList = ({ vehicles }: { vehicles: Vehicle[] }) => (
  <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
    <table className="w-full">
      <thead className="w-full">
        <tr className="w-full text-left">
          <th className="p-4">Marka</th>
          <th>Model</th>
          <th>Cijena</th>
          <th>
            <span className="sr-only">Uredi</span>
          </th>
        </tr>
      </thead>
      <tbody className="w-full">
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id} className="w-full odd:bg-gray-100">
            <td className="p-4">{vehicle.brand.name}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.price}</td>
            <td>
              <Link href={`/vehicles/${vehicle.id}/edit`}>
                <Pencil size={24} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VehicleList;
