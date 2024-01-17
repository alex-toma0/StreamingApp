using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Server.Data;
using StreamingApp.Server.Dtos;
using StreamingApp.Server.Helpers;
using StreamingApp.Server.Models;
using System.Reflection.Metadata.Ecma335;

namespace StreamingApp.Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly StreamingContext _context;
        public AuthController(IUserRepository repository, JwtService jwtService, StreamingContext context)
        {
            _repository = repository;
            _jwtService = jwtService;
            _context = context;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var exists = _repository.GetByEmail(dto.Email);

            if (exists != null)
            {
                Console.WriteLine(exists.Email);
                return BadRequest(new { message = "User already exists" });
            }

            
                var user = new User
            {
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Name = dto.Name,
            };   
            
            return Created("success", _repository.Create(user));
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);
            
            if (user == null) return BadRequest(new { message = "Invalid Credentials" });
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            // HttpOnly cookie
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }
        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
            
        }
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }
        [HttpPost("getRole")]
        public IActionResult GetRole([FromBody] UserIdDto dto)
        {
            var roles = from role in _context.Roles
                       join userRole in _context.UserRoles on role.Id equals userRole.RoleId
                       join user in _context.Users on userRole.UserId equals user.Id
                       where userRole.UserId == dto.UserId
                       select new
                       {
                           RoleId = role.Id,
                           RoleName = role.Name,
                       };
            return Ok(roles.ToList());
        }
    }

}
