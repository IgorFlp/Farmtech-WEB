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
        public DbSet<Venda> Vendas { get; set; }
        public DbSet<VendaProdutos> VendaProdutos { get; set; }




    }
}
