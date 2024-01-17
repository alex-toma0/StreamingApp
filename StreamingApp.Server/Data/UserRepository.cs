using SQLitePCL;
using StreamingApp.Server.Models;

namespace StreamingApp.Server.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly StreamingContext _context;
        public UserRepository(StreamingContext context) 
        {
            _context = context;
        }
        public User Create(User user)
        {
            try
            {
                _context.Users.Add(user);
                user.Id = _context.SaveChanges();
                return user;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return user;
            }
        }

        public User GetByEmail(string email) 
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}
