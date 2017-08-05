CREATE DATABASE mygaslog;

USE mygaslog;

CREATE TABLE gaslog (
  ID int NOT NULL AUTO_INCREMENT,
  createdate DATETIME NOT NULL DEFAULT(GETDATE()),
  pmileage int NOT NULL,
  cmileage int NOT NULL,
  gallons int NOT NULL,
  price double(10,2) NOT NULL,
  mpg int NOT NULL,
  total double(10,2) NOT NULL
);

-- CREATE TABLE user (
--   ID int NOT NULL AUTO_INCREMENT,
--   username VARCHAR(25) NOT NULL,
--   fname VARCHAR(20) NOT NULL,
--   lname VARCHAR(25) NOT NULL,
--   password VARCHAR(25) NOT NULL
-- );

-- CREATE TABLE user_gaslog (
--   ID int NOT NULL AUTO_INCREMENT,
--   userID int NOT NULL,
--   gaslogID int NOT NULL,
--   PRIMARY KEY (ID),
--   FOREIGN KEY (userID) REFERENCES user (ID),
--   FOREIGN KEY (gaslogID) REFERENCES gaslog (ID)
-- );