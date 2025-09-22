import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { NeuralNetwork } from './functions/NeuralNetwork/resources';

defineBackend({
  auth,
  data,
  // NeuralNetwork,
});
