import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import configdatabase from '../config/database'
import Product from '../app/models/Product'

import Category from '../app/models/Category'

const models = [User, Product, Category]

class database {
    constructor(){
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize(configdatabase)
        models
        .map((model) => model.init(this.connection))
        .map(
            (model) => model.associate && model.associate(this.connection.models))
    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/codeburguer')
    }
}

export default new database()
