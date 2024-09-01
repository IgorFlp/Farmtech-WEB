using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public static class configBanco
    {
        public static string connectionString { get; } = "Server=.;Database=Db_Farmtech;User Id=farmtech;Password=123456789";
        //String pra conectar no banco de dados ^ não alterar, usar dentro do SqlConnection(configBanco.connectionString)
    }
    public class Vender
    {
        
        public string LerClientes()
        {          
            
            return "Teste";
        }
    }
}
