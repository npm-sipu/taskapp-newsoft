import { useQuery, type QueryFunction, type QueryKey } from "@tanstack/react-query";

import { TApiResponseSchema } from "@/schemas/common.schema";
import { TQueryResponse } from "@/types";

export const useQueryHandler = <TData, TError>(
	key: QueryKey,
	fetcher: QueryFunction<TQueryResponse<TData>>,
	options?: {}
) => {
	let { data, isLoading, isError, error, isSuccess, refetch } = useQuery<
		TQueryResponse<TData>,
		TError
	>(key, fetcher, {
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		...options,
	});
	let newError;
	if (isSuccess) {
		let body = data as TApiResponseSchema;
		if (body.header && body.header.status >= 400) {
			isError = true;
			isSuccess = false;
			newError = body;
		}
	}

	return { data, isLoading, isError, newError, isSuccess, refetch };
};
