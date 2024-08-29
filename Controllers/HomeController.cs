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
        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Usuario()
        {
            return View();
        }

        public IActionResult Vender()
        {
            return View();
        }
        public IActionResult Vender_addprod()
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
