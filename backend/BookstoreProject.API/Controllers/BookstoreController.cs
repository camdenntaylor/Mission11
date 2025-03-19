using BookstoreProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _bookstoreContext;
        public BookstoreController(BookstoreDbContext temp) 
        { 
            _bookstoreContext = temp;
        }

        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1) 
        {

            //cookie stuff

            string? favCategory = Request.Cookies["FavoriteCategory"];
            Console.WriteLine("~~~~~~~COOKIE~~~~~~~\n" + favCategory);

            HttpContext.Response.Cookies.Append("FavoriteCategory", "Classic", new CookieOptions{
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1)
            });

            var bookStuff = _bookstoreContext.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalBooks = _bookstoreContext.Books.Count();

            return Ok(new
            {
                Books = bookStuff,
                totalBooks = totalBooks
            });

        }
    }
}
