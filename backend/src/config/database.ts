import { DataSource } from "typeorm";
import { Company } from "../entities/company.entity";
import { Product } from "../entities/product.entity";
import { Employee } from "../entities/employee.entity";

// interface MSSQLConfig {
  
//   server: string;
//   port: number;
//   database: string;
//   options: {
//     trustedConnection?: boolean;
//     encrypt?: boolean;
//     enableArithAbort?: boolean;
//     trustServerCertificate?: boolean;
//   };
// }


export const mssqlConfig = {
  user:'sa',
  password:'Mayur@3',
  server: 'LAPTOP-NQTC30NN',
  port: 1433,
  database: 'company',
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

export const AppDataSource = new DataSource({
  ...mssqlConfig,
  type: "mssql",
  username: 'sa',
  password: 'Mayur@3',
  host: 'localhost',
  entities: [Company,Product,Employee],
  synchronize: false,
  logging: true,
  migrations: ["src/migrations/*{.ts,.js}"],
});



