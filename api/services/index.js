const PessoasServices = require('./PessoasServices')
const TurmasServices = require('./TurmasServices')
const NiveisServices = require('./NiveisServices')

// este arquivo é o ponto de entrada (entrypoint) chamado index
// que só chama os arquivos correspondente 

module.exports = {
    PessoasServices: PessoasServices,
    TurmasServices: TurmasServices,
    NiveisServices: NiveisServices
}