using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class ClienteController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ClienteController> _logger;

        // Construtor que injeta o DbContext
        public ClienteController(ApplicationDbContext context, ILogger<ClienteController> logger)
        {
            _context = context;
            _logger = logger;
            _logger = logger;
        }
        public IActionResult Create()
        {
            return View();
        }

        //POST: Cliente/Create
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar([FromBody] Cliente cliente)
        {
            try { 
            if (ModelState.IsValid)
            {
                _context.Add(cliente);
                await _context.SaveChangesAsync();
                return Ok(cliente);
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
        public async Task<IActionResult> Excluir([FromBody] Cliente cliente)
        {
            try
            {
                    if (cliente.Cpf == null) 
                    {
                        Console.WriteLine("CPF n�o fornecido: " + JsonConvert.SerializeObject(cliente.Cpf));
                        return BadRequest("CPF n�o fornecido.");
                    }                
                                    

                    // Buscar o endere�o pelo ID antes de excluir
                    var clienteBuscado = await _context.Cliente.FindAsync(cliente.Cpf);
                    if (clienteBuscado== null)
                    {
                        return NotFound("Endere�o n�o encontrado.");
                    }
                    _context.Remove(clienteBuscado);
                    await _context.SaveChangesAsync();
                    return Ok(cliente);
                
                
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
        public async Task<IActionResult> Alterar([FromBody] Cliente cliente)
        {
            try
            {
                var cliente1 = _context.Cliente.Find(cliente.Cpf);

                if (cliente1 != null)
                {

                    cliente1.Nome = cliente.Nome;
                    cliente1.Telefone = cliente.Telefone;
                    cliente1.Email = cliente.Email;
                    cliente1.Genero = cliente.Genero;
                    cliente1.DataNasc = cliente.DataNasc;                    
                    _context.Entry(cliente1).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(cliente1);

                }
                else
                {
                    return NotFound("Usuario n�o encontrado");
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

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ExcluirEndereco([FromBody] ClienteEndereco clienteEndereco)
        {
            try
            {
                    
                    if (clienteEndereco.Cl_cpf == null) // Verifique se o ID est� presente
                    {
                    Console.WriteLine("CPFn n�o fornecido: " + JsonConvert.SerializeObject(clienteEndereco.Cl_cpf));
                    return BadRequest("CPF n�o fornecido.");
                    }

                    // Buscar o endere�o pelo ID antes de excluir
                    var endereco = await _context.ClienteEndereco.FindAsync(clienteEndereco.Cl_cpf);
                    if (endereco == null)
                    {
                        return Ok("Endere�o n�o encontrado.");
                    }
                    Console.WriteLine("Endereco: "+ JsonConvert.SerializeObject(endereco));
                    _context.Remove(endereco);
                    await _context.SaveChangesAsync();
                    return Ok(clienteEndereco);                
                
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
        public async Task<IActionResult> CriarEndereco([FromBody] ClienteEndereco clienteEndereco)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    

                    _context.Add(clienteEndereco);
                    await _context.SaveChangesAsync();
                    return Ok(clienteEndereco);
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
        [HttpPost]
        public async Task<IActionResult> AlterarEndereco([FromBody] ClienteEndereco endereco)
        {
            try
            {
                var endereco1 = _context.ClienteEndereco.Find(endereco.Cl_cpf);

                if (endereco1 != null)
                {

                    endereco1.Rua = endereco.Rua;
                    endereco1.Bairro = endereco.Bairro;
                    endereco1.Cidade = endereco.Cidade;
                    endereco1.Estado = endereco.Estado;
                    endereco1.Cep = endereco.Cep;                   
                    _context.Entry(endereco1).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(endereco1);

                }
                else
                {
                    return NotFound("Usuario n�o encontrado");
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
        public async Task<IActionResult> Consultar()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var clientes = await _context.Cliente.ToListAsync();            
                    return Ok(clientes);
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
                    var clientesEndereco = await _context.ClienteEndereco.ToListAsync();
                    return Ok(clientesEndereco);
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
