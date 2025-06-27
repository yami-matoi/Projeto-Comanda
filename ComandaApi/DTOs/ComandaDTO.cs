// DTOs/ComandaDTO.cs
public class ComandaDTO
{
    public List<ItemDTO> Itens { get; set; } = new();
}

public class ItemDTO
{
    public int ItemId { get; set; }
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }
}
