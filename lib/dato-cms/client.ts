import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_DATOCMS_API_URL || 'https://graphql.datocms.com';
const token = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;

// Mode mock activé si le token n'est pas défini
export const isMockMode = !token;

// Créer le client seulement si le token est défini
export const datoCmsClient = token
  ? new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  : null; // Retourne null si le token n'est pas défini pour éviter l'erreur
