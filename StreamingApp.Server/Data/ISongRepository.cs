using StreamingApp.Server.Models;

namespace StreamingApp.Server.Data
{
    public interface ISongRepository
    {
        Song Create(Song song);
        Song GetById(int id);

        List<Song> GetSongs();
    }
}
