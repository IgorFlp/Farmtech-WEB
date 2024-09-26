using Farmtech_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Farmtech_WEB.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ClienteController> _logger;

        // Construtor que injeta o DbContext
        public UsuarioController(ApplicationDbContext context, ILogger<ClienteController> logger)
        {
            _context = context;
            _logger = logger;
            _logger = logger;
        }
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Logar([FromBody] Usuario usuario)
        {
            try
            {  
                    var user = await _context.Usuario.Where(u => u.Login == usuario.Login && u.Senha == usuario.Senha)
            .FirstOrDefaultAsync();

                    if (user != null)
                    {
                        return Ok(new { message = "Login feito com sucesso", user });
                    }
                    else
                    {
                        return NotFound(new { message = "Usuário não encontrado HTTP." });
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
                    var usuario = await _context.Usuario.ToListAsync();
                    return Ok(usuario);
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
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Criar([FromBody] Usuario usuario)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Add(usuario);
                    await _context.SaveChangesAsync();
                    return Ok(usuario);
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
        [HttpPost]
        public async Task<IActionResult> Alterar([FromBody] Usuario usuario)
        {
            try
            {
                var user = _context.Usuario.Find(usuario.Id);

                if (user != null)
                {

                    user.Nome = usuario.Nome;
                    user.Cargo = usuario.Cargo;
                    user.Login = usuario.Login;
                    user.Senha = usuario.Senha;

                    _context.Entry(user).State = EntityState.Modified;
                    _context.SaveChanges();
                    return Ok(user);

                }
                else
                {
                    return NotFound("Usuario não encontrado");
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
        /*
        //POST: Cliente/Create
        
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Excluir([FromBody] Cliente cliente)
        {
            try
            {
                    if (cliente.Cpf == null) 
                    {
                        Console.WriteLine("CPF não fornecido: " + JsonConvert.SerializeObject(cliente.Cpf));
                        return BadRequest("CPF não fornecido.");
                    }                
                                    

                    // Buscar o endereço pelo ID antes de excluir
                    var clienteBuscado = await _context.Cliente.FindAsync(cliente.Cpf);
                    if (clienteBuscado== null)
                    {
                        return NotFound("Endereço não encontrado.");
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
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ExcluirEndereco([FromBody] ClienteEndereco clienteEndereco)
        {
            try
            {
                    
                    if (clienteEndereco.Cl_cpf == null) // Verifique se o ID está presente
                    {
                    Console.WriteLine("CPFn não fornecido: " + JsonConvert.SerializeObject(clienteEndereco.Cl_cpf));
                    return BadRequest("CPF não fornecido.");
                    }

                    // Buscar o endereço pelo ID antes de excluir
                    var endereco = await _context.ClienteEndereco.FindAsync(clienteEndereco.Cl_cpf);
                    if (endereco == null)
                    {
                        return Ok("Endereço não encontrado.");
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

        */
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
