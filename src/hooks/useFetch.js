import useSWR from 'swr';
import API from '../services/API';

export function useFetch(url = '') {
    const {data, error, mutate} = useSWR(url, async (url) => {
        const response = await API.get(url);
        return response.data;
    });

    return {data, error, mutate};
}