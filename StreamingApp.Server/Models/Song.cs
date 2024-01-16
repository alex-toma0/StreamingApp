using System.Text.Json.Serialization;

namespace StreamingApp.Server.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string ImagePath { get; set; }
        
        // Navigation properties
        
        [JsonIgnore]
        public User User { get; set; }
        public int UserId { get; set; }

        public int GenreId { get; set; }

    }
}
