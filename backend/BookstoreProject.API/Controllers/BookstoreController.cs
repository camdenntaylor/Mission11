using BookstoreProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _bookstoreContext;
        public BookstoreController(BookstoreDbContext temp)
        {
            _bookstoreContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookCategories = null)
        {
            var query = _bookstoreContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(b => bookCategories.Contains(b.Category));
            }

            var totalBooks = query.Count();

            var bookStuff = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            

            return Ok(new
            {
                Books = bookStuff,
                totalBooks = totalBooks
            });

        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookstoreContext.Books
                .Select(x => x.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}
