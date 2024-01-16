using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamingApp.Server.Migrations
{
    public partial class UpdatedListeningHistory2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_listeningHistories",
                table: "listeningHistories");

            migrationBuilder.RenameTable(
                name: "listeningHistories",
                newName: "ListeningHistory");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ListeningHistory",
                table: "ListeningHistory",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ListeningHistory",
                table: "ListeningHistory");

            migrationBuilder.RenameTable(
                name: "ListeningHistory",
                newName: "listeningHistories");

            migrationBuilder.AddPrimaryKey(
                name: "PK_listeningHistories",
                table: "listeningHistories",
                column: "Id");
        }
    }
}
