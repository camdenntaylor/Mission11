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

        public IEnumerable<Book> GetBooks() 
        {
            return _bookstoreContext.Books.ToList();
        }
    }
}
