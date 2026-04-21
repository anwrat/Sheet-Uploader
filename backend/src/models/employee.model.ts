import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey } from '@sequelize/core/decorators-legacy';

export class Employee extends Model<InferAttributes<Employee>, InferCreationAttributes<Employee>> {
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    declare emp_id: string;

    @Attribute(DataTypes.STRING) 
    declare satisfaction_level: string;

    @Attribute(DataTypes.STRING)
    declare last_evaluation: string;

    @Attribute(DataTypes.INTEGER)
    declare number_project: number;

    @Attribute(DataTypes.INTEGER)
    declare average_montly_hours: number;

    @Attribute(DataTypes.INTEGER)
    declare time_spend_company: number;

    @Attribute(DataTypes.INTEGER)
    declare Work_accident: number;

    @Attribute(DataTypes.INTEGER)
    declare left: number;

    @Attribute(DataTypes.INTEGER)
    declare promotion_last_5years: number;

    @Attribute(DataTypes.STRING)
    declare Department: string;

    @Attribute(DataTypes.STRING)
    declare salary: string;
}
