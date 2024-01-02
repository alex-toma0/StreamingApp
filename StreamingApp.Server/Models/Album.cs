namespace StreamingApp.Server.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImagePath { get; set; }
        public int Year { get; set; }
        public string Genre { get; set; }

        public ICollection<Song> Songs { get; set; }

    }
}
