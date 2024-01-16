using StreamingApp.Server.Models;

namespace StreamingApp.Server.Dtos
{
    public class SongDto
    {
        public string Title { get; set; }
        public string ImagePath { get; set; }
        public int GenreId { get; set; }
        public int UserId { get; set; }

        public IFormFile AudioFile { get; set; }

    }
}
