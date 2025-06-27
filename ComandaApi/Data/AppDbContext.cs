using ComandaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ComandaApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Item> Itens => Set<Item>();
        public DbSet<Comanda> Comandas => Set<Comanda>();
        public DbSet<ComandaItem> ComandaItens => Set<ComandaItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ComandaItem>()
                .HasOne(ci => ci.Comanda)
                .WithMany(c => c.Itens)
                .HasForeignKey(ci => ci.ComandaId);

            modelBuilder.Entity<ComandaItem>()
                .HasOne(ci => ci.Item)
                .WithMany(i => i.ComandaItens)
                .HasForeignKey(ci => ci.ItemId);
        }
    }
}
