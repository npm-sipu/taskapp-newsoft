// import { ColumnDef } from "@tanstack/react-table";
// import { Text } from "@/components/Common/Text";
// import { TCommonResponseSchema } from "@/schemas/common.schema";

// export const SellersOrdersColumn = (): ColumnDef<TCommonResponseSchema>[] => {
//   const TopSellersOrdersColumn: ColumnDef<TCommonResponseSchema>[] = [
//     {
//       header: () => (
//         <Text className='whitespace-nowrap !font-bold flex justify-center xl:w-16 w-28'>
//           Seller
//         </Text>
//       ),
//       accessorKey: "seller",
//       cell: ({ row }) => (
//         <Text className='flex justify-start '>{row.original.sellername}</Text>
//       ),
//     },
//     {
//       header: () => (
//         <Text className='whitespace-nowrap !font-bold flex justify-end '>
//           Total Orders
//         </Text>
//       ),
//       accessorKey: "totalorders",
//       cell: ({ row }) => (
//         <Text className='flex  w-24 justify-end mr-3'>
//           {row.original.totalorders}
//         </Text>
//       ),
//     },

//     {
//       header: () => (
//         <Text className=' !font-bold flex  w-24 justify-end'>Qty</Text>
//       ),
//       accessorKey: "qty",
//       cell: ({ row }) => (
//         <Text className='flex justify-end w-24'>{row.original.totalqty}</Text>
//       ),
//     },

//     {
//       header: () => (
//         <Text className='whitespace-nowrap !font-bold flex justify-end w-24'>
//           Revenue
//         </Text>
//       ),
//       accessorKey: "revenue",
//       cell: ({ row }) => (
//         <Text className='flex justify-end w-28'>
//           {row.original.totalrevenue}
//         </Text>
//       ),
//     },
//   ];

//   return TopSellersOrdersColumn;
// };

import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@/components/Common/Text";
import { TCommonResponseSchema } from "@/schemas/common.schema";

export const PostsColumn = (): ColumnDef<TCommonResponseSchema>[] => {
  const PostsDataColumn: ColumnDef<TCommonResponseSchema>[] = [
    {
      header: () => (
        <Text className='whitespace-nowrap !font-bold flex justify-center xl:w-16 w-28'>
          User ID
        </Text>
      ),
      accessorKey: "userId",
      cell: ({ row }) => (
        <Text className='flex justify-start '>{row.original.userId}</Text>
      ),
    },
    {
      header: () => (
        <Text className='whitespace-nowrap !font-bold flex justify-end '>
          Post ID
        </Text>
      ),
      accessorKey: "id",
      cell: ({ row }) => (
        <Text className='flex  w-24 justify-end mr-3'>{row.original.id}</Text>
      ),
    },

    {
      header: () => (
        <Text className=' !font-bold flex  w-24 justify-end'>Title</Text>
      ),
      accessorKey: "title",
      cell: ({ row }) => (
        <Text className='flex justify-end w-24'>{row.original.title}</Text>
      ),
    },

    {
      header: () => (
        <Text className='whitespace-nowrap !font-bold flex justify-end w-24'>
          Body
        </Text>
      ),
      accessorKey: "body",
      cell: ({ row }) => (
        <Text className='flex justify-end w-28'>{row.original.body}</Text>
      ),
    },
  ];

  return PostsDataColumn;
};
