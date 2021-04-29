
const database = require('../models');

class NivelController {

  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await database.Niveis.findAll();

      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmNivel(req, res) {
    const {id} = req.params;

    try{
      const umNivel = await database.Niveis.findOne({
          where: {
              id: Number(id)
          }
      })
      return res.status(200).json(umNivel);
    }catch(error){
      return res.status(500).json(error.message);
    }
  }

  static async criaNivel(req, res) {
    const novoNivel = req.body;

    try{
        const novaNivelCriada =  await database.Niveis.create(novoNivel);

        return res.status(200).json(novaNivelCriada);
    }catch(error){
        return res.status(500).json(error.message);
    }
  }

  static async atualizaNivel(req, res) {
    const {id} = req.params;
    const novosNiveis = req.body;

    try{
        await database.Niveis.update(novosNiveis, {
            where: {
                id: Number(id)
            }
        });

        const nivelAtualizada = await database.Niveis.findOne({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json(nivelAtualizada);
    }catch(error){
        return res.status(500).json(error.message);
    } 
  }

  static async apagaNivel(req, res) {
    const {id} = req.params;

    try{
        await database.Niveis.destroy({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: `id: ${id} deletado!`});
    }catch(error){
        return res.status(500).json(error.message);
    }
  }

}

module.exports = NivelController;