import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';

export class Employee extends Model<InferAttributes<Employee>, InferCreationAttributes<Employee>> {
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    declare emp_id: string;

    @Attribute(DataTypes.STRING) 
    @NotNull
    declare satisfaction_level: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare last_evaluation: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare number_project: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare average_montly_hours: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare time_spend_company: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare work_accident: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare left: number;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare promotion_last_5years: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare department: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare salary: string;
}
