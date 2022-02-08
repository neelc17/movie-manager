create user 'admin'@'%' identified with mysql_native_password by 'password';
grant all privileges on moviemaker.* to 'admin'@'%';
flush privileges;

create table if not exists Movies (
  id int auto_increment primary key,
  title varchar(255),
  runtime int,
  year varchar(255),
);

create table if not exists Countries (
  id int auto_increment primary key,
  name varchar(255)
);
create table if not exists MovieCountry (
  id int auto_increment primary key,
  movieid int,
  countryid int
);

create table if not exists Genres (
  id int auto_increment primary key,
  name varchar(255)
);
create table if not exists MovieGenre (
  id int auto_increment primary key,
  movieid int,
  countryid int
);

create table if not exists DistComps (
  id int auto_increment primary key,
  name varchar(255)
);
create table if not exists MovieDist (
  id int auto_increment primary key,
  movieid int,
  distid int
);

create table if not exists ProdComps (
  id int auto_increment primary key,
  name varchar(255)
);
create table if not exists MovieProd (
  id int auto_increment primary key,
  movieid int,
  prodid int
);

create table if not exists Directors (
  id int auto_increment primary key,
  name varchar(255)
);
create table if not exists MovieDirector (
  id int auto_increment primary key,
  movieid int,
  directorid int
);

create table if not exists Users (
  id int auto_increment primary key,
  uid varchar(255) unique,
);
create table if not exists UserMovie (
  id int auto_increment primary key,
  userid int,
  movieid int,
  dates json,
  erate int,
  orate int
);