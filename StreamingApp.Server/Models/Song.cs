using System.Text.Json.Serialization;

namespace StreamingApp.Server.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string ImagePath { get; set; }
        
        public string Genre { get; set; }

        // Navigation properties
        public Album? Album { get; set; } 
        public int? AlbumId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        public int UserId { get; set; }

    }
}
