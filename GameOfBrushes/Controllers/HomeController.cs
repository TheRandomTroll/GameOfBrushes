using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameOfBrushes.Controllers
{
    using GameOfBrushes.Models;

    public class HomeController : Controller
    {
        private ApplicationDbContext context;
        public ApplicationDbContext Context => this.context ?? new ApplicationDbContext();
        public ActionResult Index()
        {
            return View(this.Context.Users);
        }

        public ActionResult About()
        {
            return View();
        }
    }
}