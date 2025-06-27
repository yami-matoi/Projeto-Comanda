namespace ComandaApi.Models
{
    public class ComandaItem
    {
        public int Id { get; set; }

        public int ComandaId { get; set; }
        public Comanda Comanda { get; set; } = null!;

        public int ItemId { get; set; }
        public Item Item { get; set; } = null!;

        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
    }
}
