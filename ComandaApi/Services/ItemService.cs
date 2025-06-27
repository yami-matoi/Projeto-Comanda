using ComandaApi.Models;

namespace ComandaApi.Services
{
    public class ItemService
    {
        private static readonly List<Item> _itens = new();
        private static int _nextId = 1;

        public List<Item> ObterTodos() => _itens;

        public Item Criar(Item item)
        {
            item.Id = _nextId++;
            _itens.Add(item);
            return item;
        }

        public Item? Buscar(int id) => _itens.FirstOrDefault(i => i.Id == id);

        public bool Remover(int id)
        {
            var item = Buscar(id);
            return item != null && _itens.Remove(item);
        }

        public bool Atualizar(int id, Item atualizado)
        {
            var existente = Buscar(id);
            if (existente == null) return false;

            existente.Nome = atualizado.Nome;
            existente.Preco = atualizado.Preco;
            return true;
        }
    }
}
