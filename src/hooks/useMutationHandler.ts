import { MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";

import { TApiResponseSchema } from "@/schemas/common.schema";
import { TMutateResponse } from "@/types";

export const useMutationHandler = <TData, TError, TVariables>(
	fetcher: MutationFunction<TMutateResponse<TData>, TVariables>,
	skipInvalidates: boolean,
	invalidators?: string[],
	removeQuery?: boolean
) => {
	const queryClient = useQueryClient();
	const { mutateAsync, mutate, data, isSuccess, isLoading, isError, error, reset } = useMutation<
		TMutateResponse<TData>,
		TError,
		TVariables
	>((values: TVariables) => fetcher(values), {
		onSuccess: async (data) => {
			let body = data as TApiResponseSchema;
			if (body && body.header) {
				const statusCode = body.header.status;
				if (statusCode >= 400) {
					throw body;
				} else {
					if (skipInvalidates) {
					} else {
						invalidators?.forEach(async (invalidator: string) => {
							if (removeQuery) {
								queryClient.removeQueries([invalidator]);
							} else {
								await queryClient.invalidateQueries([invalidator]);
							}
						});
					}
				}
			}
		},
	});

	return { mutateAsync, mutate, data, isSuccess, isLoading, isError, error, reset };
};
