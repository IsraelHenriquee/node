// Controller para gerenciar usuários
const userService = require('../services/userService');
const { validateUser } = require('../utils/validators');

const userController = {
  // Listar todos os usuários
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      next(error); // Passa o erro para o middleware de erro
    }
  },

  // Buscar usuário por ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  // Criar novo usuário
  async createUser(req, res, next) {
    try {
      // Validar dados
      const validation = validateUser(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: validation.errors
        });
      }

      const newUser = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  },

  // Atualizar usuário
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(parseInt(id), req.body);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  },

  // Deletar usuário
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUser(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
