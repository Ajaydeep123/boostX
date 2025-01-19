import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');
const hashMapName =
  process.env.CLOUDFORMATIONSTATUSNAME || 'cloudformationStackStatus';

export async function CFStatusSetValue(key: string, value: string) {
  return await redis.hset(hashMapName, key, value);
}
export async function CFStatusGetValue(key: string) {
  return await redis.hget(hashMapName, key);
}
export async function CFStatusDeleteKey(key: string) {
  return await redis.hdel(hashMapName, key);
}
export async function CFStatusUpdateValue(key: string, value: string) {
  return await redis.hset(hashMapName, key, value);
}
