import { TCommonResponseSchema } from '@/schemas/common.schema';
import axios from 'axios';
import { useQuery, type QueryFunction, type QueryKey } from "@tanstack/react-query";

const baseURL = 'https://jsonplaceholder.typicode.com/';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;

export const fetchData = async (url: string): Promise<TCommonResponseSchema> => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const postsData = async () => {
    try {
        const data = await fetchData("/posts")

        return data
    } catch (err) {
        console.log(err)
    }
}