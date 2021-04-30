const { TurmasServices } = require('../services')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const turmasService = new TurmasServices()

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query
        const where = {}
            // Primeiro if verifica se existe algum desses dois objetos e se existir vou no obj where
            // criando uma propriedade chamada data_inicio (q é nome da coluna) 
            // igual a outro obj vazio e se não tiver nada null
        data_inicial || data_final ? where.data_inicio = {} : null
            // agora levando os dados que vamos receber pra dentro do obj 
            // e se for true p/ pra dentro de where
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            // mesma coisa com o data_final
        data_final ? where.data_inicio[Op.lte] = data_final : null
        try {
            const todasAsTurmas = await turmasService.pegaTodosOsRegistros(where)
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurma(req, res) {
        const { id } = req.params
        try {
            const turma = await turmasService.pegaUmRegistro({ id })
            return res.status(200).json(turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await turmasService.criaRegistro(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await turmasService.atualizaRegistro(novasInfos, id)
            return res.status(200).json({ mensagem: `id ${id} atualizado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params
        try {
            await turmasService.apagaRegistro(id)
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
            await turmasService.restauraRegistro(id)
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = TurmaController