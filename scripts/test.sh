#!/bin/bash

# Run server tests
cd server
npm test

# Run client tests
cd ../client
npm test
