CREATE DATABASE farmers;

CREATE TABLE farmersdata(
f_id SERIAL PRIMARY KEY,
address VARCHAR(255),
name VARCHAR(60),
variety VARCHAR(100),
datetime VARCHAR(30),
vno VARCHAR(30)
);


CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255)
);

CREATE TABLE varieties(
    v_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);