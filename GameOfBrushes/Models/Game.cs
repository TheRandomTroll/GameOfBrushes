using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameOfBrushes.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class Game
    {
        public Game()
        {
            this.Contestants = new List<ApplicationUser>(5);
        }
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<ApplicationUser> Contestants { get; set; }
        public ApplicationUser RoomCreator { get; set; }

        [ForeignKey("RoomCreator")]
        public string RoomCreatorId { get; set; }
    }
}