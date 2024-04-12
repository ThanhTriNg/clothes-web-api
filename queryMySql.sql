ALTER TABLE roles ADD INDEX (`code`);

ALTER TABLE users ADD FOREIGN KEY (`roleCode`) REFERENCES roles (`code`);