"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeveloper = exports.updateDeveloper = exports.createDeveloper = exports.getAllDevelopers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllDevelopers = async () => {
    return prisma.developer.findMany({
        include: {
            nivel: true,
        },
    });
};
exports.getAllDevelopers = getAllDevelopers;
const createDeveloper = async (developerData) => {
    try {
        const { nivel_id, nome, sexo, data_nascimento, idade, hobby } = developerData;
        return await prisma.developer.create({
            data: {
                nivel_id,
                nome,
                sexo,
                data_nascimento: new Date(data_nascimento),
                idade,
                hobby,
            },
        });
    }
    catch (error) {
        console.error('Erro ao criar desenvolvedor no modelo:', error);
        throw error; // Propague o erro para que o serviço possa lidar com ele adequadamente
    }
};
exports.createDeveloper = createDeveloper;
const updateDeveloper = async (id, developerData) => {
    const { nome, nivel_id, sexo, data_nascimento, hobby, idade } = developerData;
    return prisma.developer.update({
        where: { id },
        data: {
            nome,
            nivel_id,
            sexo,
            data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
            hobby,
            idade,
        },
    });
};
exports.updateDeveloper = updateDeveloper;
const deleteDeveloper = async (id) => {
    await prisma.developer.delete({
        where: { id },
    });
};
exports.deleteDeveloper = deleteDeveloper;
