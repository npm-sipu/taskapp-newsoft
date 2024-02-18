"use client";

import { PostsColumn } from "@/columns/postsColumns";
import useCustomTableSkeleton from "@/hooks/useCustomTableSkeleton";
import { useQueryHandler } from "@/hooks/useQueryHandler";
import { postsData } from "@/lib/baseApi";
import CustomTable from "@/tables/CustomTable";

export default function Home() {
  const { data, isLoading, isError } = useQueryHandler(["posts"], postsData);

  console.log(data);

  const { tableColumns, tableData } = useCustomTableSkeleton(
    data,
    PostsColumn(),
    false
  );
  return (
    <main className=''>
      <div className='py-4 px-3 bg-white mt-6 rounded-md shadow-[0px_0px_5px_0px_rgba(16,104,178,0.30)] mb-10'>
        <CustomTable
          title='Top Sellers'
          columns={tableColumns}
          data={tableData}
          showAdditionalFilters={true}
          searchProps={{
            placeholder: "Search",
          }}
          isLoading={false}
          showSearchMenu={true}
          showPagination={true}
        />
      </div>
    </main>
  );
}
