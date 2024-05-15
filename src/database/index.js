import Sequelize from 'sequelize'

import User from '../app/models/User'

import configdatabase from '../config/database'

const models = [User]

class database {
    constructor(){
        this.init()
    }

    init() {
        this.connection = new Sequelize(configdatabase)
        models.map((model) => model.init(this.connection))
    }
}

export default new database()
