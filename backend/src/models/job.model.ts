import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Default } from '@sequelize/core/decorators-legacy';

export class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    @NotNull
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare fileName: string;

    @Attribute(DataTypes.ENUM('processing', 'completed', 'failed')) 
    @Default('processing')
    @NotNull
    declare status: CreationOptional<string>;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    @NotNull
    declare totalRows: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    @NotNull
    declare processedRows: CreationOptional<number>;

    @Attribute(DataTypes.TEXT)
    declare errorMessage: CreationOptional<string>;

}
