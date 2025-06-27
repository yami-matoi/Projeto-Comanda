using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComandaApi.Models;
using ComandaApi.Data;

namespace ComandaApi.Controllers
{
    [ApiController]
    [Route("api/itens")]
    public class ItensController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItensController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> Listar()
        {
            return await _context.Itens.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> Buscar(int id)
        {
            var item = await _context.Itens.FindAsync(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<Item>> Criar(Item novoItem)
        {
            _context.Itens.Add(novoItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Buscar), new { id = novoItem.Id }, novoItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, Item atualizado)
        {
            var existente = await _context.Itens.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Nome = atualizado.Nome;
            existente.Preco = atualizado.Preco;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(int id)
        {
            var item = await _context.Itens.FindAsync(id);
            if (item == null) return NotFound();

            _context.Itens.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
