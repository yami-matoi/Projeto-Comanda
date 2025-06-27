using Microsoft.AspNetCore.Mvc;
using ComandaApi.Models;
using ComandaApi.Services;
using ComandaApi.DTOs;

namespace ComandaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComandasController : ControllerBase
    {
        private readonly ComandaService _service;

        public ComandasController(ComandaService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Comanda>> Get()
        {
            var comandas = _service.Listar();
            return Ok(comandas);
        }

        [HttpGet("{id}")]
        public ActionResult<Comanda> Get(int id)
        {
            var comanda = _service.Buscar(id);
            return comanda == null ? NotFound() : Ok(comanda);
        }

        [HttpPost]
        public ActionResult<Comanda> Post([FromBody] ComandaDTO dto)
        {
            var nova = _service.Criar(dto);
            return CreatedAtAction(nameof(Get), new { id = nova.Id }, nova);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return _service.Remover(id) ? NoContent() : NotFound();
        }
    }
}
