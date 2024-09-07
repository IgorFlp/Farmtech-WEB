using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public class Cliente
    {
        // Construir classe com base no banco
        [Key]
        public string Cpf { get; set; }

        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public DateOnly DataNasc {  get; set; }
        public char Genero { get; set; }        
    }
    
}
