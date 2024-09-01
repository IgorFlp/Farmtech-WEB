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
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        // Exemplo:
        public class Cliente
        {
            public int Id { get; set; }
            public string Nome { get; set; }
        }
    }
}
