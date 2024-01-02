using Microsoft.AspNetCore.Mvc;
using StreamingApp.Server.Data;
using StreamingApp.Server.Dtos;
using StreamingApp.Server.Helpers;
using StreamingApp.Server.Models;

namespace StreamingApp.Server.Controllers
{
    [Route("api")]
    [ApiController]
    public class SongController : Controller
    {
        private readonly ISongRepository _repository;
        private readonly StreamingContext _context;
        public SongController(ISongRepository repository, StreamingContext context)
        {
            _repository = repository;
            _context = context;

            
        }

        [HttpPost("uploadSong")]
        public IActionResult UploadSong(SongDto dto)
        {
            var song = new Song
            {
                Title = dto.Title,
                FilePath = dto.FilePath,
                ImagePath = dto.ImagePath,
                Genre = dto.Genre,
                UserId = dto.UserId,
                User = _context.Users.First(x => x.Id == dto.UserId),
                
            };

            return Created("success", _repository.Create(song));
        }
        [HttpGet("getSongs")]
        public IActionResult GetSongs()
        {
            var songs = _repository.GetSongs();
            return Ok(songs);
        }
    }
}
