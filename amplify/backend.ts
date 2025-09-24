import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { storage } from './storage/resource';
// import { NeuralNetwork } from './functions/NeuralNetwork/resources';

defineBackend({
  auth,
  data,
  // storage,

  // nndata-240925 bucket region - US East (Ohio) us-east-2
});
