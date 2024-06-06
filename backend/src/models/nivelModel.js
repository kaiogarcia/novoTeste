"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNivel = exports.updateNivel = exports.createNivel = exports.getAllNiveis = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllNiveis = async (searchTerm) => {
    try {
        let niveis;
        if (searchTerm) {
            // Se houver um termo de pesquisa, filtre os níveis com base nele
            niveis = await prisma.nivel.findMany({
                where: {
                    // Adicione as condições de filtro conforme necessário
                    nivel: searchTerm
                }
            });
        }
        else {
            // Se não houver termo de pesquisa, retorne todos os níveis
            niveis = await prisma.nivel.findMany();
        }
        return niveis;
    }
    catch (error) {
        throw new Error('Erro ao buscar níveis: ' + error.message);
    }
};
exports.getAllNiveis = getAllNiveis;
const createNivel = async (nivel) => {
    const novoNivel = await prisma.nivel.create({
        data: { nivel },
    });
    return {
        id: novoNivel.id,
        nivel: novoNivel.nivel,
    };
};
exports.createNivel = createNivel;
const updateNivel = async (id, nivel) => {
    const nivelAtualizado = await prisma.nivel.update({
        where: { id },
        data: { nivel },
    });
    return {
        id: nivelAtualizado.id,
        nivel: nivelAtualizado.nivel,
    };
};
exports.updateNivel = updateNivel;
const deleteNivel = async (id) => {
    // Verifique se há desenvolvedores associados a este nível
    const developersCount = await prisma.developer.count({
        where: { nivel_id: id },
    });
    if (developersCount > 0) {
        throw new Error('Existem desenvolvedores associados a este nível');
    }
    // Use a função 'delete' do Prisma Client para excluir um nível
    await prisma.nivel.delete({ where: { id } });
};
exports.deleteNivel = deleteNivel;
