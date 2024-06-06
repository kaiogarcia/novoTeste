"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removerNivel = exports.updateNivel = exports.createNivel = exports.getAllNiveis = void 0;
const nivelModel = __importStar(require("../../../backend/src/models/nivelModel"));
const getAllNiveis = async (searchTerm) => {
    try {
        const niveis = await nivelModel.getAllNiveis();
        return niveis;
    }
    catch (error) {
        throw new Error('Erro ao buscar níveis: ' + error.message);
    }
};
exports.getAllNiveis = getAllNiveis;
const createNivel = async (nivelData) => {
    try {
        const novoNivel = await nivelModel.createNivel(nivelData.nivel);
        return novoNivel;
    }
    catch (error) {
        throw new Error('Erro ao criar nível: ' + error.message);
    }
};
exports.createNivel = createNivel;
const updateNivel = async (id, nivelData) => {
    try {
        const nivelAtualizado = await nivelModel.updateNivel(id, nivelData.nivel);
        return nivelAtualizado;
    }
    catch (error) {
        throw new Error('Erro ao atualizar nível: ' + error.message);
    }
};
exports.updateNivel = updateNivel;
const removerNivel = async (id) => {
    try {
        const nivelRemovido = await nivelModel.deleteNivel(id);
        return nivelRemovido;
    }
    catch (error) {
        throw new Error('Erro ao remover nível: ' + error.message);
    }
};
exports.removerNivel = removerNivel;
