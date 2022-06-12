import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
  const [queries, setQueries] = useState({});
  const { search } = useLocation();

  //Porque react me marca error si no uso useCallback si se supone que es para que la funcion no cambie cuando se renderice?
  const getQueries = useCallback((query) => {
    const queryObj = {},
      splitString = query.substring(1).split("&");
    splitString.forEach((query) => {
      const [key, value] = query.split("=");
      queryObj[key] = value;
    });
    setQueries(queryObj);
  }, []);
  //Este useEffect se ejecuta cada vez que el query cambia.
  useEffect(() => {
    if (search.trim()) {
      getQueries(search);
    }
    //Porque tiene como dependencia getQueries??
  }, [getQueries, search]);
  return queries;
}
