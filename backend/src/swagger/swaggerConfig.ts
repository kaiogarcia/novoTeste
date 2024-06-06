import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentação',
      version: '1.0.0',
      description: 'Documentação automática da API',
    },
    servers: [
      {
        url: 'http://localhost:4000' // Servidor HTTP
      },
    ],
    tags: [
      {
        name: 'Desenvolvedores',
        description: 'Operações relacionadas a desenvolvedores',
      },
      {
        name: 'Níveis',
        description: 'Operações relacionadas a níveis',
      },
    ],
    components: {
      schemas: {
        Developer: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            sexo: { type: 'string' },
            data_nascimento: { type: 'string', format: 'date' },
            idade: { type: 'number' },
            hobby: { type: 'string' },
            // Adicione mais propriedades conforme necessário
          },
        },
        Nivel: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nivel: { type: 'string' },
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // Se for um JWT token
        }
        // Adicione outros esquemas de segurança conforme necessário
      }
    },
    paths: {
      '/api/desenvolvedores': {
        get: {
          tags: ['Desenvolvedores'],
          summary: 'Retorna a lista de desenvolvedores existentes',
          responses: {
            200: {
              description: 'Resposta bem-sucedida',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Developer',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Desenvolvedores'],
          summary: 'Cria um novo desenvolvedor',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Developer',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Desenvolvedor criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Developer',
                  },
                },
              },
            },
          },
        },
      },
      '/api/niveis': {
        get: {
          tags: ['Níveis'],
          summary: 'Retorna a lista de níveis existentes',
          responses: {
            200: {
              description: 'Resposta bem-sucedida',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Nivel',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Níveis'],
          summary: 'Cria um novo nível',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Nivel',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Nível criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Nivel',
                  },
                },
              },
            },
          },
        },
      },
      '/api/desenvolvedores/{id}': {
        put: {
          tags: ['Desenvolvedores'],
          summary: 'Atualiza um desenvolvedor existente',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do desenvolvedor a ser atualizado',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Developer',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Desenvolvedor atualizado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Developer',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Desenvolvedores'],
          summary: 'Remove um desenvolvedor existente',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do desenvolvedor a ser removido',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            200: {
              description: 'Desenvolvedor removido com sucesso',
            },
          },
        },
      },
      '/api/niveis/{id}': {
        put: {
          tags: ['Níveis'],
          summary: 'Atualiza um nível existente',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do nível a ser atualizado',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Nivel',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Nível atualizado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Nivel',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Níveis'],
          summary: 'Remove um nível existente',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do nível a ser removido',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            200: {
              description: 'Nível removido com sucesso',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.ts'] // ou './routes/*.js' se forem arquivos JavaScript
};

export default swaggerJsdoc(options);
