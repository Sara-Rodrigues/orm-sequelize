const Services = require('./Services')

// herdando do serviço principal
class PessoasServices extends Services {
    constructor() {
            super('Pessoas')
        }
        // métodos específicos do controlador de Pessoas
}

module.exports = PessoasServices