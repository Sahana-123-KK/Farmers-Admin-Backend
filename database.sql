CREATE DATABASE farmers;

CREATE TABLE farmersdata(
f_id SERIAL PRIMARY KEY,
address VARCHAR(255),
name VARCHAR(60),
variety VARCHAR(100),
datetime VARCHAR(30),
vno VARCHAR(30)
);