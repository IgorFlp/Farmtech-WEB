using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProdutoController> _logger;

        // Construtor que injeta o DbContext
        public ProdutoController(ApplicationDbContext context, ILogger<ProdutoController> logger)
        {
            _context = context;
            _logger = logger;
            _logger = logger;
        }
        public IActionResult Create()
        {
            return View();
        }

        //POST: Produto/Create
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar([FromBody] Produto produto)
        {
            try { 
            if (ModelState.IsValid)
            {
                _context.Add(produto);
                await _context.SaveChangesAsync();
                return Ok(produto);
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
        [HttpGet]
        public async Task<IActionResult> Consultar()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var produtos = await _context.Produto.ToListAsync();            
                    return Ok(produtos);
                }
                return BadRequest(ModelState); ;
            }
            catch (Exception ex)
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
