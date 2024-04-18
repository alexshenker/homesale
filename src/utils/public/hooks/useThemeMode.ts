import { useQuery, useQueryClient } from "@tanstack/react-query";
import getThemeMode from "../getThemeMode";

export const queryKey = "themeMode";

export const useInvalidateThemeMode = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: [queryKey] });
};

const useThemeMode = () => {
  const { data } = useQuery({ queryKey: [queryKey], queryFn: getThemeMode });

  return data;
};

export default useThemeMode;
