const getUsers = {
    tags: ['Users'],
    description: "Returns all users from the system that the user has access to",
    operationId: 'getUsers',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A list of users.",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            id: {
                                type: 'numeric',
                                description: 'Id Email'
                            },
                            email: {
                                type: 'string',
                                description: 'Email'
                            }
                        }
                    }
                }
            }
        }
    }
} 
const postUsers = {
    tags: ['Users'],
    description: "Add email into the user table",
    operationId: 'postUsers',
    consumes:[
        "application/json"
     ],
     produces:[
        "application/json"
     ],
    parameters: [
        {
          in: "body", 
          name: "body", 
          required: false,
          schema: {
            $ref: "#/components/schemas/user" 
          },
          description: "Adding a user", 
        },
      ],
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A user has been added.",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            id: {
                                type: 'numeric',
                                description: 'Id Email'
                            },
                            email: {
                                type: 'string',
                                description: 'Email'
                            }
                        }
                    }
                }
            }
        }
    }   
}

const swaggerDocument =  {
    definition: {
    swagger: "2.0",
    info: {
        title: "Web-API-PG Express API with Swagger",
        version: "0.1.0",
        description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
        name: "Web API PG Example",
        url: "https://tec.mx",
        email: "info@tec.mx",
        },
    },
    servers: [
        {
        url: "http://localhost:3000",
        description: "Web-API-PG Express API",
            variables: {
                env: {
                    default: "app-dev",
                    description: "DEV Environment"
                },
                port: {
                    enum: [
                        "8443",
                        "3000",
                        "443"
                    ],
                    default: "3000"
                },
                basePath: {
                    default: "v1"
                }
            }
        },
    ],
    tags: [
        {
            name: 'Users'
        }
    ],
    paths: {
        "/users": {
            "get": getUsers
        },
        "/users/add": {
            "post": postUsers
        }
    },
    components :{
        schemas:{
                user : {
                    required:[
                        "email"
                    ],
                    properties:{
                        email:{
                        type:"string"
                        }
                }
            }
        }
    },
    },
    
    apis: ["./routes/users.js"],
};
module.exports = { swaggerDocument };