using System.Text.Json.Serialization;

namespace StreamingApp.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        [JsonIgnore] public string Password { get; set; }

        public string Name { get; set; }

        public ICollection<Song>? Songs { get; set; }
        public ICollection<Album>? Albums { get; set; }
    }
}
