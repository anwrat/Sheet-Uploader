import { sequelize } from "../config/sequelize.js";
import { QueryTypes } from "@sequelize/core";

interface PgIndex {
  indexname: string;
  indexdef: string;
}

export async function dropEmployeeIndexes() {

  const [indexes] = await sequelize.query<PgIndex>(`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname='public'
    AND tablename='Employees'`,{type: QueryTypes.SELECT});

  console.log(indexes);

  await sequelize.query(`
    DROP INDEX IF EXISTS "${indexes!.indexname}";
  `);
}