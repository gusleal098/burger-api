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
        this.connection = new Sequelize(
            'postgresql://postgres:UOKtMyPdedNDkUpkQEFAeSJKXKiKSlPE@monorail.proxy.rlwy.net:13335/railway'
        )
        models
        .map((model) => model.init(this.connection))
        .map(
            (model) => model.associate && model.associate(this.connection.models))
    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb://mongo:dJNILuyMbJFcxyJmzEHrzvjMoEoVFayw@monorail.proxy.rlwy.net:20928')
    }
}

export default new database()
