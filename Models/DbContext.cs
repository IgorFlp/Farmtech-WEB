using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace Farmtech_WEB.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Defina as tabelas do banco de dados como DbSet<>
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Venda> Vendas { get; set; }
        public DbSet<VendaProdutos> VendaProdutos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Cliente>().ToTable("Tb_cliente");
            modelBuilder.Entity<Produto>().ToTable("Tb_produto");
            modelBuilder.Entity<VendaProdutos>().ToTable("Tb_ven_produtos");

            //VENDER
            modelBuilder.Entity<Venda>().ToTable("Tb_venda");
            // Configura a precisão e escala para os campos decimal na entidade Venda
            modelBuilder.Entity<Venda>(entity =>
            {
                entity.Property(e => e.ClCpf).HasColumnName("cl_cpf");
                entity.Property(e => e.Cupom).HasColumnName("cupom");
                entity.Property(e => e.Desconto).HasColumnName("desconto");
                entity.Property(e => e.DtVenda).HasColumnName("dtVenda");
                entity.Property(e => e.Entrega).HasColumnName("entrega");
                entity.Property(e => e.Frete).HasColumnName("frete");
                entity.Property(e => e.MtdPagto).HasColumnName("mtdPagto");
                entity.Property(e => e.Subtotal).HasColumnName("subtotal");
                entity.Property(e => e.Total).HasColumnName("total");
                entity.Property(e => e.UserId).HasColumnName("usr_id");

                entity.Property(e => e.Subtotal).HasColumnType("decimal(6,2)");
                entity.Property(e => e.Frete).HasColumnType("decimal(6,2)");
                entity.Property(e => e.Desconto).HasColumnType("decimal(6,2)");
                entity.Property(e => e.Total).HasColumnType("decimal(6,2)");
            });

            // Adicione outras configurações de modelo aqui, se necessário
        }
    }
}
