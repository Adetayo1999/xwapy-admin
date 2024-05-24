import { Table } from "@/common/components/custom-table";

interface UsersTableProps {
  columns: any;
  data: any[];
  loading: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({
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
