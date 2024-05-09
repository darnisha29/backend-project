import { DataSource } from "typeorm";
import { Product } from "../entity/product";

interface MSSQLConfig {
  server: string;
  port: number;
  database: string;
  options: {
    trustedConnection?: boolean;
    encrypt?: boolean;
    enableArithAbort?: boolean;
    trustServerCertificate?: boolean;
  };
}


export const mssqlConfig: MSSQLConfig = {
  server:  'LAPTOP-40LICU46', 
  port: 1433, 
  database: 'metaInfo', 
  options: {
    trustedConnection: true,
    encrypt: true, 
    enableArithAbort: true, 
    trustServerCertificate: true, 
  },
};

export const AppDataSource = new DataSource({
  ...mssqlConfig,
  username:'sa',
  password:'123456', 
  type: "mssql",
  host:'localhost', 
  entities: [Product], 
  synchronize: false, 
  logging: true, 
  migrationsTableName: "Migration_table", 
  migrations: ["src/migrations/*{.ts,.js}"], 
});



