import { AppDataSource } from "../config/database";
import { Product } from "../entity/product";

export const getMetaData = ( ) => {
    const entityMetadata = AppDataSource.getMetadata( Product);
    const schema: Record<string, string> = {};
    entityMetadata.columns.forEach((column) => {
      schema[column.propertyName] = column.type as string;
    });
    console.log(schema);
    return {msg:schema,code:200} 
}

