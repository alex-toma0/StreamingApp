using StreamingApp.Server.Models;

namespace StreamingApp.Server.Dtos
{
    public class SongDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string ImagePath { get; set; }

        public string Genre { get; set; }
        public int? AlbumId { get; set; }
        public int UserId { get; set; }

    }
}
