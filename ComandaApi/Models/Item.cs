namespace ComandaApi.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }

        public ICollection<ComandaItem> ComandaItens { get; set; } = new List<ComandaItem>();
    }
}
