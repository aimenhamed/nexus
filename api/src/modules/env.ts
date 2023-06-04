import { envsafe, port, str } from "envsafe";

export const env = envsafe({
  PORT: port({
    default: 8080,
  }),
  DB_USER: str({
    devDefault: "postgres",
  }),
  DB_PASSWORD: str({
    devDefault: "password",
  }),
  DB_HOST: str({
    devDefault: "0.0.0.0",
  }),
  DB_NAME: str({
    devDefault: "mydb",
  }),
});
