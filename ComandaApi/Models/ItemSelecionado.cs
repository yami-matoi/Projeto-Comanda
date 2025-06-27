namespace ComandaApi.Models
{
    public class ItemSelecionado
{
    public Item Item { get; set; } = new(); // 🔒 evita warning
    public int Quantidade { get; set; }
}

}
