import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { gql, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import { RocketResponseType, RocketType } from "../types";
import { Card } from "antd";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

const Rocket: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const GET_ROCKET = gql`
    query Rocket{
        rocket(id: "${id}") {
        name
        type
        description
        mass {
            kg
        }
    }
    }          
`;
  const [rocket, setRocket] = useState<RocketType>();
  const [rocketExists, setRocketExists] = useState(true);
  const { data, loading, error } = useQuery<RocketResponseType>(GET_ROCKET, {
    client,
    onCompleted: () => {
      if (data?.rocket == null) setRocketExists(false);
      setRocket(data?.rocket);
    },
    onError: (error) => console.error(error.message),
  });
  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}</>;
  if (rocketExists) {
    return (
      <>
        <Card size="small" title={rocket?.name} style={{ width: 300 }}>
          <p>Type: {rocket?.type}</p>
          <p>Mass: {rocket?.mass.kg} kg</p>
          <p>Description: {rocket?.description}</p>
        </Card>
      </>
    );
  } else return <Navigate to="/" />;
};

export default Rocket;

