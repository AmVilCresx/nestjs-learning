import { ConfigObject } from '@nestjs/config';
import { readFileSync } from 'fs';

import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';
import * as Joi from 'joi';

const YAML_COMMON_CONFIG_FILENAME = 'config.yaml';
const fileCommonPath = join(
  __dirname,
  'common/config',
  YAML_COMMON_CONFIG_FILENAME,
);
const commonConfig = yaml.load(readFileSync(fileCommonPath, 'utf-8'));

const envFilePath = join(
  __dirname,
  'common/config',
  `config.${process.env.NODE_ENV || `development`}.yaml`,
);
const envConfig = yaml.load(readFileSync(envFilePath, 'utf-8'));

const configSchema = Joi.object({
  db: Joi.object({
    type: Joi.string().required(),
    port: Joi.number().default(3306),
    host: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
    username: Joi.string().required(),
    password: Joi.string().required()
  }).required(),
}).required();

export default (): ConfigObject => {
  const config = _.merge(commonConfig, envConfig);
  const { error, value } = configSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (error) {
    console.error('配置验证失败详情:');
    error.details.forEach((detail) => {
      console.error(`- ${detail.path.join('.')}: ${detail.message}`);
    });
    throw new Error('配置验证失败');
  }
  return value as ConfigObject;
};
