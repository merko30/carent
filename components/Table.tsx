import { twMerge } from "tailwind-merge";

const Row = ({
  children,
  isHeadRow,
  className,
}: {
  children: React.ReactNode;
  isHeadRow?: boolean;
  className?: string;
}) => (
  <tr
    className={twMerge(
      "w-full",
      isHeadRow ? "bg-gray-200" : "odd:bg-gray-100",
      className
    )}
  >
    {children}
  </tr>
);

const Cell = ({
  children,
  isHeadCell,
  className,
}: {
  children: React.ReactNode;
  isHeadCell?: boolean;
  className?: string;
}) => (
  <td
    className={twMerge(
      "p-4 text-left",
      isHeadCell ? "font-medium" : "text-gray-700",
      className
    )}
  >
    {children}
  </td>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
    <table className="w-full">{children}</table>
  </div>
);

Table.Row = Row;
Table.Cell = Cell;

export default Table;
