using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();        
        }
        public IActionResult Clientes()
        {
            return View();
        }
        public IActionResult Fornecedores()
        {
            return View();
        }
        public IActionResult Produtos()
        {
            return View();
        }
        public IActionResult Usuarios()
        {
            return View();
        }

        public IActionResult Vender()
        {
            return View();
        }
        public IActionResult Relatorios()
        {
            return View();
        }
        public IActionResult Producao()
        {
            return View();
        }
        //Inicio da copia do molde
        public IActionResult Molde()
        {
            return View();
        }
        //Fim da copia do molde


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
