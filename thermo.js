const { Board, Thermometer } = require("johnny-five");
const gql = require('graphql-tag');
const ApolloClient = require('apollo-boost').ApolloClient;
const fetch = require('cross-fetch/polyfill').fetch;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;

const board = new Board();
const client = new ApolloClient({
    link: createHttpLink({
        uri: [MY_HASURA_GRAPHQL_ENDPOINT],
        fetch: fetch
    }),
    cache: new InMemoryCache()
});

board.on("ready", () => {
  board.samplingInterval(5000);
  let temperature = new Thermometer(
    {
      controller: "LM35",
      pin: "A0",
      freq: 60000
      });
temperature.on("data", () => {
  const {celsius, fahrenheit, kelvin} = temperature;
    console.log("Thermometer");
    console.log("  celsius      : ", celsius);
    console.log("  fahrenheit   : ", fahrenheit);
    console.log("  kelvin       : ", kelvin);

    //GQL mutation stuff with ApolloClient
    client.mutate({
      mutation: gql`
        mutation insertTemperature($tempc: Int, $tempf: numeric, $tempk: numeric) {
        insert_schema1_daily_temperature(objects:
          {temp_celsius: $tempc, temp_fahrenheit: $tempf, temp_kelvin: $tempk}){
          affected_rows
        }
      }`,
      variables: {
        tempc: celsius,
        tempf: fahrenheit,
        tempk: kelvin
    }
  }).then(res => {
    console.log(res.data)
  })
//GQL stuff ends

  });
});
