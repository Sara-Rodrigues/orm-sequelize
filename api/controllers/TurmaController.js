const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
            const todasAsTurmas = await database.Turmas.findAll({ where })
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params
        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } })
            const turmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} deletado` })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = TurmaController