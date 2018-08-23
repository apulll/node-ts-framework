import * as IORedis from 'ioredis';
import { RedisConfig } from '@c7s/config';
export declare class RedisConnectionFactory {
    protected config: RedisConfig;
    create(): IORedis.Redis;
}
