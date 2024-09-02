using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public class Venda
    {
        // Construir classe com base no banco
        private int id;
        private string cupom;
        private string mtdPagto;
        private string entrega;
        private string userLogin;
        private string clCpf;
        private DateTime dtVenda;        
        private double subtotal;
        private double frete;
        private double desconto;
        private double total;

        public int Id { get => id;}
        public string Cupom { get => cupom; set => cupom = value; }
        public string MtdPagto { get => mtdPagto; set => mtdPagto = value; }
        public string Entrega { get => entrega; set => entrega = value; }
        public string UserLogin { get => userLogin; set => userLogin = value; }
        public string ClCpf { get => clCpf; set => clCpf = value; }
        public DateTime DtVenda { get => dtVenda; set => dtVenda = value; }
        public double Subtotal { get => subtotal; set => subtotal = value; }
        public double Frete { get => frete; set => frete = value; }
        public double Desconto { get => desconto; set => desconto = value; }
        public double Total { get => total; set => total = value; }
        
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
