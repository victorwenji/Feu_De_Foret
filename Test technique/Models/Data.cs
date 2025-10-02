using System.ComponentModel.DataAnnotations.Schema;

namespace Test_technique.Models
{
    public class Data
    {
        [ConfigurationKeyName("Hauteur")]
        public int Hauteur { get; init; }

        [ConfigurationKeyName("Longueur")]
        public int Longueur { get; init; }

        [ConfigurationKeyName("Propagation")]
        public double Propagation { get; init; }

        public int PositionInit { get; init; }  
    }
}
