using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Routing.Internal;
using Microsoft.Extensions.Options;
using Test_technique.Models;

namespace Test_technique.Views.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IOptionsMonitor<Data> _data; 
        public Data Config { get; private set; } = default!;

        public int Hauteur = 0;
        public double Propagation;
        public int Longueur;

        public IndexModel(IOptionsMonitor<Data> data) => _data = data;



        public void OnGet()
        {
            Config = _data.CurrentValue; 
        }
        

        public void Init()
        {
            Hauteur = Config.Hauteur; 
            Longueur = Config.Longueur;
            Propagation = Config.Propagation;
            
        }
    }
}
