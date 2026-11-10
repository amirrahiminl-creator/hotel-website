var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

var rooms = new List<HotelRoom>
{
    new HotelRoom(
        1,
        "Standaard kamer",
        "Een comfortabele kamer voor een ontspannen verblijf.",
        95.00m,
        true
    ),

    new HotelRoom(
        2,
        "Deluxe kamer",
        "Een ruime kamer met extra comfort.",
        125.00m,
        true
    ),

    new HotelRoom(
        3,
        "Suite",
        "Een luxe suite met een ruime zithoek.",
        175.00m,
        false
    )
};
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/api/rooms", () =>
{
    return rooms;
});
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record HotelRoom(
    int Id,
    string Name,
    string Description,
    decimal PricePerNight,
    bool IsAvailable
);