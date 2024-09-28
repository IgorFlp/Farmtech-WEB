using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class FornecedorController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<FornecedorController> _logger;

        // Construtor que injeta o DbContext
        public FornecedorController(ApplicationDbContext context, ILogger<FornecedorController> logger)
        {
            _context = context;
            _logger = logger;
            _logger = logger;
        }
        public IActionResult Create()
        {
            return View();
        }

        //POST: Fornecedor/Create
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar([FromBody] Fornecedor fornecedor)
        {
            try { 
            if (ModelState.IsValid)
            {
                _context.Add(fornecedor);
                await _context.SaveChangesAsync();
                return Ok(fornecedor);
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
        public async Task<IActionResult> Excluir([FromBody] Fornecedor fornecedor)
        {
            try
            {
                    if (fornecedor.Cnpj == null) 
                    {
                        Console.WriteLine("CPF não fornecido: " + JsonConvert.SerializeObject(fornecedor.Cnpj));
                        return BadRequest("CPF não fornecido.");
                    }                
                                    

                    // Buscar o endereço pelo ID antes de excluir
                    var fornecedorBuscado = await _context.Fornecedor.FindAsync(fornecedor.Cnpj);
                    if (fornecedorBuscado== null)
                    {
                        return NotFound("Endereço não encontrado.");
                    }
                    _context.Remove(fornecedorBuscado);
                    await _context.SaveChangesAsync();
                    return Ok(fornecedor);
                
                
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status co de
                // Logging can be done using a logging library or simply console
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ExcluirEndereco([FromBody] FornecedorEndereco fornecedorEndereco)
        {
            try
            {
                    
                    if (fornecedorEndereco.Frn_cnpj == null) // Verifique se o ID está presente
                    {
                    Console.WriteLine("CPFn não fornecido: " + JsonConvert.SerializeObject(fornecedorEndereco.Frn_cnpj));
                    return BadRequest("CPF não fornecido.");
                    }

                    // Buscar o endereço pelo ID antes de excluir
                    var endereco = await _context.FornecedorEndereco.FindAsync(fornecedorEndereco.Frn_cnpj);
                    if (endereco == null)
                    {
                        return Ok("Endereço não encontrado.");
                    }
                    Console.WriteLine("Endereco: "+ JsonConvert.SerializeObject(endereco));
                    _context.Remove(endereco);
                    await _context.SaveChangesAsync();
                    return Ok(fornecedorEndereco);                
                
            }
            catch (Exception ex)
            {
                // Log the exception and return a 500 status co de
                // Logging can be done using a logging library or simply console
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> CriarEndereco([FromBody] FornecedorEndereco fornecedorEndereco)
        {
            try
            {
                if (ModelState.IsValid)
                {                   

                    _context.Add(fornecedorEndereco);
                    await _context.SaveChangesAsync();
                    return Ok(fornecedorEndereco);
                }
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                Console.WriteLine("ModelState Errors: " + string.Join(", ", errors));
                return BadRequest(ModelState);
                
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
        public async Task<IActionResult> Consultar()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var fornecedors = await _context.Fornecedor.ToListAsync();            
                    return Ok(fornecedors);
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
        [HttpGet]
        public async Task<IActionResult> ConsultarEndereco()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var fornecedorsEndereco = await _context.FornecedorEndereco.ToListAsync();
                    return Ok(fornecedorsEndereco);
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
