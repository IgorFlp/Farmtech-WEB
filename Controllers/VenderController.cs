using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class VenderController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Construtor que injeta o DbContext
        public VenderController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Create()
        {
            return View();
        }

        // POST: Venda/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar([FromBody] Venda venda)
        {
            if (ModelState.IsValid)
            {
                _context.Add(venda);
                await _context.SaveChangesAsync();
                return Ok(venda);
            }
            return BadRequest(ModelState); ;
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
