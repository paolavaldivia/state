import {useSuspenseQuery} from "@tanstack/react-query";
import {getCharacters} from "./charactersClient.jsx";

export const useCharactersQuery = () => {
    return useSuspenseQuery({
        queryKey: ['characters'],
        queryFn: getCharacters,
    });
}