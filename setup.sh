#!/usr/bin/env bash
#
cp .env.example .env

# Install dependencies
npm install

# Install api dependencies
cd ./api
npm install

# Install client dependencies
cd ../client
npm install
cd ..


