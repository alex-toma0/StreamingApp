using Microsoft.EntityFrameworkCore;
using StreamingApp.Server.Models;

namespace StreamingApp.Server.Data
{
    public class StreamingContext: DbContext
    {
        public StreamingContext(DbContextOptions<StreamingContext> options) : base(options) 
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Album> Albums { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
            modelBuilder.Entity<Song>(entity => { entity.HasIndex(e => e.Title).IsUnique(); });
        }
    }
}
