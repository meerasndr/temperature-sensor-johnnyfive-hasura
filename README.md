### Arduino temperature sensor + Johnnyfive + Hasura GraphQL

This is a simple project which uses a temperature sensor on an Arduino Uno board. The temperature is detected every 60 seconds and pushed to a Hasura GraphQL endpoint.

Hardware used:
- Arduino Uno
- LM35 temperature sensor
- Breadboard & Jumper wires

Software & Data management used:
- Johnny-Five
- Apollo GraphQL Client
- Hasura endpoint (Heroku + Postgres)

This is WIP. To-Dos / Questions:
- Host the entire Node+J5 script on a platform like Heroku, to enable it to run non-stop
- If the above is done, how will it communicate with the Arduino board?
- Visualize daily data using something like chartjs
