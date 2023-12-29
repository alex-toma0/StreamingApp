using Microsoft.EntityFrameworkCore;
using StreamingApp.Server.Data;
using StreamingApp.Server.Helpers;
using StreamingApp.Server.Models;

var AllowCorsOrigins = "_allowCorsOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowCorsOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                      });
});
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
});
builder.Services.AddDbContext<UserContext>(opt => opt.UseSqlite("Data Source=C:\\Users\\alext\\Documents\\Projects\\Databases\\streamingdb.sqlite"));
builder.Services.AddControllers();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.

app.UseCors(AllowCorsOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
