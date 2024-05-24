import { Table } from "@/common/components/custom-table";

interface RecentTransactionTableProps {
  data: any[];
  loading: boolean;
  column: any;
}

export const RecentTransactionTable: React.FC<RecentTransactionTableProps> = ({
  column,
  data,
  loading,
}) => {
  return (
    <div className="">
      <Table columns={column} data={data} loading={loading} />
    </div>
  );
};
