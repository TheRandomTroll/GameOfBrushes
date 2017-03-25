using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameOfBrushes.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class UserInfo
    {
        [Key]
        public string Id { get; set; }

        public int Points { get; set; }

        public virtual Game JoinedGame { get; set; }
        [NotMapped]
        public string GivenWord { get; set; }

        [NotMapped]
        public string Rank => this.GetRank();



        private string GetRank()
        {
            if (Points < 10)
            {
                return "Junior Painter";
            }
            if (Points >= 10 && Points < 50)
            {
                return "Drawing Rookie";
            }
            if (Points >= 50 && Points < 100)
            {
                return "Painting Apprentice";
            }
            if (Points >= 100 && Points < 150)
            {
                return "Brushmaster";
            }
            if (Points >= 150 && Points < 200)
            {
                return "Grandmaster of Art";
            }

            if (Points >= 200)
            {
                return "The Vinci";
            }
            return null;
        }
    }
}