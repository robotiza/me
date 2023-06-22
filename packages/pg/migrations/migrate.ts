import knex from "knex";
import knexConfig from "../knexfile";

const environment = 'development';
const knexInstance = knex(knexConfig[environment]);

knexInstance.migrate.latest().then(function () {
    console.log('Migrations run successfully');
    // You can continue your application logic here
}).catch(function (error) {
    console.error('Error running migrations:', error);
});