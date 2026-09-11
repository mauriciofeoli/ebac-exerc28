import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000/graphql';
const username = __ENV.API_USERNAME || 'admin';
const password = __ENV.API_PASSWORD || 'admin';

export const options = {
  scenarios: {
    customers: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

const headers = { 'Content-Type': 'application/json' };

export function setup() {
  const response = http.post(baseUrl, JSON.stringify({
    query: `mutation Login($username: String!, $password: String!) {
      login(credentials: { username: $username, password: $password }) { accessToken }
    }`,
    variables: { username, password },
  }), { headers });

  check(response, { 'login de clientes retornou 200': (result) => result.status === 200 });
  return response.json('data.login.accessToken');
}

export default function (token) {
  const response = http.post(baseUrl, JSON.stringify({
    query: `query Customers {
      customers(take: 20) { id firstName lastName email }
    }`,
  }), { headers: { ...headers, Authorization: `Bearer ${token}` } });

  check(response, {
    'clientes retornou 200': (result) => result.status === 200,
    'clientes sem erros GraphQL': (result) => !result.json('errors'),
  });
}