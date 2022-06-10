create table user (
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
    password VARCHAR(1500) NOT NULL,
    UNIQUE(email)
);


insert into user (name, email, password) values ('Dee', 'dee@gmail.com', 'dee');
insert into user (name, email, password) values ('Tee', 'tee@gmail.com', 'tee');
insert into user (name, email, password) values ('Mee', 'mee@gmail.com', 'mee');