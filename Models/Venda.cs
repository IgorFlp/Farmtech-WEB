using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public class Venda
    {
        // Construir classe com base no banco
        private int id;
        private int userId;
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
        public int UserId { get => userId; set => userId = value; }
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
        private int id;
        private int vendaId;
        private int produtoId;
        private decimal quant;

        public int VendaId { get => vendaId; set => vendaId = value; }
        public int ProdutoId { get => produtoId; set => produtoId = value; }
        public decimal Quant { get => quant; set => quant = value; }
    }
}
