using Microsoft.AspNetCore.Mvc;

namespace Test_technique.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
