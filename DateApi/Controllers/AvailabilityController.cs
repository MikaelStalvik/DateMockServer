using Microsoft.AspNetCore.Mvc;

namespace DateApi.Controllers
{
    public class Slot
    {
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }
        public List<string> Assets { get; set; }
    }
    public class Day
    {
        public DateOnly Date { get; set; }
        public List<Slot> Slots { get; set; }
    }
    public class Availability
    {
        public List<Day> Days { get; set; }
        public string TimeZoneId { get; set; }  
    }

    /// 
    
    public class ConvertedSlot
    {
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }
        public List<string> Assets { get; set; }
    }
    public class ConvertedDay
    {
        public DateOnly Date { get; set; }
        public List<ConvertedSlot> Slots { get; set; }
    }
    public class ConvertedAvailability
    {
        public List<ConvertedDay> Days { get; set; }
        public int UtcOffset { get; set; }
        public string TimeZoneId { get; set; }
    }


    [ApiController]
    [Route("[controller]")]
    public class AvailabilityController : ControllerBase
    {
        [HttpGet]
        public ConvertedAvailability Get(string market)
        {
            var availability = GetAvailability(market);

            var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(availability.TimeZoneId);
            var result = new ConvertedAvailability
            {
                TimeZoneId = availability.TimeZoneId,
                UtcOffset = (int)timeZoneInfo.BaseUtcOffset.TotalHours * 60,
                Days = new List<ConvertedDay>()
            };
            foreach (var day in availability.Days)
            {
                var convertedDay = new ConvertedDay
                {
                    Date = day.Date,
                    Slots = new List<ConvertedSlot>()
                };
                foreach (var slot in day.Slots)
                {
                    convertedDay.Slots.Add(new ConvertedSlot()
                    {
                        Assets = slot.Assets,
                        StartTime = slot.StartTime.ToUniversalTime(),
                        EndTime = slot.EndTime.ToUniversalTime()
                    });
                }
                result.Days.Add(convertedDay);
            }
            return result;
        }
        private Availability GetAvailability(string market)
        {
            switch (market.ToLowerInvariant())
            {
                case "uk":
                    return new Availability()
                    {
                        Days = GenerateDays(0),
                        TimeZoneId = "GMT Standard Time",
                    };
                case "fi":
                    return new Availability()
                    {
                        Days = GenerateDays(0),
                        TimeZoneId = "FLE Standard Time",
                    };
                case "se":
                    return new Availability()
                    {
                        Days = GenerateDays(0),
                        TimeZoneId = "W. Europe Standard Time",
                    };
            }
            return null;
        }
        private List<Day> GenerateDays(int offset)
        {
            var startDate = DateTimeOffset.Now;
            var result = new List<Day>();
            for(var i = 0; i < 30; i++)
            {
                var currentDate = startDate.AddDays(i);
                var day = new Day
                {
                    Date = DateOnly.FromDateTime(currentDate.DateTime),
                    Slots = GenerateSlots(DateOnly.FromDateTime(currentDate.DateTime), offset)
                };
                result.Add(day);
            }
            return result;
        }

        private List<Slot> GenerateSlots(DateOnly date, int offset)
        {
            var result = new List<Slot>();
            var open = new TimeOnly(9, 0, 0);
            var close = new TimeOnly(18, 0, 0);
            switch(date.DayOfWeek)
            {
                case DayOfWeek.Saturday:
                    open = new TimeOnly(10, 0, 0);
                    close = new TimeOnly(17, 0, 0);
                    break;
                case DayOfWeek.Sunday:
                    open = new TimeOnly(11, 0, 0);
                    close = new TimeOnly(16, 0, 0);
                    break;
            }
            var diff = close.Hour - open.Hour;
            for(var i = 0; i <= diff; i++)
            {
                var dtoOpen = new DateTimeOffset(date.Year, date.Month, date.Day, open.Hour + i, open.Minute, open.Second, TimeSpan.FromMinutes(offset));
                var dtoClose = new DateTimeOffset(date.Year, date.Month, date.Day, open.Hour + i + 1, open.Minute, open.Second, TimeSpan.FromMinutes(offset));
                result.Add(new Slot() 
                {
                    StartTime = dtoOpen,
                    EndTime = dtoClose,
                    Assets = new List<string> { "assetid" }
                });
            }
            return result;
        }
    }
}
