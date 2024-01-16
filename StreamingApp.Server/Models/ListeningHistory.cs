namespace StreamingApp.Server.Models
{
    public class ListeningHistory
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SongId { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
