import { Table } from "@/common/components/custom-table";

interface TransactionsTableProps {
  data: any[];
  columns: any;
  loading: boolean;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  columns,
  data,
  loading,
}) => {
  return (
    <div className="">
      <Table columns={columns} data={data} loading={loading} />
    </div>
  );
};
