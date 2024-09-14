using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public class Usuario
    {
        // Construir classe com base no banco
        [Key]
        public int Id { get; set; }

        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Cargo {  get; set; }          
    }      
}
