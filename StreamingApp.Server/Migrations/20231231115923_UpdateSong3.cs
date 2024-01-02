using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Server.Migrations
{
    public partial class UpdateSong3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Songs",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Songs");
        }
    }
}
