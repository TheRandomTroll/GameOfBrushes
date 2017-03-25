using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameOfBrushes.Utility
{
    public static class WebUtility
    {
        public static string GetUserRank(int points)
        {
            if (points < 10)
            {
                return "Newcomer";
            }
            if (points >= 10 && points < 50)
            {
                return "Drawing Rookie";
            }
            if (points >= 50 && points < 100)
            {
                return "Painting Apprentice";
            }
            if (points >= 100 && points < 150)
            {
                return "Brushmaster";
            }
            if (points >= 150 && points < 200)
            {
                return "Grandmaster of Art";
            }

            if (points >= 200)
            {
                return "The Vinci";
            }
            return null;
        }
    }
}