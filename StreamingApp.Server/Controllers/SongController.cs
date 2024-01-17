using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Server.Data;
using StreamingApp.Server.Dtos;
using StreamingApp.Server.Helpers;
using StreamingApp.Server.Models;
using System.IO;

namespace StreamingApp.Server.Controllers
{
    [Route("api/songs")]
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
        public IActionResult UploadSong([FromForm] SongDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new { message = "Couldn't upload song" });
            }
            
            var fileName = dto.AudioFile.FileName;
            var filePath = Path.Combine(@"C:\Users\alext\Documents\StreamingAppSongs", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                dto.AudioFile.CopyTo(stream);
            }

            var song = new Song
            {
                Title = dto.Title,
                FilePath = fileName,
                ImagePath = dto.ImagePath,
                GenreId = dto.GenreId,
                UserId = dto.UserId,
                User = _context.Users.First(x => x.Id == dto.UserId),

            };

            return Created("success", _repository.Create(song));

        }
        [HttpGet("getSongs")]
        public IActionResult GetSongs()
        {
            var songs = from song in _context.Songs
                        join user in _context.Users on song.UserId equals user.Id
                        join genre in _context.Genres on song.GenreId equals genre.Id
                        select new
                        {
                            Id = song.Id,
                            Title = song.Title,
                            FilePath = song.FilePath,
                            ImagePath = song.ImagePath,
                            GenreName = genre.Name,
                            ArtistName = user.Name,
                        };
            return Ok(songs);
        }

        [HttpGet("stream/{fileName}")]
        public IActionResult StreamSong(string fileName)
        {

            var filePath = Path.Combine(@"C:\Users\alext\Documents\StreamingAppSongs", fileName);

            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "audio/ogg", fileName); 
            }

            return NotFound();
        }

        [HttpGet("getGenres")]
        public IActionResult GetGenres()
        {
            var genres = _context.Genres.ToList();
            return Ok(genres);
        }

        [HttpPost("logSong")]
        public IActionResult LogSong([FromBody] ListeningHistoryDto dto)
        {
    
            
            var loggedSong = new ListeningHistory { SongId = dto.SongId, UserId = dto.UserId};
            _context.ListeningHistory.Add(loggedSong);
            loggedSong.Id = _context.SaveChanges();
            return Ok(loggedSong);
        }

        [HttpPost("getTopGenres")]
        public IActionResult GetTopGenres(UserIdDto dto)
        {
            var groupedGenres = (from lh in _context.ListeningHistory
                                 join s in _context.Songs on lh.SongId equals s.Id
                                 join g in _context.Genres on s.GenreId equals g.Id
                                 where lh.UserId == dto.UserId
                                 group g by new { g.Id, g.Name } into genreGroup
                                 select new
                                 {
                                     GenreId = genreGroup.Key.Id,
                                     GenreName = genreGroup.Key.Name,
                                     PlayCount = genreGroup.Count()
                                 })
                    .ToList(); 

            var topGenresForUser = groupedGenres
                                   .OrderByDescending(x => x.PlayCount)
                                   .Take(10)
                                   .ToList();

            return Ok(topGenresForUser);
            
        }
    }
   }
