import * as dotenv from "dotenv";
import * as path from "path";
import * as Joi from "joi";

interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  DATA_BASE_URL: string;
}

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema: Joi.ObjectSchema<EnvVars> = Joi.object<EnvVars>()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DATA_BASE_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.DATA_BASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
