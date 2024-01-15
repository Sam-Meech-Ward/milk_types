using Microsoft.EntityFrameworkCore;
using TypesOfMilk.Models;
using Microsoft.AspNetCore.OpenApi;


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

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder done, let's build it 

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "Hello World!");

app.MapControllers();


// Make a page to render data 


app.Run();
