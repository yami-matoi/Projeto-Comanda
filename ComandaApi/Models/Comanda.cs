namespace ComandaApi.Models
{
    public class Comanda
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.Now;

        public ICollection<ComandaItem> Itens { get; set; } = new List<ComandaItem>();
    }
}
