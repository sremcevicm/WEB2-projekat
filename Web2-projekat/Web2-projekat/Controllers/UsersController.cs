using Microsoft.AspNetCore.Mvc;

namespace Web2_projekat.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
