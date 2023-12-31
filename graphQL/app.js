const express = require('express');
const port = 8600;
const app = express;
const axios = require('axios');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
