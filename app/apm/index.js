import { init as initApm } from '@elastic/apm-rum';

if (process.env.VUE_APP_ENVIRONMENT === 'development') {
  initApm({
    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName: 'birdwoot',

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl:
      'https://9e6f0234c8904621a9d66f6826a3e010.apm.us-east-1.aws.cloud.es.io:443',

    // Set the service version (required for source map feature)
    serviceVersion: process.env.VUE_APP_VERSION,

    // Set the service environment
    environment: process.env.VUE_APP_ENVIRONMENT,
  });
}
