﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Configuration;
namespace Farmtech_WEB.Models
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }       

        // Defina as tabelas do banco de dados como DbSet<>
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<ClienteEndereco> ClienteEndereco { get; set; }

        public DbSet<Fornecedor> Fornecedor { get; set; }
        public DbSet<FornecedorEndereco> FornecedorEndereco { get; set; }

        public DbSet<Produto> Produto { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Venda> Vendas { get; set; }
        public DbSet<Cupom> Cupom {  get; set; }    
        public DbSet<VendaProdutos> VendaProdutos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Cliente>().ToTable("Tb_cliente");
            modelBuilder.Entity<ClienteEndereco>().ToTable("Tb_cl_endereco");
            modelBuilder.Entity<Fornecedor>().ToTable("Tb_fornecedor");
            modelBuilder.Entity<FornecedorEndereco>().ToTable("Tb_frn_endereco");
            modelBuilder.Entity<Produto>().ToTable("Tb_produto");
            modelBuilder.Entity<Usuario>().ToTable("Tb_usuario");
            modelBuilder.Entity<VendaProdutos>().ToTable("Tb_ven_produtos");
            modelBuilder.Entity<Cupom>().ToTable("Tb_cupom");


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
