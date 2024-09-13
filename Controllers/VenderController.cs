using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                return Ok(new { id = venda.Id });
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
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> AddProdutosVenda([FromBody] List<VendaProdutos> vendaProdutos)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    foreach (var produtoVenda in vendaProdutos)
                    {
                        _context.Add(produtoVenda);
                    }                    
                    await _context.SaveChangesAsync();
                    return Ok(vendaProdutos);
                }
                else{
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                    Console.WriteLine("Erros de validação: " + string.Join(", ", errors));
                    return BadRequest(ModelState);
                }                
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status co de
                // Logging can be done using a logging library or simply console
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet]
        public async Task<IActionResult> ConsultarCupom(string nome)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _context.Cupom.Where(p => p.Nome == nome).FirstOrDefault();
                    if (response == null)
                    {
                        return NotFound("Cupom não encontrado. response: "+response);
                    }

                    if (response.dtValid < DateOnly.FromDateTime(DateTime.Now))
                    {
                        return BadRequest("Produto fora da validade.");
                    }
                    else
                    {
                        return Ok(response);
                    }
                    
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
