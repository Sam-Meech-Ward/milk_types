using Microsoft.EntityFrameworkCore;
using TypesOfMilk.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "server=127.0.0.1;user=root;password=;database=milk_db";
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

builder.Services.AddDbContext<DatabaseContext>(
    opt =>
    {
      opt
      .UseMySql(connectionString, serverVersion);
    }
);


// builder done, let's build it 

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

// Make a page to render data 


app.Run();
