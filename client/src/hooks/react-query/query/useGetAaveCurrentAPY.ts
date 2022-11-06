import { useQuery, useQueryClient } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `https://api.thegraph.com/subgraphs/name/messari/aave-v2-polygon-extended`;

const graphQLClient = new GraphQLClient(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useGetAaveCurrentAPY = (tokenAddresses: string[]) => {
  return useQuery(["allShortcuts"], async () => {
    let len = tokenAddresses.length;
    let markets = [];
    for (let i = 0; i < len; i += 1) {
      const { market } = await graphQLClient.request(gql`
      query {
        market (id: ${tokenAddresses[i].toLowerCase()}) {
          id
          name
          inputToken {
            id
            symbol 
            decimals
          }
          rates {
            rate
            side
            type
          }
        }
      }
    `);

      markets.push(market);
    }
    return markets;
  });
};
