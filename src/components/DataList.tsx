import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";

import { DataItem } from "../types";
import { getFriendlyKey } from "../utils";
import ListItem from "./ListItem";

function DataList() {
  const [data, setData] = useState<DataItem[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("asc");

  const getData = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(`/api/data?sort=${sortBy}`, {
      headers: { responseType: "json" },
      method: "GET",
    });
    response.json().then((jsonResponse) => {
      setIsLoading(false);
      setData(jsonResponse.results);
    });
  }, [setData, sortBy]);

  useEffect(() => {
    getData();
    // Cleanup...
    return () => {
      setData([]);
    };
  }, [sortBy]);

  return (
    <DataContainer>
      <SortBy
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.currentTarget.value);
        }}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </SortBy>
      {data && !isLoading ? (
        <Data className="list-data">
          {data.map((item) => (
            <ListItem
              key={getFriendlyKey(item.title)}
              number={item.number}
              text={item.title}
              to={item.linkHref}
              arrowLocation={item.arrowLocation}
            />
          ))}
        </Data>
      ) : (
        <Loading className="loading">loading...</Loading>
      )}
    </DataContainer>
  );
}

export default DataList;

const SortBy = styled("select")({
  margin: "1rem auto",
});

const DataContainer = styled("div")({});

const Data = styled("div")({
  fontSize: "1.1rem",
});

const Loading = styled("p")({
  fontWeight: "bold",
});
