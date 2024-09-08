﻿using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;





namespace Farmtech_WEB.Models
{
    public class Cupom
    {
        // Construir classe com base no banco
        [Key]
        public string Nome { get; set; }
        public DateOnly dtValid { get; set; }
        public decimal Valor { get; set;}
              
    }
    
}
