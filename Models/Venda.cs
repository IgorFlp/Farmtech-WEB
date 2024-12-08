using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public class Venda
    {
        // Construir classe com base no banco
        private int id;
        private int usr_id;
        private string cupom;
        private string mtdPagto;
        private string entrega;        
        private string clCpf;
        private DateTime dtVenda;        
        private decimal subtotal;
        private decimal frete;
        private decimal desconto;
        private decimal total;

        public int Id { get => id; set => id = value; }
        public string Cupom { get => cupom; set => cupom = value; }
        public string MtdPagto { get => mtdPagto; set => mtdPagto = value; }
        public string Entrega { get => entrega; set => entrega = value; }
        public int Usr_id { get => usr_id; set => usr_id = value; }
        public string ClCpf { get => clCpf; set => clCpf = value; }
        public DateTime DtVenda { get => dtVenda; set => dtVenda = value; }
        public decimal Subtotal { get => subtotal; set => subtotal = value; }
        public decimal Frete { get => frete; set => frete = value; }
        public decimal Desconto { get => desconto; set => desconto = value; }
        public decimal Total { get => total; set => total = value; }
        
    }
    public class VendaProdutos
    {
        // Construir classe com base no banco
        [Key]
        public int Id { get; set; }

        [Required]
        public int Ven_id { get; set;}
        [Required]
        public int Pdt_id { get; set; }
        // Navegação para Produto
        [ForeignKey("Pdt_id")]
        public Produto Produto{ get; set; }

        // Navegação para Venda
        [ForeignKey("Ven_id")]
        public Venda Venda { get; set; }
        public decimal Quant { get; set; }
    }
}
