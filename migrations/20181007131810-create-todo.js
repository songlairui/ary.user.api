'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: Sequelize.STRING,
      status: Sequelize.STRING, // 任务状态
      progress: Sequelize.FLOAT, // 完成进度
      start_at: Sequelize.DATE,
      due_at: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
      // 其他，期望包含：子任务，跨过的里程碑
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos')
  }
}
