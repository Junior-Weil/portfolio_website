import React from 'react';
import { defineStorage } from '@aws-amplify/backend';

const NNBucket = process.env.NNBucket;
if (!NNBucket) {
  throw new Error('NNBucket environment variable is not defined');
}

export const storage = defineStorage({
  name: NNBucket
});
