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
exports.deleteDeveloper = exports.updateDeveloper = exports.createDeveloper = exports.getAllDevelopers = void 0;
const developerModel = __importStar(require("../../../backend/src/models/developerModel"));
const getAllDevelopers = async () => {
    return developerModel.getAllDevelopers();
};
exports.getAllDevelopers = getAllDevelopers;
const createDeveloper = async (developerData) => {
    try {
        const { nivel_id, nome, sexo, data_nascimento, hobby } = developerData;
        const idade = new Date().getFullYear() - new Date(data_nascimento).getFullYear();
        return await developerModel.createDeveloper({ nome, nivel_id, sexo, data_nascimento, idade, hobby });
    }
    catch (error) {
        console.error('Erro ao criar desenvolvedor no serviço:', error);
        throw error; // Propague o erro para que o controlador possa lidar com ele adequadamente
    }
};
exports.createDeveloper = createDeveloper;
const updateDeveloper = async (id, developerData) => {
    const { nome, nivel_id, sexo, data_nascimento, hobby } = developerData;
    let idadeCalculada;
    if (data_nascimento) {
        const birthDate = new Date(data_nascimento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        idadeCalculada = age;
    }
    return developerModel.updateDeveloper(id, { nome, nivel_id, sexo, data_nascimento, hobby, idade: idadeCalculada });
};
exports.updateDeveloper = updateDeveloper;
const deleteDeveloper = async (id) => {
    return developerModel.deleteDeveloper(id);
};
exports.deleteDeveloper = deleteDeveloper;
