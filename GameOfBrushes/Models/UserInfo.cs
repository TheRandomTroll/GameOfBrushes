using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameOfBrushes.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using GameOfBrushes.Utility;

    public class UserInfo
    {
        [Key]
        public string Id { get; set; }

        public int Points { get; set; }

        [NotMapped]
        public string GivenWord { get; set; }

        public string Rank => WebUtility.GetUserRank(this.Points);

    }
}