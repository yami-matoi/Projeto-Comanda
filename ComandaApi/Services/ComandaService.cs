using ComandaApi.Data;
using ComandaApi.DTOs;
using ComandaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ComandaApi.Services
{
    public class ComandaService
    {
        private readonly AppDbContext _context;

        public ComandaService(AppDbContext context)
        {
            _context = context;
        }

        public List<Comanda> Listar()
        {
            return _context.Comandas
                .Include(c => c.Itens)
                .ThenInclude(ci => ci.Item)
                .ToList();
        }

        public Comanda? Buscar(int id)
        {
            return _context.Comandas
                .Include(c => c.Itens)
                .ThenInclude(ci => ci.Item)
                .FirstOrDefault(c => c.Id == id);
        }

        public Comanda Criar(ComandaDTO dto)
        {
            var novaComanda = new Comanda
            {
                DataCriacao = DateTime.Now,
                Itens = dto.Itens.Select(i => new ComandaItem
                {
                    ItemId = i.ItemId,
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario
                }).ToList()
            };

            _context.Comandas.Add(novaComanda);
            _context.SaveChanges();
            return novaComanda;
        }

        public bool Remover(int id)
        {
            var comanda = _context.Comandas.Find(id);
            if (comanda == null) return false;

            _context.Comandas.Remove(comanda);
            _context.SaveChanges();
            return true;
        }
    }
}
