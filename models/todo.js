module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'todos',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.STRING,
      status: DataTypes.STRING, // 任务状态
      progress: DataTypes.FLOAT, // 完成进度
      start_at: DataTypes.DATE,
      due_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      tableName: 'todos'
    }
  )
