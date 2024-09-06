using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class VenderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<VenderController> _logger;

        // Construtor que injeta o DbContext
        public VenderController(ApplicationDbContext context, ILogger<VenderController> logger)
        {
            _context = context;
            _logger = logger;
            _logger = logger;
        }
        public IActionResult Create()
        {
            return View();
        }

        //POST: Vender/Create
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar([FromBody] Venda venda)
        {
            try { 
            if (ModelState.IsValid)
            {
                _context.Add(venda);
                await _context.SaveChangesAsync();
                return Ok(venda);
            }
            return BadRequest(ModelState); ;
            } catch (Exception ex)
            {
                // Log the exception and return a 500 status co de
                // Logging can be done using a logging library or simply console
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
