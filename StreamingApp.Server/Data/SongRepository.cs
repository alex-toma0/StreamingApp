using StreamingApp.Server.Models;

namespace StreamingApp.Server.Data
{
    public class SongRepository : ISongRepository
    {
        private readonly StreamingContext _context;
        public SongRepository(StreamingContext context)
        {
            _context = context;
        }

        public Song Create(Song song)
        {
            _context.Songs.Add(song);
            song.Id = _context.SaveChanges();
            return song;
        }

        public Song GetById(int id)
        {
            return _context.Songs.FirstOrDefault(s => s.Id == id);
        }

        public List<Song> GetSongs()
        {
            return _context.Songs.ToList();
        }
    }
}
